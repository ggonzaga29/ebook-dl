import chalk from 'chalk';

export default class Scraper {
    constructor(baseUrl, pagination = 1) {
        this.baseUrl = baseUrl;
        this.pagination = pagination;
        this.books = []; 
    }

    // TODO: implement downloader
    download() {

    }

    print() {
            console.log(this.books.length) 
            this.books.slice().reverse().forEach((book, i) => { 
                const index = chalk.magenta(this.books.length - i - 1); 
                const author = book.author;
                const siteName = chalk.blue('libgen');
                const bookSize = chalk.green(book.size)
                const bookExtension = chalk.red.bold(book.extension);

                console.log(`${index} ${siteName}/${author} ${bookSize} ${bookExtension}`);
                console.log(`\t${book.title}`)
        })
    }

    setBooks(books) {
        this.books = books;
    }
}
