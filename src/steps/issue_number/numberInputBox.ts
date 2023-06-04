import createInputBox from "../../createInputBox";

export default async function numberInputBox(
    issue_number: string,
    existingNumber: string
): Promise<string> {
    const value = existingNumber.length > 0 ? issue_number : existingNumber;
    return await createInputBox({
        title: 'Issue/Ticket Number',
        placeholder: 'Enter your issue or ticket number',
        prompt: 'Enter issue or ticket number',
        step: 4,
        value
    });
}