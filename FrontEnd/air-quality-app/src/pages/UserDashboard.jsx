import React from 'react';
import { Card, CardContent, Typography, Avatar,Box} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Infocard from "../components/infocard";

const image1 = "../src/static/proxy-image.png";

const DashBoard = ({ isSidebarOpen }) => {
  return (
    <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-0'} p-6`}>
      <header className="flex justify-between items-center mb-8">
        <Typography variant="h4">Your Dashboard</Typography>
      </header>
      <section className="mb-8">
        <div className=" p-4 rounded shadow-md">
          <Box className="w-full h-64 md:h-80 lg:h-96 "> <LineChart xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]} 
          series={[ { data: [2, 5.5, 2, 8.5, 1.5, 5], area: true, }, ]} width={500} height={300} /> 
          </Box>
          <Typography variant="h6">Summary:</Typography>
          <Typography variant="body1">
            • Spent x minutes in low to medium pollution, spent x minutes in high pollution.
          </Typography>
        </div>
      </section>
      <section>
        <Typography variant="h5" className="mb-4">Suggested Actions</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array(3).fill().map((_, index) => (

            <Infocard
                  image={image1}
                  alt="Image Alt Text"
                  heading="Funky fact"
                  text="More info"
                />
            
          ))}
        </div>
      </section>
      <section className="mt-8">
        <div className="bg-black text-white p-4 rounded shadow-md">
          <Typography variant="body1">Looking for more personalised suggestions? Try our additional assessment <a href="#" className="text-blue-400">here</a>.</Typography>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
