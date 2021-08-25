const axios = require('axios');
const cheerio = require('cheerio');
const { find } = require('cheerio/lib/api/traversing');

const db = require('./db/connection');
const books = db.get('book-info');
books.createIndex('book-name', { unique: true });

const URL =
  'https://www.dr.com.tr/kategori/Kitap/Edebiyat/Roman/grupno=00211?ShowNotForSale=True&Page=550';

let links = [];

let bookProperties = {};

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
  ' Barkod': 'id',
};

// Getting Book Links
axios
  .get(URL)
  .then((response) => {
    let $ = cheerio.load(response.data);
    $('a.prd-name').each((index, element) => {
      const link = $(element).attr('href');

      links.push(link);
    });
  })
  .then(() => {
    console.log(links);
  });

// Getting Book Info
axios
  .get(
    'https://www.dr.com.tr/kitap/balikci-ve-oglu/zulfu-livaneli/edebiyat/roman/turkiye-roman/urunno=0001921956001'
  )
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
    delete bookProperties['x'];
    // Inserting the data into database
    books
      .findOne({
        'book-name': bookProperties['book-name'],
      })
      .then((book) => {
        // Error handling to prevent data duplication error.
        if (book) {
          const error = new Error('That book already exists in database.');
          console.log(error);
        } else {
          books.insert(bookProperties);
          console.log(bookProperties);
        }
      });
  });
