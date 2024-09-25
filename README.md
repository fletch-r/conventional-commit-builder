<img src="assets/CCB.png" alt="Conventional Commit Builder" width="80%">

### Conventional Commit Builder is a VSCode extension that simplifies the commit process for developers. It provides an easy-to-use interface for writing commit messages and includes some useful features to help ensure consistent and meaningful commit messages

## Features

- Provides simple input boxes or selection boxes for writing commit messages.
- If you're committing without having any changes staged. Conventional Commit Builder will first prompt you to select what file(s) you wish to stage.
- Automatically detects and suggests issue numbers from your current branch.
- Supports common commit message formats, such as the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- Supports [Gitmoji](https://github.com/carloscuesta/gitmoji). Add an emoji to your commit message for easy and quick identification of the commit type.
- Configuration file support. Just add the file `.commitbuilderrc.json` to your project to customize the Conventional Commit Builder settings without having to edit your `settings.json` file. Allowing for each project to have their own custom commit message config. Configuration settings and values can be found below.

## Usage

To use Conventional Commit Builder, either:

1. Start Conventional Commit Builder:
    - Click the Conventional Commit Builder icon in the Source Control tab which is usually to the right of the refresh icon.
    - Open the command palette in VSCode (usually with `Ctrl + Shift + P` or `Cmd + Shift + P`), type "Conventional Commit Builder" and select the appropriate command.

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

6. Reference:
    - Conventional Commit Builder should auto-detect your issue/ticket number and pre-populate the input box with the detected number. If your desired number doesn't automatically appear in the prompt please enter your desired issue/ticket number message or modify `conventionalCommitBuilder.referenceRegex` in your `settings.json` with a custom regex that you know detects your issue/ticket number.

7. Description:
    - This should be a short description of what changes you have made and are committing.

8. Body:
    - This should be a longer description message about what changes you have made and this is where you can explain yourself in more detail or provide any other context.

9. Footer:
    - The footer is usually only used for breaking changes and should start with `BREAKING CHANGE:`.

You can also use the enter key to quickly skip through the available suggestions.

## Configuration

Conventional Commit Builder can be configured through VSCode settings. To access the settings, go to "File" > "Preferences" > "Settings" or use the keyboard shortcut `Ctrl + ,` or `Cmd + ,`.

> **Conventional Commit Builder** extension settings start with `conventionalCommitBuilder.`

Here are some of the available configuration options:

|Setting|Type|Default|Description|
|-|-|-|-|
|scopes|`string[]`|`[]`|Saved scopes of previous commits.|
|referenceRegex|`string`|`"(?!.*\/)([^\\d]*)(\\d+)"`|Add a custom regex if the default regex for Conventional Commit Builder doesn't automatically detect your issue number.|
|template|`string`|`"<type><scope>: <emoji> <reference> - <description>\n\n<body>\n\n<footer>"`|The template for your commit message. You can customize your commit template to allow for your preferred commit message structure.|
|newLine|`string`|`"\\n"`|The characters entered here will be replaced with a new line within the commit message. This only applies to the Description, Body and Footer prompts.
|emojiFilter|`"code" \| "description"`|`code`|You can set the `emojiFilter` to either `"code" | "description"` and this will let you filter the list of emojis in the emoji prompt by its code or description depending on what you choose.
|autoCommit|`boolean`|`true`| When set to `true`, your change will be automatically committed after completing the last prompt. When set to `false`, your commit message will appear in the Source Control Management tab for you to review and then manually commit.
|showCommit|`boolean`|`false`| When set to `true`, your commit message will appear in the Source Control Management tab for you to review and then manually commit.
|disableEmoji|`boolean`|`false`| If you do not wish to have the emoji prompt show you can set this to true. The emoji prompt will be skipped and your commit message will not contain an emoji.
|disableReference|`boolean`|`false`| If you do not wish to have the reference prompt show you can set this to true. The reference prompt will be skipped and your commit message will not contain a reference.
|disableBody|`boolean`|`false`| If you do not wish to have the body prompt show you can set this to true. The body prompt will be skipped and your commit message will not contain a body.
|disableFooter|`boolean`|`false`| If you do not wish to have the footer prompt show you can set this to true. The footer prompt will be skipped and your commit message will not contain a footer.
|customTypes|`[{ "label": "", "description": "", "detail": "" }]`|`[]`|Add your own types which will then appear in the types prompt.

- `<type>` - This will be replaced by the value you choose from the Type prompt. Examples, fix, feat, style.
- `<scope>` - This will be replaced by the Scope prompt. Your scope will be incased in ().
- `<emoji>` - This will be replaced by the Emoji prompt.
- `<reference>` - This will be replaced by the Issue/Ticket Number prompt.
- `<description>` - This will get replaced by the Description prompt.
- `<body>` - This will get replaced by the Body prompt.
- `<footer>` - This will get replaced by the Footer prompt.

## Text Transformation Functions

Text Transformation Functions (TTF's) allows Conventional Commit Builder to manipulate the text entered saving you time or making things not previously possible through just the prompt textbox, possible.

|Function|Effect|
|-|-|
|`Uppercase()`|The prompt wrapped in this function will convert all text entered into capital letters.|
|`Lowercase()`|The prompt wrapped in this function will convert all text entered into lowercase letters.|

## Contributing

If you would like to contribute to Conventional Commit Builder, please fork the repository and submit a pull request. Contributions are always welcome!

## License

Conventional Commit Builder is licensed under the MIT License.
