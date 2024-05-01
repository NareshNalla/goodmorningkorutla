import React, { useState } from 'react';
import ImageMapper from 'react-img-mapper';
import imgmapjpg from '../Images/korutla_const_map.jpg';
import imgmapjson from '../Images/imagemap.json';

const Mapper = props => {
  const URL = imgmapjpg;
  const convertCoords = (coordsStr) =>
    coordsStr.split(',').map((coord) => parseInt(coord, 10));

  const [hoverName, setHoverName] = useState('');
  const [hoveredNames, setHoveredNames] = useState([]);

  const handleMouseEnter = (area) => {
    setHoverName(area.name);
    setHoveredNames(area.names);
  };

  const renderNames = () => {
    // Check if hoveredNames is an array (assuming names are stored as an array in the JSON)
    if (!Array.isArray(hoveredNames)) {
      return null;  // No list to render if hoveredNames is not an array
    }

    return (
      <ul>
        {hoveredNames.map(element => (  // Use map instead of forEach
          <li key={element}>{element}</li>
        ))}
      </ul>
    );
  };

  const MAP = {
    name: 'image-map',
    areas: imgmapjson?.map((area) => ({
      ...area,
      // Convert coords string to array of integers before passing it to ImageMapper
      coords: convertCoords(area.coords),
    })),
  };

  return (
    <div className="container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Map</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <div className="image-mapper-container">
                  <ImageMapper
                    src={URL}
                    map={MAP}
                    onMouseEnter={handleMouseEnter}
                    style={{ maxWidth: '100%' }}
                  />
            </div>
            </td>

          </tr>
          <tr>
            <td>
              <p><label>Villages: </label></p>
              {renderNames()} {/* Call the function to render the names */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Mapper;
