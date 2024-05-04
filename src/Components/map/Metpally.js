
import React, { useState, useEffect } from 'react';
import { useParams , Link} from 'react-router-dom'; 
// Import for fetching data based on route
import Mapper from "../Mapper"
const villageInfo = {
  // Define village information here (replace with your actual data structure)
  metpally: {
    name: 'Metpally',
    description: 'A village with a rich history and beautiful landscapes.',
    villages:["Arapet", "Athmakur", "Athmanagar", "Chintalpet", "Chowlamaddi", "Jaggasagar", "Konaraopet", "Kondrikarla", "Metlachittapur", "Metpalli", "Ramalachakkapet", "Rangaraopet", "Vellulla", "Vempet", "Venkatraopet"],
    // Add more information as needed (e.g., population, schools, landmarks)
  },
  korutla: {
    name: 'Korutla',
    description: 'A village with a rich history and beautiful landscapes.',
    villages:["Ailapur", "Chinnametpally", "Gumlapur", "Joganpalli", "Kallur", "Korutla", "Madhapur", "Mohan Rao Pet", "Nagulapet", "Paidimadugu", "Peddapur", "Sangam", "Sarparajpally", "Venkatapur", "Yakeenpur", "Yousuf Nagar"],
    // Add more information as needed (e.g., population, schools, landmarks)
  },
  mallapur: {
    name: 'Mallapur',
    description: 'A village with a rich history and beautiful landscapes.',
    villages:["Chittapur", "Dharmaram", "Gorrepally", "Gundam Pally", "Kustapoor", "Mallapur", "Moglipet", "Muthyampet", "Nadikuda", "New Dhamrajpally", "Obulapur", "Old Dhamrajpally", "Raghavapet", "Rathnapur", "Regunta", "Satharam", "Sirpoor", "Valgondla", "Vempally", "Venkatraopet" ],
    // Add more information as needed (e.g., population, schools, landmarks)
  },
  ibrahimpatnam: {
    name: 'Ibrahimpatnam',
    description: 'A village with a rich history and beautiful landscapes.',
    villages:["Ammakkapet", "Bandalingapur", "Bardipur", "Dabba", "Eradandi", "Errapur", "Fakir Kondapur", "Gudur", "Ibrahimpatnam", "Keshavapur", "Kojan Kothur", "Komatikondapur", "Maidpally", "Mularampur", "Rajeshwar Raopet", "Shathakkapally", "Thimmapur", "Varshakonda", "Vemulakurthy", "Yamapur"  ],
    // Add more information as needed (e.g., population, schools, landmarks)
  }

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
          <br/>
          

          <div className="d-flex flex-wrap">
                      <span> Villages: </span> {selectedVillage.villages.map(tag => (
                            <Link key={tag} to={`/${tag.toLowerCase()}`} className="btn btn-outline-secondary m-1">{tag}</Link>
                        ))}
                    </div>

        </>
      ) : (
        <p>Loading village information...</p>
      )}
      <div>
        
    </div>
    </div>
    
  );
};

export default Metpally;