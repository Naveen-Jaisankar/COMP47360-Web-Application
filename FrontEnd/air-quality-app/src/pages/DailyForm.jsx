import UserContent from "../components/usercontent";
import { Box, Container, Typography, Button } from "@mui/material";
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { useState, useContext } from 'react';
import { styled, useTheme } from "@mui/system";
import {ThickHeadingTypography} from "./Home";
import constants from './../constant';
import Sidebar from '../components/usersidebar';
import axiosInstance from "../../src/axios";
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const QuestionTypography = styled(Typography)(({ theme }) => ({
  marginBottom: "1rem",
  fontWeight: "bold",
  color: theme.palette.text.primary,
}));

const GreyBackgroundBox = styled(Box) (({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#0D1B2A' : "#F1F3F2",
  margin: "1rem",
  padding: "2rem",
  borderRadius: "20px",
  borderColor: theme.palette.mode === 'dark' ? '#F7F7F2' : "black",
  borderStyle: 'solid',
  borderWidth: 4,
}));

// image from https://fearlesstravels.com/the-streets-of-new-york/
const bannerImage = "../src/static/backgroundDaily.jpg"

export default function DailyForm() {
  const [indoorLocation, setIndoorLocation] = useState("");
  const [outdoorLocation, setOutdoorLocation] = useState("");
  const [indoorHours, setIndoorHours] = useState(0);
  const [outdoorHours, setOutdoorHours] = useState(0);
  const { userId } = useContext(AuthContext); // Get userId from AuthContext  const theme = useTheme();
  const theme = useTheme();

  // Validation functions

  // checks if location is in Manhattan
  const checkValidLocation = (indoorLocation, outdoorLocation) => {
    let isValid = false;
    let indoorCheck = false;
    let outdoorCheck = false;

    if (indoorLocation.components_array) {
      indoorLocation.components_array.forEach((component) => {
        console.log(component);
        if (
          component.long_name === "Manhattan" ||
          component.short_name === "Manhattan"
        ) {
          indoorCheck = true;
        }
      });
    }

    if (outdoorLocation.components_array) {
      outdoorLocation.components_array.forEach((component) => {
        console.log("outdoors:");
        console.log(component);
        if (
          component.long_name === "Manhattan" ||
          component.short_name === "Manhattan"
        ) {
          outdoorCheck = true;
        }
      });
    }

    if (indoorCheck === true && outdoorCheck === true) {
      isValid = true;
    }
    return isValid;
  };

  // checks if the user has inputted 24 hours, if not this function will proportionately "fill" the rest of hours
  // based of users input. If input is 0, it will take the "average day" spent indoors/outdoors i.e. 2 hours indoors/22 hours outdoors
  const check24Hours = (indoorHours, outdoorHours) => {
    let hourCheck = true;
    const totalHours = indoorHours + outdoorHours;
    if (totalHours === 0) {
      setIndoorHours(22);
      setOutdoorHours(2);
    } else if (totalHours < 24) {
      var indoorHourRatio = indoorHours / totalHours;
      var outdoorHourRatio = outdoorHours / totalHours;

      var leftoverHours = 24 - totalHours;

      const newIndoorHours = Math.round(leftoverHours * indoorHourRatio);
      console.log(newIndoorHours);

      const newOutdoorHours = Math.round(leftoverHours * outdoorHourRatio);
      console.log(newOutdoorHours);

      const adjustedIndoorHours = indoorHours + newIndoorHours;
      const adjustedOutdoorHours = outdoorHours + newOutdoorHours;

      console.log(`adjusted indoors, ${adjustedIndoorHours}`);
      console.log(`adjusted outdoors, ${adjustedOutdoorHours}`);

      setIndoorHours(adjustedIndoorHours)
      setOutdoorHours(adjustedOutdoorHours)
    } else if (totalHours > 24){
      hourCheck = false;
    }

    return hourCheck;
  }

  // Submission function
  const submitHandler = async (e) => {
    e.preventDefault();

    const is24Hours = check24Hours(indoorHours, outdoorHours);
    const isValid = checkValidLocation(indoorLocation, outdoorLocation);

    let indoorLocationArray = [indoorLocation.lat ,indoorLocation.lng];
    let outdoorLocationArray = [outdoorLocation.lat, outdoorLocation.lng];

    let indoorLocationToSend = indoorLocationArray.toString();
    let outdoorLocationToSend = outdoorLocationArray.toString();

    const data = {
      user_id: userId, // Use userId from AuthContext
      quiz_date: new Date(),
      indoor_location: indoorLocationToSend,
      outdoor_location: outdoorLocationToSend,
      indoor_hours: indoorHours,
      outdoor_hours: outdoorHours,
    };

    if (!isValid) {
      alert("Please choose a location in Manhattan");
    } else if (!is24Hours) {
      alert("24 hours exceeded, number inputs are invalid");
    } else {
      try {
        axiosInstance.post('/dailyquizscores/createDailyQuizScore', data)
        .then(response => {
          console.log("Data sent successfully!", response);
        })
        .catch(error => {
          console.error("There was an error sending the data!", error);
        });

        alert("Form submitted");

        setIndoorLocation("");
        setOutdoorLocation("");
        setIndoorHours(0);
        setOutdoorHours(0);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleIndoorHoursChange = (event, newValue) => {
    setIndoorHours(newValue);
  };

  const handleOutdoorHoursChange = (event, newValue) => {
    setOutdoorHours(newValue);
  };

  const handleIndoorPlaceChange = (placeData) => {
    setIndoorLocation(placeData);
  };

  const handleOutdoorPlaceChange = (placeData) => {
    setOutdoorLocation(placeData);
  };

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleDrawer = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleDrawer={toggleDrawer} />
      <Box
    sx={{
      backgroundImage:`url(${bannerImage})`,
      backgroundSize: "cover",
      width: '100%',
      height: '100%',
      minHeight: "95vh"

    }}>
      <UserContent className={`transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-0'} p-6`}>
        <Container sx={{
          marginTop: "2rem",
          marginLeft: "-3rem",
        }}>
          <ThickHeadingTypography variant="h2" component="h1" sx={{ 
            color:theme.palette.mode === 'dark' ? "#F1F3F2" : "white",
            paddingLeft: "1rem"}}>
            {constants.dailyForm.title}
          </ThickHeadingTypography>

          <GreyBackgroundBox>
            <form onSubmit={submitHandler}>
              <QuestionTypography variant="h5" component="h2">
                {constants.dailyForm.q1_indoorLocation}
              </QuestionTypography>
              <DailySearchbar 
                value={indoorLocation.address || ""} 
                passPlaceData={handleIndoorPlaceChange} 
              />

              <QuestionTypography variant="h5" component="h2">
                {constants.dailyForm.q2_indoorHours}
              </QuestionTypography>
              <CustomNumberInput
                value={indoorHours}
                onChange={handleIndoorHoursChange}
                arialabel={"Number of Hours spent indoors"}
              />
              <QuestionTypography variant="h5" component="h2">
               {constants.dailyForm.q3_outdoorLocation}
              </QuestionTypography>
              <DailySearchbar passPlaceData={handleOutdoorPlaceChange} />

              <QuestionTypography variant="h5" component="h2">
               {constants.dailyForm.q4_outdoorHours}
              </QuestionTypography>
              <CustomNumberInput
                value={outdoorHours}
                onChange={handleOutdoorHoursChange}
                arialabel={"Number of Hours spent indoors"}
              />
               <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      width: "200px", // Set a fixed width for the button
                    }}
                  >
                    {constants.dailyForm.submitButton}
                  </Button>
                </Box>
            </form>
          </GreyBackgroundBox>
        </Container>
      </UserContent>
      </Box>
    </div>
  
  </>
  );
}
