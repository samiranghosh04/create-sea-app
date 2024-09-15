#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getLatestVersion = (packageName) => {
  try {
    return execSync(`npm show ${packageName} version`, { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error(chalk.red(`Error fetching version for ${packageName}: ${error.message}`));
    return null;
  }
};
const generatePackageJson = async (projectName) => {
  const seaJsUiCoreVersion = getLatestVersion('sea-js-ui-core');
  const viteVersion = getLatestVersion('vite');
  const packageJsonTemplate = {
    name: projectName,
    version: '1.0.0',
    main: 'index.js',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
      start: 'vite',
      build: 'vite build',
      serve: 'vite preview',
    },
    keywords: [],
    author: '',
    license: 'ISC',
    description: '',
    dependencies: {
      'sea-js-ui-core': `^${seaJsUiCoreVersion}`,
      'vite': `^${viteVersion}`,
    },
  };
  return JSON.stringify(packageJsonTemplate, null, 2);
};
const generateProject = async (projectName) => {
  const targetDir = path.join(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    console.error(chalk.red(`Error: Directory ${projectName} already exists.`));
    process.exit(1);
  }
  await fs.mkdir(targetDir);
  const templateDir = path.join(__dirname, '../templates');
  await fs.copy(templateDir, targetDir);
  const packageJsonContent = await generatePackageJson(projectName);
  await fs.writeFile(path.join(targetDir, 'package.json'), packageJsonContent);
  console.log(chalk.green(`Project ${projectName} created successfully!`));
  console.log(chalk.yellowBright(`Navigate to ${projectName} and run 'npm i' to install dependencies.`));
  console.log(chalk.yellowBright(`Then use npm run start to start the dev server.`));
  console.log(chalk.bgYellow(`THANK YOU SO MUCH FOR CHOOSING SEA JS!`));
};
const program = new Command();
program
  .command('create <projectName>')
  .description('Create a new sea-js-ui-core project')
  .action(async (projectName) => {
    await generateProject(projectName);
  });
program
  .arguments('<projectName>')
  .description('Create a new sea-js-ui-core project')
  .action(async (projectName) => {
    await generateProject(projectName);
  });
program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.help();
}