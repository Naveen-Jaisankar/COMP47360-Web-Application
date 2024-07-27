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
import CustomCalendar from "../components/customcalendar";
import { color, textAlign } from "@mui/system";

const image1 = "../src/static/proxy-image.png";

// Reformats the JavaScript date object to match with database date format
function formatJavascriptDate(dateObject) {
  let year = dateObject.getFullYear();
  let month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  let date = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${date}`;
}

// Creates an array filled with the last 7 days, used to compare entries in the database
function createIdealWeek() {
  let today = new Date();
  let idealWeekArray = [];

  for (let i = 6; i >= 0; i--) {
    let pastDate = new Date();
    pastDate.setDate(today.getDate() - i);
    let formattedDate = formatJavascriptDate(pastDate);
    idealWeekArray.push({ quizDate: formattedDate });
  }
  return idealWeekArray;
}

// This function grabs the latest entries in the database and processes them
function createQuizScoreWeek(response) {
  let quizScoreWeekArray = [];
  let latestResponse = response.data.slice(-7); // Last 7 entries or less

  console.log("latest Response:", latestResponse);

  for (let i = 0; i < latestResponse.length; i++) {
    let responseDate = latestResponse[i].quizDate || ""; 
    let quizScore = latestResponse[i].quizScore || 0; 

    // Check if responseDate is valid
    if (new Date(responseDate).toString() === "Invalid Date") {
      console.error("Invalid date:", responseDate);
      continue;
    }

    quizScoreWeekArray.push({ quizScore, quizDate: responseDate });
  }

  console.log("Final quizScoreWeekArray:", quizScoreWeekArray);
  return quizScoreWeekArray;
}

// Compares the quiz entries to the ideal week and stores both valid dates and missing dates
function compareLatestWeek(idealWeekArray, quizScoreWeekArray) {
  console.log("ideal", idealWeekArray);
  console.log("quiz", quizScoreWeekArray);

  let validDates = [];
  let datesMissing = [];
  let todaysDate = formatJavascriptDate(new Date());

  idealWeekArray.forEach(idealWeekObject => {
    let date = idealWeekObject.quizDate; //
    console.log("new date variable", date);

    // Find the matching quizScoreWeekObject
    let matchingQuizObject = quizScoreWeekArray.find(quizScoreWeekObject => quizScoreWeekObject.quizDate === date);

    if (matchingQuizObject) {
      validDates.push(matchingQuizObject);
    } else if (date !== todaysDate) {
      datesMissing.push({ date: date });
    }
  });

  console.log('Valid Dates:', validDates);
  console.log('Dates Missing:', datesMissing);

  return {
    validDates: validDates,
    datesMissing: datesMissing
  };
}

// Populates dates missing with mock information
function populateDates(latestWeek) {
  if (latestWeek.datesMissing) {
    let datesFilled = latestWeek.datesMissing.map((dateInfo) => ({
      quizDate: dateInfo.date,
      quizScore: 6,
    }));
    return datesFilled;
  }
  return [];
}

// Combines both the now filled dates and the valid dates
function combineDates(validDates, datesFilled) {
  const combinedDates = validDates.concat(datesFilled);

  combinedDates.sort(function (a, b) {
    return new Date(a.quizDate) - new Date(b.quizDate);
  });

  return combinedDates;
}

// Renders the date information in a user-friendly way
function renderUserFriendlyDate(combinedDatesToChange) {
  combinedDatesToChange.forEach((combinedDate) => {
    let toConvertDate = new Date(combinedDate.quizDate);
    let convertedDate = toConvertDate.toDateString();
    combinedDate.quizDate = convertedDate;
  });

  return combinedDatesToChange;
}

// Fetches the last seven days of data
const getLastSevenDays = async (userId) => {
  try {
    const response = await axiosInstance.get("dailyquizscores/getQuizScore/" + userId);

    let idealWeekArray = createIdealWeek();
    console.log("this is ideal week", idealWeekArray);
    let quizScoreWeekArray = createQuizScoreWeek(response);
    console.log("quizScore week", quizScoreWeekArray);
    let latestWeek = compareLatestWeek(idealWeekArray, quizScoreWeekArray);
    console.log("latest week", latestWeek);
    let filledDates = populateDates(latestWeek);
    console.log("filled dates", filledDates);
    let combinedDates = combineDates(latestWeek.validDates, filledDates);
    console.log("combined final", combinedDates);

    console.log("right before verbose", combinedDates);
    let verboseDays = renderUserFriendlyDate(combinedDates);

    const daysToRender = verboseDays.map((dateEntry) => ({
      day: dateEntry.quizDate,
      PersonalExposure: Math.round(dateEntry.quizScore),
    }));

    return daysToRender;
  } catch (error) {
    console.error("Error fetching quiz scores:", error);
    return [];
  }
};

// Renders Risk Profile Card using two endpoints.
const getTodayAQI = async (userId, setAverageAQI, setUserAQI, setRiskProfileCase) => {
  try {
    const rawResponse = await axiosInstance.get("dailyquizscores/getQuizScore/" + userId);
    console.log("in todayaqi", rawResponse.data.length);
    let latestDays = rawResponse.data.reverse();
    let latestDay = latestDays[0];

    let todayToFormat = new Date();
    let today = formatJavascriptDate(todayToFormat);

    const rawAQIresponse = await axiosInstance.get(`dailyquizscores/getaqitoday`);
    const rawAverageAQI = rawAQIresponse.data;
    const averageAQI = Math.round(rawAverageAQI);
    console.log("Average AQI from DB:", averageAQI);

    if (rawResponse.data.length === 0) {
      setRiskProfileCase("firstUse");
      console.log("here in the firstUse case");
    } else if (latestDay.quizDate !== today) {
      setRiskProfileCase("NotYetFilled");
      console.log("No quiz score for today.");
    } else if (today === latestDay.quizDate) {
      setRiskProfileCase("valid");

      let rawUserAQI = latestDay.quizScore;
      let userAQI = Math.round(rawUserAQI);
      console.log("User AQI from DB:", userAQI);
      setUserAQI(userAQI);
      setAverageAQI(averageAQI);
    }
  } catch (error) {
    console.error("Error fetching latest day:", error);
  }
}


const CustomTooltip = ({ payload, label }) => {
  if (!payload || payload.length === 0) return null;

  const { PersonalExposure} = payload[0].payload;

  return (
    <div className="custom-tooltip p-2 bg-white border rounded shadow">
      <div className="label">
        <Typography sx={{
          color: "black"
        }}>{label}</Typography></div>
      <div className="desc">
        <Typography sx={{
          color: "black",}
        }>Personal Exposure: {PersonalExposure}</Typography> 
      </div>
    </div>
  );
};

const DashBoard = ({ isSidebarOpen }) => {
  const [data, setData] = useState([]);
  const [averageAQI, setAverageAQI] = useState(0)
  const [userAQI, setUserAQI] = useState(0)
  const { userId } = useContext(AuthContext);
  const [riskProfileCase, setRiskProfileCase] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const days = await getLastSevenDays(userId);
      setData(days);
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    getTodayAQI(userId, setAverageAQI, setUserAQI, setRiskProfileCase)
    console.log(userAQI)
    console.log(averageAQI)
    console.log(riskProfileCase)
  }, [userId]);

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
{/* 
      <section>
        <UserHistory />
      </section> */}
      
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
      <div className="flex flex-col gap-3">
        <RiskProfileCard avgAQI={averageAQI} userAQI={userAQI} specialCase={riskProfileCase} />
          <CustomCalendar />
      </div>
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
        PersonalExposure: PropTypes.number,
        payload: PropTypes.number
      }),
    })
  ),
  label: PropTypes.string,
};

export default DashBoard;
