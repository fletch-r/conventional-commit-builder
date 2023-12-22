import * as vscode from 'vscode';

import { TOTAL_STEPS } from './constants';

type InputTypes = {
	title: string;
	placeholder: string;
	prompt: string;
	step: number;
	value?: string;
};

export default function createInputBox({
	title,
	placeholder,
	prompt,
	step,
	value,
}: InputTypes): Promise<string> {
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

		inputBox.onDidTriggerButton(function (e: vscode.QuickInputButton) {
			if (e === vscode.QuickInputButtons.Back) {
				reject('');
			}
		});

		inputBox.show();
	});
}