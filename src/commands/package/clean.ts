//
// clean.ts — @carrasco-leo/cli
// ~/src/commands/package
//

import { execFileSync } from 'node:child_process';

import { Command } from 'commander';

import { packageList } from '../../utils/index.js';

export interface PackageCleanCommandOptions {
	dryRun: boolean;
}

export function createPackageCleanCommand(): Command {
	return new Command('clean')
		.description('Outputs the package list of those installed in local.')

		.option('-d, --dry-run', 'Run through and reports activity without writing out results.')

		.action(main)
}

async function main(options: PackageCleanCommandOptions): Promise<void> {
	const list = packageList();
	console.log('🧹 Looking for packages installed locally...');

	if (list.length === 0) {
		console.log('ℹ️ No local package to delete.');
	} else {
		console.log('📦 Found local packages:');

		for (const name of list) {
			console.log(`   - ${name}`);
		}

		console.log('🗑️ Deleting...');

		if (!options.dryRun) {
			execFileSync('npm', ['uninstall', ...list]);
		}

		console.log('✅ Done.');
	}
}
