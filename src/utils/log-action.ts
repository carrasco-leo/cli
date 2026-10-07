//
// log-action.ts — @carrasco-leo/cli
// ~/src/utils
//

import { statSync } from 'node:fs';
import { styleText } from 'node:util';

import { formatByteSize } from './format-byte-size.js';

type FileAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'RENAME';

const actionStyles: Record<FileAction, Parameters<typeof styleText>[0]> = {
  CREATE: ['green'],
  UPDATE: ['cyan'],
  DELETE: ['yellow'],
  RENAME: ['blue'],
};

export function logAction(
  action: FileAction,
  filePath: string,
  fileSize?: number,
): void {
	const style = styleText(actionStyles[action], action);
	const size = formatByteSize(fileSize ?? statSync(filePath).size);

  console.log(`${style} ${filePath} (${size})`);
}

export function logError(message: string): void {
  const style = styleText(['red'], 'ERROR');

  console.error(`${style} ${message}`);
}
