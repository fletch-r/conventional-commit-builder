// Gets the remaining characters after the last /
export const FILE_NAME_REGEX = /[^\/]+$/;

// You need to escape \ if you want to keep them in the regex output.
export const DEFAULT_ISSUE_REGEX = "(?!.*\/)([^\\d]*)(\\d+)";

// Used to replace the steps with what the user entered.
export const TEMPLATE_REGEX = /(<)((type|scope|emoji|number|description|body|footer)(>))/g;

// Default commit message structure.
// This will affect in which order the user sees the extension prompts.
export const DEFAULT_COMMIT_TEMPLATE = "<type><scope>: <emoji> <number> - <description>\n\n<body>\n\n<footer>";

// Total number of prompts.
export const TOTAL_STEPS = 6;