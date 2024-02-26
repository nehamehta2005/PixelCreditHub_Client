import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddPayment.css';
import baseURL from '../config/api';

const AddPayment = () => {
  const { price } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    cardNumber: '', 
     expirationDate: '',
    cvv: '',
  });
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseURL + '/savePayment/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, price }),
      });

      if (response.ok) {
        console.log('Payment information saved successfully!');
        setPurchaseSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          address: '',
          phoneNumber: '',
          dateOfBirth: '',
          cardNumber: '',
          expirationDate: '',
          cvv: '',
        });
      } else {
        console.error('Failed to save payment information.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStartJourney = () => {
    // Add logic to navigate to the homepage
    navigate('/');
  };

  return (
    <div className='payment-container'>
      <h1>Add Payment Information</h1>
      <div className="add-payment-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </label>

              <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </label>
            </div>

            <div className="form-row1">
              <label>
                Address:
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
              </label>
            </div>

            <div className="form-row">
              <label>
                Phone Number:
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
              </label>

              <label>
                Date of Birth:
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
              </label>
            </div>

             <button type="submit">Complete Purchase</button>
          </form> 

          {purchaseSuccess && (
            <div className="purchase-success-message">
              <p>You purchased {price} euro coins and can now download {3+(price-5)/2} photos.</p>
              <button onClick={handleStartJourney}>Start Your Journey</button>
            </div>
          )}
        </div>
        
        <div className="credit-card-container">
          <div className="credit-card-inputs">
            <label>Card Number:</label>
            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />

            <label>Expiration Date:</label>
            <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleInputChange} required />

            <label>CVV:</label>
            <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} required />

            <div className="selected-coin-info">
          <p>Selected Credit Coin: <strong style={{fontSize:"23px"}}> €{price} </strong></p>
          </div>

        
          </div>
         
      
        </div>
        
      </div>
    
    </div>


  );
};

export default AddPayment;
