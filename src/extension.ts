import * as vscode from 'vscode';
import typeQuickPick from './steps/type/typeQuickPick';
import emojiQuickPick from './steps/emoji/emojiQuickPick';
import numberInputBox from './steps/issue_number/numberInputBox';
import descriptionInputBox from './steps/description/descriptionInputBox';
import bodyInputBox from './steps/body/bodyInputBox';
import footerInputBox from './steps/footer/footerInputBox';
import chosenScope from './steps/scope/chosenScope';
import createQuickPick, { QuickPickItemsType } from './createQuickPick';

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

type ChangesType = {
	originalUri: {
		_formatted: null
		_fsPath: null
		authority: string
		fragment: string
		fsPath: string
		path: string
		query: string
		scheme: string
	},
	renameUri: {
		_formatted: null
		_fsPath: null
		authority: string
		fragment: string
		fsPath: string
		path: string
		query: string
		scheme: string
	},
	status: 5
	uri: {
		_formatted: null
		_fsPath: null
		authority: string
		fragment: string
		fsPath: string
		path: string
		query: string
		scheme: string
	}
};

// Gets the remaining characters after the last /
const FILE_NAME_REGEX = /[^\/]+$/;

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('simple-commit.commit', async () => {
		// === INITIATE CONFIG ===
		const workspace_config = vscode.workspace.getConfiguration('simpleCommit');

		// === INITIATE GIT ===
		const git_extension = vscode.extensions.getExtension('vscode.git')?.exports;
		const repo = git_extension.getAPI(1).repositories[0];

		if (!repo) {
			vscode.window.showInformationMessage('No Git repository found');
			return;
		}

		// === CHECKS FOR STAGED CHANGES ===
		const staged_files = repo.state.indexChanges;

		// If no changes/files have been staged.
		if (staged_files.length === 0) {
			const changes = await repo.diffWithHEAD();

			let changed_files: QuickPickItemsType[] = [];

			changes.forEach((obj: ChangesType) => {
				const file_name_regex = obj.uri.path.match(FILE_NAME_REGEX);
				if (file_name_regex) {
					const file_name = file_name_regex[0];
					changed_files.push({ label: file_name, description: obj.uri.path });
				}
			});

			const chosen_files = await createQuickPick(
				'Changes to Stage', // title
				'Please select one or more changes to stage before continuing.', // placeholder
				changed_files, // items
				0, // step
				true, // canSelectMany
			);
			const file_paths = chosen_files.map((obj) => obj.description);
			await repo.add(file_paths);
		}

		// === GET ISSUE REGEX ===
		// Finds the first number and also gets the leading characters before the number but stops before /
		const DEFAULT_ISSUE_REGEX = "(?!.*\/)([^\\d]*)(\\d+)"; // You need to escape \ if you want to keep them in the regex output.
		const workspace_issue_regex = workspace_config.get('issueRegex') as unknown as string;

		let chosen_issue_regex = '';
		if (workspace_issue_regex) { // If theres a commit template in the users settings.json file, use that.
			chosen_issue_regex = workspace_issue_regex;
		} else {
			chosen_issue_regex = DEFAULT_ISSUE_REGEX;
		}

		// === AUTO-DETECT ISSUE NUMBER ===
		const head = repo.state.HEAD;
		const repo_name: string = head.name;
		const issue_regex = new RegExp(chosen_issue_regex);
		const possible_issue_number = repo_name.match(issue_regex);

		let issue_number = '';
		if (possible_issue_number) {
			issue_number = possible_issue_number[0];
		}

		// === GET TEMPLATE ===
		const DEFAULT_COMMIT_TEMPLATE = "<type><scope>: <emoji> <number> - <description>\n\n<body>\n\n<footer>";
		const workspace_commit_template = workspace_config.get('template') as unknown as string;

		let chosen_commit_template = '';
		if (workspace_commit_template) { // If theres a commit template in the users settings.json file, use that.
			chosen_commit_template = workspace_commit_template;
		} else {
			chosen_commit_template = DEFAULT_COMMIT_TEMPLATE;
		}

		// === STEP ORDER ===
		const TEMPLATE_REGEX = /(<)((type|scope|emoji|number|description|body|footer)(>))/g;
		const matched_values = [...chosen_commit_template.matchAll(TEMPLATE_REGEX)];
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
export function deactivate() { }
