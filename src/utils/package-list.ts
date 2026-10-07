//
// package-list.ts — @carrasco-leo/cli
// ~/src/utils
//

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function packageList(root: string = process.cwd()) {
	const path = join(root, 'package.json');
	const content = readFileSync(path, 'utf8');

	const pkg: any = JSON.parse(content);
	const list: string[] = [];
	const sections = [
		'dependencies',
		'devDependencies',
		'optionalDependencies'
	];

	for (const section of sections) {
		const dependencies = pkg[section] ?? {};

		for (const name in dependencies) {
			const version = dependencies[name];

			if (typeof version === 'string' && version.startsWith('file:dist/')) {
				list.push(name);
			}
		}
	}

	return list;
}
