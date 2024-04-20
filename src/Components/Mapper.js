import React, { useState, useEffect } from 'react';
import ImageMapper from 'react-img-mapper';
import imgmapjpg from '../Images/korutla_const_map.jpg';
import imgmapjson from '../Images/imagemap.json';

// const Mapper = props => {
//   const URL = imgmapjpg;
//   const [mapData, setMapData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("Image URL:", URL);
//     console.log("JSON Data:", imgmapjson);
  
//     fetch(imgmapjson) // Adjusted path
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log("Fetched JSON Data:", data);
//         setMapData(data);
//       })
//       .catch(error => setError(error));
//   }, []);
  

//   if (error) {
//     console.error('Error loading image map:', error);
//     return <div>Error loading image map. Please try again later.</div>;
//   }

//   if (!mapData) {
//     return <div>Loading...</div>;
//   }

//   const MAP = {
//     name: 'image-map',
//     areas: mapData,
//   };

//   return <ImageMapper src={URL} map={MAP} />;
// }
let ss ="a";
const containerStyle = {
    display: 'flex',
  };

  const columnStyle = {
    flex: 1,
    padding: '20px',
    border: '1px solid #ccc',
    margin: '0 10px',
  };

const Mapper = props => {
    const URL = imgmapjpg;
    const convertCoords = (coordsStr) =>
    coordsStr.split(',').map((coord) => parseInt(coord, 10));

  const MAP = {
    name: 'image-map',
    areas: imgmapjson?.map((area) => ({
      ...area,
      // Convert coords string to array of integers before passing it to ImageMapper
      coords: convertCoords(area.coords),
    })),
  };
  const [hoverName, setHoverName] = useState('');

  
    
    return (
        <div style={containerStyle}>
      <div style={columnStyle}>
        <h2>Column 1</h2>
        <ImageMapper src={URL} map={MAP} 
    onMouseEnter={(area) =>  {
        setHoverName(area.name);
        ss = area.names;
    console.log(`Hovering over: ${area.title} test {hoverName :}`, area.names,hoverName)}} />
        {/* Add more content for column 1 */}
      </div>
      <div style={columnStyle}>
        <h2>Column 2</h2>
        <p>{hoverName}</p>
        <p>{ss}</p>
        <p>Data 4</p>
        {/* Add more content for column 2 */}
      </div>
    </div>
   
   
    )
// return (
//     <div className="image-container">  
     
//         <div className="hover-data">
//           {/* Loop through areas and display hover data on mouseEnter */}
//           {MAP.areas.map((area) => (
//             <div key={area.title}> 
//               <ImageMapper
//                 key={area.title} 
//                 src={URL}
//                 map={MAP}
//                 onMouseEnter={() => console.log(`Hovering over: ${area.title}`, area.names)}
//                 // Replace console.log with your desired hover data display logic (e.g., tooltip component)
//               />
//             </div>
//           ))}
//         </div>
        
//     </div>
// )  
}

export default Mapper;
