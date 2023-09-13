/* === REGEX === */

// Gets the remaining characters after the last /
export const FILE_NAME_REGEX = /[^\/]+$/;

// Used to replace the steps with what the user entered.
export const TEMPLATE_REGEX = /(<)((type|scope|emoji|reference|description|body|footer)(>))/g;

/* === STRINGS === */

// You need to escape \ if you want to keep them in the regex output.
export const DEFAULT_REFERENCE_REGEX = "(?!.*\/)([^\\d]*)(\\d+)";

// Default commit message structure.
// This will affect in which order the user sees the extension prompts.
export const DEFAULT_COMMIT_TEMPLATE = "<type><scope>: <emoji> <reference> - <description>\n\n<body>\n\n<footer>";

// Default new line characters that will be replaced with a new line in the commit message.
export const DEFAULT_NEWLINE = "\\n";

/* === NUMBERS === */

// Total number of prompts.
export const TOTAL_STEPS = 6;