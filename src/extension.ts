// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('simple-commit.commit', async () => {
		let scope = null;
		let ticketNumber = null;
		let description = null;
		let body = null;
		let footer = null;
		const type = await vscode.window.showQuickPick(
			[
				{ label: 'fix', description: 'Bug fix' },
				{ label: 'feat', description: 'New feature' },
				{ label: 'build' },
				{ label: 'style' },
				{ label: 'chore' },
				{ label: 'refactor' },
				{ label: 'ci' },
				{ label: 'test' },
				{ label: 'docs' },
			],
			{ placeHolder: 'Select the type for your commit.' }
		);

		const scopeOptions = [
			{ label: 'None', description: 'No scope.' },
		];

		let workspaceConfig = vscode.workspace.getConfiguration('simpleCommit');
		const workspaceScopes: string[] = workspaceConfig.get('scopes') as unknown as string[];
		// if (workspaceScopes === undefined) {
		// 	const updated = await workspaceConfig.update('scopes', [], vscode.ConfigurationTarget.Workspace)
		// 		.then((res) => console.log(res));
		// 	console.log(updated);
		// }
		console.log('workspaceScopes', workspaceScopes);
		if (workspaceScopes) {
			const formattedScopes = workspaceScopes.map((str) => ({
				label: str,
				description: '',
				detail: 'From saved scopes.'
			}));
			for (let i = 0; i < formattedScopes.length; i++) {
				const formattedScope = formattedScopes[i];
				scopeOptions.push(formattedScope);
			}
		}
		scopeOptions.push({ label: 'New Scope', description: 'Add a new scope to your workspace to reuse in the future.' });
		scopeOptions.push({ label: 'Once Time Scope', description: 'Enter a scope that won\'t get saved to your workspace.' });

        const scopeType = await vscode.window.showQuickPick(
			scopeOptions,
			{ placeHolder: 'Select the scope for your commit.' }
		);
		if (scopeType?.label === 'New Scope') {
			console.log('New Scope');
			await vscode.window.showInputBox({ prompt: 'Enter new scope name.' })
				.then((newScope) => {
					if (newScope) {
						// workspaceScopes.push(newScope);
						workspaceConfig.update('scopes', [newScope], vscode.ConfigurationTarget.Global)
							.then(() => {
								scope = newScope;
							});
					}
				});
			console.log('workspaceScopes', workspaceScopes);
		}
        ticketNumber = await vscode.window.showInputBox({ prompt: 'Enter issue number' });
        description = await vscode.window.showInputBox({ prompt: 'Enter a short description of the commit' });
        body = await vscode.window.showInputBox({ prompt: 'Enter a description of the commit' });
        footer = await vscode.window.showInputBox({ prompt: 'Enter a footer' });
		const finalCommit = `${type?.label}${scope ? `(${scope})` : ''}: ${ticketNumber} - ${description}\n\n${body ? body : ''}\n\n${footer ? footer : ''}`;

		console.log(finalCommit);
        
		vscode.commands.executeCommand('git.commit', ['-m', finalCommit]);

		vscode.window.showInformationMessage(`Commit made.\n\n${finalCommit}`);
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
