<img src="assets/SimpleCommitBanner.png" alt="simple commit" width="75%">

### Simple Commit is a VSCode extension that simplifies the commit process for developers. It provides an easy-to-use interface for writing commit messages and includes some useful features to help ensure consistent and meaningful commit messages.

## Features

- Provides simple input boxes or selection boxes for writing commit messages.
- If you're committing without having any changes staged. Simple Commit will first prompt you to select what file(s) you wish to stage.
- Automatically detects and suggests issue numbers from your current branch.
- Supports common commit message formats, such as the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- Supports [Gitmoji](https://github.com/carloscuesta/gitmoji). Add an emoji to your commit message for easy and quick identification of the commit type.

## Usage

To use Simple Commit, either:
1. Start Simple Commit:
    - Click the Simple Commit icon in the Source Control tab which is usually to the right of the refresh icon.
    - Open the command palette in VSCode (usually with `Ctrl + Shift + P` or `Cmd + Shift + P`), type "Simple Commit" and select the appropriate command.

    If you have a custom template in your settings the following steps may be out of order.

2. Choose Changes to Stage:
    - If you haven't staged any commits the first prompt will be a multi-select prompt asking you to select one or more files to stage for this commit. If you have already staged changes then this step will be skipped.

3. Type:
    - Choose the type of commit you're making. For example, `fix` which would be selected for bug fix type commits.

4. Scope:
    - You will be prompted with 3 options.
        - *None*: Scope will be missed out from the commit message.
        - *Saved Scopes*: You will see a list of previously used scopes that have been saved in your `settings.json` which you can choose from.
        - *One Time Scope*: You will be prompted to enter a scope which will appear in your commit message but not be saved to your saved scopes in your `settings.json`.

5. Emoji:
    - Choose an emoji to appear in your commit message. The options will appear with the emoji and a description of what the emoji represents. This allows for quick and easy identification of what the particular commit message was about without having to read the message for context.

6. Number:
    - Simple Commit should auto-detect your issue/ticket number and pre-populate the input box with the detected number. If your desired number doesn't automatically appear in the prompt please enter your desired issue/ticket number message or modify `simpleCommit.issueRegex` in your `settings.json` with a custom regex that you know detects your issue/ticket number.

7. Description:
    - This should be a short description of what changes you have made and are committing.

8. Body:
    - This should be a longer description message about what changes you have made and this is where you can explain yourself in more detail or provide any other context.

9. Footer:
    - The footer is usually only used for breaking changes and should start with `BREAKING CHANGE:`.

You can also use the enter key to quickly skip through the available suggestions.

## Configuration

Simple Commit can be configured through VSCode settings. To access the settings, go to "File" > "Preferences" > "Settings" or use the keyboard shortcut `Ctrl + ,` or `Cmd + ,`.

> **Simple Commit** extension settings start with `simpleCommit.`

Here are some of the available configuration options:

|Setting|Default|Description|
|-|-|-|
|scopes|`[]`|Saved scopes of previous commits.|
|issueRegex|`"(?!.*\/)([^\\d]*)(\\d+)"`|Add a custom regex if the default regex for Simple Commit doesn't automatically detect your issue number.|
|template|`"<type><scope>: <emoji> <number> - <description>\n\n<body>\n\n<footer>"`|The template for your commit message. You can customize your commit template to allow for your preferred commit message structure.|
|disableEmoji| `false` | If you do not wish to have the emoji prompt show you can set this to true. The emoji prompt will be skipped and your commit message will not contain an emoji.

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