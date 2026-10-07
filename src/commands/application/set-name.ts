//
// set-name.ts — @carrasco-leo/cli
// ~/src/commands/application
//

import { readFileSync, writeFileSync, existsSync, write } from 'node:fs';
import { join, relative } from 'node:path';

import { Command } from 'commander';
import { glob } from 'glob';

import { logAction, logError, getConfig } from '../../utils/index.js';

export interface AppSetNameCommandOptions {
	dryRun: boolean;
}

export function createAppSetNameCommand(): Command {
	return new Command('set-name')
		.description('Update the name of the application and replace placeholder inside files headers.')

		.argument('<name>', 'Title of the application.')
		.argument('[header-name]', 'Name to replace the placeholders.')

		.option('-d, --dry-run', 'Run through and reports activity without writing out results.')

		.action(main)
}

async function main(
	name: string,
	headerName: string,
	options: AppSetNameCommandOptions,
): Promise<void> {
	if (!headerName) {
		headerName = name;
	}

	// First we replace the title tag in the index file
	replaceApplicationTitle(name, options.dryRun);

	// Now replace header placeholders
	await replaceApplicationHeaderTitle(headerName, options.dryRun);
}

function replaceApplicationTitle(name: string, dryRun: boolean): void {
	const appRootPath = join(process.cwd(), 'projects', 'app-client', 'src', 'app');
	const htmlIndex = join(appRootPath, 'index.html');
	const pugIndex = join(appRootPath, 'index.pug');

	if (existsSync(pugIndex)) {
		return replaceApplicationTitlePug(name, pugIndex, dryRun);
	}

	if (existsSync(htmlIndex)) {
		return replaceApplicationTitleHtml(name, htmlIndex, dryRun);
	}

	logError('Application index file (Pug or HTML) is not found.');
}

function replaceApplicationTitlePug(
	name: string,
	path: string,
	dryRun: boolean,
): void {
	const pugContent = readFileSync(path, 'utf8');
	const pugUpdated = pugContent.replace(
		/(?<=^\s*)title\s+.*$/mg,
		(__, spaces) => `${spaces}title ${name}`,
	);

	if (!dryRun) {
		writeFileSync(path,pugUpdated, 'utf8');
	}

	logAction('UPDATE', path, pugUpdated.length);
}

function replaceApplicationTitleHtml(
	name: string,
	path: string,
	dryRun: boolean,
): void {
	const htmlContent = readFileSync(path, 'utf8');
	const htmlUpdated = htmlContent.replace(
		/<title>.+?<\/title>/g,
		() => `<title>${name}</title>`,
	);

	if (!dryRun) {
		writeFileSync(path,htmlUpdated, 'utf8');
	}

	logAction('UPDATE', path, htmlUpdated.length);
}

async function replaceApplicationHeaderTitle(
	headerName: string,
	dryRun: boolean,
): Promise<void> {
	const appRoot = join(process.cwd(), 'projects', 'app-client', 'src');
	const files = await glob(join(appRoot, '**/*.{ts,pug,scss}'));

	for (const file of files) {
		replaceApplicationHeaderTitleRun(headerName, file, dryRun);
	}
}

function replaceApplicationHeaderTitleRun(
	headerName: string,
	fileName: string,
	dryRun: boolean,
): void {
	const fileContent = readFileSync(fileName, 'utf8');
	let content = fileContent;

	const replacements: Record<string, any> = {
		'__HEADER_NAME__': headerName,
	};

	for (const key in replacements) {
		content = content.replaceAll(key, replacements[key]);
	}

	if (!dryRun) {
		writeFileSync(fileName, content, 'utf8');
	}

	logAction('UPDATE', relative(process.cwd(), fileName), content.length);
}
