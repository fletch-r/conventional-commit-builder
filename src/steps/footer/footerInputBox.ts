import createInputBox from "../../createInputBox";

export default async function footerInputBox(existing_footer: string): Promise<string> {
    return await createInputBox({
        title: 'Footer',
        placeholder: 'Enter remaining information such as Breaking Changes details about this commit.',
        prompt: 'Enter a footer.',
        step: 6,
        value: existing_footer
    });
}