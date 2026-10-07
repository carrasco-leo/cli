//
// application.ts — @carrasco-leo/cli
// ~/src/commands
//

import { Command } from 'commander';

import { createAppSetNameCommand } from './application/set-name.js';

export function createAppCommand(): Command {
	return new Command('application')
		.alias('app')
		.description('Execute command to update the application')

		.addCommand(createAppSetNameCommand())
}
