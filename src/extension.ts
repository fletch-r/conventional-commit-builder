import * as vscode from 'vscode';
import typeQuickPick from './steps/type/typeQuickPick';
import emojiQuickPick from './steps/emoji/emojiQuickPick';
import numberInputBox from './steps/issue_number/numberInputBox';
import descriptionInputBox from './steps/description/descriptionInputBox';
import bodyInputBox from './steps/body/bodyInputBox';
import footerInputBox from './steps/footer/footerInputBox';
import chosenScope from './steps/scope/chosenScope';

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

		let chosen_template = '';
		if (workspace_template) { // If theres a commit template in the users settings.json file, use that.
			chosen_template = workspace_template;
		} else {
			chosen_template = DEFAULT_TEMPLATE;
		}

		// === STEP ORDER ===
		const TEMPLATE_REGEX = /(<)((type|scope|emoji|number|description|body|footer)(>))/g;
		const matched_values = [...chosen_template.matchAll(TEMPLATE_REGEX)];
		const step_order = matched_values.map((arr) => arr[0]);

		let type = '';
		let scope = '';
		let emoji = '';
		let ticket_number = '';
		let description = '';
		let body = '';
		let footer = '';

		// === RUN PROMPT'S ===
		for (let current_step = 0; current_step < step_order.length;) {
			const step = step_order[current_step];
			switch (step) {
				case '<type>':
					await typeQuickPick()
							.then((value: string) => {
								type = value;
								current_step++;
							});
					break;
				case '<scope>':
					await chosenScope(workspace_config)
							.then((value: string) => {
								scope = value;
								current_step++;
							})
							.catch(() => current_step--);
					break;
				case '<emoji>':
					await emojiQuickPick()
							.then((value) => {
								emoji = value;
								current_step++;
							})
							.catch(() => current_step--);
					break;
				case '<number>':
					await numberInputBox(issue_number)
							.then((value: string) => {
								ticket_number = value;
								current_step++;
							})
							.catch(() => current_step--);
					break;
				case '<description>':
					await descriptionInputBox()
							.then((value: string) => {
								description = value;
								current_step++;
							})
							.catch(() => current_step--);
					break;
				case '<body>':
					await bodyInputBox()
							.then((value: string) => {
								body = value;
								current_step++;
							})
							.catch(() => current_step--);
					break;
				case '<footer>':
					await footerInputBox()
							.then((value: string) => {
								footer = value;
								current_step++;
							})
							.catch(() => current_step--);
					break;
				default:
					break;
			}
		}

		// === BUILDING COMMIT MESSAGE ===
		const commit_message = chosen_template.replace('<type>', type)
												.replace('<scope>', scope ? `(${scope})` : '')
												.replace('<emoji>', emoji)
												.replace('<number>', ticket_number)
												.replace('<description>', description)
												.replace('<body>', body)
												.replace('<footer>', footer);

		console.log('Commit Message:', `\n\n${commit_message}`);

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
