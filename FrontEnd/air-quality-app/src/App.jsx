import React from 'react';
import { Button } from '@mui/material';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">
        Welcome to Your Vite + React App
      </h1>
      <p className="mb-4 text-lg text-red-700">
        This is a simple example of using Tailwind CSS with a Material-UI button.
      </p>
      <Button variant="contained" color="primary">
        Material-UI Button
      </Button>
    </div>
  );
}

export default App;

