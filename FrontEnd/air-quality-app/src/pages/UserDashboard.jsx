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
// let riskProfileCase = "";


// reformats the javascript date object to match with database date format
function formatJavascriptDate(dateObject) {
  let year = dateObject.getFullYear();
  let month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  let date = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${date}`;
}

// creates an array filled with latest last 7 days, this is used to compare entries in the database to see if they are "valid"
// valid meaning occuring in the last 7 days
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

// this grabs the latest entries in the database, if the data is less than a week, it will grab max amount of entries. 
function createQuizScoreWeek(response) {


  let quizScoreWeekArray = [];

  let latestResponse = response.data.reverse();
  let responseDate = ""
  let quizScore = ""

  console.log("latest Response",latestResponse)

  if (latestResponse.length < 6) {

    for (let i = latestResponse.length-1 ; i >= 0; i-- ) {
      responseDate= latestResponse[i].quizDate;
      quizScore = latestResponse[i].quizScore;
      // console.log("am in the loop", responseDate, quizScore)
      quizScoreWeekArray.push ({quizDate: responseDate, quizScore: quizScore})
    }
  } else if (latestResponse.length >= 6){
    for (let i = 6; i>=0; i--) {
      responseDate= latestResponse[i].quizDate;
      quizScore = latestResponse[i].quizScore;
      // console.log("am in the loop", responseDate, quizScore)
      quizScoreWeekArray.push ({quizDate: responseDate, quizScore: quizScore})
    }

  }
  // console.log("am out of loop", quizScoreWeekArray)
  return quizScoreWeekArray

}
  // let quizScoreWeekArray = [];
  // if (response.data.length == 0) {
  //   // do something? 
  // } else if (response.data.length < 6) {
  //   response.data = response.data.reverse();
  //   for (let i = response.data.length - 1; i >= 0; i--) {
  //     let responseDate = response.data[i].quizDate;
  //     let quizScore = response.data[i].quizScore;
  //     quizScoreWeekArray.push({ quizDate: responseDate, quizScore: quizScore });
  //   }
  // } else {
  //   for (let i = 6; i >= 0; i--) {
  //     let latestResponse = response.data.reverse();
  //     console.log(latestResponse[i])
  //     // console.log("checking out reversed response!", latestResponse)
  //     // console.log (latestResponse[0].quizDate)
  //     if (latestResponse[i]) {
  //       console.log("here in quizscore loop, why making weird formatting?", latestResponse[i].quizDate)
  //       let responseDate = latestResponse[i].quizDate;
  //       let quizScore = latestResponse[i].quizScore;
  //       quizScoreWeekArray.push({ quizDate: responseDate, quizScore: quizScore });
  //     }
  //   }
  // }
//   console.log("am here after the for loop", quizScoreWeekArray)
//   return quizScoreWeekArray;
// }

// compares the quiz entries to valid week, and stores both days where daily quiz was done (validDates)& days where daily quiz was not done (datesMissing)
function compareLatestWeek(idealWeekArray, quizScoreWeekArray) {
  console.log("ideal", idealWeekArray);
  console.log("quiz", quizScoreWeekArray);

  let validDates = [];
  let datesMissing = [];
  let todaysDate = formatJavascriptDate(new Date());

  idealWeekArray.forEach(idealWeekObject => {
    let date = idealWeekObject.quizDate; // Use 'date' key as per the initial example
    console.log("new date variable", date);

    // Find the matching quizScoreWeekObject
    let matchingQuizObject = quizScoreWeekArray.find(quizScoreWeekObject => quizScoreWeekObject.quizDate === date);
    console.log("match found!", matchingQuizObject);

    if (matchingQuizObject) {
      validDates.push(matchingQuizObject);
    } else if (date !== todaysDate) {
      datesMissing.push({ date: date }); // Push the missing date as an object for consistency
    }
  });

  console.log('Valid Dates:', validDates);
  console.log('Dates Missing:', datesMissing);

  return {
    validDates: validDates,
    datesMissing: datesMissing
  };
}

  // for (let i = 0; i < idealWeekArray.length; i++) {
  //   let found = false;
  //   for (let j = 0; j < quizScoreWeekArray.length; j++) {
  //     if (idealWeekArray[i].date === quizScoreWeekArray[j].date) {
  //       validDates.push(quizScoreWeekArray[j]);
  //       found = true;
  //       break;
  //     }
  //   }
  //   if (!found && idealWeekArray[i].date != todaysDate) {
  //     datesMissing.push({ date: idealWeekArray[i].date });
  //   }
  // }

  // return {
  //   validDates: validDates,
  //   datesMissing: datesMissing
  // };
// }

// }


  // let validDates = [];
  // let datesMissing = [];
  // let todaysDate = formatJavascriptDate(new Date());

  // for (let i = 0; i < idealWeekArray.length; i++) {
  //   let found = false;
  //   for (let j = 0; j < quizScoreWeekArray.length; j++) {
  //     if (idealWeekArray[i].date === quizScoreWeekArray[j].date) {
  //       validDates.push(quizScoreWeekArray[j]);
  //       found = true;
  //       break;
  //     }
  //   }
  //   if (!found && idealWeekArray[i].date != todaysDate) {
  //     datesMissing.push({ date: idealWeekArray[i].date });
  //   }
  // }

  // return {
  //   validDates: validDates,
  //   datesMissing: datesMissing,
  // };
// }

// populates dates missing with mock information
function populateDates(latestWeek) {
  if (latestWeek.datesMissing) {
    let datesFilled = latestWeek.datesMissing.map((dateInfo) => ({
      quizDate: dateInfo.date,
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

    let idealWeekArray = createIdealWeek();
    console.log("this is ideal week", idealWeekArray)
    let quizScoreWeekArray = createQuizScoreWeek(response);
    console.log("quizScore week", quizScoreWeekArray)
    let latestWeek = compareLatestWeek(idealWeekArray, quizScoreWeekArray);
    console.log("latest week", latestWeek)
    let filledDates = populateDates(latestWeek);
    console.log("filled dates", filledDates)
    let combinedDates = combineDates(latestWeek.validDates, filledDates);
    console.log("combined final", combinedDates)

    console.log("right before verbose", combinedDates)
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

const getTodayAQI = async (userId, setAverageAQI, setUserAQI, setRiskProfileCase) => {
  try {
    const rawResponse = await axiosInstance.get("dailyquizscores/getQuizScore/" + userId);
    console.log("in todayaqi", rawResponse.data.length)
    let latestDays = rawResponse.data.reverse();
    let latestDay = latestDays[0];

    let todayToFormat = new Date();
    let today = formatJavascriptDate(todayToFormat);

    const rawAQIresponse = await axiosInstance.get(`dailyquizscores/getaqitoday`);
    const rawAverageAQI = rawAQIresponse.data;
    const averageAQI = Math.round(rawAverageAQI);
    console.log("Average AQI from DB:", averageAQI);


    if (rawResponse.data.length == 0) {
      setRiskProfileCase( "firstUse");
      console.log("here in the firstUse case")
      console.log(riskProfileCase)
    } 
    else if (latestDay.quizDate != today) {
      setRiskProfileCase("NotYetFilled")
      console.log("No quiz score for today.");

    } else if (today === latestDay.quizDate) {
      setRiskProfileCase( "valid");

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
        <RiskProfileCard avgAQI={13} userAQI={userAQI} specialCase={riskProfileCase}/>
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
