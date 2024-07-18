import React from 'react';
import { Nested } from '@alptugidin/react-circular-progress-bar';

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PieChartComponent = ({ data }) => {
  // Transform the data into the format required by Nested
  const circles = data.map(item => ({
    text: item.name,
    value: item.value,
    color: getRandomColor(),  // Generate a random color for each item
  }));

  return (
    <div className="h-96 w-full rounded-lg border-gray-300/55">
      <Nested
        circles={circles}
        sx={{
          bgColor: '#cbd5e1',
          fontWeight: 'bold',
          fontFamily: 'Trebuchet MS',
          strokeLinecap: 'round',
          loadingTime: 1000,
          valueAnimation: true,
          intersectionEnabled: true
        }}
      />
    </div>
  );
};

export default PieChartComponent;
