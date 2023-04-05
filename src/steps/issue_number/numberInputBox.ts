import createInputBox from "../../createInputBox";

export default async function numberInputBox(issue_number: string): Promise<string> {
    return await createInputBox({
        title: 'Issue/Ticket Number',
        placeholder: 'Enter you\'r issue or ticket number',
        prompt: 'Enter issue or ticket number',
        step: 4,
        value: issue_number
    });
}