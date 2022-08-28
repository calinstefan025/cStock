const maxScore = 1000 , maxPEScore = 150 , maxAnalystScore = 200 , maxOpMarginScore = 100 , maxROEScore = 100 , maxROAScore = 200 , maxGrowthScore = 150 , maxProfitScore = 100;
var score = 0 , PEScore = 0 , analystScore = 0 , opMarginScore = 0 , ROEScore = 0 , ROAScore = 0 , growthScore = 0 , profitScore = 0 ;

var info = "None" , currentPrice;
var optimumOperatingMargin = 15 ;

const MarketCapitalization = document.getElementById("MarketCapitalization").innerText;
const PERatio = document.getElementById("PERatio").innerText;
const PEGRatio = document.getElementById("PEGRatio").innerText;
const forwardPERatio = document.getElementById("ForwardPE").innerText;
const noShares = document.getElementById("SharesOutstanding").innerText;
var operatingMargin = document.getElementById("OperatingMarginTTM").innerText * 100;
var analystTargetPrice = document.getElementById("AnalystTargetPrice").innerText;
var growth = document.getElementById("QuarterlyRevenueGrowthYOY").innerText*100;
var ROA = document.getElementById("ReturnOnAssetsTTM").innerText*100;
var ROE = document.getElementById("ReturnOnEquityTTM").innerText*100;
var profit = document.getElementById("ProfitMargin").innerText*100;
var price = document.getElementById("price1");
var symbol = document.getElementById('symbol').value;

fetch('https://api.twelvedata.com/price?symbol=' + symbol + '&apikey=a93bb538a6a94b8fbed92f1b72211166')
  .then((response) => response.json())
  .then((data) => {
    console.log(data.price);
    currentPrice = data.price;
    price.innerText = Math.floor(currentPrice) ;
  });

function gob() {
    calcOpMarginScore();
    calcAnalystScore();
    calcPEScore();
    calcROAScore();
    calcROEScore();
    calcGrowthScore();
    calcProfitMarginScore();
    score = opMarginScore + analystScore + PEScore + ROAScore + ROEScore + growthScore + profitScore;
    score = Math.floor(score) ;

    let message ;
    if (score >= 750) {
        message = "UNDERVALUED STOCK 👍👍";
    } else if (score >= 500 && score < 750){
        message = "GOOD STOCK 👍"
    } else if (score > 200 && score < 500){
        message = "OVERVALUED STOCK 👎";
    } else {
        message = "VERY BAD STOCK 👎👎";
    }

    alert
    (  
            "P/E score: " + PEScore + " out of " + maxPEScore + "\n" +
            "ROA score: " + ROAScore + " out of " + maxROAScore + "\n" +
            "ROE score: " + ROEScore + " out of " + maxROEScore + "\n" +
            "Operating Margin score: " + opMarginScore + " out of " + maxOpMarginScore + "\n" +
            "Revenue growth score: " + growthScore + " out of " + maxGrowthScore + "\n" +
            "Profit Margin score: " + profitScore + " out of " + maxProfitScore + "\n" +
            "Analyst score: " + analystScore + " out of " + maxAnalystScore + "\n\n" +
            "Total score: " + score + " out of " + maxScore + "\n" + message
    )

    
}

function calcProfitMarginScore() {
    if(profit === info) {
        profitScore = 0 ;
    } else if(profit >= 15) {
        profitScore = maxProfitScore ;
    } else if(profit >= 10 && profit < 15){
        profitScore = Math.floor((maxProfitScore/4)*3) ;
    } else if(profit >= 5 && profit < 10) {
        profitScore = Math.floor(maxProfitScore/3) ;
    } else if(profit > 0 && profit < 5) {
        profitScore = Math.floor(maxProfitScore/5) ;
    }
}

function calcGrowthScore() {
    console.log(growth);
    if(growth === info) {
        growthScore = 0 ;
    } else if(growth >= 15) {
        growthScore = maxGrowthScore ;
    } else if(growth >= 10 && growth < 15){
        growthScore = Math.floor((maxGrowthScore/4)*3) ;
    } else if(growth >= 5 && growth < 10) {
        growthScore = Math.floor(maxGrowthScore/3) ;
    } else if(growth > 0 && growth < 5) {
        growthScore = Math.floor(maxGrowthScore/5) ;
    }
}

function calcROAScore() {
    console.log(ROA);
    if(ROA === info) {
        ROAScore = 0 ;
    } else if(ROA >= 10) {
        ROAScore = maxROAScore ;
    } else if(ROA >= 5 && ROA < 10){
        ROAScore = maxROAScore/2 ;
    } else if(ROA > 0 && ROA < 5){
        ROAScore = maxROAScore/5;
    } else {
        ROAScore = 0 ;
    }
}

function calcROEScore() {
    console.log(ROE);
    if(ROE === info) {
        ROEScore = 0 ;
    } else if(ROE >= 15) {
        ROEScore = maxROEScore ;
    } else if(ROE >= 10 && ROE < 15){
        ROEScore = maxROEScore/2 ;
    } else if(ROE > 0 && ROE < 10){
        ROEScore = maxROEScore/5;
    } else {
        ROEScore = 0 ;
    }
}

function calcPEScore() {
    if(PEGRatio === info || PERatio === info) {
        PEScore = 0 ;
    } else if(PEGRatio <= 1.0) {
        PEScore = maxPEScore ;
    } else {
        if(forwardPERatio < PERatio) {
            let diff = PERatio - forwardPERatio ;
            let percentage = calcPer(diff , PERatio) ;
            PEScore = Math.floor(calcPer(percentage , maxPEScore)) ;
        } else {
            PEScore = 0 ;
        }
    }
}

function calcAnalystScore () {
    
    currentPrice = Number(currentPrice);
    analystTargetPrice = Number(analystTargetPrice) ;
  
    if(currentPrice < analystTargetPrice || analystTargetPrice === info) {
        analystScore = maxAnalystScore ;
    } else {
        let diffPer = calcDiffPer(currentPrice , analystTargetPrice);
        if(diffPer >= 100) {
            analystScore = 0 ;
        } else {
            analystScore = Math.floor(maxAnalystScore - diffPer) ; 
        }
    }
    
}

function calcOpMarginScore() {
    if(operatingMargin === info) {
        opMarginScore = 0 ;
    } else if(operatingMargin > optimumOperatingMargin) {
        opMarginScore = maxOpMarginScore ;
    } else {
        let per = calcDiffPer(operatingMargin , optimumOperatingMargin);
        if(per >= 100) {
            opMarginScore = 0 ;
        } else {
            opMarginScore = Math.floor(maxOpMarginScore - per) ;
        }
    }
    
}

function calcPer( val1 , val2) {
    return (val1/val2)*100 ;
}

function calcDiffPer(currentValue , optimumValue ) {
    let diff;
    if(optimumValue < currentValue) { 
        diff = currentValue - optimumValue ;
    } else {
        diff = optimumValue - currentValue ;
    }
    // console.log(diff);
    let percentage = (diff/optimumValue)*100 ;
    // console.log(percentage);
    return percentage ;
}