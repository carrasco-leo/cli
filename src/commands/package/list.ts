//
// list.ts — @carrasco-leo/cli
// ~/src/commands/package
//

import { Command } from 'commander';

import { packageList } from '../../utils/index.js';

export interface PackageListCommandOptions {
}

export function createPackageListCommand(): Command {
	return new Command('list')
		.description('Outputs the package list of those installed in local.')

		.action(main)
}

async function main(): Promise<void> {
	const list = packageList();

	for (const name of list) {
		console.log(name);
	}
}
