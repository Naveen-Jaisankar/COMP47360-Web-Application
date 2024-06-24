import UserContent from "../components/usercontent"
import UserPlaceholder from "../components/userplaceholder"
import { Box, Container, Typography, TextField } from '@mui/material';
import {SearchIcon} from '@mui/icons-material/Search'
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { useState } from "react";

export default function DailyForm () {
    return (
        <>
        <UserPlaceholder />
        <UserContent>

            <Container sx={{
                marginTop: "3rem",
            }}>

            
            <Typography variant="h1" component='h1'>Your Daily Quiz</Typography>

            <Box sx={{
                backgroundColor: "#F1F3F2",
                margin: "1rem",
                padding: "2rem",
                borderRadius: 5,
            }}>
            
            <Typography variant="h4" component='h2' sx={{ marginBottom: "1rem"}}>While indoors, where did you spend most of your time?</Typography>
            <DailySearchbar></DailySearchbar>

            <Typography variant="h4" compnent='h2'  sx={{ marginBottom: "1rem"}}>How many hours did you spend indoors today?</Typography>
            <CustomNumberInput />
            <Typography variant="h4" component='h2'  sx={{ marginBottom: "1rem"}}>While outdoors, where did you spend most of your time?</Typography>
            <DailySearchbar></DailySearchbar>

            <Typography variant="h4" component='h2'  sx={{ marginBottom: "1rem"}}>How many hours did you spend indoors today?</Typography>
            <CustomNumberInput />


            </Box>

          

            </Container>
        
        </UserContent>
        </>
    )
}