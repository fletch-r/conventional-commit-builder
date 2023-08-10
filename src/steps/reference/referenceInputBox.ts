import createInputBox from "../../createInputBox";

export default async function referenceInputBox(
    reference: string,
    existing_reference: string
): Promise<string> {
    const value = existing_reference.length > 0 ? existing_reference : reference;
    return await createInputBox({
        title: 'Reference Number',
        placeholder: 'Enter your reference number',
        prompt: 'Enter reference number',
        step: 4,
        value
    });
}