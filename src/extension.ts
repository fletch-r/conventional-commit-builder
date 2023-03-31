import * as vscode from 'vscode';
import typeQuickPick from './steps/step_1_type/typeQuickPick';
import scopeQuickPick from './steps/step_2_scope/scopeQuickPick';
import emojiQuickPick from './steps/step_3_emoji/emojiQuickPick';

// Example commit
/**
 * fix(PLP): 🐛 BE-2101 - Added correct response type
 * 
 * The response type was set to the wrong type so I corrected it.
 * 
 * BREAKING CHANGE: The API changed it's response type.
 */

export function activate(context: vscode.ExtensionContext) {
  	const disposable = vscode.commands.registerCommand('simple-commit.commit', async () => {
		// === TYPE ===
		let type = null;
		type = await typeQuickPick();

		// === SCOPE ===
		let scope = null;
		const workspaceConfig = vscode.workspace.getConfiguration('simpleCommit');
		const workspaceScopes: string[] = workspaceConfig.get('scopes') as unknown as string[];

		const scopeType = await scopeQuickPick(workspaceScopes);

		if (scopeType === 'New Scope') {
			await vscode.window.showInputBox({
				prompt: 'Enter new scope name.',
				title: 'New Scope',
				placeHolder: 'Enter a name for your new scope.',
			})
			.then(async (newScope) => {
				if (newScope) {
					await workspaceConfig.update('scopes', [...workspaceScopes, newScope], vscode.ConfigurationTarget.Workspace)
						.then(() => {
							if (workspaceScopes) {
								scope = [...workspaceScopes, newScope];
							} else {
								scope = newScope;
							}
						});
					scope = newScope;
				}
			});
		}
		if (scopeType === 'Once Time Scope') {
			await vscode.window.showInputBox({
				prompt: 'Enter scope name.',
				title: 'One Time Scope',
				placeHolder: 'Enter the scope name.',
			})
			.then(async (newScope) => {
				if (newScope) {
					scope = newScope;
				}
			});
		}

		// === EMOJI ===
		const emoji = await emojiQuickPick();

		// === ISSUE/TICKET NUMBER ===
		let ticketNumber = null;
        ticketNumber = await vscode.window.showInputBox({
			prompt: 'Enter issue or ticket number',
			title: 'Issue/Ticket Number',
			placeHolder: 'Enter you issue or ticket number.',
		});

		// === DESCRIPTION ===
		let description = null;
        description = await vscode.window.showInputBox({
			prompt: 'Enter a short description of this commit.',
			title: 'Description',
			placeHolder: 'Enter a short description of this commit.',
		});
		
		// === BODY ===
		let body = null;
        body = await vscode.window.showInputBox({
			prompt: 'Enter a detailed description of this commit.',
			title: 'Body',
			placeHolder: 'Enter a detailed description of this commit.',
		});

		// === FOOTER ===
		let footer = null;
        footer = await vscode.window.showInputBox({
			prompt: 'Enter a footer',
			title: 'Footer',
			placeHolder: 'Enter remaining information such as Breaking Changes details about this commit.',
		});

		// === BUILDING COMMIT MESSAGE ===
		const commitArray: string[] = [];

		const t = type;
		const s = scope ? `(${scope})` : '';
		const tn = ticketNumber ? `${ticketNumber} - ` : '';
		const d = description;
		const first = `${t}${s}: ${emoji} ${tn}${d}`;
		commitArray.push(first);

		if (body) {
			commitArray.push(body);
		}

		if (footer) {
			commitArray.push(footer);
		}

		// === COMMIT ===
		const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
		const repo = gitExtension.getAPI(1).repositories[0];

		repo.commit(commitArray.join('\n\n'))
			.then((res: unknown) => {
				console.log(res);
				vscode.window.showInformationMessage(`Commit made.\n\n${commitArray.join('\n\n')}`);
			})
			.catch((err: { message: string, stdout: string }) => {
				console.error(err);
				vscode.window.showInformationMessage(`${err.message}\n\n${err.stdout}`);
			});
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
