import { renderGrade, getGrade, renderColor, riskvalueHeadingText, riskvalueContentText, riskvalueColor } from "./riskprofilescores";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const RiskProfileCard = ({avgAQI, userAQI, specialCase}) => {
    let starImage = "../src/static/star.png"
    let grade = "";
    let headingText ="";
    let contentText = "";
    let gradeColor = ""
    let gradeText = ""

    //  WHERE WE SET INFORMATION AND CASES
    if (specialCase == "firstUse") {
        console.log("Im in risk profile card")
        headingText = riskvalueHeadingText["*"]
        contentText = riskvalueContentText["*"]
        riskvalueColor["*"]
        // grade = starImage

    } else if (specialCase === "valid") {
    grade = getGrade(avgAQI, userAQI)
    gradeText = renderGrade(avgAQI, userAQI);
    headingText = gradeText.headingText;
    contentText = gradeText.contentText;
    gradeColor = renderColor(avgAQI, userAQI)
    }
    

    return(
    <Box sx={{
        marginTop:"1rem",
        backgroundColor: "black",
        display: "flex",
        borderRadius: 5
    }}>

    {/* Grade section */}
    <Box sx= {{
        display: "flex",
        margin: "1rem",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: 5,
        border: `solid 10px ${gradeColor}`
    }}>
    <Typography variant="h4" component="h3" sx={{
        color: "black", fontSize:"5rem",
    }}>
    {grade}
    </Typography>
    </Box>
   
    {/* Text section */}
    <Box sx={{
        marginLeft: "1rem",
        paddingTop: "1rem"
    }}>
    <Typography sx={{
        color: "white"
    }}>{headingText}</Typography>
    <Typography sx={{
        color: "white"
    }}>{contentText}</Typography>
    </Box>

    </Box>)
}

export default RiskProfileCard