import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Infocard from "../components/infocard";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../../src/axios";
import { useContext } from "react";
const image1 = "../src/static/proxy-image.png";

// Get the data
// Generate an array of week based of today's date to compare our values with.

// CheckLatestWeek(response)
// On a week by week basis, should not accept data that is greater than a week old.
// if null portray NULL
// compare and grab valid dates and return validDates
// pass onto
// PopulateWeekWithMock(response)
// Filling in the average value AQI value save for values of TODAY reject it.
// pass onto
// CheckToday(response)
// compare new Date() === response.data.quizDate at the latest then render from there on in//
// RenderData

let noData = false;

function formatJavascriptDate(dateObject) {
  let year = dateObject.getFullYear();
  let month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  let date = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${date}`;
}

function createValidWeek() {
  let today = new Date();
  let validWeekArray = [];

  for (let i = 6; i >= 0; i--) {
    let pastDate = new Date();
    pastDate.setDate(today.getDate() - i);
    let formattedDate = formatJavascriptDate(pastDate);
    // console.log(formattedDate)
    validWeekArray.push({ date: formattedDate });
  }
  console.log("valid week", validWeekArray);
  return validWeekArray;
}

// Grabs 7 entries from the database regardless of the gap between entries.
// Creates a tuple only has the date + the quizscore.
function createQuizScoreWeek(response) {
  let quizScoreWeekArray = [];

  // essentially grab as much data as possible
  // validation check if data.length is greater than 7 then collect 7
  // if data.length is less than 7 entries then collect till max amount of length

  if (response.data.length == 0) {
    noData = true;
  //  if we do not have enough information to populate this will only iterate through the available dates
  } else if (response.data.length < 6) {

    for (let i = response.data.length - 1; i >= 0; i--) {
      let date = response.data[i].quizDate;
      let quizScore = response.data[i].quizScore;
      quizScoreWeekArray.push({date: date, quizScore: quizScore});
    }
     // if we have more entries than 7, this only grab 7
  } else {

    for (let i = 6; i >= 0; i--) {
      if (response.data[i]) {
        let date = response.data[i].quizDate;
        let quizScore = response.data[i].quizScore;
        quizScoreWeekArray.push({ date: date, quizScore: quizScore });
      }
    }
  }

  console.log("this is quizScore week in function", quizScoreWeekArray);
  return quizScoreWeekArray;
}

// Compares the data from the database to the our range of "valid" dates & ignore todays date as missing
function compareLatestWeek(validWeekArray, quizScoreWeekArray) {
  let validDates = [];
  let datesMissing = [];
  let todaysDate = formatJavascriptDate(new Date())

    for (let i = 0; i < validWeekArray.length; i++) {
        let found = false; 
        for (let j = 0; j < quizScoreWeekArray.length; j++) {
            if (validWeekArray[i].date === quizScoreWeekArray[j].date) {
                validDates.push(quizScoreWeekArray[j]);
                found = true;
                break;
            }
        }
        if (!found && validWeekArray[i].date != todaysDate) {
          datesMissing.push({date: validWeekArray[i].date});
        }
    }

    console.log("in compareLatestWeek, datesMissing", datesMissing)
    console.log("in compareLatestWeek, valid dates", validDates)
    return {
      validDates: validDates,
      datesMissing: datesMissing,
    }
}

function populateDates(latestWeek){
  if (latestWeek.datesMissing) {
    let datesFilled = latestWeek.datesMissing.map(dateInfo => ({
      date: dateInfo.date,
      quizScore: 12
    }));

    console.log("Dates filled", datesFilled)
    return datesFilled
  }

}

function renderDates (validDates, datesFilled) {
 const combineDates = validDates.concat(datesFilled)

  combineDates.sort(function(a,b) {
  return new Date(a.date) - new Date(b.date);
  });
  
  return combineDates

}



function testDateObject(value) {
  return typeof value === "string";
}

// Function to get the last 7 days with formatted dates
const getLastSevenDays = (userId) => {
  

  axiosInstance
    .get("dailyquizscores/getQuizScore/" + userId)
    .then(function (response) {
      console.log(response);
      console.log("length", response.data.length);
      // let date;
      // date = response.data[0].quizDate;
      // console.log(date);
      // let result = testDateObject(date);
      // console.log(result);

      let validWeekArray = createValidWeek();
      console.log("this is valid week dates", validWeekArray)

      let quizScoreWeekArray = createQuizScoreWeek(response);
      console.log("this is quizScore Week", quizScoreWeekArray);

      let latestWeek = compareLatestWeek(validWeekArray, quizScoreWeekArray)
      console.log("this is the valid Dates", latestWeek)

      let filledDates = populateDates(latestWeek)
      console.log("this is the filled Dates", filledDates)

      let combineDates = renderDates(latestWeek.validDates,filledDates)
      console.log("this is combined dates", combineDates)


     
      


    });

  const today = new Date();
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    // Determine if it's today or yesterday
    let label;
    if (i === 0) {
      label = "Today";
    } else if (i === 1) {
      label = "Yesterday";
    } else {
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      });
      label = `${dayName} - ${formattedDate}`;
    }
    // User input from daily quiz and model input needs to be put in here!
    days.push({
      day: label,
      PersonalExposure: (Math.random() * 100).toFixed(2),
      AQI: (Math.random() * 100).toFixed(2),
    });
  }

  return days;
};

const DashBoard = ({ isSidebarOpen }) => {
  const [data, setData] = useState([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    setData(getLastSevenDays(userId));
  }, []);

  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? "ml-60" : "ml-0"
      } p-6`}
    >
      <header className="flex justify-between items-center mb-8">
        <Typography variant="h4">Your Dashboard</Typography>
      </header>
      <section className="mb-8">
        <div className="p-4 rounded shadow-md">
          <Box className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  {/* Gradient for AQI */}
                  <linearGradient id="colorAQI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
                  </linearGradient>
                  {/* Gradient for PersonalExposure */}
                  <linearGradient
                    id="colorPersonalExposure"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  label={{
                    position: "bottom",
                    offset: 0,
                    style: { textAnchor: "middle" },
                  }}
                  angle={0}
                  textAnchor="middle"
                />
                <YAxis
                  label={{
                    value: "Air Quality Index (AQI)",
                    angle: -90,
                    position: "left",
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {/* Area (AQI) */}
                <Area
                  type="monotone"
                  dataKey="AQI"
                  stroke="#ff7300"
                  fillOpacity={1}
                  fill="url(#colorAQI)"
                />
                {/* Area (PersonalExposure) */}
                <Area
                  type="monotone"
                  dataKey="PersonalExposure"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorPersonalExposure)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          <Typography variant="h6">Summary:</Typography>
          <Typography variant="body1">
            • Spent x minutes in low to medium pollution, spent x minutes in
            high pollution.
          </Typography>
        </div>
      </section>
      <section>
        <Typography variant="h5" className="mb-4">
          Suggested Actions
        </Typography>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array(3).fill().map((_, index) => (
            <Infocard
              image={image1}
              alt="Image Alt Text"
              heading="Funky fact"
              text="More info"
            />
          ))}
        </div> */}
      </section>
      <section className="mt-8">
        <div className="bg-black text-white p-4 rounded shadow-md">
          <Typography variant="body1">
            Looking for more personalised suggestions? Try our additional
            assessment{" "}
            <a href="#" className="text-blue-400">
              here
            </a>
            .
          </Typography>
        </div>
      </section>
    </div>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ payload, label }) => {
  if (!payload || payload.length === 0) return null;

  const { PersonalExposure, AQI } = payload[0].payload;

  return (
    <div className="custom-tooltip p-2 bg-white border rounded shadow">
      <p className="label">{label}</p>
      <p className="desc">
        <strong>Personal Exposure:</strong> {PersonalExposure}
      </p>
      <p className="desc">
        <strong>AQI:</strong> {AQI}
      </p>
      {PersonalExposure > AQI && (
        <p className="highlight text-red-500">
          <strong>Alert:</strong> Personal Exposure is above AQI
        </p>
      )}
    </div>
  );
};

export default DashBoard;

DashBoard.propTypes = {
  isSidebarOpen: PropTypes.bool,
};

CustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        PersonalExposure: PropTypes.number.isRequired,
        AQI: PropTypes.number.isRequired,
      }),
    })
  ).isRequired,
  label: PropTypes.string,
};
