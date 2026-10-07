//
// package.ts — @carrasco-leo/cli
// ~/src/commands
//

import { Command } from 'commander';

import { createPackageListCommand } from './package/list.js';
import { createPackageCleanCommand } from './package/clean.js';

export function createPackageCommand(): Command {
	return new Command('package')
		.alias('pkg')
		// .description('.')

		.addCommand(createPackageListCommand())
		.addCommand(createPackageCleanCommand())
}
