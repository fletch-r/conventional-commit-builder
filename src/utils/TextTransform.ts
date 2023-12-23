interface Indexable {
    [key: string]: any
}

export class TextTransform {
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
        const existingFunctions = Object.getOwnPropertyNames(TextTransform.prototype).filter((v) => v !== 'constructor' && v !== 'compute');

        const usedFunctions = existingFunctions.filter((v) => commit_message_template.includes(v));

        const transform_steps = new Map();

        usedFunctions.forEach((func) => transform_steps.set(commit_message_template.split(`${func}(`)[1].split(')')[0], func));

        usedFunctions.forEach((func) => {
            let copy = [...commit_message_template];
            commit_message_template.replace(`${func}(`, '');
            const p = commit_message_template.indexOf(`${func}(`) + (func.length + 1);
            const x = commit_message_template.indexOf(')', p);
            copy[x] = '';
            commit_message_template = copy.join('').replace(`${func}(`, '');
        });

        return {
            transform_steps,
            commit_message_template
        };
    }
}