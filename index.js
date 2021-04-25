#!/usr/bin/env node
const path = require('path');
const puppeteer = require('puppeteer');
const readline = require('readline');
const {program, InvalidOptionArgumentError} = require('commander');

const {
  newFileName,
  extractExtension,
  makeHtml,
  validExtensions,
} = require('./utils');

const readScaleValue = (value) => {
  const parsedValue = parseFloat(value);
  if (isNaN(parsedValue) || parsedValue < 0.1 || parsedValue > 2) {
    throw new InvalidOptionArgumentError('Scale should be between 0.1 and 2');
  }
  return parsedValue;
}

program.name('code2pdf').version('1.0.1');
program
  .option('-n --name <string>', 'name of output file', newFileName())
  .option('-f --format <string>', 'page size format', 'a4')
  .option('-s, --scale <decimal>', 'scale factor', readScaleValue, 0.6)
  .option('-p, --preview', 'display non-headless chromium with preview', false);

program.parse();
const cliOptions = program.opts();

const rl = readline.createInterface({
  input: process.stdin,
});

const waitForAll = [];
rl.on('line', function (l) {
  console.error('file: ', l);
  if (!validExtensions.includes(extractExtension(l))) return;
  waitForAll.push(makeHtml(l));
});

rl.on('close', async () => {
  const content = (await Promise.all(waitForAll)).join('\n');
  const browser = await puppeteer.launch({headless: !cliOptions.preview});
  const page = await browser.newPage();
  await page.setContent(content);
  const prismPath = path.dirname(require.resolve('prismjs'));
  await page.addStyleTag({path: path.join(prismPath, 'themes/prism.css')});
  await page.addStyleTag({content: `body {font-family: sans-serif}`});
  await page.addStyleTag({
    path: path.join(prismPath, 'plugins/line-numbers/prism-line-numbers.css'),
  });
  if (cliOptions.preview) return;
  await page.pdf({path: cliOptions.name, format: cliOptions.format, scale: cliOptions.scale});
  await browser.close();
});
