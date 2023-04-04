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

export default async function emojiQuickPick() {
    const emojis = gitmojis.gitmojis;

    const items = emojis.map((obj) => ({
        label: obj.code,
        description: obj.emoji,
        detail: obj.description
    }));

	return await createQuickPick(
		'Emoji',
		'Select an emoji for your commit.',
		items,
		3,
	);
}