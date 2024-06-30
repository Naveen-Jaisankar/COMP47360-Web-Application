import { Box, Container } from "@mui/system"
import { Typography } from "@mui/material"
import MainContent from "../components/maincontent"
import { styled } from "@mui/system";
import { CreamBackgroundBox } from "./Home";

const QuestionTypography = styled(Typography)({
  fontSize: "3rem",
  fontWeight: 420
});

const AnswerTypography = styled(Typography)({
    fontSize: "2rem"
})

export default function Privacy () {
    return (
        <>
        <CreamBackgroundBox sx={{
            minWidth: "100vw"
        }}>
        <MainContent sx={{
                backgroundColor: "#f7f7f2"}} >
            <Container sx={{
                padding: 0,
                backgroundColor: "#f7f7f2"
            }}>
                {/* Header section */}
                <Box sx= {{
                    marginBottom: "3rem",
                }}>
                <Typography variant="h2" component='h1'>Privacy</Typography>
                <AnswerTypography variant='body1' component='p'>
                    Our privacy policy explains how we collect your personal data, how we use your personal data, and how it is stored.
                </AnswerTypography>
                </Box>

                {/* Information section */}
                <Box>
                <QuestionTypography variant="h3" component='h2'>What personal data do you collect from me?</QuestionTypography>
                <AnswerTypography variant='body1' component='p'>We collect etc.</AnswerTypography>

                <QuestionTypography variant="h3" component='h2'>How do you use my personal data?</QuestionTypography>
                <AnswerTypography variant='body1' component='p'>We collect etc.</AnswerTypography>

                <QuestionTypography variant="h3" component='h2'>How is my personal data stored?</QuestionTypography>
                <AnswerTypography variant='body1' component='p'> We collect etc.</AnswerTypography>
                </Box>
            </Container>
        
        </MainContent>
        </CreamBackgroundBox>
        </>
    )
}