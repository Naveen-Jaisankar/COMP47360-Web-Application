import { useState } from "react"
import { Container, Typography, Box } from "@mui/material"
import UserContent from "../components/usercontent"
import CustomCalendar from "../components/customcalendar"
import RiskProfileCard from "../components/riskprofilecard"
import constants from './../constant';
import Sidebar from '../components/usersidebar';

export default function UserHistory () {

    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleDrawer = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} toggleDrawer={toggleDrawer} />
            <UserContent className={`transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-0'} p-6`}>
                <Container>
                    <Box sx= {{padding: "2rem",margin: "1rem"}}>
                        <Typography variant="h3" component='h2' sx={{ marginBottom: "2rem",}}>
                            {constants.userHistory.title}
                        </Typography>

                        <Box>
                            <CustomCalendar />
                        </Box>
                    </Box>

                    <Box sx= {{ padding: "2rem"}}>
                        <Typography variant="h3" component='h2'>
                            {constants.userHistory.riskProfileTitle}
                        </Typography>

                        <RiskProfileCard />           
                    </Box>

                </Container>
            </UserContent>
        </div>
    )
}