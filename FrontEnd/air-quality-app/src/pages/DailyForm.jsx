import React, { useState, useContext, useEffect } from 'react';
import UserContent from "../components/usercontent";
import { Box, Container, Typography, Button } from "@mui/material";
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { useState, useContext, useRef } from 'react';
import { styled } from "@mui/system";
import { ThickHeadingTypography } from "./Home";
import constants, { dailyForm } from "./../constant";
import Sidebar from "../components/usersidebar";
import CustomModal from "../components/custommodal";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../components/loadingscreen";
import axiosInstance from "../../src/axios";
import { AuthContext } from '../context/AuthContext';

const QuestionTypography = styled(Typography)(({ theme }) => ({
  marginBottom: "1rem",
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: theme.palette.text.primary
}));

const GreyBackgroundBox = styled(Box)({
  backgroundColor: "#F1F3F2",
  margin: "1rem",
  padding: "2rem",
  borderRadius: "20px"
});

const redirectText = constants.dailyForm.loadingText

export default function DailyForm() {
  const [indoorLocation, setIndoorLocation] = useState("");
  const [outdoorLocation, setOutdoorLocation] = useState("");
  const [indoorHours, setIndoorHours] = useState(0);
  const [outdoorHours, setOutdoorHours] = useState(0);
  const [isLoading, setIsLoading]= useState(false)
  const { userId } = useContext(AuthContext); // Get userId from AuthContext  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef();

  const indoorSbarTextRef = useRef();
  const outdoorSbarTextRef = useRef();
  const navigate = useNavigate();


  const checkValidLocation = (indoorLocation, outdoorLocation) => {
    let isValid = false;
    let indoorCheck = false;
    let outdoorCheck = false;

    if (indoorLocation.components_array) {
      indoorLocation.components_array.forEach((component) => {
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
        if (
          component.long_name === "Manhattan" ||
          component.short_name === "Manhattan"
        ) {
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

      const newIndoorHours = Math.round(leftoverHours * indoorHourRatio);
      const newOutdoorHours = Math.round(leftoverHours * outdoorHourRatio);

      let adjustedIndoorHours = indoorHours + newIndoorHours;
      let adjustedOutdoorHours = outdoorHours + newOutdoorHours;

      setIndoorHours(adjustedIndoorHours);
      setOutdoorHours(adjustedOutdoorHours);
    } else if (totalHours > 24) {
      hourCheck = false;
    }

    return hourCheck;
  };

  // Submission function
  const submitHandler = async (e) => {
    e.preventDefault();

    const is24Hours = check24Hours(indoorHours, outdoorHours);
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
    } else  {
      try {
        await axiosInstance.post('/dailyquizscores/createDailyQuizScore', data)
          .then(response => {
            console.log("Data sent successfully!", response);
          })
          .catch(error => {
            console.error("There was an error sending the data!", error);
          });

        alert("Form submitted");
        console.log(`Indoor Hours: ${indoorHours}`);
        console.log(`Outdoor Hours: ${outdoorHours}`);
        console.log(`Indoor Location: ${indoorLocation.address}`);
        console.log(`Indoor Lat: ${indoorLocation.lat}`);
        console.log(`Indoor Lng: ${indoorLocation.lng}`);
        console.log(`Outdoor Location: ${outdoorLocation.address}`);
        console.log(`Outdoor Lat: ${outdoorLocation.lat}`);
        console.log(`Outdoor Lng: ${outdoorLocation.lng}`);

        modalRef.current.openModal(); // Open the modal using the ref

        setIndoorLocation("");
        setOutdoorLocation("");
        setIndoorHours(0);
        setOutdoorHours(0);

        if (indoorSbarTextRef.current) {
          indoorSbarTextRef.current.handleReset();
        }

        if (outdoorSbarTextRef.current) {
          outdoorSbarTextRef.current.handleReset();
        }

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
    const indoorValue = newValue;
    setIndoorHours(indoorValue);
  };

  const handleOutdoorHoursChange = (event, newValue) => {
    const outdoorValue = newValue;
    setOutdoorHours(outdoorValue);
  };

  const handleIndoorPlaceChange = (placeData) => {
    setIndoorLocation(placeData);
  };

  const handleOutdoorPlaceChange = (placeData) => {
    setOutdoorLocation(placeData);
  }

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleDrawer = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleModalClose = (redirectUrl = '/user-dashboard') => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(redirectUrl);
    }, 1500);
  };

  return (
    <>
    {isLoading ? (
      <LoadingScreen loadingtext={constants.dailyForm.loadingText}/>
    ) : (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleDrawer={toggleDrawer} />
      <UserContent
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-60" : "ml-0"
        } p-6`}
      >
        <Container sx={{ marginTop: "1rem" }}>
          <ThickHeadingTypography
            variant="h1"
            component="h1"
            sx={{ color: "black", paddingLeft: "1rem" }}
          >
            {constants.dailyForm.title}
          </ThickHeadingTypography>

          <GreyBackgroundBox>
            <form onSubmit={submitHandler}>
              <QuestionTypography variant="h4" component="h2">
                {constants.dailyForm.q1_indoorLocation}
              </QuestionTypography>
              <DailySearchbar
                passPlaceData={handleIndoorPlaceChange}
                ref={indoorSbarTextRef}
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
              <DailySearchbar
                passPlaceData={handleOutdoorPlaceChange}
                ref={outdoorSbarTextRef}
              />

              <QuestionTypography variant="h4" component="h2">
                {constants.dailyForm.q4_outdoorHours}
              </QuestionTypography>
              <CustomNumberInput
                value={outdoorHours}
                onChange={handleOutdoorHoursChange}
                arialabel={"Number of Hours spent outdoors"}
              />

              <CustomModal
                ref={modalRef}
                title={constants.dailyForm.modalTitle}
                description={constants.dailyForm.modalThankYou}
                IconComponent={TaskAltIcon}
                iconColor="green"
                // Comment/ uncomment below to test redirect.
                onClose={() => handleModalClose('/user/dashboard')} 
              />

              <CustomModal
                ref={modalRef}
                title={constants.dailyForm.modalTitle}
                description={constants.dailyForm.modalThankYou}
                IconComponent={TaskAltIcon}
                iconColor="green"
                // Comment/ uncomment below to test redirect.
                onClose={() => handleModalClose('/user/dashboard')} 
              />

              <Button type="submit">Submit</Button>
            </form>
          </GreyBackgroundBox>
        </Container>
      </UserContent>
    </div>
    )}
    </>
  );
}
