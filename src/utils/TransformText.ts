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
        const steps_to_transform = new Map<PromptToTransform, TransformFunctionName>();
        let cleaned_commit_template = commit_message_template;

        TransformTextMethods.forEach((func) => {
            const funcPattern = new RegExp(`${func}\\(([^)]+)\\)`, 'g');
            let match;

            while ((match = funcPattern.exec(commit_message_template)) !== null) {
                const [fullMatch, prompt] = match;
                steps_to_transform.set(prompt, func);
                cleaned_commit_template = cleaned_commit_template.replace(fullMatch, prompt);
            }
        });

        return {
            steps_to_transform,
            cleaned_commit_template
        };
    }
}