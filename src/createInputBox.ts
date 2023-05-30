import * as vscode from 'vscode';

const TOTAL_STEPS = 6;

export default function createInputBox({
	title,
	placeholder,
	prompt,
	step,
	value,
}: {
	title: string;
	placeholder: string;
	prompt: string;
	step: number;
	value?: string;
	validate?: (value: string) => string | undefined;
}): Promise<string> {
	return new Promise((resolve, reject) => {
		const inputBox = vscode.window.createInputBox();
		inputBox.title = title;
		inputBox.placeholder = placeholder;
		inputBox.prompt = prompt;
		if (value) {
			inputBox.value = value;
		}

		inputBox.step = step;
		inputBox.totalSteps = TOTAL_STEPS;
		inputBox.ignoreFocusOut = true;

		inputBox.buttons = [
			...(step > 1 ? [vscode.QuickInputButtons.Back] : [])
		];

		inputBox.onDidAccept(function () {
			try {
				resolve(inputBox.value);
				inputBox.dispose();
			} catch (e) {
				console.error(`step.${inputBox.step}`, e);
				reject(e);
			}
		});

		inputBox.onDidTriggerButton(function (e) {
			if (e === vscode.QuickInputButtons.Back) {
				reject('');
			}
		});

		inputBox.show();
	});
}