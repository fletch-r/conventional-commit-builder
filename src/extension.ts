import * as vscode from 'vscode';
import { DEFAULT_COMMIT_TEMPLATE, DEFAULT_ISSUE_REGEX, TEMPLATE_REGEX } from './constants';
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

		// === USERS ENTERED VALUES ===
		const {
			type,
			scope,
			emoji,
			ticket_number,
			description,
			body,
			footer
		} = await buildCommitMessage(step_order, workspace_config, repo);

		// === BUILDING COMMIT MESSAGE ===
		const commit_message = chosen_commit_template
			.replace('<type>', type)
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
