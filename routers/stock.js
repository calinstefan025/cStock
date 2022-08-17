var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var request = require("request");

const api_key = "3XWA7YP44XQ5VGAH";

router.get("/:ticker/overview", (req, res) => {
  const urlTicker = req.params.ticker;
  const urlOverview =
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
    urlTicker +
    "&apikey=" +api_key;
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
        // res.send(data);
        console.log(data);
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
          ReturnOnEquityTTM:data.ReturnOnEquityTTM,
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
          SharesOutstanding : data.SharesOutstanding,
        }
        res.render("stock", object);
      }
    }
  );
});

router.get("/:ticker/api", (req, res) => {
  const urlTicker = req.params.ticker;
  const urlOverview =
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
    urlTicker +
    "&apikey=" +api_key;
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
