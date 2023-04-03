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
		const git_extension = vscode.extensions.getExtension('vscode.git')?.exports;
		const repo = git_extension.getAPI(1).repositories[0];

		// === AUTO-DETECT ISSUE NUMBER
		const head = repo.state.HEAD;
		const repo_name: string = head.name;
		const possible_issue_number = repo_name.match(/^([^\d]*)(\d+)/);

		let issue_number = '';
		if (possible_issue_number) {
			issue_number = possible_issue_number[0];
		}

		// === TYPE ===
		let type = null;
		type = await typeQuickPick();

		// === SCOPE ===
		let scope = null;
		const workspace_config = vscode.workspace.getConfiguration('simpleCommit');
		const workspace_scopes: string[] = workspace_config.get('scopes') as unknown as string[];

		const scope_type = await scopeQuickPick(workspace_scopes);

		if (scope_type === 'New Scope') {
			await vscode.window.showInputBox({
				prompt: 'Enter new scope name.',
				title: 'New Scope',
				placeHolder: 'Enter a name for your new scope.',
			})
			.then(async (new_scope) => {
				if (new_scope) {
					await workspace_config.update('scopes', [...workspace_scopes, new_scope], vscode.ConfigurationTarget.Workspace)
						.then(() => {
							if (workspace_scopes) {
								scope = [...workspace_scopes, new_scope];
							} else {
								scope = new_scope;
							}
						});
					scope = new_scope;
				}
			});
		}
		if (scope_type === 'Once Time Scope') {
			await vscode.window.showInputBox({
				prompt: 'Enter scope name.',
				title: 'One Time Scope',
				placeHolder: 'Enter the scope name.',
			})
			.then(async (new_scope) => {
				if (new_scope) {
					scope = new_scope;
				}
			});
		}

		// === EMOJI ===
		const emoji = await emojiQuickPick();

		// === ISSUE/TICKET NUMBER ===
		let ticket_number = null;
        ticket_number = await vscode.window.showInputBox({
			prompt: 'Enter issue or ticket number',
			title: 'Issue/Ticket Number',
			placeHolder: 'Enter you issue or ticket number.',
			value: issue_number,
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
		const commit_array: string[] = [];

		const t = type;
		const s = scope ? `(${scope})` : '';
		const tn = ticket_number ? `${ticket_number} - ` : '';
		const d = description;
		const first = `${t}${s}: ${emoji} ${tn}${d}`;
		commit_array.push(first);

		if (body) {
			commit_array.push(body);
		}

		if (footer) {
			commit_array.push(footer);
		}

		console.log(vscode.extensions.getExtension('vscode.git'));

		// === COMMIT ===
		repo.commit(commit_array.join('\n\n'))
			.then((res: unknown) => {
				console.log(res);
				vscode.window.showInformationMessage(`Commit made.\n\n${commit_array.join('\n\n')}`);
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
