import UserContent from "../components/usercontent";
import UserPlaceholder from "../components/userplaceholder";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { useState, useEffect } from "react";
// import api from '../api/base';

export default function DailyForm() {
  const [indoorLocation, setIndoorLocation] = useState("");
  const [outdoorLocation, setOutdoorLocation] = useState("");
  const [indoorHours, setIndoorHours] = useState(0);
  const [outdoorHours, setOutdoorHours] = useState(0);
  const [maxIndoorHours, setMaxIndoorHours] = useState(24);
  const [maxOutdoorHours, setMaxOutdoorHours] = useState(24);
  const indoorFactor = 3;
  const maskFactor = 1;

  const checkValidLocation = (indoorLocation, outdoorLocation) => {
    let isValid = false;

    if (indoorLocation.components_array) {
      indoorLocation.components_array.forEach((component) => {
        console.log(component)
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
        console.log("outdoors:")
        console.log(component)
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

  // 

  // following functions are for the MOCK UP SEND

  // This function posts the location and it will return the AQI of those areas

  // const postLocationData = async (indoorLocation, outdoorLocation) => {
  //   const locationData = {indoorLocation, outdoorLocation};
  //   const response = await api.post('/', locationData)
  // // // or
  //   const response = await api.post ('/', {
  //     indoorlocation: indoorLocation,
  //     outdoorlocation: outdoorLocation,
  //   }) 

  //   // return response;
  // }

  // A less granular approach would be just a getAQIfunction
  //   const getAQI = async () => {
  //   const response = await api.get('/');
  // }
  
  // This will send the Riskscore + relevant user details
  // const postRiskScore = async (riskScore) => {
  //   const response = await api.post('/', {
  //     id: 11,
  //     riskScore: riskScore,
  //     date: new Date();
  // })

  // granular version
  // const calculateRiskScore = (indoorAQI, outdoorAQI, indoorHours, outdoorHours) => {
    // ????? No formula outlined here
  // }

  // The formula as outlined by matas
  // const calculateRiskScore = (dailyAQI, indoorHours, outdoorHours) => {
  //   const rawAQI =(dailyAQI * outdoorHours / maskFactor) + ((dailyAQI/indoorFactor) * indoorHours) ;
  //   const riskScore = rawAQI/24;
  //   return riskScore
  // }

  const submitHandler = async (e) => {
    e.preventDefault();
    
    check24Hours(indoorHours,outdoorHours)

    const isValid = checkValidLocation(indoorLocation, outdoorLocation);

    if (!isValid) {
      alert("Please choose a location in Manhattan");
    } else {
        try{
          // MOCK-UP FUNCTIONS & FLOW

    //       //const response = postLocationData(indoorLocation, outdoorLocation),
    //       // const dailyAQI = response.data.aqiAverageObject
    //       // const indoorAQI = response.data.indoorObject
    //       // const outdoorAQI = response.data.outdoorObject
    //       // const riskScore = calculateRiskScore(indoorAQI, outdoorAQI) / calculateRiskScore(dailyAQI)
    //       // postRiskScore(riskScore)

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
          console.log(`Error: ${err.message}`)
        }
    }
  };

  useEffect(() => {
    console.log("Updated maxOutdoorHours:", maxOutdoorHours);
  }, [maxOutdoorHours]);

  useEffect(() => {
    console.log("Updated maxIndoorHours:", maxIndoorHours);
  }, [maxIndoorHours]);

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

  const check24Hours = (indoorHours, outdoorHours) => {
    const totalHours = indoorHours + outdoorHours
    if (totalHours === 24) {
      // do nothing
    } else if (totalHours < 24) {
      // also validate 0 hours to double check with the user if correct input
  
      var indoorHourRatio = indoorHours/totalHours;
      var outdoorHourRatio = outdoorHours/totalHours;

      var leftoverHours = 24-totalHours;

      const newIndoorHours = Math.round(leftoverHours * indoorHourRatio)
      console.log(newIndoorHours)
      
      const newOutdoorHours = Math.round(leftoverHours * outdoorHourRatio)
      console.log(newOutdoorHours)

      const adjustedIndoorHours = indoorHours + newIndoorHours
      const adjustedOutdoorHours = outdoorHours + newOutdoorHours

      console.log(`adjusted indoors, ${adjustedIndoorHours}`)
      console.log(`adjusted outdoors, ${adjustedOutdoorHours}`)

    }

  }

  return (
    <>
      <UserPlaceholder />
      <UserContent>
        <Container
          sx={{
            marginTop: "3rem",
          }}
        >
          <Typography variant="h1" component="h1">
            Your Daily Quiz
          </Typography>

          <Box
            sx={{
              backgroundColor: "#F1F3F2",
              margin: "1rem",
              padding: "2rem",
              borderRadius: 5,
            }}
          >
            <form onSubmit={submitHandler}>
              <Typography
                variant="h4"
                component="h2"
                sx={{ marginBottom: "1rem" }}
              >
                While indoors, where did you spend most of your time?
              </Typography>
              {/* <DailySearchbar passPlaceData={handleIndoorPlaceChange} /> */}

              <Typography
                variant="h4"
                component="h2"
                sx={{ marginBottom: "1rem" }}
              >
                How many hours did you spend indoors today?
              </Typography>
              <CustomNumberInput
                value={indoorHours}
                onChange={handleIndoorHoursChange}
                max={maxIndoorHours}
              />
              <Typography
                variant="h4"
                component="h2"
                sx={{ marginBottom: "1rem" }}
              >
                While outdoors, where did you spend most of your time?
              </Typography>
              {/* <DailySearchbar passPlaceData={handleOutdoorPlaceChange} /> */}

              <Typography
                variant="h4"
                component="h2"
                sx={{ marginBottom: "1rem" }}
              >
                How many hours did you spend outdoors today?
              </Typography>
              <CustomNumberInput
                value={outdoorHours}
                onChange={handleOutdoorHoursChange}
                max={maxOutdoorHours}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Box>
        </Container>
      </UserContent>
    </>
  );
}
