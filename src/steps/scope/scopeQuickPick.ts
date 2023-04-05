import createQuickPick from '../../createQuickPick';

export default async function scopeQuickPick(saved_scopes: string[]): Promise<string> {
	return new Promise(async (resolve, reject) => {
		const scopeOptions = [{ label: 'None', description: 'No scope.' }];
	
		if (saved_scopes) {
			const formattedScopes = saved_scopes.map((str) => ({
				label: str,
				description: '',
				detail: 'From saved scopes.'
			}));
			for (let i = 0; i < formattedScopes.length; i++) {
				const formattedScope = formattedScopes[i];
				scopeOptions.push(formattedScope);
			}
		}
		scopeOptions.push({ label: 'New Scope', description: 'Add a new scope to your workspace to reuse in the future.' });
		scopeOptions.push({ label: 'One Time Scope', description: 'Enter a scope that won\'t get saved to your workspace.' });

		try {
			const value = await createQuickPick(
				'Scope',
				'Select the scope for your commit.',
				scopeOptions,
				2,
			);
			resolve(value);
		} catch (rejectedValue) {
			reject(rejectedValue);
		}
	});
}