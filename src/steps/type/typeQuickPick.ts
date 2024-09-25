import { WorkspaceConfiguration } from 'vscode';
import createQuickPick, { QuickPickItemsType } from '../../createQuickPick';
import { getConfiguration } from '../../getConfiguration';

type NonNullableDetailType = Omit<QuickPickItemsType, 'detail'> & {
	detail: string;
};

function isType(value: any): value is NonNullableDetailType {
	return (
			typeof value === 'object' &&
			value !== null &&
			typeof value.label === 'string' &&
			typeof value.description === 'string' &&
			typeof value.detail === 'string'
	);
}

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

	const config = await getConfiguration();

	const workspace_custom_types = config.get('customTypes') || [];

	if (workspace_custom_types.length > 0) {
		for (let i = 0; i < workspace_custom_types.length; i++) {
			const type = workspace_custom_types[i];
			if (isType(type) && Object.keys(type).length > 0) {
				available_types.push(type);
			}
		}
	}

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