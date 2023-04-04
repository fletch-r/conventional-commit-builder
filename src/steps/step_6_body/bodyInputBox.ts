import createInputBox from "../../createInputBox";

export default async function bodyInputBox(): Promise<string> {
    return await createInputBox({
        title: 'Body',
        placeholder: 'Enter a detailed description of this commit.',
        prompt: 'Enter a detailed description of this commit.',
        step: 6
    });
}