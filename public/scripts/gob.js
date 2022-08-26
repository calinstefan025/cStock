const maxScore = 1000 , maxPEScore = 200 , maxAnalystScore = 200 , maxOpMarginScore = 100 , maxROEScore = 100 , maxROAScore = 200 , maxGrowthScore = 200;
var score = 0 , PEScore = 0 , analystScore = 0 , opMarginScore = 0 , ROEScore = 0 , ROAScore = 0 , growthScore = 0 ;

var info = "None" , currentPrice;
var optimumOperatingMargin = 15 ;

const MarketCapitalization = document.getElementById("MarketCapitalization").innerText;
const PERatio = document.getElementById("PERatio").innerText;
const PEGRatio = document.getElementById("PEGRatio").innerText;
const forwardPERatio = document.getElementById("ForwardPE").innerText;
const noShares = document.getElementById("SharesOutstanding").innerText;
var operatingMargin = document.getElementById("OperatingMarginTTM").innerText * 100;
var analystTargetPrice = document.getElementById("AnalystTargetPrice").innerText;
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
    score = opMarginScore + analystScore + PEScore;
    score = Math.floor(score) ;

    let message ;
    if(score >= (maxScore/4)*3) {
        message = "UNDERVALUED STOCK (buy this stock)";
    } else {
        message = "OVERVALUED STOCK (do not buy this stock)";
    }

    alert("Operating Margin score: " + opMarginScore + " out of " + maxOpMarginScore + "\n" +
        "Analyst score: " + analystScore + " out of " + maxAnalystScore + "\n" +
        "P/E score: " + PEScore + " out of " + maxPEScore + "\n" +
        "Total score: " + score + " out of " + maxScore + "\n\n" + message
    )
}

function calcPEScore() {
    if(PEGRatio === info || PERatio === info) {
        PEScore = 0 ;
    } else if(PEGRatio <= 1.0 || PERatio <= 15) {
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