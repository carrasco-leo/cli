//
// ng.ts — @carrasco-leo/cli
// ~/src/commands
//

import { Command } from 'commander';

import { createNgLibraryCommand } from './ng/library.js';

export function createNgCommand(): Command {
	return new Command('ng')
		.description('Execute command inside an Angular workspace.')

		.addCommand(createNgLibraryCommand())
}
