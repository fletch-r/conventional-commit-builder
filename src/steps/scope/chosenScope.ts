import * as vscode from 'vscode';
import scopeQuickPick from './scopeQuickPick';
import newScopeInputBox from './newScopeInputBox';
import oneTimeScopeInputBox from './oneTimeScopeInputBox';

export default async function chosenScope(workspace_config: vscode.WorkspaceConfiguration): Promise<string> {
    return new Promise((resolve, reject) => {
        const saved_scopes: string[] = workspace_config.get('scopes') as unknown as string[];
    
        scopeQuickPick(saved_scopes)
            .then(async (value) => {
                const scope_type = value;
            
                if (scope_type === 'New Scope') {
                    const new_scope = await newScopeInputBox();
                    if (new_scope) {
                        await workspace_config.update('scopes', [...saved_scopes, new_scope], vscode.ConfigurationTarget.Workspace);
                        resolve(new_scope);
                    } else {
                        resolve('');
                    }
                } else if (scope_type === 'One Time Scope') {
                    const one_time_scope = await oneTimeScopeInputBox();
                    resolve(one_time_scope);
                } else if (scope_type === 'None') {
                    resolve('');
                } else {
                    // User chose an existing saved scope.
                    resolve(scope_type);
                }
            })
            .catch(({ step }) => {
                reject(step);
            });
    });
}