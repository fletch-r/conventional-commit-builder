import * as vscode from 'vscode';
import typeQuickPick from './steps/type/typeQuickPick';
import emojiQuickPick from './steps/emoji/emojiQuickPick';
import numberInputBox from './steps/issue_number/numberInputBox';
import descriptionInputBox from './steps/description/descriptionInputBox';
import bodyInputBox from './steps/body/bodyInputBox';
import footerInputBox from './steps/footer/footerInputBox';
import chosenScope from './steps/scope/chosenScope';
import { DEFAULT_COMMIT_TEMPLATE, DEFAULT_ISSUE_REGEX, TEMPLATE_REGEX } from './constants';
import initiateGit from './initiateGit';
import stageFiles from './steps/stage_files/stageFiles';
import getIssueNumber from './getIssueNumber';

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
		// === INITIATE CONFIG ===
		const workspace_config = vscode.workspace.getConfiguration('simpleCommit');

		// === WORKSPACE EXTENSION VALUES ===
		const workspace_issue_regex = workspace_config.get('issueRegex') as string;
		const workspace_commit_template = workspace_config.get('template') as string;

		// === INITIATE GIT ===
		const repo = initiateGit();
		if (!repo) {
			vscode.window.showInformationMessage('No Git repository found');
			return;
		}

		// === CHECKS FOR STAGED CHANGES ===
		const staged_files = repo.state.indexChanges;
		if (staged_files.length === 0) { // If no changes/files have been staged.
			const source_control_changes = repo.state.workingTreeChanges;
			const file_paths = await stageFiles(source_control_changes);
			await repo.add(file_paths);
		}

		// === STEP ORDER ===
		const chosen_commit_template = workspace_commit_template ? workspace_commit_template : DEFAULT_COMMIT_TEMPLATE;
		const steps = [...chosen_commit_template.matchAll(TEMPLATE_REGEX)];
		const step_order = steps.map((arr) => arr[0]);

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
					await typeQuickPick(type)
						.then((value: string) => {
							type = value;
							current_step++;
						});
					break;
				case '<scope>':
					await chosenScope(workspace_config, scope)
						.then((value: string) => {
							scope = value;
							current_step++;
						})
						.catch(() => current_step--);
					break;
				case '<emoji>':
					await emojiQuickPick(emoji)
						.then((value) => {
							emoji = value;
							current_step++;
						})
						.catch(() => current_step--);
					break;
				case '<number>':
					const head = repo.state.HEAD;
					const issue_number = getIssueNumber(workspace_issue_regex, head);
					await numberInputBox(issue_number, ticket_number)
						.then((value: string) => {
							ticket_number = value;
							current_step++;
						})
						.catch(() => current_step--);
					break;
				case '<description>':
					await descriptionInputBox(description)
						.then((value: string) => {
							description = value;
							current_step++;
						})
						.catch(() => current_step--);
					break;
				case '<body>':
					await bodyInputBox(body)
						.then((value: string) => {
							body = value;
							current_step++;
						})
						.catch(() => current_step--);
					break;
				case '<footer>':
					await footerInputBox(footer)
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
		const commit_message = chosen_commit_template.replace('<type>', type)
			.replace('<scope>', scope ? `(${scope})` : '')
			.replace('<emoji>', emoji)
			.replace('<number>', ticket_number)
			.replace('<description>', description)
			.replace('<body>', body)
			.replace('<footer>', footer);

		console.log('Commit Message:', `\n\n${commit_message}`);

		// === COMMIT ===
		repo.commit(commit_message)
			.then(() => vscode.window.showInformationMessage(commit_message))
			.catch((err: RepoCommitError) => {
				console.error(err);
				vscode.window.showInformationMessage(`${err.message}\n\n${err.stdout}`);
			});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
