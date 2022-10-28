import readline from 'readline';

import yargs from 'yargs';
import chalk from 'chalk';

import Libgen from './classes/libgen/Libgen.mjs';
import libgen from './handlers/libgen.mjs';

import config from './config/config.mjs'

async function main() {
    const libgen = new Libgen(config.libgen.baseUrl, 'The pragmatic programmer');
    await libgen.scrape();
    libgen.print();
}

main();
