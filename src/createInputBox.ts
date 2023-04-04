import * as vscode from 'vscode';

const TOTAL_STEPS = 6;

export default function createInputBox({
	title,
	placeholder,
    prompt,
	step,
    value,
	validate = () => undefined,
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
		inputBox.ignoreFocusOut;
	
		inputBox.buttons = [
			...(step > 1 ? [vscode.QuickInputButtons.Back] : [])
		];
	
		// inputBox.onDidChangeValue((value) => {
		// 	resolve(value);
		// });
		// inputBox.onDidTriggerButton((e) => {
		// 	if (e === vscode.QuickInputButtons.Back) {
		// 		inputBox.step = step - 1;
		// 		reject(inputBox.value);
		// 	}
		// 	resolve(inputBox.value);
		// });

		inputBox.onDidChangeValue(function () {
			try {
			  inputBox.validationMessage = validate(inputBox.value);
			} catch (e) {
			  console.error(`step.${inputBox.step}`, e);
			  reject(e);
			}
		  });
		  inputBox.onDidAccept(function () {
			try {
			  inputBox.validationMessage = validate(inputBox.value);
			  if (inputBox.validationMessage) {
				return;
			  }
			  resolve(inputBox.value);
			  inputBox.dispose();
			} catch (e) {
			  console.error(`step.${inputBox.step}`, e);
			  reject(e);
			}
		  });
		  inputBox.onDidTriggerButton(function (e) {
			if (e === vscode.QuickInputButtons.Back) {
			  reject({
				button: e,
				value: inputBox.value,
			  });
			}
		  });
	
		inputBox.show();
	});
}