var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var request = require("request");
var cScore = require("../backend_scripts/main.js");

const api_key = process.env.API_KEY;

function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}";
}

router.get("/:ticker/overview", (req, res) => {
  const urlTicker = req.params.ticker;
  const urlOverview =
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
    urlTicker +
    "&apikey=" +
    api_key;
  request.get(
    {
      url: urlOverview,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, response, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        var score = cScore.calculateScore(
          data.PERatio,
          data.PEGRatio,
          data.ForwardPE,
          data.OperatingMarginTTM * 100,
          data.AnalystTargetPrice,
          data.QuarterlyRevenueGrowthYOY * 100,
          data.ReturnOnAssetsTTM * 100,
          data.ReturnOnEquityTTM * 100,
          data.ProfitMargin * 100
        );
        let message;
        if (score[0] >= 750) {
          message = "UNDERVALUED STOCK";
        } else if (score[0] >= 500 && score[0] < 750) {
          message = "GOOD STOCK";
        } else if (score[0] > 200 && score[0] < 500) {
          message = "OVERVALUED STOCK";
        } else {
          message = "VERY BAD STOCK";
        }
        const object = {
          name: data.Name,
          description: data.Description,
          MarketCapitalization: data.MarketCapitalization,
          EBITDA: data.EBITDA,
          PERatio: data.PERatio,
          PEGRatio: data.PEGRatio,
          BookValue: data.BookValue,
          DividendPerShare: data.DividendPerShare,
          DividendYield: data.DividendYield,
          EPS: data.EPS,
          RevenuePerShareTTM: data.RevenuePerShareTTM,
          ProfitMargin: data.ProfitMargin,
          OperatingMarginTTM: data.OperatingMarginTTM,
          ReturnOnAssetsTTM: data.ReturnOnAssetsTTM,
          ReturnOnEquityTTM: data.ReturnOnEquityTTM,
          RevenueTTM: data.RevenueTTM,
          GrossProfitTTM: data.GrossProfitTTM,
          DilutedEPSTTM: data.DilutedEPSTTM,
          QuarterlyEarningsGrowthYOY: data.QuarterlyEarningsGrowthYOY,
          QuarterlyRevenueGrowthYOY: data.QuarterlyRevenueGrowthYOY,
          AnalystTargetPrice: data.AnalystTargetPrice,
          TrailingPE: data.TrailingPE,
          ForwardPE: data.ForwardPE,
          PriceToSalesRatioTTM: data.PriceToSalesRatioTTM,
          PriceToBookRatio: data.PriceToBookRatio,
          EVToRevenue: data.EVToRevenue,
          EVToEBITDA: data.EVToEBITDA,
          SharesOutstanding: data.SharesOutstanding,
          symbol: urlTicker,
          Country: data.Country,
          Exchange: data.Exchange,
          Sector: data.Sector,
          score: score[0],
          opMarginScore: score[1],
          PEScore: score[2],
          ROAScore: score[3],
          ROEScore: score[4],
          growthScore: score[5],
          profitScore: score[6],
          message: message,
        };
        if (isEmptyObject(data)) {
          res.redirect("/");
        } else {
          res.render("stock", object);
        }
      }
    }
  );
});

router.get("/:ticker/api", (req, res) => {
  const urlTicker = req.params.ticker;
  const urlOverview =
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
    urlTicker +
    "&apikey=" +
    api_key;
  request.get(
    {
      url: urlOverview,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, response, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    }
  );
});

router.post("/", (req, res) => {
  var ticker = req.body.tickerInput.toUpperCase();
  console.log(ticker);
  res.redirect("/stock/" + ticker + "/overview");
});

module.exports = router;
