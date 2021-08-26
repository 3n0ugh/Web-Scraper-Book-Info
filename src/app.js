const crawler = require('./crawler/crawler.js');

let pageUrls = [];

const URL =
  'https://www.dr.com.tr/kategori/Kitap/Edebiyat/Roman/grupno=00211?ShowNotForSale=True&Page=106';

crawler.getLinks(URL);
