# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Upcoming]

- Custom Issue Regex: Simple Commit uses the regex pattern `/(?!.*\/)([^\d]*)(\d+)/` to detect what your issue/ticket number is. I know that at some point someones issue/ticket number structure will fail that regex pattern leading to them thinking there is a bug. So a upcoming feature will allow you to use a custom regex to detect your issue/ticket number in your `settings.json` file using `simpleCommit.issueRegex: "/your-regex-here/"`.
- Select Files To Stage: Currently Simple Commit will run the commit prompts and then do nothing once you've entered all the commit information if no files are staged. This feature will first check if there are any staged files, if not, it will prompt you to select files to stage first.

## [1.0.0] - 2023-04-06

### Added

- [#10](https://github.com/0xATHERIS/simple-commit/commit/54f3315b8c28cdd7788a7d10c88b2e5cbd16d077) - [`d5dc03a`](https://github.com/0xATHERIS/simple-commit/commit/d5dc03a2e08fcb6501da63e24c78d6a5e0b91088) The back button on prompts will take you to the previous step. The step order is now determined on your template. For example, the default template is `<type><scope>: <emoji> <number> - <description>\n\n<body>\n\n<footer>` so you will see the `<type>` prompt, then the `<scope>` prompt and so on, but if your `simpleCommit.template` was set to `<emoji> <number> <type><scope>...` then the first prompt will be the `<emoji>`, second will be `<number>` prompt and so.

## [0.4.0] - 2023-04-05

### Changed

- [`67d1818`](https://github.com/0xATHERIS/simple-commit/commit/67d18181269565ed4d5139cb7ba33c1207897e61) Renamed schema to template. This change means that `simpleCommit.schema` will have to be renamed to `simpleCommit.template` in your `settings.json` file.

## [0.3.0] - 2023-04-04

### Added

- [`4cee90a`](https://github.com/0xATHERIS/simple-commit/commit/4cee90a1d621b0becd3b69869855c3b4fd8e6c29) Changed the prompts for `vscode.window.showInputBox()` to custom input box using `vscode.window.createInputBox()`. Which will allow better keyboard functionality.

## [0.2.0] - 2023-04-04

### Added

- [#5](https://github.com/0xATHERIS/simple-commit/pull/5) - [`6d69a2e`](https://github.com/0xATHERIS/simple-commit/pull/5/commits/6d69a2ea4bdf8d7abfecb21c1cef6aa138abc407) Issue/Ticket number prompt will now be pre-populated with your issue/ticket number which is detects from your branch name.
- [#6](https://github.com/0xATHERIS/simple-commit/pull/6) - [`be9095e`](https://github.com/0xATHERIS/simple-commit/pull/6/commits/be9095e8d5fb4c90ad606fcf0342eaac788ab131) Ability to define a commit schema which the extension uses to build your commit message and put things like the topic, emoji and scope in the places of the commit message you want them to be.

### Fixed

- [`2cd30f4`](https://github.com/0xATHERIS/simple-commit/commit/2cd30f47d40066bda67f7751963dcba87c12eb80) Selecting emoji will put the emoji code into your commit message instead of just the emoji name.

## [0.1.0] - 2023-03-31

### Added

- gitmoji's
- Simple Commit icon within the Source Control tab.

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