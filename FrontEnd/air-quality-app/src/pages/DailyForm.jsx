import UserContent from "../components/usercontent"
import UserPlaceholder from "../components/userplaceholder"
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import {SearchIcon} from '@mui/icons-material/Search'
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { useState, useEffect } from "react";

export default function DailyForm () {
    const [indoorLocation, setIndoorLocation] = useState('')
    const [outdoorLocation, setOutdoorLocation] = useState('')
    const [indoorHours, setIndoorHours] = useState(0);
    const [outdoorHours, setOutdoorHours] = useState(0);
    const [maxIndoorHours, setMaxIndoorHours] = useState(24);
    const [maxOutdoorHours, setMaxOutdoorHours] = useState(24)


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(`Indoor Hours: ${indoorHours}`);
        console.log (`Outdoor Hours: ${outdoorHours}`);
        console.log(`Indoor Location: ${indoorLocation.address}`);
        console.log(`Indoor Lat: ${indoorLocation.lat}`);
        console.log(`Indoor Lng: ${indoorLocation.lng}`);
        console.log(`Outdoor Location: ${outdoorLocation.address}`);
        console.log(`Outdoor Lat: ${outdoorLocation.lat}`);
        console.log(`Outdoor Lng: ${outdoorLocation.lng}`);
    };

    useEffect(()=> {
        console.log("Updated maxOutdoorHours:", maxOutdoorHours)
    }, [maxOutdoorHours])

    useEffect(()=> {
        console.log("Updated maxIndoorHours:", maxIndoorHours)
    }, [maxIndoorHours])

    const handleIndoorHoursChange = (event, newValue) => {
        const indoorValue = newValue;
        setIndoorHours(indoorValue);
        setMaxOutdoorHours(24-indoorValue)
    }

    const handleOutdoorHoursChange = (event, newValue) => {
        const outdoorValue = newValue;
        setOutdoorHours(outdoorValue);
        setMaxIndoorHours(24-outdoorValue); 
    }

    const handleIndoorPlaceChange = (placeData) => {
        setIndoorLocation(placeData)
    }

    const handleOutdoorPlaceChange = (placeData) => {
        setOutdoorLocation(placeData)
    }

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
            
            <form onSubmit={submitHandler}>
            
            <Typography variant="h4" component='h2' sx={{ marginBottom: "1rem"}}>While indoors, where did you spend most of your time?</Typography>
            <DailySearchbar passPlaceData={handleIndoorPlaceChange}/>

            <Typography variant="h4" compnent='h2'  sx={{ marginBottom: "1rem"}}>How many hours did you spend indoors today?</Typography>
            <CustomNumberInput  value={indoorHours} onChange={handleIndoorHoursChange} max={maxIndoorHours}
                />
            <Typography variant="h4" component='h2'  sx={{ marginBottom: "1rem"}}>While outdoors, where did you spend most of your time?</Typography>
            <DailySearchbar passPlaceData={handleOutdoorPlaceChange}/>

            <Typography variant="h4" component='h2'  sx={{ marginBottom: "1rem"}}>How many hours did you spend outdoors today?</Typography>
            <CustomNumberInput  value={outdoorHours} onChange={handleOutdoorHoursChange} max={maxOutdoorHours} />

            <Button type="submit" >Submit</Button>
            </form>

            </Box>

            </Container>
        
        </UserContent>
        </>
    )
}