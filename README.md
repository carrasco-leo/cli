# @carrasco-leo/cli

A reusable command-line interface for project generation, automation, and development workflows.

[![npm version](https://img.shields.io/npm/v/%40carrasco-leo%2Fcli?style=flat-square)](https://www.npmjs.com/package/@carrasco-leo/cli)
[![npm downloads](https://img.shields.io/npm/dm/%40carrasco-leo%2Fcli?style=flat-square)](https://www.npmjs.com/package/@carrasco-leo/cli)
[![License](https://img.shields.io/github/license/carrasco-leo/cli?style=flat-square)](LICENSE)

## Overview

`@carrasco-leo/cli` provides a unified command-line interface for development tools and project automation.

The CLI exposes a single executable:

```text
carrasco-leo <command> [arguments] [options]
```

It is designed to group reusable development workflows under a consistent and extensible command structure.

## Requirements

* Node.js >= 22.12.0

## Installation

Install the CLI globally:

```bash
npm install --global @carrasco-leo/cli
```

Verify the installation:

```bash
carrasco-leo --version
```

The package can also be installed locally as a development dependency:

```bash
npm install --save-dev @carrasco-leo/cli
```

When installed locally, use `npx` to execute it:

```bash
npx carrasco-leo
```

## Usage

The general syntax is:

```bash
carrasco-leo <command> [arguments] [options]
```

Help is available from the root command and from individual commands:

```bash
carrasco-leo --help
```

```bash
carrasco-leo <command> --help
```

The CLI supports command aliases, positional arguments, and options.

## Configuration

Project-specific defaults can be defined in the workspace `package.json` through the `carrasco-leo` property.

Example:

```json
{
  "carrasco-leo": {
    "packageScope": "@carrasco-leo"
  }
}
```

Configuration values provide defaults that can be overridden by command-line options when supported.

## Development

Clone the repository and install its dependencies:

```bash
git clone git@github.com:carrasco-leo/cli.git
cd cli
npm install
```

Run the CLI directly from the TypeScript source:

```bash
npm run dev -- --help
```

Build the package:

```bash
npm run build
```

Check the TypeScript sources:

```bash
npm run typecheck
```

Run the compiled CLI:

```bash
npm start -- --help
```

## Project structure

```text
src/
├── bin/
│   └── carrasco-leo.ts
├── commands/
└── utils/
```

The executable exposed by the package is:

```text
carrasco-leo
```

## Contributing

Contributions, bug reports, and suggestions are welcome.

Before submitting changes, make sure the project builds successfully and that the TypeScript sources pass the type check.

For larger changes, consider opening an issue first to discuss the proposed approach.

## License

This project is licensed under the MIT License.

Copyright © Léo CARRASCO
