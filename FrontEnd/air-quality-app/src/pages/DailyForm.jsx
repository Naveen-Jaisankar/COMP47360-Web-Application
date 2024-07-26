import React, { useState, useContext, useEffect } from 'react';
import UserContent from "../components/usercontent";
import { Box, Container, Typography, Button } from "@mui/material";
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { letterSpacing, styled } from "@mui/system";
import { ThickHeadingTypography } from "./Home";
import constants from './../constant';
import Sidebar from '../components/usersidebar';
import axiosInstance from "../../src/axios";
import { AuthContext } from '../context/AuthContext';

const QuestionTypography = styled(Typography)(({ theme }) => ({
  marginBottom: "1rem",
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: theme.palette.text.primary,
}));

const GreyBackgroundBox = styled(Box)({
  backgroundColor: "#F1F3F2",
  margin: "1rem",
  padding: "2rem",
  borderRadius: "20px",
});

export default function DailyForm() {
  const [indoorLocation, setIndoorLocation] = useState("");
  const [outdoorLocation, setOutdoorLocation] = useState("");
  const [indoorHours, setIndoorHours] = useState(0);
  const [outdoorHours, setOutdoorHours] = useState(0);
  const { userId } = useContext(AuthContext);
  const [isValidatingHours, setIsValidatingHours] = useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);


  const checkValidLocation = (indoorLocation, outdoorLocation) => {
    let isValid = false;
    let indoorCheck = false;
    let outdoorCheck = false;

    if (indoorLocation.components_array) {
      indoorLocation.components_array.forEach((component) => {
        if (component.long_name === "Manhattan" || component.short_name === "Manhattan") {
          indoorCheck = true;
        }
      });
    }

    if (outdoorLocation.components_array) {
      outdoorLocation.components_array.forEach((component) => {
        if (component.long_name === "Manhattan" || component.short_name === "Manhattan") {
          outdoorCheck = true;
        }
      });
    }

    if (indoorCheck && outdoorCheck) {
      isValid = true;
    }
    return isValid;
  };

  const check24Hours = (indoorHours, outdoorHours) => {
    let hourCheck = true;
    if (indoorHours + outdoorHours > 24) {
      hourCheck = false;
    }
    return hourCheck
  }

  const adjustHours = (indoorHours, outdoorHours) => {
    const totalHours = indoorHours + outdoorHours;

    if (totalHours === 0) {
      setIndoorHours(22);
      setOutdoorHours(2);
    } else if (totalHours < 24) {
      const indoorHourRatio = indoorHours / totalHours;
      const outdoorHourRatio = outdoorHours / totalHours;

      const leftoverHours = 24 - totalHours;
      console.log("leftover hours:" + leftoverHours)

      const newIndoorHours = Math.round(leftoverHours * indoorHourRatio);
      console.log("new indoor hours:" , newIndoorHours)
      const newOutdoorHours = Math.round(leftoverHours * outdoorHourRatio);
      console.log("new outdoor hours:", newOutdoorHours)

      let adjustedIndoorHours = indoorHours + newIndoorHours;
      let adjustedOutdoorHours = outdoorHours + newOutdoorHours;

      console.log(adjustedIndoorHours, adjustedOutdoorHours)

      if ((adjustedIndoorHours + adjustedOutdoorHours) > 24) {
        const excess = (adjustedIndoorHours + adjustedOutdoorHours) -24

        if (adjustedIndoorHours > adjustedOutdoorHours) {
          adjustedIndoorHours = adjustedIndoorHours - excess
          console.log("here in calc indoor", adjustedIndoorHours)
        } else if (adjustedOutdoorHours > adjustedIndoorHours) {
          adjustedOutdoorHours = adjustedOutdoorHours - excess
          console.log("here in calc zdoor", adjustedIndoorHours)
        }

      }
      setIndoorHours(adjustedIndoorHours);
      setOutdoorHours(adjustedOutdoorHours);
    }
  };

  useEffect(() => {
    if (isValidatingHours) {
      adjustHours(indoorHours, outdoorHours);
      setIsValidatingHours(false);
      setIsReadyToSubmit(true);
    }
  }, [isValidatingHours]);

  useEffect(() => {
    if (isReadyToSubmit) {
      handleSubmit();
    }
  }, [isReadyToSubmit]);

  const handleSubmit = async () => {
    const isValid = checkValidLocation(indoorLocation, outdoorLocation);
    const is24Hours = check24Hours(indoorHours, outdoorHours);

    let indoorLocationArray = [indoorLocation.lat, indoorLocation.lng];
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
    } else if (!is24Hours){
      alert("24 hours exceeded, number inputs are invalid");
    } else{
      try {
        await axiosInstance.post('/dailyquizscores/createDailyQuizScore', data)
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

    setIsReadyToSubmit(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsValidatingHours(true);
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
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleDrawer={toggleDrawer} />
      <UserContent className={`transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-0'} p-6`}>
        <Container sx={{ marginTop: "2rem" }}>
          <ThickHeadingTypography variant="h1" component="h1" sx={{ color: "black", paddingLeft: "1rem" }}>
            {constants.dailyForm.title}
          </ThickHeadingTypography>

          <GreyBackgroundBox>
            <form onSubmit={submitHandler}>
              <QuestionTypography variant="h4" component="h2">
                {constants.dailyForm.q1_indoorLocation}
              </QuestionTypography>
              <DailySearchbar
                value={indoorLocation.address}
                passPlaceData={handleIndoorPlaceChange}
              />

              <QuestionTypography variant="h4" component="h2">
                {constants.dailyForm.q2_indoorHours}
              </QuestionTypography>
              <CustomNumberInput
                value={indoorHours}
                onChange={handleIndoorHoursChange}
                arialabel={"Number of Hours spent indoors"}
              />
              <QuestionTypography variant="h4" component="h2">
                {constants.dailyForm.q3_outdoorLocation}
              </QuestionTypography>
              <DailySearchbar passPlaceData={handleOutdoorPlaceChange} />

              <QuestionTypography variant="h4" component="h2">
                {constants.dailyForm.q4_outdoorHours}
              </QuestionTypography>
              <CustomNumberInput
                value={outdoorHours}
                onChange={handleOutdoorHoursChange}
                arialabel={"Number of Hours spent outdoors"}
              />

              <Button type="submit">Submit</Button>
            </form>
          </GreyBackgroundBox>
        </Container>
      </UserContent>
    </div>
  );
}
