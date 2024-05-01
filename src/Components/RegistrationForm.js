import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import districtsData from '../Components/data/jillalu.json';
import './RegistrationForm.css'; // Import your CSS file for styling

const RegistrationForm = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [mandal, setMandal] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMandal, setSelectedMandal] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    const selectedDistrictData = districtsData.districts.find(district => district.name === districtName);
    setMandals(selectedDistrictData ? selectedDistrictData.mandals.map(mandal => mandal.name) : []);
    setSelectedMandal('');
    setVillages([]);
    setSelectedVillage('');
  };

  const handleMandalChange = (e) => {
    const mandalName = e.target.value;
    setSelectedMandal(mandalName);
    const selectedDistrictData = districtsData.districts.find(district => district.name === selectedDistrict);
    const selectedMandalData = selectedDistrictData.mandals.find(mandal => mandal.name === mandalName);
    setVillages(selectedMandalData ? selectedMandalData.villages : []);
    setSelectedVillage('');
  };

  const handleVillageChange = (e) => {
    setSelectedVillage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registrationData = {
        mobileNumber,
        name,
        village: selectedVillage,
        mandal: selectedMandal,
        district: selectedDistrict,
        timestamp: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, "registrations"), registrationData);
      console.log("Document written with ID: ", docRef.id);

      setMobileNumber('');
      setName('');
      setSelectedDistrict('');
      setSelectedMandal('');
      setSelectedVillage('');
    } catch (error) {
      console.error('Error adding registration: ', error);
    }
  };

  return (
    <div className="registration-form-container">
      <h1 className="registration-form-title">Registration</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <label htmlFor="mobile_number" className="form-label">Mobile Number:</label><br />
        <input type="text" id="mobile_number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} className="form-input" /><br />

        <label htmlFor="name" className="form-label">Your Name:</label><br />
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="form-input" /><br />

        <div className="select-container">
          <label htmlFor="district" className="form-label">Select District:</label>
          <select id="district" value={selectedDistrict} onChange={handleDistrictChange} className="form-select">
            <option value="">-- Select District --</option>
            {districtsData.districts.map(district => (
              <option key={district.name} value={district.name}>{district.name}</option>
            ))}
          </select>
        </div>
        <div className="select-container">
          <label htmlFor="mandal" className="form-label">Select Mandal:</label>
          <select id="mandal" value={selectedMandal} onChange={handleMandalChange} className="form-select">
            <option value="">-- Select Mandal --</option>
            {mandals.map(mandal => (
              <option key={mandal} value={mandal}>{mandal}</option>
            ))}
          </select>
        </div>
        <div className="select-container">
          <label htmlFor="village" className="form-label">Select Village:</label>
          <select id="village" value={selectedVillage} onChange={handleVillageChange} className="form-select">
            <option value="">-- Select Village --</option>
            {villages.map(village => (
              <option key={village} value={village}>{village}</option>
            ))}
          </select>
        </div>

        <br />
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
