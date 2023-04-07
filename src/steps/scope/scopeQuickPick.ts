import createQuickPick from '../../createQuickPick';

export default async function scopeQuickPick(saved_scopes: string[]): Promise<string> {
	return new Promise(async (resolve, reject) => {
		const scope_options = [{ label: 'None', description: 'No scope.' }];
	
		if (saved_scopes) {
			const formatted_scopes = saved_scopes.map((str) => ({
				label: str,
				description: '',
				detail: 'From saved scopes.'
			}));
			for (let i = 0; i < formatted_scopes.length; i++) {
				const formatted_scope = formatted_scopes[i];
				scope_options.push(formatted_scope);
			}
		}
		scope_options.push({ label: 'New Scope', description: 'Add a new scope to your workspace to reuse in the future.' });
		scope_options.push({ label: 'One Time Scope', description: 'Enter a scope that won\'t get saved to your workspace.' });

		try {
			const selected_scope = await createQuickPick(
				'Scope', // title
				'Select the scope for your commit.', // placeholder
				scope_options, // items
				2, // step
				false, // canSelectMany
			);

			resolve(selected_scope[0].label);
		} catch (rejectedValue) {
			reject(rejectedValue);
		}
	});
}