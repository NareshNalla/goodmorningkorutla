// RegistrationCount.js

import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import './RegistrationCount.css';

const RegistrationCount = () => {
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    // const fetchRegistrationCount = async () => {
    //   try {
    //     const registrationsSnapshot = await db.collection('registrations').get();
    //     const count = registrationsSnapshot.size;
    //     console.log('Count:', count);
    //     setRegistrationCount(count);
    //   } catch (error) {
    //     console.error('Error fetching registration count: ', error);
    //   }
    // };
    let fetchRegistrationCount = async () => {
        try {
            const registrationsRef = collection(db, 'registrations'); // Reference to 'registrations' collection
            const registrationsSnapshot = await getDocs(registrationsRef); // Get all documents in the collection
            
            let count = 0; // Initialize count
            
            registrationsSnapshot.forEach(doc => {
                count++; // Increment count for each document
            });
            
            console.log('Count:', count);
            setRegistrationCount(count);
        } catch (error) {
            console.error('Error fetching registration count: ', error);
        }
    };

    fetchRegistrationCount();
  }, []);

  return (
    <div>
      <h2> <span className='gradient-text-blue' > count: {registrationCount}</span> </h2>
    </div>
  );
};

export default RegistrationCount;
