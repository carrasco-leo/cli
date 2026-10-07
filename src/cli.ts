//
// cli.ts — @carrasco-leo/cli
// ~/src
//

import { Command } from 'commander';

import { createNgCommand } from './commands/ng.js';
import { createAppCommand } from './commands/application.js';
import { createPackageCommand } from './commands/package.js';

export const program = new Command();

program
	.name('carrasco-leo')
	/** @todo get the informations from the package.json mb **/
	.description('Reusable CLI tools for project generation, automation, and development workflows.')
	.version('0.1.0')

program.addCommand(createNgCommand());
program.addCommand(createAppCommand());
program.addCommand(createPackageCommand());
