import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Grid } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Infocard from "../components/infocard";
import RecommendationCard from "../components/recommendationcard";
import PropTypes from 'prop-types';

const image1 = "../src/static/proxy-image.png";
const healthImages = {
  thumbs_up: "../src/static/thumbs_up.png",
  water_bottle: "../src/static/water_bottle.png",
  thermometer_low: "../src/static/thermometer_low.png",
  face_mask: "../src/static/face_mask.png",
  house: "../src/static/house.png",
  thermometer_high: "../src/static/thermometer_high.png",
  newspaper: "../src/static/newspaper.jpg",
  doctor: "../src/static/doctor.png"
};

// Function to get the last 7 days with formatted dates
const getLastSevenDays = () => {
  const today = new Date();
  const days = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Determine if it's today or yesterday
    let label;
    if (i === 0) {
      label = 'Today';
    } else if (i === 1) {
      label = 'Yesterday';
    } else {
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
      label = `${dayName} - ${formattedDate}`;
    }
    // User input from daily quiz and model input needs to be put in here!
    days.push({ day: label, PersonalExposure: (Math.random() * 100).toFixed(2), AQI: (Math.random() * 100).toFixed(2) });
  }

  return days;
};

const UserDashboard = ({ isSidebarOpen }) => {
  const [data, setData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const lastSevenDaysData = getLastSevenDays();
    setData(lastSevenDaysData);
    setRecommendations(getRecommendations(lastSevenDaysData));

    // Uncomment this section to enable the GET request
    // const fakeID = 1;
    // axios.get(`/api/dailyquizscores/${fakeID}`)
    //   .then(function (response) {
    //     console.log(response);
    //     // Use the response data to update the state if needed
    //   })
    //   .catch(function (error) {
    //     console.error('There was an error making the GET request!', error);
    //   });
  }, []);

  const getRecommendations = (data) => {
    // Example logic for recommendations
    const lastDayData = data[data.length - 1];
    const personalExposure = parseFloat(lastDayData.PersonalExposure);
    const recs = [];

    if (personalExposure < 30) {
      recs.push({
        image: healthImages.thumbs_up,
        title: 'Keep up the good work!',
        description: 'Your personal exposure is low. Continue maintaining your healthy habits.',
      });
      recs.push({
        image: healthImages.water_bottle,
        title: 'Stay Hydrated!',
        description: 'Drinking plenty of water helps your body to fight off the pollutants.',
      });
    } else if (personalExposure < 70) {
      recs.push({
        image: healthImages.thermometer_low,
        title: 'Moderate Exposure',
        description: 'Your exposure is moderate. Try to avoid outdoor activities during peak pollution hours.',
      });
      recs.push({
        image: healthImages.face_mask,
        title: 'Wear a Mask',
        description: 'Consider wearing a mask if you need to go outside during high pollution times.',
      });
      recs.push({
        image: healthImages.house,
        title: 'Indoor Activities',
        description: 'Plan indoor activities to reduce your exposure to air pollution.',
      });
    } else {
      recs.push({
        image: healthImages.thermometer_high,
        title: 'High Exposure Alert',
        description: 'Your exposure is high. Stay indoors and use air purifiers if possible.',
      });
      recs.push({
        image: healthImages.newspaper,
        title: 'Check Air Quality',
        description: 'Regularly check air quality updates to plan your outdoor activities accordingly.',
      });
      recs.push({
        image: healthImages.doctor,
        title: 'Consult a Doctor',
        description: 'If you feel unwell, consult a doctor especially if you have respiratory issues.',
      });
    }

    return recs.slice(0, 3);
  };

  return (
    <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-0'} p-6`}>
      <header className="flex justify-between items-center mb-8">
        <Typography variant="h4">Your Dashboard</Typography>
      </header>
      <section className="mb-8">
        <div className="p-4 rounded shadow-md">
          <Box className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  {/* Gradient for AQI */}
                  <linearGradient id="colorAQI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
                  </linearGradient>
                  {/* Gradient for PersonalExposure */}
                  <linearGradient id="colorPersonalExposure" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="day" 
                  label={{position: 'bottom', offset: 0, style: { textAnchor: 'middle' } }}
                  angle={0}
                  textAnchor="middle"
                />
                <YAxis 
                  label={{ value: 'Air Quality Index (AQI)', angle: -90, position: 'left', style: { textAnchor: 'middle' } }}
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
            • Spent x minutes in low to medium pollution, spent x minutes in high pollution.
          </Typography>
        </div>
      </section>
      <section>
        <Typography variant="h5" className="mb-4">Suggested Actions</Typography>
        <Grid container spacing={2}>
          {recommendations.map((rec, index) => (
            <Grid item xs={12} md={4} key={index}>
              <RecommendationCard
                image={rec.image}
                title={rec.title}
                description={rec.description}
              />
            </Grid>
          ))}
        </Grid>
      </section>
      <section className="mt-8">
        <div className="bg-black text-white p-4 rounded shadow-md">
          <Typography variant="body1">
            Looking for more personalised suggestions? Try our additional assessment <a href="#" className="text-blue-400">here</a>.
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

export default UserDashboard;

UserDashboard.propTypes = {
  isSidebarOpen: PropTypes.bool,
};

CustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        PersonalExposure: PropTypes.number.isRequired,
        AQI: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
};