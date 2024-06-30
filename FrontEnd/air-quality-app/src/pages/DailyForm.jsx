import UserContent from "../components/usercontent";
import UserPlaceholder from "../components/userplaceholder";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { useState, useEffect } from "react";
import pm_dictionary from "../components/aqi-pm25-dictionary";
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


  // following functions are for the MOCK UP SEND

  // This function posts the location and it will return the AQI of those areas

  // const postIndoorLocationData = async (indoorLocation) => {
  // try{
  //   const indoorLocationData = {
  //     loc_lat: indoorLocation.lat,
  //     loc_lon: indoorLocation.lng
  //   };
    
  //   const indoorResponse = await api.post('/predict_with_location', indoorLocationData)
  //   return indoorResponse.data.predicted_aqi;
  // } catch(error){
  //   console.error("Error posting indoor location data", error)
  //   throw error;
  // }
  // }

  // const postOutdoorLocationData = async (outdoorLocation) => {
  //   try{
  //     const outdoorLocationData = {
  //       loc_lat: outdoorLocation.lat,
  //       loc_lon: outdoorLocation.lng
  //     };
      
  //     const outdoorResponse = await api.post('/predict_with_location', outdoorLocationData)
  //     return outdoorResponse.data.predicted_aqi;
  //   } catch(error){
  //     console.error("Error posting outdoor location data", error)
  //     throw error;
  //   }
  //   }

  // These will only return AQI and need to converted to PM2.5

// const pmConverter = (aqiData) => {
//   const pmData = pm_dictionary[Math.round(aqiData)]
//   return pmData

// }

//  Get User ID

// const getID() = async () => {
//   const idResponse = await api.get('/')
//   return idResponse
// }

// Calculate Score

  // const calculateRiskScore = (indoorPM, outdoorPM, indoorHours, outdoorHours) => {
  //   const rawPM =(outdoorPM * outdoorHours / maskFactor) + ((indoorPM/indoorFactor) * indoorHours) ;
  //   const riskScore = rawPM/24;
  //   return riskScore
  // }

    // This will send the Riskscore + relevant user details
  // const postRiskScore = async (riskScore, id) => {
  //   const response = await api.post('/', {
  //     id: 11,
  //     riskScore: riskScore,
  //     date: new Date();
  // })


  const submitHandler = async (e) => {
    e.preventDefault();
    
    check24Hours(indoorHours,outdoorHours)

    const isValid = checkValidLocation(indoorLocation, outdoorLocation);

    if (!isValid) {
      alert("Please choose a location in Manhattan");
    } else {
        try{
          // MOCK-UP FUNCTIONS & FLOW
          // const indoorAQI = postIndoorLocationData(indoorLocation)
          // const outdoorAQI = postOutdoorLocationData(outdoorLocation)
          // const indoorPM = pmConverter(indoorAQI)
          // const outdoorPM = pmConverter(outdoorAQI)
          // const riskScore = calculateRiskScore(indoorPM, outdoorPM, indoorHours, outdoorHours)
          // const id = getID()
          // postRiskScore(riskScore,id)

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
              <DailySearchbar passPlaceData={handleIndoorPlaceChange} />

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
              <DailySearchbar passPlaceData={handleOutdoorPlaceChange} />

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
