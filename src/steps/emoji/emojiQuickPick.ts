import createQuickPick from '../../createQuickPick';
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

export default async function emojiQuickPick(): Promise<string> {
    const emojis = gitmojis.gitmojis;

    const items = emojis.map((obj) => ({
        label: obj.emoji,
        description: obj.code,
        detail: obj.description
    }));

	const selected_emoji = await createQuickPick(
		'Emoji', // title
		'Select an emoji for your commit.', // placeholder
		items, // items
		3, // step
        false, // canSelectMany
	);

    return selected_emoji[0].description;
}