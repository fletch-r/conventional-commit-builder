import createInputBox from "../../createInputBox";

export default async function footerInputBox(): Promise<string> {
    return await createInputBox({
        title: 'Footer',
        placeholder: 'Enter remaining information such as Breaking Changes details about this commit.',
        prompt: 'Enter a footer.',
        step: 6
    });
}