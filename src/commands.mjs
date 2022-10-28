import yargs from 'yargs';

yargs.command({
    command: 'search',
    describe: 'Search books',
    builder: {
        searchQuery: {
            describe: 'Name of book to search',
            demandOption: true,
            type: 'string'
        }
    },

    handler(argv) {
        console.log("Result: ", argv.searchQuery);
    }
});

yargs.parse();
