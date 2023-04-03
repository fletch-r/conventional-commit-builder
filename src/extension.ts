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
		// === INITIATE GIT ===
		const git_extension = vscode.extensions.getExtension('vscode.git')?.exports;
		const repo = git_extension.getAPI(1).repositories[0];

		// === INITIATE CONFIG ===
		const workspace_config = vscode.workspace.getConfiguration('simpleCommit');

		// === AUTO-DETECT ISSUE NUMBER ===
		const head = repo.state.HEAD;
		const repo_name: string = head.name;
		const possible_issue_number = repo_name.match(/(?!.*\/)([^\d]*)(\d+)/);

		let issue_number = '';
		if (possible_issue_number) {
			issue_number = possible_issue_number[0];
		}

		// === GET SCHEMA ===
		const DEFAULT_SCHEMA =  "<type>(<scope>): <emoji> <number> - <description>\n\n<body>\n\n<footer>";
		const workspace_schema = workspace_config.get('schema') as unknown as string;

		// === TYPE ===
		let type = '';
		type = await typeQuickPick();

		// === SCOPE ===
		let scope = null;
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
					await workspace_config.update(
						'scopes',
						[...workspace_scopes, new_scope],
						vscode.ConfigurationTarget.Workspace,
					)
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
		} else if (scope_type === 'Once Time Scope') {
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
		} else if (scope_type === 'None') {
			scope = '';
		} else {
			// User chose an existing saved scope.
			scope = scope_type;
		}

		// === EMOJI ===
		const emoji = await emojiQuickPick();

		// === ISSUE/TICKET NUMBER ===
		let ticket_number = '';
        ticket_number = await vscode.window.showInputBox({
			prompt: 'Enter issue or ticket number',
			title: 'Issue/Ticket Number',
			placeHolder: 'Enter you issue or ticket number.',
			value: issue_number,
		}) as string;

		// === DESCRIPTION ===
		let description = '';
        description = await vscode.window.showInputBox({
			prompt: 'Enter a short description of this commit.',
			title: 'Description',
			placeHolder: 'Enter a short description of this commit.',
		}) as string;
		
		// === BODY ===
		let body = '';
        body = await vscode.window.showInputBox({
			prompt: 'Enter a detailed description of this commit.',
			title: 'Body',
			placeHolder: 'Enter a detailed description of this commit.',
		}) as string;

		// === FOOTER ===
		let footer = '';
        footer = await vscode.window.showInputBox({
			prompt: 'Enter a footer',
			title: 'Footer',
			placeHolder: 'Enter remaining information such as Breaking Changes details about this commit.',
		}) as string;

		// === BUILDING COMMIT MESSAGE ===
		let chosen_schema = '';
		if (workspace_schema) {
			chosen_schema = workspace_schema;
		} else {
			chosen_schema = DEFAULT_SCHEMA;
		}
		const commit_message = chosen_schema.replace('<type>', type)
										.replace('<scope>', scope ? `(${scope})` : '')
										.replace('<emoji>', emoji)
										.replace('<number>', ticket_number)
										.replace('<description>', description)
										.replace('<body>', body)
										.replace('<footer>', footer);
		// === COMMIT ===
		repo.commit(commit_message)
			.then(() => {
				vscode.window.showInformationMessage(`Commit made.\n\n${commit_message}`);
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
