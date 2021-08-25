const axios = require('axios');
const cheerio = require('cheerio');
const { find } = require('cheerio/lib/api/traversing');

const db = require('../db/connection');
const books = db.get('book-info');
// books.createIndex('book-name', { unique: true });

// Storing book links
let links = [];

// Storing book info
let bookProperties = {};

let pageCount = 0;

const languageTranslator = {
  ' Kitap Adı': 'book-name',
  ' Yazar': 'author',
  ' Yayınevi': 'publisher',
  ' Sayfa Sayısı ': 'page-count',
  ' Hamur Tipi ': 'x',
  ' Ebat ': 'book-size',
  ' İlk Baskı Yılı ': 'pulished-year',
  ' Baskı Sayısı ': 'edition-count',
  ' Dil ': 'language',
  ' Barkod': 'barcode',
};

// sleep function to bypass the request limit
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// Inserting the data into database
function insertDatabase(bookProperties) {
  delete bookProperties['x'];
  delete bookProperties['_id'];
  delete bookProperties['undefined'];
  console.log('Inserting data...');
  books
    .findOne({
      'book-name': bookProperties['book-name'],
    })
    .then((book) => {
      // Error handling to prevent data duplication error.
      if (book) {
        const error = new Error(
          `${bookProperties['book-name']} already exists in database.`
        );
        console.log(error);
      } else {
        books.insert(bookProperties).then(() => {
          console.log(bookProperties);
        });
      }
    });
}
// Getting Book Info
function getBookInfo(url) {
  axios
    .get(encodeURI(url))
    .then((response) => {
      let $ = cheerio.load(response.data);

      // Grabbing book properties
      $('div.product-property ul.nav li').each((index, element) => {
        const value = $(element).find('span').text();
        const key = $(element).find($('strong')).text();
        bookProperties[languageTranslator[key]] = value;
      });

      // Grabbing description
      $('div.product-description-header').each((index, element) => {
        const description = $(element).find('p:eq(1)').text();
        bookProperties['description'] = description;
      });
    })
    .then(() => {
      console.log('Getting book information...');
      insertDatabase(bookProperties);
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}

// Getting Book Links
function getLinks(url) {
  axios
    .get(encodeURI(url))
    .then((response) => {
      let $ = cheerio.load(response.data);
      $('a.prd-name').each((index, element) => {
        const link = $(element).attr('href');
        console.log('Getting the links...');
        getBookInfo('https://www.dr.com.tr' + link);
      });
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}
module.exports = {
  getLinks,
  getBookInfo,
  insertDatabase,
};
