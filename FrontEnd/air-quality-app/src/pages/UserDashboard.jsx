import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Infocard from "../components/infocard";

const image1 = "../src/static/proxy-image.png";

const data = [
  { day: 'Monday', PersonalExposure: 20, AQI: 40 },
  { day: 'Tuesday', PersonalExposure: 60, AQI: 50 },
  { day: 'Wednesday', PersonalExposure: 25, AQI: 35 },
  { day: 'Thursday', PersonalExposure: 9, AQI: 80 },
  { day: 'Friday', PersonalExposure: 24.5, AQI: 85 },
  { day: 'Saturday', PersonalExposure: 31.2, AQI: 60 },
  { day: 'Sunday', PersonalExposure: 17, AQI: 48.2 }
];

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

const DashBoard = ({ isSidebarOpen }) => {
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
            Looking for more personalised suggestions? Try our additional assessment <a href="#" className="text-blue-400">here</a>.
          </Typography>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
