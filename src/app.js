const crawler = require('./crawler/crawler.js');

// sleep function to bypass the request limit
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// base url
const URL =
  'https://www.dr.com.tr/kategori/Kitap/Edebiyat/Roman/grupno=00211?ShowNotForSale=True';

// for (let i = 0; i < 550; i++) {
//   const newURL = URL.concat('&Page=', i);
//   console.log(newURL);
//   crawler.getLinks(newURL);
//   console.log('ok -> ' + i);
//   sleep(5000); // wait 10 seconds after send 10 request.
//
// }

crawler.getLinks(
  'https://www.dr.com.tr/kategori/Kitap/Edebiyat/Roman/grupno=00211?ShowNotForSale=True&Page=30'
);
