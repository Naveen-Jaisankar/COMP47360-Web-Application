import UserContent from "../components/usercontent";
import UserPlaceholder from "../components/userplaceholder";
import { Box, Container, Typography, Button } from "@mui/material";
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";

const QuestionTypography = styled(Typography)(({ theme }) => ({
  marginBottom: "1rem",
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: theme.palette.text.primary,
}));

const GreyBackgroundBox = styled(Box) ({
  backgroundColor: "#F1F3F2",
  margin: "1rem",
  padding: "2rem",
  borderRadius: 5,
});

export default function DailyForm() {
  const [indoorLocation, setIndoorLocation] = useState("");
  const [outdoorLocation, setOutdoorLocation] = useState("");
  const [indoorHours, setIndoorHours] = useState(0);
  const [outdoorHours, setOutdoorHours] = useState(0);
  const [maxIndoorHours, setMaxIndoorHours] = useState(24);
  const [maxOutdoorHours, setMaxOutdoorHours] = useState(24);

  // Validation functions

  // checks if location is in Manhattan
  const checkValidLocation = (indoorLocation, outdoorLocation) => {
    let isValid = false;

    // If the location has loaded, check each component within the array if they match with the word "Manhattan"
    // if so, the location is valid. This accounts for less detailed/more detailed addresses with more/less components within the array.

    if (indoorLocation.components_array) {
      indoorLocation.components_array.forEach((component) => {
        console.log(component);
        if (
          component.long_name === "Manhattan" ||
          component.short_name === "Manhattan"
        ) {
          isValid = true;
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
          isValid = true;
        }
      });
    }
    return isValid;
  };

  // checks if the user has inputted 24 hours, if not this function will proportionately "fill" the rest of hours
  // based of users input. If input is 0, it will take the "average day" spent indoors/outdoors i.e. 2 hours indoors/22 hours outdoors
  const check24Hours = (indoorHours, outdoorHours) => {
    const totalHours = indoorHours + outdoorHours;
    if (totalHours === 24) {
      // do nothing
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
    }
  }

  // Submission function

  const submitHandler = async (e) => {
    e.preventDefault();

    check24Hours(indoorHours, outdoorHours);
    const isValid = checkValidLocation(indoorLocation, outdoorLocation);

    if (!isValid) {
      alert("Please choose a location in Manhattan");
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
        alert("Form submitted :D");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  // Form input functions

    const handleIndoorHoursChange = (event, newValue) => {
      const indoorValue = newValue;
      setIndoorHours(indoorValue);
      setMaxOutdoorHours(24 - indoorValue);
    };

    const handleOutdoorHoursChange = (event, newValue) => {
      const outdoorValue = newValue;
      setOutdoorHours(outdoorValue);
      setMaxIndoorHours(24 - outdoorValue);
    };

    const handleIndoorPlaceChange = (placeData) => {
      setIndoorLocation(placeData);
    };

    const handleOutdoorPlaceChange = (placeData) => {
      setOutdoorLocation(placeData);
    };

  return (
    <>
      <UserPlaceholder />
      <UserContent>
        <Container
          sx={{
            marginTop: "2rem",
          }}
        >
          <Typography variant="h1" component="h1">
            Your Daily Quiz
          </Typography>

          <GreyBackgroundBox>
            <form onSubmit={submitHandler}>
              <QuestionTypography variant="h4" component="h2">
                While indoors, where did you spend most of your time?
              </QuestionTypography>
              <DailySearchbar passPlaceData={handleIndoorPlaceChange} />

              <QuestionTypography variant="h4" component="h2">
                How many hours did you spend indoors today?
              </QuestionTypography>
              <CustomNumberInput
                value={indoorHours}
                onChange={handleIndoorHoursChange}
                max={maxIndoorHours}
                arialabel={"Number of Hours spent indoors"}
              />
              <QuestionTypography variant="h4" component="h2">
                While outdoors, where did you spend most of your time?
              </QuestionTypography>
              <DailySearchbar passPlaceData={handleOutdoorPlaceChange} />

              <QuestionTypography variant="h4" component="h2">
                How many hours did you spend outdoors today?
              </QuestionTypography>
              <CustomNumberInput
                value={outdoorHours}
                onChange={handleOutdoorHoursChange}
                max={maxOutdoorHours}
                arialabel={"Number of Hours spent indoors"}
              />

              <Button type="submit">Submit</Button>
            </form>
          </GreyBackgroundBox>
        </Container>
      </UserContent>
    </>
  );
}
