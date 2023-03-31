import createQuickPick from '../../createQuickPick';

export default async function typeQuickPick() {
	return await createQuickPick(
		'Type',
		'Select a type for your commit.',
		[
			{ label: 'feat', description: 'Feature', detail: "A new feature" },
			{ label: 'fix', description: 'Bug Fix', detail: 'A bug fix' },
			{ label: 'style', description: 'Styling', detail: 'Code styling. (formatting, missing semicolons, etc)' },
			{ label: 'chore', description: 'Chore', detail: 'Changes that do not modify the code' },
			{ label: 'docs', description: 'Documentation', detail: 'Documentation changes' },
			{ label: 'test', description: 'Test', detail: "Create or update tests" },
			{ label: 'refactor', description: 'Code Refactor', detail: 'Code changes that do not change functionality' },
			{ label: 'build', description: 'Build', detail: 'Changes that affect the build system or dependencies. e.g. NPM' },
		],
		1,
	);
}