import createQuickPick from '../../createQuickPick';

export default async function typeQuickPick(existing_value: string): Promise<string> {
	const available_types = [
		{ label: 'feat', description: 'Feature', detail: "A new feature" },
		{ label: 'fix', description: 'Bug Fix', detail: 'A bug fix' },
		{ label: 'style', description: 'Styling', detail: 'Code styling. (formatting, missing semicolons, etc)' },
		{ label: 'chore', description: 'Chore', detail: 'Changes that do not modify the code' },
		{ label: 'docs', description: 'Documentation', detail: 'Documentation changes' },
		{ label: 'test', description: 'Test', detail: "Create or update tests" },
		{ label: 'refactor', description: 'Code Refactor', detail: 'Code changes that do not change functionality' },
		{ label: 'build', description: 'Build', detail: 'Changes that affect the build system or dependencies. e.g. NPM' },
	];

	const selected_type = await createQuickPick(
		'Type', // title
		'Select a type for your commit.', // placeholder
		available_types, // items
		1, // step
		false, // canSelectMany
		existing_value,
	);

	return selected_type[0].label;
}