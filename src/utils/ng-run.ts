//
// ng-run.ts — @carrasco-leo/cli
// ~/src/utils
//

import { execFileSync } from 'node:child_process';

/**
 * Run an Angular commande (`ng ...`) through npx
 */
export function runNg(...args: string[]): void {
	const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

	execFileSync(npx, ['--no-install', 'ng', ...args], {
		cwd: process.cwd(),
		stdio: 'inherit',
	});
}
