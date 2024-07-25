import React, { useState, useEffect, useContext } from "react";
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
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../../src/axios";
import RiskProfileCard from "../components/riskprofilecard";

const image1 = "../src/static/proxy-image.png";

let noData = false;

// reformats the javascript date object to match with database date format
function formatJavascriptDate(dateObject) {
  let year = dateObject.getFullYear();
  let month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  let date = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${date}`;
}

// creates an array filled with latest last 7 days, this is used to compare entries in the database to see if they are "valid"
// valid meaning occuring in the last 7 days
function createValidWeek() {
  let today = new Date();
  let validWeekArray = [];

  for (let i = 6; i >= 0; i--) {
    let pastDate = new Date();
    pastDate.setDate(today.getDate() - i);
    let formattedDate = formatJavascriptDate(pastDate);
    validWeekArray.push({ date: formattedDate });
  }
  return validWeekArray;
}

// this grabs the latest entries in the database, if the data is less than a week, it will grab max amount of entries. 
function createQuizScoreWeek(response) {
  let quizScoreWeekArray = [];
  if (response.data.length == 0) {
    noData = true;
  } else if (response.data.length < 6) {
    response.data = response.data.reverse();
    for (let i = response.data.length - 1; i >= 0; i--) {
      let date = response.data[i].quizDate;
      let quizScore = response.data[i].quizScore;
      quizScoreWeekArray.push({ date: date, quizScore: quizScore });
    }
  } else {
    for (let i = 6; i >= 0; i--) {
      response.data = response.data.reverse();
      if (response.data[i]) {
        let date = response.data[i].quizDate;
        let quizScore = response.data[i].quizScore;
        quizScoreWeekArray.push({ date: date, quizScore: quizScore });
      }
    }
  }
  return quizScoreWeekArray;
}

// compares the quiz entries to valid week, and stores both days where daily quiz was done (validDates)& days where daily quiz was not done (datesMissing)
function compareLatestWeek(validWeekArray, quizScoreWeekArray) {
  let validDates = [];
  let datesMissing = [];
  let todaysDate = formatJavascriptDate(new Date());

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
      datesMissing.push({ date: validWeekArray[i].date });
    }
  }

  return {
    validDates: validDates,
    datesMissing: datesMissing,
  };
}

// populates dates missing with mock information
function populateDates(latestWeek) {
  if (latestWeek.datesMissing) {
    let datesFilled = latestWeek.datesMissing.map((dateInfo) => ({
      date: dateInfo.date,
      quizScore: 6,
    }));
    return datesFilled;
  }
}

// combines both the now filled dates and the valid dates
function combineDates(validDates, datesFilled) {
  const combinedDates = validDates.concat(datesFilled);

  combinedDates.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  return combinedDates;
}

// renders the date information is user friendly way.
function renderUserFriendlyDate(combinedDatesToChange) {

  combinedDatesToChange.forEach((combinedDate) => {

    let toConvertDate = new Date(combinedDate.date);
    let convertedDate = toConvertDate.toDateString();
    combinedDate.date = convertedDate
  }
  )

  return combinedDatesToChange
}

const getLastSevenDays = async (userId) => {
  try {
    const response = await axiosInstance.get("dailyquizscores/getQuizScore/" + userId);

    let validWeekArray = createValidWeek();
    // console.log("this is valid week", validWeekArray)
    let quizScoreWeekArray = createQuizScoreWeek(response);
    // console.log("quizScore week", quizScoreWeekArray)
    let latestWeek = compareLatestWeek(validWeekArray, quizScoreWeekArray);
    // console.log("latest week", latestWeek)
    let filledDates = populateDates(latestWeek);
    // console.log("filled dates", filledDates)
    let combinedDates = combineDates(latestWeek.validDates, filledDates);
    // console.log("combined final", combinedDates)

    // console.log("right before verbose", combinedDates)
    let verboseDays = renderUserFriendlyDate(combinedDates)

    const daysToRender = verboseDays.map((dateEntry) => ({
      day: dateEntry.date,
      PersonalExposure: Math.round(dateEntry.quizScore),
    }));

    return daysToRender;
  } catch (error) {
    console.error("Error fetching quiz scores:", error);
    return [];
  }
};

const getTodayAQI = async (userId) => {
  try {
    const rawResponse = await axiosInstance.get("dailyquizscores/getQuizScore/" + userId);
    const latestDays = rawResponse.data.reverse()
    const latestDay = latestDays[0]
    console.log(latestDay)
  } catch (error) {
    console.error("Error fetching quiz scores:", error);
    return [];
  }
}

const CustomTooltip = ({ payload, label }) => {
  if (!payload || payload.length === 0) return null;

  const { PersonalExposure, AQI } = payload[0].payload;

  return (
    <div className="custom-tooltip p-2 bg-white border rounded shadow">
      <p className="label">{label}</p>
      <p className="desc">
        <strong>Personal Exposure:</strong> {PersonalExposure}
      </p>
    </div>
  );
};

const DashBoard = ({ isSidebarOpen }) => {
  const [data, setData] = useState([]);
  const [aqi, setAQI] = useState("")
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const days = await getLastSevenDays(userId);
      setData(days);
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const responseAQIData = axiosInstance.get(`dailyquizscores/getaqitoday`)
    getTodayAQI(userId)
    // console.log('this is the responseAQI',responseAQIData)
    // setAQI(responseAQIData)
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
                  <linearGradient id="colorAQI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorPersonalExposure"
                    x1="0"
                    y1="0"
                    x2="0" y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
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
            • Spent x minutes in low to medium pollution, spent x minutes in high pollution.
          </Typography>
        </div>
      </section>
      <section>
        <Typography variant="h5" className="mb-4">
          Suggested Actions
        </Typography>
      </section>
      <section className="mt-8">
        <div className="bg-black text-white p-4 rounded shadow-md">
          <Typography variant="body1">
            Looking for more personalised suggestions? Try our additional
            assessment{" "}
            <a href="#" className="text-blue-400">
              here
            </a>
          </Typography>
        </div>
      </section>
      <section>
        <RiskProfileCard avgAQI= {aqi} />
      </section>
    </div>
  );
};

DashBoard.propTypes = {
  isSidebarOpen: PropTypes.bool,
};

CustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        PersonalExposure: PropTypes.number.isRequired,
      }),
    })
  ).isRequired,
  label: PropTypes.string,
};

export default DashBoard;
