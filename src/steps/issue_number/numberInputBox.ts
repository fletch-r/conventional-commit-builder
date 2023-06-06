import createInputBox from "../../createInputBox";

export default async function numberInputBox(
    issue_number: string,
    existing_number: string
): Promise<string> {
    const value = existing_number.length > 0 ? existing_number : issue_number;
    return await createInputBox({
        title: 'Issue/Ticket Number',
        placeholder: 'Enter your issue or ticket number',
        prompt: 'Enter issue or ticket number',
        step: 4,
        value
    });
}