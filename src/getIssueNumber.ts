import { DEFAULT_ISSUE_REGEX } from "./constants";

export default function getIssueNumber(workspace_issue_regex: string | undefined, head: { name: string; }): string {
    // Finds the first number and also gets the leading characters before the number but stops before /
    const chosen_issue_regex = workspace_issue_regex ? workspace_issue_regex : DEFAULT_ISSUE_REGEX;

    const repo_name = head.name;
    const issue_regex = new RegExp(chosen_issue_regex);
    const possible_issue_number = repo_name.match(issue_regex);

    if (possible_issue_number) {
        return possible_issue_number[0];
    }
    return '';
}