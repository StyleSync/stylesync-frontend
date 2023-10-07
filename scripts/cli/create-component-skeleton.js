const fs = require('fs/promises');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const modulesPath = path.join(__dirname, '../../src/modules');

const question = (message) => {
  return new Promise((res) => {
    readline.resume();
    readline.question(message, (text) => {
      readline.pause();
      res(text);
    });
  });
};

const kebabize = (str) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
  );

async function main() {
  const modules = await fs.readdir(modulesPath);

  console.log('Modules', modules);

  const moduleName = await question('Module name: ');

  if (!modules.includes(moduleName)) {
    throw new Error(`Module ${moduleName} not found`);
  }

  const componentName = await question('Component name (use CamelCase): ');

  const componentType = await question(
    'Component type (component/container): '
  );

  if (componentType !== 'component' && componentType !== 'container') {
    throw new Error(`Component type ${componentType} doesn't allowed`);
  }

  const createStoriesFile = await question('Create stories file? (y/n) ');

  const componentPath = path.join(
    modulesPath,
    moduleName,
    `${componentType}s`,
    kebabize(componentName)
  );
  const componentInterfacePath = path.join(
    componentPath,
    `${kebabize(componentName)}.interface.ts`
  );
  const componentTsxPath = path.join(
    componentPath,
    `${kebabize(componentName)}.tsx`
  );
  const componentStylesPath = path.join(
    componentPath,
    `${kebabize(componentName)}.module.scss`
  );
  const componentIndexPath = path.join(componentPath, 'index.ts');
  const componentStoriesPath = path.join(
    componentPath,
    `${kebabize(componentName)}.stories.tsx`
  );

  // create component folder
  await fs.mkdir(path.join(componentPath));

  // create .interface.ts file
  await fs.appendFile(
    componentInterfacePath,
    `export type ${componentName}Props = {};`
  );

  // create .module.scss file
  await fs.appendFile(componentStylesPath, `.root {}`);

  // create .tsx file
  await fs.appendFile(
    componentTsxPath,
    `import { type FC } from 'react';

import type { ${componentName}Props } from './${kebabize(
      componentName
    )}.interface';
import styles from './${kebabize(componentName)}.module.scss';
      
export const ${componentName}:FC<${componentName}Props> = () => {
  return (
    <div className={styles.root} />
  )
}
`
  );

  // create index.ts file
  await fs.appendFile(
    componentIndexPath,
    `export { ${componentName} } from './${kebabize(componentName)}';`
  );

  // create .stories.tsx file
  if (createStoriesFile === 'y') {
    await fs.appendFile(
      componentStoriesPath,
      `import type { Meta, StoryObj } from '@storybook/react';

import { ${componentName} } from './${kebabize(componentName)}';

const meta: Meta<typeof ${componentName}> = {
  title: '${
    moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
  } UI/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Base: Story = {}
`
    );
  }
}

main();
