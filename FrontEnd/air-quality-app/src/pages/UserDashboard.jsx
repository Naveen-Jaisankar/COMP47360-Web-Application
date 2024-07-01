import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Infocard from "../components/infocard";

const image1 = "../src/static/proxy-image.png";

const data = [
  { day: 'Monday', value: 2 },
  { day: 'Tuesday', value: 5.5 },
  { day: 'Wednesday', value: 2 },
  { day: 'Thursday', value: 8.5 },
  { day: 'Friday', value: 1.5 },
  { day: 'Saturday', value: 5 },
  { day: 'Sunday', value: 14 }
];

const DashBoard = ({ isSidebarOpen }) => {
  return (
    <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-0'} p-6`}>
      <header className="flex justify-between items-center mb-8">
        <Typography variant="h4">Your Dashboard</Typography>
      </header>
      <section className="mb-8">
        <div className=" p-4 rounded shadow-md">
          <Box className="w-full h-64 md:h-80 lg:h-96">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
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
