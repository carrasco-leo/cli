//
// library.ts — @carrasco-leo/cli
// ~/src/commands/ng
//

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import { Command } from 'commander';

import { runNg, logAction, getConfig } from '../../utils/index.js';

export interface NgLibraryCommandOptions {
	package: string;
	noScope: boolean;
	dryRun: boolean;
	prefix: string;
}

export function createNgLibraryCommand(): Command {
	return new Command('library')
		.alias('lib')
		.description('Generate an Angular Library with an additional `tsconfig.json` at root of the library.')

		.argument('<name>', 'The name of the library (same argument as `ng generate lib`).')

		.option('--package <name>', 'The name of the NPM package', '')
		.option('-n, --no-scope', `Only if there is no '--package <name>', the generated package name won't include a scope.`)
		.option('-d, --dry-run', 'Run through and reports activity without writing out results.')
		.option('-p, --prefix <prefix>', 'A prefix to be added to the selectors of components generated within this library. For example, if the prefix is `my-lib` and you generate a component named `my-component`, the selector will be `my-lib-my-component`.', 'lib')

		.action(main)
}

async function main(name: string, options: NgLibraryCommandOptions): Promise<void> {
	// First generate the library through angular-cli
	generateNgLibrary(name, options);

	// Add the tsconfig.json to the library
	createTsconfigFile(name, options.dryRun);

	// Update package.json with the correct package name
	fixPackageName(name, options);
}

function generateNgLibrary(name: string, options: NgLibraryCommandOptions): void {
	const ngArgs: string[] = [
		options.dryRun ? '--dry-run' : '',
		options.prefix ? ('--prefix=' + options.prefix) : '',
	].filter((v) => v);

	runNg('generate', 'library', name, ...ngArgs);
}

function createTsconfigFile(name: string, dryRun: boolean): void {
	const tsconfigPath = join(process.cwd(), 'projects', name, 'tsconfig.json');
	if (existsSync(tsconfigPath)) {
		return;
	}

	const tsconfigContent = JSON.stringify({ extends: 'tsconfig.lib.json' }, null, '\t');

	if (dryRun) {
		writeFileSync(tsconfigPath, tsconfigContent + '\n', 'utf8');
	}

	logAction('CREATE', tsconfigPath, tsconfigContent.length + 1);
}

function fixPackageName(name: string, options: NgLibraryCommandOptions): void {
	const packagePath = join(process.cwd(), 'projects', name, 'package.json');
	if (!existsSync(packagePath)) {
		throw new Error( `Package.json not found: ${packagePath}`);
	}

	const packageContent = readFileSync(packagePath, 'utf8');
	const packageJson = JSON.parse(packageContent);

	// update the package
	// packageJson.name = packageName ?? name;
	packageJson.name = generatePackageName

	const packageUpdated = JSON.stringify(packageJson, null, '\t');

	if (!options.dryRun) {
		writeFileSync(packagePath, packageUpdated + '\n', 'utf8');
	}

	logAction('UPDATE',packagePath, packageUpdated.length + 1);
}

function generatePackageName(name: string, options: NgLibraryCommandOptions): string {
	if(options.package) {
		return options.package;
	}

	if (options.noScope) {
		return name;
	}

	const config = getConfig();
	if (config.packageScope) {
		return config.packageScope + '/' + name;
	} else {
		return name;
	}
}
