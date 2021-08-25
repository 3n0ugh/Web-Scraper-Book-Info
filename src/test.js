// sleep function to bypass the request limit
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// for (let index = 0; index < 50; index++) {
//   if (index === 0 || index % 10 === 0) {
//     sleep(5000);
//     console.log('wait -> ' + index);
//   }
//   console.log('no -> ' + index);
// }
