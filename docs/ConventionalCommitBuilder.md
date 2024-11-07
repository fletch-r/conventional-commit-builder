# Conventional Commit Builder

Conventional Commit Builder is a Visual Studio Code extension designed to help developers write and format commit messages following the Conventional Commits standard. This extension provides an intuitive interface for crafting commit messages, ensuring consistency and clarity in your version control history.

## Features

- **User-Friendly Interface**: Provides input and selection boxes for writing commit messages.
- **File Staging**: Prompts users to select files to stage if no changes are staged.
- **Issue Detection**: Automatically detects and suggests issue numbers from the current branch.
- **Commit Message Formats**: Supports common formats, including the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- **Gitmoji Support**: Allows adding emojis to commit messages for quick identification.
- **Configuration File**: Customize settings with a `.commitbuilderrc.json` file for project-specific configurations.

## Usage

1. **Start Conventional Commit Builder**:
   - Click the Conventional Commit Builder icon in the Source Control tab.
   - Open the command palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on Mac), type "Conventional Commit Builder" and select the command.

2. **Choose Changes to Stage**:
   - If no changes are staged, select files to stage for the commit.

3. **Commit Message Steps**:
   - **Type**: Select the type of commit (e.g., `fix`, `feat`).
   - **Scope**: Choose or enter a scope for the commit.
   - **Emoji**: Select an emoji to represent the commit type.
   - **Reference**: Enter or confirm the issue/ticket number.
   - **Description**: Provide a short description of the changes.
   - **Body**: Add a detailed description of the changes.
   - **Footer**: Include any additional information, such as breaking changes.

## Configuration

The following properties can be configured in the `settings.json` file of your VSCode workspace or user settings:

- **conventionalCommitBuilder.scopes**: Scopes that will appear as options in the scopes prompt. Default is an empty array.

- **conventionalCommitBuilder.referenceRegex**: RegEx used to get the reference number from branch name. Default is `(?!.*\/)([^\\d]*)(\\d+)`.

- **conventionalCommitBuilder.template**: The format of your commit message. Default is `<type><scope>: <emoji> <reference> - <description>\n\n<body>\n\n<footer>`.

- **conventionalCommitBuilder.newLine**: The characters entered here will be replaced with a new line within the commit message. Default is `\\n`.

- **conventionalCommitBuilder.emojiFilter**: By what attribute you filter the emoji list. Default is `code`. Options are `code` or `description`.

- **conventionalCommitBuilder.showCommit**: Show your commit message within the Source Control tab. Default is `false`.

- **conventionalCommitBuilder.autoCommit**: Automatically commit your message when finished answering prompts. Default is `true`.

- **conventionalCommitBuilder.disableEmoji**: Disable the emoji prompt and it appearing in commit messages. Default is `false`.

- **conventionalCommitBuilder.disableReference**: Disable the reference prompt and it appearing in commit messages. Default is `false`.

- **conventionalCommitBuilder.disableBody**: Disable the body prompt and it appearing in commit messages. Default is `false`.

- **conventionalCommitBuilder.disableFooter**: Disable the footer prompt and it appearing in commit messages. Default is `false`.

- **conventionalCommitBuilder.customTypes**: Add your own types to the type list. Default is an empty array.

- **conventionalCommitBuilder.commonCommits**: Add your common commit messages to the list. Default is an empty array.

## Development

The extension is built using TypeScript and Webpack. Key files include:

- `src/extension.ts`: Main file implementing the extension's functionality.
- `package.json`: Contains metadata and configuration for the extension.
- `webpack.config.js`: Webpack configuration for bundling the extension.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request to contribute.

## License

Conventional Commit Builder is licensed under the MIT License.

For more details, visit the [GitHub repository](https://github.com/fletch-r/conventional-commit-builder). 