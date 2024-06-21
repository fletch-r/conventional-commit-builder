# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2024-06-21

### Fixed

- 2024-06-21 - [[#42](https://github.com/fletch-r/simple-commit/issues/42)] - [068dd71](https://github.com/fletch-r/simple-commit/commit/068dd71eed814a2f6e5364d26dbcdf2f34d440ed) Fixes the issue where if you don't have any transformation functions within your `template`, your commit message will be blank.

## [2.3.0] - 2023-12-25

### Added

- **2023-12-25** - [#41](https://github.com/fletch-r/simple-commit/pull/41) - [`db03e94`](https://github.com/fletch-r/simple-commit/pull/41/commits/db03e941a32521ebb65b8e005142e4ba65b40c5f) User can wrap a prompt step in the `template` setting with a function, for example, `Uppercase()` leading to the text entered into the wrapped prompt to be converted into all capital letters in the commit message.

### Fixed

- **2023-12-22** - [#37](https://github.com/fletch-r/simple-commit/pull/37) - [`8c47066`](https://github.com/fletch-r/simple-commit/pull/37/commits/8c47066c6b430987f18aaccba17f84cc2522460f) Fixed issue where new lines were remaining if body and footer was skipped. Leading to trailing new lines.

- **2023-12-22** - [#39](https://github.com/fletch-r/simple-commit/pull/39) - [`a38f757`](https://github.com/fletch-r/simple-commit/pull/39/commits/a38f75734b592ddd61e44ab56a054c15ba76255f) Fixed issue where only the first `newLine` value was being converted to a new line and didn't convert `newLine`'s that weren't surrounded by spaces.

## [2.2.0] - 2023-12-22

### Added

- **2023-09-14** - [#34](https://github.com/fletch-r/simple-commit/pull/34) - [`1271c25`](https://github.com/fletch-r/simple-commit/pull/34/commits/1271c2595d7a96467d53937b60628894d3a26eec) User can change what they deem to be a new line within the template. This allows for custom new line, by default `\n` in the template will be replaced with a new line. The user can set this in their `settings.json` like so, `"conventionalCommitBuilder.newLine": "CustomNewLine"`, this will replace the any `CustomNewLine` within the message string with a new line.

- **2023-08-20** - [#32](https://github.com/fletch-r/simple-commit/pull/32) - [`c77e5e5`](https://github.com/fletch-r/simple-commit/pull/32/commits/c77e5e50b841eb3862779a74591922b4e3cb8450) When this is set to false, the commit message create won't get automatically committed. This, when paired with `showCommit`, allows the user to double check their message before committing. The user can set this in their `settings.json` like so, `"conventionalCommitBuilder.autoCommit": false`.

- **2023-08-20** - [#31](https://github.com/fletch-r/simple-commit/pull/31) - [`fadfef1`](https://github.com/fletch-r/simple-commit/pull/31/commits/fadfef15f15394315d37e78a44d1d3f305d1cd69) This change shows the commit message created by the prompts in the SCM tab's input box. The user can set this in their `settings.json` like so, `"conventionalCommitBuilder.showCommit": true`.

- **2023-08-13** - [#30](https://github.com/fletch-r/simple-commit/pull/30) - [`9ae6c15`](https://github.com/fletch-r/simple-commit/pull/30/commits/9ae6c15427e00d603829c492e154adce84265135) The user now has the option to hide any prompt. The user can set this in their `settings.json` like so, `"conventionalCommitBuilder.disableDescription": true`, this will stop the Description prompt from showing.

## [2.1.0] - 2023-08-11

### Added

- **2023-08-11** - [#29](https://github.com/fletch-r/simple-commit/pull/29) - [`bcbc35f`](https://github.com/fletch-r/simple-commit/commit/bcbc35f79236124d82b4997424bad0e60c7bfb35) The user can now choose whether they want to filter the list of emojis using the emojis description or code. The user can set this in their `settings.json` like so, `"conventionalCommitBuilder.emojiFilter": "code"`.

## [2.0.0] - 2023-08-10

### Added

- [`bcbc35f`](https://github.com/fletch-r/simple-commit/commit/bcbc35f79236124d82b4997424bad0e60c7bfb35) Issue has been renamed to Reference. This will cause `conventionalCommitBuilder.template` and `conventionalCommitBuilder.issueRegex` to break. For `conventionalCommitBuilder.template`, `<number>` will need renaming to `<reference>`. For `conventionalCommitBuilder.issueRegex`, it will need to be renamed to `conventionalCommitBuilder.referenceRegex`.

## [1.5.0] - 2023-08-09

### Added

- [#23](https://github.com/fletch-r/simple-commit/pull/23) - [`e957a26`](https://github.com/fletch-r/simple-commit/pull/23/commits/e957a26b321bf3925b4e8f996e5c0a6abdd37518) The user can now add `conventionalCommitBuilder.disableEmoji` to their settings file and the emoji prompt will be skipped. This means that the final commit message won't include an emoji.

## [1.4.0](https://github.com/fletch-r/simple-commit/releases/tag/v1.4.0) - 2023-07-19

### Fixed

- [#21](https://github.com/fletch-r/simple-commit/pull/21) - [`fe05388`](https://github.com/fletch-r/simple-commit/pull/17/commits/fe05388538123596facc0a1294b76d7414d56180) Fixed issue [#20](https://github.com/fletch-r/simple-commit/issues/20) where only Modified files were showing in the `Changes to Stage` prompt. Now all file within your Source Control tree will show.

## [1.3.0](https://github.com/fletch-r/simple-commit/releases/tag/v1.3.0) - 2023-06-04

### Added

- [#16](https://github.com/fletch-r/simple-commit/pull/17) - [`c474726`](https://github.com/fletch-r/simple-commit/pull/17/commits/c474726878654dba89da2dc6acba0b00e536aa0b) These changes allow the extension to remember what the user previously entered. Example, if they entered a description then went to the next step, then went back to edit the description, the user wouldn't have to remember what they previously entered to edit it. The previously entered description will already be pre-populated within the description prompt.

## [1.2.0](https://github.com/fletch-r/simple-commit/releases/tag/v1.2.0) - 2023-04-10

### Added

- [#13](https://github.com/fletch-r/simple-commit/pull/13) - [`92983e9`](https://github.com/fletch-r/simple-commit/pull/13/commits/92983e97f6b1372563320578286eb178f9b03d5f) If the default RegEx doesn't detect your issue then you can define a custom RegEx in the `settings.json` called `"conventionalCommitBuilder.issueRegex"`. Your custom RegEx will then the be used instead of the default one to detect your issue/ticket number. NOTE: If you want to include a backslash `\`, in your RegEx, for example: `\w+`, then you will need to escape the backslash as it is an escape character itself it so wont make it through the conversion to RegEx. For example, `\w+` should be typed as `\\w+`.

## [1.1.0](https://github.com/fletch-r/simple-commit/releases/tag/v1.1.0) - 2023-04-06

### Added

- [#11](https://github.com/fletch-r/simple-commit/pull/12) - [`41c7afc`](https://github.com/fletch-r/simple-commit/pull/12/commits/41c7afcc2658494c8b456f39bf8e9daf6b8fff34) If you haven't staged any changes a prompt will ask you to select files to stage. Before Conventional Commit Builder asks you for your commit details it will ask you to chose changes to stage then once you have chosen it will continue with the rest of the prompts.

## [1.0.1](https://github.com/fletch-r/simple-commit/releases/tag/v1.0.1) - 2023-04-06

- [`3c806ae`](https://github.com/fletch-r/simple-commit/commit/3c806ae28136fbf2085782dbde1d5e7057bbfe27) - Renamed SVG's to `simple-commit-light` and `simple-commit-dark`.
- [`7e4e367`](https://github.com/fletch-r/simple-commit/commit/7e4e367f90e58c4a4a9a9cc69092fc7c10933971) - Added more keywords and categories to help the extension get discovered.

## [1.0.0](https://github.com/fletch-r/simple-commit/releases/tag/v1.0.0) - 2023-04-06

### Added

- [#10](https://github.com/fletch-r/simple-commit/commit/54f3315b8c28cdd7788a7d10c88b2e5cbd16d077) - [`d5dc03a`](https://github.com/fletch-r/simple-commit/commit/d5dc03a2e08fcb6501da63e24c78d6a5e0b91088) The back button on prompts will take you to the previous step. The step order is now determined on your template. For example, the default template is `<type><scope>: <emoji> <number> - <description>\n\n<body>\n\n<footer>` so you will see the `<type>` prompt, then the `<scope>` prompt and so on, but if your `conventionalCommitBuilder.template` was set to `<emoji> <number> <type><scope>...` then the first prompt will be the `<emoji>`, second will be `<number>` prompt and so.

## [0.4.0](https://github.com/fletch-r/simple-commit/releases/tag/v0.4.0) - 2023-04-05

### Changed

- [`67d1818`](https://github.com/fletch-r/simple-commit/commit/67d18181269565ed4d5139cb7ba33c1207897e61) Renamed schema to template. This change means that `conventionalCommitBuilder.schema` will have to be renamed to `conventionalCommitBuilder.template` in your `settings.json` file.

## [0.3.0](https://github.com/fletch-r/simple-commit/releases/tag/v0.3.0) - 2023-04-04

### Added

- [`4cee90a`](https://github.com/fletch-r/simple-commit/commit/4cee90a1d621b0becd3b69869855c3b4fd8e6c29) Changed the prompts for `vscode.window.showInputBox()` to custom input box using `vscode.window.createInputBox()`. Which will allow better keyboard functionality.

## [0.2.0] - 2023-04-04

### Added

- [#5](https://github.com/fletch-r/simple-commit/pull/5) - [`6d69a2e`](https://github.com/fletch-r/simple-commit/pull/5/commits/6d69a2ea4bdf8d7abfecb21c1cef6aa138abc407) Issue/Ticket number prompt will now be pre-populated with your issue/ticket number which is detects from your branch name.
- [#6](https://github.com/fletch-r/simple-commit/pull/6) - [`be9095e`](https://github.com/fletch-r/simple-commit/pull/6/commits/be9095e8d5fb4c90ad606fcf0342eaac788ab131) Ability to define a commit schema which the extension uses to build your commit message and put things like the topic, emoji and scope in the places of the commit message you want them to be.

### Fixed

- [`2cd30f4`](https://github.com/fletch-r/simple-commit/commit/2cd30f47d40066bda67f7751963dcba87c12eb80) Selecting emoji will put the emoji code into your commit message instead of just the emoji name.

## [0.1.0] - 2023-03-31

### Added

- gitmoji's
- Conventional Commit Builder icon within the Source Control tab.

## [0.0.3] - 2023-03-31

### Added

- Changed the prompts for `vscode.window.showQuickPick()` to custom quick pick using `vscode.window.createQuickPick()`.

### Fixed

- Adding a new scope the old scope will not get overwritten.

## [0.0.2] - 2023-03-29

### Added

- VSCode Marketplace Icon
- Able to save Scopes

## [0.0.1] - 2023-03-29

### Added

- First release.
- Able to use extension to commit message.
