import { WorkspaceConfiguration } from 'vscode';

import createQuickPick from '../../createQuickPick';
import { getConfiguration } from '../../getConfiguration';
const gitmojis: {
    $schema: string,
    gitmojis: {
        emoji: string;
        entity: string;
        code: string;
        description: string;
        name: string;
    }[];
} = require('../../vendors/gitmojis.json');

export default async function emojiQuickPick(exitingEmoji: string): Promise<string> {
    const config = await getConfiguration();
    const workspace_commit_emojiFilter = config.get('emojiFilter');

    const emojis = gitmojis.gitmojis;

    const isCodeOrDefault = workspace_commit_emojiFilter === 'code' || !workspace_commit_emojiFilter;

    const items = emojis.map((obj) => ({
        label: obj.emoji,
        description: isCodeOrDefault ? obj.code : obj.description,
        detail: isCodeOrDefault ? obj.description : obj.code
    }));

    const selected_emoji = await createQuickPick(
        'Emoji', // title
        'Select an emoji for your commit.', // placeholder
        items, // items
        3, // step
        false, // canSelectMany
        exitingEmoji,
    );

    const code = isCodeOrDefault ? selected_emoji[0].description : selected_emoji[0].detail;

    return code || '';
}