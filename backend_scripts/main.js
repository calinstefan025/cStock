module.exports = {
  calculateScore: function (
    PERatio,
    PEGRatio,
    forwardPERatio,
    operatingMargin,
    analystTargetPrice,
    growth,
    ROA,
    ROE,
    profit
  ) {
    const maxScore = 1000,
      maxPEScore = 150,
      maxOpMarginScore = 100,
      maxROEScore = 200,
      maxROAScore = 200,
      maxGrowthScore = 200,
      maxProfitScore = 150;
    var score = 0,
      PEScore = 0,
      analystScore = 0,
      opMarginScore = 0,
      ROEScore = 0,
      ROAScore = 0,
      growthScore = 0,
      profitScore = 0;

    var info = "None",
      price;
    var optimumOperatingMargin = 15;

    if (profit === info) {
      profitScore = 0;
    } else if (profit >= 15) {
      profitScore = maxProfitScore;
    } else if (profit >= 10 && profit < 15) {
      profitScore = Math.floor((maxProfitScore / 4) * 3);
    } else if (profit >= 5 && profit < 10) {
      profitScore = Math.floor(maxProfitScore / 3);
    } else if (profit > 0 && profit < 5) {
      profitScore = Math.floor(maxProfitScore / 5);
    }

    if (growth === info) {
      growthScore = 0;
    } else if (growth >= 15) {
      growthScore = maxGrowthScore;
    } else if (growth >= 10 && growth < 15) {
      growthScore = Math.floor((maxGrowthScore / 4) * 3);
    } else if (growth >= 5 && growth < 10) {
      growthScore = Math.floor(maxGrowthScore / 3);
    } else if (growth > 0 && growth < 5) {
      growthScore = Math.floor(maxGrowthScore / 5);
    }

    if (ROA === info) {
      ROAScore = 0;
    } else if (ROA >= 10) {
      ROAScore = maxROAScore;
    } else if (ROA >= 5 && ROA < 10) {
      ROAScore = maxROAScore / 2;
    } else if (ROA > 0 && ROA < 5) {
      ROAScore = maxROAScore / 5;
    } else {
      ROAScore = 0;
    }

    if (ROE === info) {
      ROEScore = 0;
    } else if (ROE >= 15) {
      ROEScore = maxROEScore;
    } else if (ROE >= 10 && ROE < 15) {
      ROEScore = maxROEScore / 2;
    } else if (ROE > 0 && ROE < 10) {
      ROEScore = maxROEScore / 5;
    } else {
      ROEScore = 0;
    }

    if (PERatio === info) {
      PEScore = 0;
    } else if (PEGRatio <= 1.0 || PERatio < 15) {
      PEScore = maxPEScore;
    } else {
      if (forwardPERatio < PERatio) {
        let diff = PERatio - forwardPERatio;
        let percentage = calcPer(diff, PERatio);
        PEScore = Math.floor(calcPer(percentage, maxPEScore));
      } else {
        PEScore = 0;
      }
    }

    if (operatingMargin === info) {
      opMarginScore = 0;
    } else if (operatingMargin > optimumOperatingMargin) {
      opMarginScore = maxOpMarginScore;
    } else {
      let per = calcDiffPer(operatingMargin, optimumOperatingMargin);
      if (per >= 100) {
        opMarginScore = 0;
      } else {
        opMarginScore = Math.floor(maxOpMarginScore - per);
      }
    }

    /////////
    score =
      opMarginScore + PEScore + ROAScore + ROEScore + growthScore + profitScore;
    score = Math.floor(score);
    var scoreArray = [
      score,
      opMarginScore,
      PEScore,
      ROAScore,
      ROEScore,
      growthScore,
      profitScore,
    ];
    return scoreArray;
  },
};

function calcPer(val1, val2) {
  return (val1 / val2) * 100;
}

function calcDiffPer(currentValue, optimumValue) {
  let diff;
  if (optimumValue < currentValue) {
    diff = currentValue - optimumValue;
  } else {
    diff = optimumValue - currentValue;
  }
  let percentage = (diff / optimumValue) * 100;
  return percentage;
}
