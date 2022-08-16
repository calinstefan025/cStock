var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var request = require('request');



router.get("/:ticker/overview", (req, res) => {
  const urlTicker = req.params.ticker;
  var urlOverview = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + urlTicker + '&apikey=3XWA7YP44XQ5VGAH';

  request.get({
      url: urlOverview,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, response, data) => {
      if (err) {
        console.log(err);
      } else {
        // res.send(data);
        res.render('stock' , {
          name: data.Name,
          description: data.Description,
        })
      }
  });

});

router.get("/:ticker/earnings", (req, res) => {
  const urlTicker = req.params.ticker;
  var urlEarnings = 'https://www.alphavantage.co/query?function=EARNINGS&symbol=' + urlTicker + '&apikey=3XWA7YP44XQ5VGAH';

  request.get({
      url: urlEarnings,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, response, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
  });

});

router.post('/' , (req , res) => {
    var ticker = req.body.tickerInput.toUpperCase();
    console.log(ticker);
    res.redirect("/stock/" + ticker + "/overview")
});

module.exports = router;
