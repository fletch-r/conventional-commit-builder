import createInputBox from "../../createInputBox";

export default async function oneTimeScopeInputBox(): Promise<string> {
    return await createInputBox({
        title: 'One Time Scope',
        placeholder: 'Enter the scope name.',
        prompt: 'Enter scope name.',
        step: 2,
    });
}