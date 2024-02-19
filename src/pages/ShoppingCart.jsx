// src/pages/CreditCoinsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ShoppingCart.css';

const CreditCoinsPage = () => {
  const coinOptions = Array.from({ length: 14 }, (_, index) => ({
    id: index + 1,
    price: 5 + index * 2,
    photos: 3 + index,
   // photos=3+(price-5)/2
  }));

  return (
    <div className="credit-coins-container">
      <h2>Select a Credit Coin Option:</h2>
      <div className="coin-options">
        {coinOptions.map((coin) => (
          <Link key={coin.id} to={`/payment/${coin.price}`} className="coin-link">
            <div className="coin-option">
              <p>{`€${coin.price}`}</p>
              <p>{`${coin.photos} Photos`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CreditCoinsPage;
