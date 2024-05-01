
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import for fetching data based on route
import Mapper from "../Mapper"
const villageInfo = {
  // Define village information here (replace with your actual data structure)
  metpally: {
    name: 'Metpally',
    description: 'A village with a rich history and beautiful landscapes.',
    // Add more information as needed (e.g., population, schools, landmarks)
  },
};

const Metpally = () => {
  const { villageName } = useParams(); // Get village name from route parameter
  const [selectedVillage, setSelectedVillage] = useState(null);

  useEffect(() => {
    const villageData = villageInfo[villageName]; // Access village information
    setSelectedVillage(villageData);
  }, [villageName]); // Update state on route change

  return (
    <div>
      {selectedVillage ? (
        <>
          <h1>{selectedVillage.name}</h1>
          <p>{selectedVillage.description}</p>
          {/* Add more content for each village information */}
        </>
      ) : (
        <p>Loading village information...</p>
      )}
      <div>
        <Mapper/>
    </div>
    </div>
    
  );
};

export default Metpally;