import { WorkspaceConfiguration } from 'vscode';
import getReference from "./getReference";
import bodyInputBox from "./steps/body/bodyInputBox";
import descriptionInputBox from "./steps/description/descriptionInputBox";
import emojiQuickPick from "./steps/emoji/emojiQuickPick";
import footerInputBox from "./steps/footer/footerInputBox";
import referenceInputBox from "./steps/reference/referenceInputBox";
import chosenScope from "./steps/scope/chosenScope";
import typeQuickPick from "./steps/type/typeQuickPick";
import { Repositories } from './types/git';

export default async function buildCommitMessage(
    step_order: string[],
    workspace_config: WorkspaceConfiguration,
    repo: Repositories,
) {
    const workspace_reference_regex = workspace_config.get('referenceRegex') as string;

    const workspace_disable_emoji = workspace_config.get('disableEmoji') as boolean;
    const workspace_disable_reference = workspace_config.get('disableReference') as boolean;
    const workspace_disable_description = workspace_config.get('disableDescription') as boolean;
    const workspace_disable_body = workspace_config.get('disableBody') as boolean;
    const workspace_disable_footer = workspace_config.get('disableFooter') as boolean;

    let message_values = {
        type: '',
        scope: '',
        emoji: '',
        reference: '',
        description: '',
        body: '',
        footer: ''
    };

    // === RUN PROMPT'S ===
    for (let current_step = 0; current_step < step_order.length;) {
        const step = step_order[current_step];
        switch (step) {
            case '<type>':
                await typeQuickPick(message_values.type)
                    .then((value: string) => {
                        message_values.type = value;
                        current_step++;
                    });
                break;
            case '<scope>':
                await chosenScope(workspace_config, message_values.scope)
                    .then((value: string) => {
                        message_values.scope = value;
                        current_step++;
                    })
                    .catch(() => current_step--);
                break;
            case '<emoji>':
                if (!workspace_disable_emoji) {
                    await emojiQuickPick(message_values.emoji, workspace_config)
                        .then((value) => {
                            message_values.emoji = value;
                            current_step++;
                        })
                        .catch(() => current_step--);
                } else {
                    message_values.emoji = '';
                    current_step++;
                }
                break;
            case '<reference>':
                if (!workspace_disable_reference) {
                    const head = repo.state.HEAD;
                    const reference = getReference(workspace_reference_regex, head);
                    await referenceInputBox(reference, message_values.reference)
                        .then((value: string) => {
                            message_values.reference = value;
                            current_step++;
                        })
                        .catch(() => current_step--);
                } else {
                    message_values.reference = '';
                    current_step++;
                }
                break;
            case '<description>':
                if (!workspace_disable_description) {
                    await descriptionInputBox(message_values.description)
                        .then((value: string) => {
                            message_values.description = value;
                            current_step++;
                        })
                        .catch(() => current_step--);
                } else {
                    message_values.description = '';
                    current_step++;
                }
                break;
            case '<body>':
                if (!workspace_disable_body) {
                    await bodyInputBox(message_values.body)
                        .then((value: string) => {
                            message_values.body = value;
                            current_step++;
                        })
                        .catch(() => current_step--);
                } else {
                    message_values.body = '';
                    current_step++;
                }
                break;
            case '<footer>':
                if (!workspace_disable_footer) {
                    await footerInputBox(message_values.footer)
                        .then((value: string) => {
                            message_values.footer = value;
                            current_step++;
                        })
                        .catch(() => current_step--);
                } else {
                    message_values.footer = '';
                    current_step++;
                }
                break;
            default:
                break;
        }
    }

    return message_values;
}