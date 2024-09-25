import { workspace, ConfigurationTarget } from 'vscode';
import scopeQuickPick from './scopeQuickPick';
import newScopeInputBox from './newScopeInputBox';
import oneTimeScopeInputBox from './oneTimeScopeInputBox';
import { getConfiguration } from '../../getConfiguration';

export default async function chosenScope(existing_value: string): Promise<string> {
    const workspace_config = workspace.getConfiguration('conventionalCommitBuilder');
    const config = await getConfiguration();

    return new Promise((resolve, reject) => {
        const config_scopes = config.get('scopes');
        const saved_scopes = config_scopes ?? [];

        scopeQuickPick(saved_scopes, existing_value)
            .then(async (value) => {
                const scope_type = value;

                if (scope_type === 'New Scope') {
                    const new_scope = await newScopeInputBox(existing_value);
                    if (new_scope) {
                        await workspace_config.update('scopes', [...saved_scopes, new_scope], ConfigurationTarget.Workspace);
                        resolve(new_scope);
                    } else {
                        resolve('');
                    }
                } else if (scope_type === 'One Time Scope') {
                    const one_time_scope = await oneTimeScopeInputBox(existing_value);
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