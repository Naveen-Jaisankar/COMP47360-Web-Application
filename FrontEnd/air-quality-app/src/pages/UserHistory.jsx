import { Container, Typography, Box } from "@mui/material";
import UserContent from "../components/usercontent";
import CustomCalendar from "../components/customcalendar";
import RiskProfileCard from "../components/riskprofilecard";
import constants from './../constant';

export default function UserHistory() {
    return (
        <div className="flex">
            <UserContent sx={{ backgroundColor: "#f7f7f2" }}>
                <Container>
                    <Box
                        sx={{
                            padding: { xs: "1rem", sm: "2rem" },
                            margin: { xs: "0.5rem", sm: "1rem" },
                        }}
                    >
                        <Typography
                            variant="h3"
                            component='h2'
                            sx={{
                                fontSize: { xs: "2rem", sm: "3rem" },
                                marginBottom: { xs: "1rem", sm: "2rem" },
                            }}
                        >
                            {constants.userHistory.title}
                        </Typography>

                        <Box>
                            <CustomCalendar />
                        </Box>
                    </Box>

                    <Box sx={{ padding: { xs: "1rem", sm: "2rem" } }}>
                        <Typography
                            variant="h3"
                            component='h2'
                            sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
                        >
                            {constants.userHistory.riskProfileTitle}
                        </Typography>

                        <RiskProfileCard />
                    </Box>
                </Container>
            </UserContent>
        </div>
    );
}
