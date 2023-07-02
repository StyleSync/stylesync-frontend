// run command `node ./scripts/svg-optimize.js`
const { optimize } = require('svgo');
const fs = require('fs/promises');

const ICONS_PATH = './src/assets/icons';

async function optimizeSvg(path) {
  const svgString = await fs.readFile(path, 'utf8');

  const result = optimize(svgString, {
    path,
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  });
  const optimizedSvgString = result.data;

  return fs.writeFile(path, optimizedSvgString);
}

async function main() {
  const allFiles = await fs.readdir(ICONS_PATH);
  const allSvgs = allFiles.filter((file) => file.endsWith('.svg'));

  for (let i = 0; i < allSvgs.length; i++) {
    await optimizeSvg(`${ICONS_PATH}/${allSvgs[i]}`);

    // eslint-disable-next-line no-console
    console.info(`Optimization of '${allSvgs[i]}' completed successfully`);
  }
}

main();
