import createInputBox from "../../createInputBox";

export default async function newScopeInputBox(existingValue: string): Promise<string> {
    return await createInputBox({
        title: 'New Scope',
        placeholder: 'Enter a name for your new scope.',
        prompt: 'Enter new scope name.',
        step: 2,
        value: existingValue
    });
}