// handler for libgen.is
import cheerio from 'cheerio';
import fetch from 'node-fetch';

const LIBGEN_URL = "http://libgen.is/search.php?req=";

/**
    * Queries libgen based on the book value and return results based on pagination
    * @param book - name of the book to be queried
    * @param pagination - limits the number of pages to be scraped. default value is 1.
    * @returns { Array } - array of objects containing book details and mirror links
**/

export default async function (book, pagination = 1) {
    const response = await fetch(`${LIBGEN_URL}${book}`);
    const body = await response.text();

    try {
        const $ = cheerio.load(body)
        const table = $('.c').children('tbody').children('tr');

        let books = [];

        table.each(function (index, el) {
            const ID = $(this).children('td:nth-child(1)').text();
            const author = $(this).children('td:nth-child(2)').text();
            // TODO: filter <font> element
            const title = $(this).children('td:nth-child(3)').children('a').text();
            const bookUrl = 'http://libgen.is/' + $(this).children('td:nth-child(3)').children('a').attr("href");
            const year = $(this).children('td:nth-child(5)').text();
            const size = $(this).children('td:nth-child(8)').text();
            const extension = $(this).children('td:nth-child(9)').text();

            // mirrors 
            let mirrors = [];
            let start = 10;
            let end = 11;
            let mirrorEl; 
            
            while (start <= end) {
                mirrorEl = $(this).children(`td:nth-child(${start})`).children('a');
                mirrors.push(mirrorEl.attr('href'));
                start++;
            } 

            books.push({
                ID,
                author,
                title,
                bookUrl,
                year,
                size,
                extension,
                mirrors
            }) 
        });

        books.shift();
        return books;
    } catch (error) {
        console.error(error);
    }
}



