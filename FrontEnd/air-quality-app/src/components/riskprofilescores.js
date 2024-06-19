function getGrade(riskvalue) {
    if (riskvalue < 40) {
        return "A";
    } else if (riskvalue >= 40 && riskvalue < 60) { 
        return "B";
    } else if (riskvalue >= 60 && riskvalue < 80) { 
        return "C";
    } else {
        return "D";
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

function renderGrade(riskvalue) {
    let grade = getGrade(riskvalue);
    let headingText = riskvalueHeadingText[grade];
    let contentText = riskvalueContentText[grade];

    return {
        headingText: headingText,
        contentText: contentText
    };
}

export default {
    getGrade,
    renderGrade,
    riskvalueHeadingText,
    riskvalueContentText
};