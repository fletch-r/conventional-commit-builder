import * as vscode from 'vscode';

const TOTAL_STEPS = 6;

export type QuickPickItemsType = {
	label: string;
	detail?: string;
	description?: string;
};

export default function createQuickPick(
	title: string,
	placeholder: string,
	items: { label: string, detail?: string, description?: string }[],
	step: number,
	canSelectMany: boolean,
	existing_value?: string,
): Promise<{ label: string, description: string, detail?: string, }[]> {
	return new Promise((resolve, reject) => {
		let current = 0;

		const quickPick = vscode.window.createQuickPick();
		quickPick.title = title;
		quickPick.placeholder = placeholder;
		if (existing_value) {
			quickPick.value = existing_value;
		}

		quickPick.items = items;
		quickPick.activeItems = [quickPick.items[current]];

		quickPick.step = step;
		quickPick.totalSteps = TOTAL_STEPS;
		quickPick.ignoreFocusOut = true;
		quickPick.canSelectMany = canSelectMany;
		quickPick.matchOnDetail = true;

		quickPick.buttons = [
			...(step > 1 ? [vscode.QuickInputButtons.Back] : [])
		];

		let selected: any = [];

		quickPick.onDidChangeSelection((selection) => {
			selected = selection;
		});
		quickPick.onDidTriggerButton((e) => {
			if (e === vscode.QuickInputButtons.Back) {
				reject('');
			}
		});
		quickPick.onDidAccept(() => {
			resolve(selected);
		});


		quickPick.show();
	});
}