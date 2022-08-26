const maxScore = 1000 , maxPEScore = 200 , maxAnalystScore = 200 , maxOpMarginScore = 100 , maxROEScore = 100 , maxROAScore = 200;
var score = 0 , PEScore = 0 , analystScore = 0 , opMarginScore = 0 , ROEScore = 0 , ROAScore = 0;

var info = "None";
var optimumOperatingMargin = 15 ;
var currentPrice ;

const MarketCapitalization = document.getElementById("MarketCapitalization").innerText;
const PEGRatio = document.getElementById("PEGRatio").innerText;
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
    score = opMarginScore + analystScore;
    score = Math.floor(score) ;

    let message ;
    if(score >= (maxScore/4)*3) {
        message = "UNDERVALUED STOCK (buy this stock)";
    } else {
        message = "OVERVALUED STOCK (do not buy this stock)";
    }

    alert("Operating Margine score: " + opMarginScore + " out of " + maxOpMarginScore + "\n" +
        "Analyst score: " + analystScore + " out of " + maxAnalystScore + "\n" +
        "Total score: " + score + " out of " + maxScore + "\n\n" + message
    )
}


function calcAnalystScore () {
    
    currentPrice = Number(currentPrice);
    analystTargetPrice = Number(analystTargetPrice) ;
    // console.log(currentPrice);
    // console.log(analystTargetPrice);
    if(currentPrice < analystTargetPrice) {
        analystScore = maxAnalystScore ;
    } else {
        let diffPer = calcDiffPer(currentPrice , analystTargetPrice);
        // console.log(diffPer);
        if(diffPer > 100) {
            analystScore = 0 ;
            // console.log(analystScore);
        } else {
            analystScore = maxAnalystScore - diffPer ;
            // console.log(analystScore); 
        }
    }
    
}
function calcOpMarginScore() {
    if(operatingMargin > optimumOperatingMargin) {
        opMarginScore = maxOpMarginScore ;
        // console.log(opMarginScore);
    } else {
        let per = calcDiffPer(operatingMargin , optimumOperatingMargin);
        if(per > 100) {
            opMarginScore = 0 ;
            // console.log(opMarginScore);
        } else {
            opMarginScore = maxOpMarginScore - per ;
            // console.log(opMarginScore); 
        }
    }
    
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