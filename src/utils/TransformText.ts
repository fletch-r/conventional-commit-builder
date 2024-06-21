import { replaceAt } from "./replaceAt";

interface Indexable {
    [key: string]: any
}

export type OnlyClassMethods<T> = {
    [K in keyof T]: 
    T[K] extends (...args: any[]) => any ?
    K : never
}[keyof T];

type TransformTextMethods = OnlyClassMethods<TransformText>;

type PromptToTransform = string;
type TransformFunctionName = string;

export class TransformText {
    constructor() {}

    Uppercase(text: string) {
        return text.toUpperCase();
    }

    Lowercase(text: string) {
        return text.toLowerCase();
    }

    compute(text: string, function_name: string) {
        const transformed_text = (this as Indexable)[function_name](text);
        return transformed_text;
    }

    steps(commit_message_template: string) {
        const TransformTextMethods = Object.getOwnPropertyNames(TransformText.prototype) as TransformTextMethods[];
        const usedFunctions = TransformTextMethods.filter((method: TransformTextMethods) => commit_message_template.includes(method));

        const steps_to_transform = new Map<PromptToTransform, TransformFunctionName>();

        let cleaned_commit_template = commit_message_template;

        if (usedFunctions.length > 0) {
            usedFunctions.forEach((func) => {
                const prompt = commit_message_template.split(`${func}(`)[1].split(')')[0];
                steps_to_transform.set(prompt, func);
    
                // Remove functions that wrap prompts from commit message template
                commit_message_template.replace(`${func}(`, '');
                const startOfPromptWord = commit_message_template.indexOf(`${func}(`) + (func.length + 1);
                const endOfPromptWord = commit_message_template.indexOf(')', startOfPromptWord);
                const newMessage = replaceAt(commit_message_template, endOfPromptWord, '');
                cleaned_commit_template = newMessage.replace(`${func}(`, '');
            });
        }

        return {
            steps_to_transform,
            cleaned_commit_template
        };
    }
}