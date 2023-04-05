import * as vscode from 'vscode';
import typeQuickPick from './steps/step_1_type/typeQuickPick';
import scopeQuickPick from './steps/step_2_scope/scopeQuickPick';
import emojiQuickPick from './steps/step_3_emoji/emojiQuickPick';
import numberInputBox from './steps/step_4_ticket_number/numberInputBox';
import descriptionInputBox from './steps/step_5_description/descriptionInputBox';
import bodyInputBox from './steps/step_6_body/bodyInputBox';
import footerInputBox from './steps/step_7_footer/footerInputBox';
import newScopeInputBox from './steps/step_2_scope/newScopeInputBox';
import oneTimeScopeInputBox from './steps/step_2_scope/oneTimeScopeInputBox';

// Example commit
/**
 * fix(api): 🐛 101 - Added correct response type
 * 
 * The response type was set to the wrong type so I corrected it.
 * 
 * BREAKING CHANGE: The API changed it's response type.
 */

type RepoCommitError = {
	message: string;
	stdout: string;
};

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

		// === GET TEMPLATE ===
		const DEFAULT_TEMPLATE =  "<type><scope>: <emoji> <number> - <description>\n\n<body>\n\n<footer>";
		const workspace_template = workspace_config.get('template') as unknown as string;

		// === TYPE ===
		let type = '';
		type = await typeQuickPick();

		// === SCOPE ===
		let scope = null;
		const saved_scopes: string[] = workspace_config.get('scopes') as unknown as string[];

		const scope_type = await scopeQuickPick(saved_scopes);

		if (scope_type === 'New Scope') {
			const new_scope = await newScopeInputBox();
			if (new_scope) {
				await workspace_config.update('scopes', [...saved_scopes, new_scope], vscode.ConfigurationTarget.Workspace);
				if (saved_scopes) {
					scope = [...saved_scopes, new_scope];
				} else {
					scope = new_scope;
				}
			} else {
				scope = '';
			}
		} else if (scope_type === 'One Time Scope') {
			const new_scope = await oneTimeScopeInputBox();
			if (new_scope) {
				scope = new_scope;
			} else {
				scope = '';
			}
		} else if (scope_type === 'None') {
			scope = '';
		} else {
			// User chose an existing saved scope.
			scope = scope_type;
		}

		// === EMOJI ===
		const emoji = await emojiQuickPick();

		// === ISSUE/TICKET NUMBER ===
		const ticket_number = await numberInputBox(issue_number);

		// === DESCRIPTION ===
		const description = await descriptionInputBox();
		
		// === BODY ===
		const body = await bodyInputBox();

		// === FOOTER ===
		const footer = await footerInputBox();

		// === BUILDING COMMIT MESSAGE ===
		let chosen_template = '';
		if (workspace_template) {
			chosen_template = workspace_template;
		} else {
			chosen_template = DEFAULT_TEMPLATE;
		}
		const commit_message = chosen_template.replace('<type>', type)
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
			.catch((err: RepoCommitError) => {
				console.error(err);
				vscode.window.showInformationMessage(`${err.message}\n\n${err.stdout}`);
			});
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
