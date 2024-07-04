import { Container, Typography, Box } from "@mui/material"
import UserContent from "../components/usercontent"
import UserPlaceholder from "../components/userplaceholder"
import CustomCalendar from "../components/customcalendar"
import RiskProfileCard from "../components/riskprofilecard"
import constants from './../constant';

export default function UserHistory () {
    return (
        <>
        <UserPlaceholder />
        <UserContent sx={{
            backgroundColor: "#f7f7f2"
        }}>
        <Container>
            <Box sx= {{
                padding: "2rem",
                margin: "1rem"
            }}>
                <Typography variant="h3" component='h2' sx={{
                    fontSize: "3rem",
                    marginBottom: "2rem",
                }}>{constants.userHistory.title}</Typography>

                <Box>
                
                <CustomCalendar />
                </Box>

            </Box>

            <Box sx= {{
                padding: "2rem"
            }}>
                <Typography variant="h3" component='h2' sx={{
                    fontSize: "3rem"
                }}>{constants.userHistory.riskProfileTitle}</Typography>
                <RiskProfileCard />

               
                    
            </Box>

        </Container>
        </UserContent>
        </>
    )
}