import cheerio from 'cheerio';
import fetch from 'node-fetch';

import Scraper from "../../Scraper.mjs";

export default class Libgen extends Scraper {
    constructor(baseUrl, search, pagination = 1) {
        super(baseUrl, pagination);
        this.search = search;
    }

    async scrape() {
        const response = await fetch(`${this.baseUrl}${this.search}`);
        const body = await response.text();

        try {
            const $ = cheerio.load(body)
            const table = $('.c').children('tbody').children('tr');

            let books = [];

            table.each(function (index, el) {
                const ID = $(this).children('td:nth-child(1)').text();
                const author = $(this).children('td:nth-child(2)').text();
                // TODO: filter <font> $(this)ement
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
            this.setBooks(books);
        } catch (error) {
            console.error(error);
        }

    }
}
