import UserContent from "../components/usercontent";
import UserPlaceholder from "../components/userplaceholder";
import { Box, Container, Typography, Button, Modal } from "@mui/material";
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { useState, useRef } from "react";
import { borderRadius, display, styled } from "@mui/system";
import { ThickHeadingTypography } from "./Home";
import constants from "./../constant";
import Sidebar from "../components/usersidebar";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

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

const style = {
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  justifyContent: "center",
  borderRadius: "20px"
};

export default function DailyForm() {
  const [indoorLocation, setIndoorLocation] = useState("");
  const [outdoorLocation, setOutdoorLocation] = useState("");
  const [indoorHours, setIndoorHours] = useState(0);
  const [outdoorHours, setOutdoorHours] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const indoorSbarTextRef = useRef();
  const outdoorSbarTextRef = useRef();

  // Validation functions

  // checks if location is in Manhattan
  const checkValidLocation = (indoorLocation, outdoorLocation) => {
    let isValid = false;
    let indoorCheck = false;
    let outdoorCheck = false;

    // If the location has loaded, check each component within the array if they match with the word "Manhattan"
    // if so, the location is valid. This accounts for less detailed/more detailed addresses with more/less components within the array.

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

        handleOpen()
        // alert("Form submitted :D");

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
              <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  
                  <Box sx={style}>
                    <Box sx={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     justifyContent: "center",
                     height: "100%"
                    }}>
                      <TaskAltIcon 
                    // fontSize= "large"
                    color = 'success'
                    sx={{
                      paddingBottom: "1rem",
                      fontSize: "10rem"
                    }}
                    />
                    <Typography
                      id="modal-modal-title"
                      variant="h4"
                      component="h2"
                    >
                      {}
                      Form Submitted
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Thank you!
                    </Typography>
                   
                    </Box>
                    
                  
                    
                  </Box>
                </Modal>
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </GreyBackgroundBox>
        </Container>
      </UserContent>
    </div>
  );
}
