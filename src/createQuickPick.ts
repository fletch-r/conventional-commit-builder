import * as vscode from 'vscode';

const TOTAL_STEPS = 6;

export default function createQuickPick(
	title: string,
	placeholder: string,
	items: { label: string, detail?: string, description?: string }[],
	step: number,
): Promise<string> {
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
			if (selection[0]) {
				resolve(selection[0].label);
			}
		});
		quickPick.onDidTriggerButton((e) => {
			if (e === vscode.QuickInputButtons.Back) {
				quickPick.step = step - 1;
				reject(quickPick.value);
			}
			resolve(quickPick.value);
		});
	
		quickPick.show();
	});
}