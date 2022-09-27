var price = document.getElementById("price1");
var symbol = document.getElementById("symbol").value;

fetch(
  "https://api.twelvedata.com/price?symbol=" +
    symbol +
    "&apikey=a93bb538a6a94b8fbed92f1b72211166"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.price);
    currentPrice = data.price;
    price.innerText = Math.floor(currentPrice);
  });
