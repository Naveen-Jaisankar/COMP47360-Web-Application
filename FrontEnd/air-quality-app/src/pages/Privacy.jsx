import { Box, Container } from "@mui/system";
// import { List, ListItem, Typography } from "@mui/material"
import MainContent from "../components/maincontent";
import { styled } from "@mui/system";
import { CreamBackgroundBox } from "./Home";
import constants from "./../constant";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {useNavigate} from 'react-router-dom'

const QuestionTypography = styled(Typography)({
  fontSize: "3rem",
  fontWeight: 420,
});

const AnswerTypography = styled(Typography)({
  fontSize: "2rem",
  marginBottom: "2rem",
  marginTop: "1rem"
});

export default function Privacy() {
    const navigate = useNavigate();

    const handleClick= () => {
        navigate('/register')
    }
  return (
    <>
      <CreamBackgroundBox
        sx={{
          minWidth: "100vw",
        }}
      >
        <MainContent
          sx={{
            backgroundColor: "#f7f7f2",
          }}
        >
          <Container
            sx={{
              padding: 0,
              backgroundColor: "#f7f7f2",
            }}
          >
            {/* Header section */}
            <Box
              sx={{
                marginBottom: "3rem",
              }}
            >
              <Typography variant="h2" component="h1">
                {constants.privacy.title}
              </Typography>
              <Box sx={{
                marginTop: "1rem"
              }}>
              <Typography variant="body2">{constants.privacy.datepublished}</Typography>
              <Typography variant="body2">{constants.privacy.lastupdated}</Typography>
              </Box>
              <AnswerTypography variant="body1" component="p">
                {constants.privacy.introduction}
              </AnswerTypography>
            </Box>

            {/* Information section */}
            <Box>
              <QuestionTypography variant="h3" component="h2">
                {constants.privacy.q1_personalData}
              </QuestionTypography>
              <AnswerTypography variant="body1" component="p">
                {constants.privacy.content1}
              </AnswerTypography>

              <QuestionTypography variant="h3" component="h2">
                {constants.privacy.q2_useOfPersonalData}
              </QuestionTypography>
              <AnswerTypography variant="body1" component="p">
                {constants.privacy.content2}
              </AnswerTypography>

              <List
                sx={{
                  marginTop: -4,
                  paddingLeft: 2,
                }}
              >
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText primary={constants.privacy.l1} />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText primary={constants.privacy.l2} />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText primary={constants.privacy.l3} />
                </ListItem>
              </List>

              <QuestionTypography variant="h3" component="h2">
                {constants.privacy.q3_sharingOfPersonalData}
              </QuestionTypography>
              <AnswerTypography variant="body1" component="p">
                {" "}
                {constants.privacy.content3}
              </AnswerTypography>
            </Box>
            <Button variant="contained"
            onClick={handleClick}
            size="large"
          sx={{
            marginTop: "2rem",
            margin: "auto",
            backgroundColor: "#0D1B2A"
          }}>Back to Register Page</Button>
          </Container>
          
        </MainContent>
       
      </CreamBackgroundBox>
      
      
    </>
  );
}
