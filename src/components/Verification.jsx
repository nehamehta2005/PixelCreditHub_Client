import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import baseURL from '../config/api';


function Verification() {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseURL}/users/verify?token=${token}`, {
        method: 'GET', // or 'POST' depending on your backend implementation
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Verification failed'); // Handle non-successful responses
          }
          return response.json();
        })
        .then(data => {
          // Once the verification is complete, update the isLoading state
          setIsLoading(false);
          // You can handle the verification result, e.g., display a success message
          console.log('Verification successful:', data);
        })
        .catch(error => {
          // Handle errors during verification
          console.error('Verification error:', error);
        });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [token]);

  return (
    <div>
      {isLoading ? (
        <div>
          <p>Verifying your account...</p>
          <CircularProgress /> {/* Display a loading spinner */}
        </div>
      ) : (
        <p>Verification complete! You can now log in.</p>
      )}
    </div>
  );
}

export default Verification;
