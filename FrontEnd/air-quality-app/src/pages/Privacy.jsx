import { Box, Container } from "@mui/system"
import { Typography } from "@mui/material"
import MainContent from "../components/maincontent"
import { styled } from "@mui/system";
import { CreamBackgroundBox } from "./Home";
import constants from './../constant';

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
                <Typography variant="h2" component='h1'>{constants.privacy.title}</Typography>
                <AnswerTypography variant='body1' component='p'>
                    {constants.privacy.introduction}
                </AnswerTypography>
                </Box>

                {/* Information section */}
                <Box>
                <QuestionTypography variant="h3" component='h2'>{constants.privacy.q1_personalData}</QuestionTypography>
                <AnswerTypography variant='body1' component='p'>{constants.privacy.content}</AnswerTypography>

                <QuestionTypography variant="h3" component='h2'>{constants.privacy.q2_useOfPersonalData}</QuestionTypography>
                <AnswerTypography variant='body1' component='p'>{constants.privacy.content}</AnswerTypography>

                <QuestionTypography variant="h3" component='h2'>{constants.privacy.q3_storageOfPersonalData}</QuestionTypography>
                <AnswerTypography variant='body1' component='p'> {constants.privacy.content}</AnswerTypography>
                </Box>
            </Container>
        
        </MainContent>
        </CreamBackgroundBox>
        </>
    )
}