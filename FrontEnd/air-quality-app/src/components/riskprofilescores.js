// Placeholder values for demonstration purposes
const avgHoursIndoors = 22;
const avgHoursOutdoors = 2;
const indoorFactor = 3;
const bestMaskFactor = 14;

function getAvg(averageAQI) {
    const avgRiskScore = ((averageAQI * avgHoursOutdoors) + (averageAQI * avgHoursIndoors / indoorFactor)) / 24;
    return avgRiskScore;
}

function getSScore(averageAQI) {
    const sRiskScore = ((averageAQI * avgHoursOutdoors / bestMaskFactor) + (averageAQI * avgHoursIndoors / indoorFactor)) / 24;
    return sRiskScore;
}

function getGrade(averageAQI, userAQI) {
    const avgRiskScore = getAvg(averageAQI);
    const sRiskScore = getSScore(averageAQI);

    const aRiskScore = sRiskScore + ((avgRiskScore - sRiskScore) / 3);
    const bRiskScore = aRiskScore + ((avgRiskScore - sRiskScore) / 3);
    const dRiskScore = avgRiskScore * 1.1;
    const fRiskScore = avgRiskScore * 1.2;

    if (userAQI <= sRiskScore) {
        return "S";
    } else if (userAQI > sRiskScore && userAQI < bRiskScore) {
        return "A";
    } else if (userAQI > aRiskScore && userAQI < avgRiskScore) {
        return "B";
    } else if (userAQI > bRiskScore && userAQI < dRiskScore) {
        return "C";
    } else if (userAQI > avgRiskScore && userAQI < fRiskScore) {
        return "D";
    } else if (userAQI >= fRiskScore) {
        return "F";
    }
}

const riskvalueHeadingText = {
    "S": "At Very Low Risk",
    "A": "At Low Risk",
    "B": "At Some Risk",
    "C": "At Considerable Risk",
    "D": "At High Risk",
    "F": "At Very High Risk",
    "*": "Welcome To Fair",
    "!": "Daily Form Not Yet Filled"
};

const riskvalueContentText = {
    "S": "Minimise time spent outside when AQI > 80",
    "A": "Minimise time spent outside when AQI > 70",
    "B": "Minimise time spent outside when AQI > 60",
    "C": "Minimise time spent outside when AQI > 50",
    "D": "Minimise time spent outside when AQI > 40",
    "F": "Minimise time spent outside when AQI > 30",
    "*": "Your Risk Profile will allow you to quickly see how you're doing in terms of exposure",
    "!": "Please complete your Daily form to see your Risk Profile today! "
};

const riskvalueColor = {
    "S": "#00FF00",
    "A": "#3EACEB",
    "B": "#AD00FF",
    "C": "#FF867C",
    "D": "#FF0000",
    "F": "#8B0000",
    "*": "#3783bd",
    "!": "#94d138",
};

function renderGrade(averageAQI, userAQI) {
    const grade = getGrade(averageAQI, userAQI); 
    const headingText = riskvalueHeadingText[grade];
    const contentText = riskvalueContentText[grade];

    return {
        headingText: headingText,
        contentText: contentText,
    };
}

function renderColor(averageAQI, userAQI) {
    const grade = getGrade(averageAQI,userAQI); 
    return riskvalueColor[grade];
}

export {
    getGrade,
    renderGrade,
    renderColor,
    riskvalueContentText,
    riskvalueHeadingText,
    riskvalueColor
};
