import { DEFAULT_REFERENCE_REGEX } from "./constants";

export default function getReference(
    workspace_reference_regex: string | undefined,
    head: { name: string; }
): string {
    // Finds the first number and also gets the leading characters before the number but stops before /
    const chosen_reference_regex = workspace_reference_regex ? workspace_reference_regex : DEFAULT_REFERENCE_REGEX;

    const repo_name = head.name;
    const reference_regex = new RegExp(chosen_reference_regex);
    const possible_reference_number = repo_name.match(reference_regex);

    if (possible_reference_number) {
        return possible_reference_number[0];
    }
    return '';
}