import { renderGrade, getGrade, renderColor } from "./riskprofilescores";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const RiskProfileCard = () => {
    let riskValue = 100
    let grade = getGrade(riskValue)
    let { headingText, contentText } = renderGrade(riskValue);
    let gradeColor = renderColor(riskValue)

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
        padding: "3rem",
        backgroundColor: "white",
        borderRadius: 5,
        border: `solid 10px ${gradeColor}`
    }}>
    <Typography variant="h3" component="h3" sx={{
        color: "black", fontSize:"10rem",
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