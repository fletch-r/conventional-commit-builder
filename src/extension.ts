import * as vscode from 'vscode';
import { DEFAULT_COMMIT_TEMPLATE, DEFAULT_NEWLINE, TEMPLATE_REGEX } from './constants';
import initiateGit from './initiateGit';
import stageFiles from './steps/stage_files/stageFiles';
import buildCommitMessage from './buildCommitMessage';

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
		const workspace_commit_template = workspace_config.get<string>('template');

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

		// === USERS ENTERED VALUES ===
		const {
			type,
			scope,
			emoji,
			reference,
			description,
			body,
			footer
		} = await buildCommitMessage(step_order, workspace_config, repo);

		// Replaces any \n (by default) the user enters with escape character so new line is applied in the commit message.
		const workspace_new_line = workspace_config.get<string>('newLine');
		const chosen_new_line = workspace_new_line ? workspace_new_line : DEFAULT_NEWLINE;

		const newLineRegex = new RegExp(chosen_new_line, 'gi');

		const descriptionWithNewlines = description.replace(newLineRegex, '\n');
		const bodyWithNewlines = body.replace(newLineRegex, '\n');
		const footerWithNewlines = footer.replace(newLineRegex, '\n');

		// === BUILDING COMMIT MESSAGE ===
		const commit_message = chosen_commit_template
			.replace('<type>', type)
			.replace('<scope>', scope ? `(${scope})` : '')
			.replace('<emoji>', emoji)
			.replace('<reference>', reference)
			.replace('<description>', descriptionWithNewlines)
			.replace('<body>', bodyWithNewlines)
			.replace('<footer>', footerWithNewlines)
			.trim();

		console.log('Commit Message:', `\n\n${commit_message}`);

		// === SHOW COMMIT MESSAGE IN SCM ===
		const workspace_auto_commit = workspace_config.get<boolean>('autoCommit');
		const workspace_show_commit = workspace_config.get<boolean>('showCommit');

		// if autoCommit is true then the commit message in the SCM will disappear straight away so no point doing it.
		if (workspace_show_commit && !workspace_auto_commit) {
			await vscode.commands.executeCommand('workbench.view.scm');
			repo.inputBox.value = commit_message;
		}

		// === COMMIT ===
		if (workspace_auto_commit) {
			repo.commit(commit_message)
				.then(() => vscode.window.showInformationMessage(commit_message))
				.catch((err: RepoCommitError) => {
					console.error(err);
					vscode.window.showInformationMessage(`${err.message}\n\n${err.stdout}`);
				});
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
