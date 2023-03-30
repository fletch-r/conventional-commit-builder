// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const TOTAL_STEPS = 6;

function createQuickPick(
	title: string,
	placeholder: string,
	items: { label: string, detail?: string, description?: string }[],
	step: number,
) {
	return new Promise((resolve, reject) => {
		let current = 0;
	
		const quickPick = vscode.window.createQuickPick();
		quickPick.title = title;
		quickPick.placeholder = placeholder;
	
		quickPick.items = items;
		quickPick.activeItems = [quickPick.items[current]];
	
		quickPick.step = step;
		quickPick.totalSteps = TOTAL_STEPS;
		quickPick.ignoreFocusOut;
	
		quickPick.buttons = [
			...(step > 1 ? [vscode.QuickInputButtons.Back] : [])
		];
	
		quickPick.onDidChangeSelection((selection) => {
			console.log(selection);
			if (selection[0]) {
				resolve(selection[0].label);
			}
		});
		quickPick.onDidTriggerButton((e) => {
			if (e === vscode.QuickInputButtons.Back) {
				quickPick.step = step - 1;
				resolve(quickPick.value);
			}
			resolve(quickPick.value);
		});
	
		quickPick.show();
	});
}

async function typeQuickPick() {
	return await createQuickPick(
		'Type',
		'Select a type for your commit.',
		[
			{ label: 'feat', description: 'Feature', detail: "A new feature" },
			{ label: 'fix', description: 'Bug Fix', detail: 'A bug fix' },
			{ label: 'style', description: 'Styling', detail: 'Code styling. (formatting, missing semicolons, etc)' },
			{ label: 'chore', description: 'Chore', detail: 'Changes that do not modify the code' },
			{ label: 'docs', description: 'Documentation', detail: 'Documentation changes' },
			{ label: 'test', description: 'Test', detail: "Create or update tests" },
			{ label: 'refactor', description: 'Code Refactor', detail: 'Code changes that do not change functionality' },
			{ label: 'build', description: 'Build', detail: 'Changes that affect the build system or dependencies. e.g. NPM' },
		],
		1,
	);
}
async function scopeQuickPick(workspaceScopes: string[]) {
	const scopeOptions = [
		{ label: 'None', description: 'No scope.' },
	];

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

	return await createQuickPick(
		'Scope',
		'Select the scope for your commit.',
		scopeOptions,
		2,
	);
}

function createStatusBarItem(context: vscode.ExtensionContext) {
    // register a command that is invoked when the status bar
    // item is clicked.
    const myCommandId = 'simple-commit.commit';
    // create a new status bar item that we can now manage
	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    item.command = myCommandId;

    context.subscriptions.push(item);

	item.text = '$(git-commit) Run Simple Commit';
	item.tooltip = 'Run Run Simple Commit';
	item.show();
}

export function activate(context: vscode.ExtensionContext) {
	createStatusBarItem(context);
  	const disposable = vscode.commands.registerCommand('simple-commit.commit', async () => {
		let type = null;
		let scope = null;
		let ticketNumber = null;
		let description = null;
		let body = null;
		let footer = null;
		
		type = await typeQuickPick();

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
					await workspaceConfig.update('scopes', [newScope], vscode.ConfigurationTarget.Workspace)
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
        ticketNumber = await vscode.window.showInputBox({
			prompt: 'Enter issue or ticket number',
			title: 'Issue/Ticket Number',
			placeHolder: 'Enter you issue or ticket number.',
		});
        description = await vscode.window.showInputBox({
			prompt: 'Enter a short description of this commit.',
			title: 'Description',
			placeHolder: 'Enter a short description of this commit.',
		});
        body = await vscode.window.showInputBox({
			prompt: 'Enter a detailed description of this commit.',
			title: 'Body',
			placeHolder: 'Enter a detailed description of this commit.',
		});
        footer = await vscode.window.showInputBox({
			prompt: 'Enter a footer',
			title: 'Footer',
			placeHolder: 'Enter remaining information such as Breaking Changes details about this commit.',
		});

		const commitArray = [];

		const t = type;
		const s = scope ? `(${scope})` : '';
		const tn = ticketNumber ? `${ticketNumber} - ` : '';
		const d = description;
		const first = `${t}${s}: ${tn}${d}`;
		commitArray.push(first);

		if (body) {
			commitArray.push(body);
		}

		if (footer) {
			commitArray.push(footer);
		}

		const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
		const repo = gitExtension.getAPI(1).repositories[0];

		repo.commit(commitArray.join('\n\n'));

		vscode.window.showInformationMessage(`Commit made.\n\n${commitArray.join('\n\n')}`);
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
