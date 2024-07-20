import UserContent from "../components/usercontent";
import UserPlaceholder from "../components/userplaceholder";
import { Box, Container, Typography, Button } from "@mui/material";
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { useState, useRef } from "react";
import { styled } from "@mui/system";
import { ThickHeadingTypography } from "./Home";
import constants from "./../constant";
import Sidebar from "../components/usersidebar";
import CustomModal from "../components/custommodal";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../components/loadingscreen";

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

export default function DailyForm() {
  const [indoorLocation, setIndoorLocation] = useState("");
  const [outdoorLocation, setOutdoorLocation] = useState("");
  const [indoorHours, setIndoorHours] = useState(0);
  const [outdoorHours, setOutdoorHours] = useState(0);
  const modalRef = useRef(); // Create a ref for the modal

  const indoorSbarTextRef = useRef();
  const outdoorSbarTextRef = useRef();
  const navigate = useNavigate(); // Get the navigate function

  // Validation functions

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

    if (indoorCheck === true && outdoorCheck === true) {
      isValid = true;
    }
    return isValid;
  };

  const check24Hours = (indoorHours, outdoorHours) => {
    let hourCheck = true;
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

      const adjustedIndoorHours = indoorHours + newIndoorHours;
      const adjustedOutdoorHours = outdoorHours + newOutdoorHours;

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

    if (!isValid) {
      alert("Please choose a location in Manhattan");
    } else if (!is24Hours) {
      alert("24 hours exceeded, number inputs are invalid");
    } else {
      try {
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
  };

  // Form input functions

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
  };

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleDrawer = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleModalClose = (redirectUrl = '/user-dashboard') => {
    navigate(redirectUrl);
  };

  return (
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
                arialabel={"Number of Hours spent indoors"}
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
  );
}
