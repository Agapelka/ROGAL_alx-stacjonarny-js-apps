console.log('Hello World!');
// 1. Policz sumę cen produktów

// const productPrices = [9.99, 4.78, 5.89];

// let sum = 0;
// for(let i = 0; i < productPrices.length; i++) {
//   sum += productPrices[i];
// }
// for(let price of productPrices) {
//   sum += price;
// }
// productPrices.forEach(price => {
//   sum += price;
// })

// console.log(sum);

// 2. Policz sume produktow
const products = [
  {
    name: 'Chleb',
    price: 4.99
  },
  {
    name: "Pomidory",
    price: 9.99
  },
  {
    name: "Olowek",
    price: 1.20
  }
]

let sum = 0;

products.forEach(product => {
  sum += product.price
});

console.log(sum);