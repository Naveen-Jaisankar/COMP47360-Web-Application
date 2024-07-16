// Get the average aqi of the day in manhattan

// average aqi = getGQLQuery()

// Mockup average aqi value

const avgHoursIndoors = 22
const avgHoursOutdoors = 2
const indoorFactor = 3
const bestMaskFactor = 14



function getAvg(averageAQI){
    const avgRiskScore = ((averageAQI * avgHoursOutdoors) + (averageAQI * avgHoursIndoors/indoorFactor))/24  
    return avgRiskScore
}

function getSScore(averageAQI){
    const sRiskScore = ((averageAQI * avgHoursOutdoors/bestMaskFactor) + (averageAQI * avgHoursIndoors/indoorFactor))/24
    return sRiskScore
}

function getGrade(averageAQI, userAQI){
    const avgRiskScore = getAvg(averageAQI)
    const sRiskScore = getSScore(averageAQI)

    // Dynamically set the thresholds based off of average
    const aRiskScore = sRiskScore + ((avgRiskScore - sRiskScore)/3);
    const bRiskScore = aRiskScore + ((avgRiskScore -sRiskScore)/3);
    const dRiskScore = avgRiskScore * 1.1
    const fRiskScore = avgRiskScore * 1.2

    // Assign Grade based of userAQI and thresholds

    if (userAQI <= sRiskScore){
        return "S";
    } else if (userAQI > sRiskScore && userAQI < bRiskScore) {
        return "A";
    } else if (userAQI > aRiskScore && userAQI < avgRiskScore){
        return "B"
    } else if (userAQI > bRiskScore && userAQI < dRiskScore){
        return "C"
    } else if (userAQI > avgRiskScore && userAQI < fRiskScore){
        return "D"
    } else if (userAQI >= fRiskScore){
        return "F"
    }

}


let riskvalueHeadingText = {
    "A": "At Low Risk",
    "B": "At Some Risk",
    "C": "At Considerable Risk",
    "D": "At High Risk"
};

// This is all hokey, just placeholder text for now
let riskvalueContentText = {
    "A": "Minimise time spent outside when AQI > 70",
    "B": "Minimise time spent outside when AQI > 60",
    "C": "Minimise time spent outside when AQI > 50",
    "D": "Minimise time spent outside when AQI > 40"
};

let riskvalueColor = {
    "A": "#3EACEB",
    "B": "#AD00FF",
    "C": "#FF867C",
    "D": "#FF0000",
};

function renderGrade(averageAQI, userAQI) {
    let grade =getGrade(averageAQI, userAQI)
    let headingText = riskvalueHeadingText[grade];
    let contentText = riskvalueContentText[grade];

    return {
        headingText: headingText,
        contentText: contentText
    };
}

function renderColor(riskvalue) {
    let grade = getGrade(riskvalue);
    return riskvalueColor[grade];
}

export {
    getGrade,
    renderGrade,
    renderColor,
};