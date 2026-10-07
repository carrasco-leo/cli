//
// config.ts — @carrasco-leo/cli
// ~/src/utils
//

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface CarrascoLeoConfig {
	packageScope?: string;
}

interface WorkspacePackageJson {
	'carrasco-leo'?: CarrascoLeoConfig;
}

export function getConfig(): CarrascoLeoConfig {
	const packageJsonPath = join(process.cwd(), 'package.json');

	const packageJson: WorkspacePackageJson = JSON.parse(
		readFileSync(packageJsonPath, 'utf8'),
	);

	return packageJson['carrasco-leo'] ?? {};
}
