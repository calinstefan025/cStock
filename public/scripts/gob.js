const maxScore = 1000 , maxPEScore = 200 , maxAnalystScore = 200 , maxOpMarginScore = 100 , maxROEScore = 100 , maxROAScore = 100;
var score = 0 , PEScore = 0 , analystScore = 0 , opMarginScore = 0 , ROEScore = 0 , ROAScore = 0;

var info = "None";
var optimumOperatingMargin = 15 ;

const MarketCapitalization = document.getElementById("MarketCapitalization").innerText;
const PEGRatio = document.getElementById("PEGRatio").innerText;
const noShares = document.getElementById("SharesOutstanding").innerText;
var operatingMargin = document.getElementById("OperatingMarginTTM").innerText * 100;
var analystTargetPrice = document.getElementById("AnalystTargetPrice").innerText;
var currentPrice = document.getElementById("price").innerText ;

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1);



function gob() {
    calcOpMarginScore();
    calcAnalystScore();
    score = opMarginScore + analystScore;
    alert(score)
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
            analystScore = diffPer/10 ;
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
            opMarginScore = per/100 ;
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