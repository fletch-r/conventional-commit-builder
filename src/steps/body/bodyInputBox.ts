import createInputBox from "../../createInputBox";

export default async function bodyInputBox(existingBody: string): Promise<string> {
    return await createInputBox({
        title: 'Body',
        placeholder: 'Enter a detailed description of this commit.',
        prompt: 'Enter a detailed description of this commit.',
        step: 6,
        value: existingBody
    });
}