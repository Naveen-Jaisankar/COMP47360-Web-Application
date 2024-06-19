import { Container, Typography, Box, Paper} from "@mui/material"
import UserContent from "../components/usercontent"
import UserPlaceholder from "../components/userplaceholder"
import CustomCalendar from "../components/customcalendar"

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
                }}>Your History</Typography>

                <Box>
                
                <CustomCalendar />
                </Box>

            </Box>

            <Box sx= {{
                padding: "2rem"
            }}>
                <Typography variant="h3" component='h2' sx={{
                    fontSize: "3rem"
                }}>Your Risk Profile</Typography>

               
                    
            </Box>

        </Container>
        </UserContent>
        </>
    )
}