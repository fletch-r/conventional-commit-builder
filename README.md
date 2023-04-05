<img align="left" width="100" height="100" top="100" src="assets/icon.png" alt="simple commit">

# Simple Commit - VSCode Extension

<br>

### Simple Commit is a VSCode extension that simplifies the commit process for developers. It provides an easy-to-use interface for writing commit messages and includes some useful features to help ensure consistent and meaningful commit messages.

## Features

- Provides a simple input box for writing commit messages.
- Automatically detects and suggests issue numbers from your project management tool (e.g. Jira).
- Supports common commit message formats, such as the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- Allows for easy integration with Git hooks and other CI/CD tools.

## Usage

To use Simple Commit, either: 
1. Open the command palette in VSCode (usually with `Ctrl + Shift + P` or `Cmd + Shift + P`), type "Simple Commit" and select the appropriate command. 
2. Click the Simple Commit icon in the Source Control tab which is usually to the right of the refresh icon.

This start a number of prompts which will help you write and format your commit message.

If your project management tool is supported (e.g. Jira), Simple Commit will automatically detect the issue number when you reach the Issue/Ticket Number prompt and pre-populate the prompt with the detected issue/ticket number.

You can also use the enter key to quickly cycle through the available suggestions.

## Configuration

Simple Commit can be configured through VSCode settings. To access the settings, go to "File" > "Preferences" > "Settings" or use the keyboard shortcut `Ctrl + ,` or `Cmd + ,`.

## Here are some of the available configuration options:

`simpleCommit.scopes`: Saved scopes of previous commits.

`simpleCommit.template`: The template for your commit message. You can customize your commit template to allow for your preferred commit message structure.
<br>
The default for this is `"<type><scope>: <emoji> <number> - <description>\n\n<body>\n\n<footer>"`.
- `<type>` - This will be replaced by the value you choose from the Type prompt. Examples, fix, feat, style.
- `<scope>` - This will be replaced by the Scope prompt. Your scope will be incased in ().
- `<emoji>` - This will be replaced by the Emoji prompt.
- `<number>` - This will be replaced by the Issue/Ticket Number prompt.
- `<description>` - This will get replaced by the Description prompt.
- `<body>` - This will get replaced by the Body prompt.
- `<footer>` - This will get replaced by the Footer prompt.

## Contributing

If you would like to contribute to Simple Commit, please fork the repository and submit a pull request. Contributions are always welcome!

## License
Simple Commit is licensed under the MIT License.