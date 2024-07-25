import { renderGrade, getGrade, renderColor } from "./riskprofilescores";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const RiskProfileCard = (avgAQI, userAQI) => {
    // let avgAQI = 20
    // let userAQI = 20
    let grade = getGrade(avgAQI, userAQI)
    let { headingText, contentText } = renderGrade(avgAQI,userAQI);
    let gradeColor = renderColor(avgAQI,userAQI)

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