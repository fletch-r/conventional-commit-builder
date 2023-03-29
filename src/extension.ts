// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const TOTAL_STEPS = 6;

const confirmButton: vscode.QuickInputButton = {
	iconPath: new vscode.ThemeIcon('arrow-right'),
	tooltip: 'confirm',
};

const backButton: vscode.QuickInputButton = {
	iconPath: new vscode.ThemeIcon('arrow-left'),
	tooltip: 'previous',
};

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
	
		// quickPick.buttons = [
		//     {
		//         iconPath: new vscode.ThemeIcon("arrow-left"),
		//         tooltip: "Previous",
		//     }
		// ];
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
			if (e === confirmButton) {
				resolve(quickPick.value);
			}
	  
			if (e === vscode.QuickInputButtons.Back) {
				console.log({
					button: e,
					value: quickPick.value,
					activeItems: quickPick.activeItems,
				});
			resolve({
				button: e,
				value: quickPick.value,
				activeItems: quickPick.activeItems,
			  });
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
			{ label: 'fix', detail: 'Bug fix' },
			{ label: 'feat', detail: "Add a new feature" },
			{ label: 'build' },
			{ label: 'style' },
			{ label: 'chore' },
			{ label: 'refactor' },
			{ label: 'ci' },
			{ label: 'test', detail: "Add or update tests" },
			{ label: 'docs' },
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

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('simple-commit.commit', async () => {
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
								scope = [newScope, ...workspaceScopes];
							} else {
								scope = newScope;
							}
						});
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
