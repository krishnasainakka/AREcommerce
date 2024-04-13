import React from 'react';
import { useUser } from "@clerk/clerk-react";
import './Cart.css';
import axios from "axios";
import {useSelector} from 'react-redux';

const PayButton = ({cartItems}) => {
  const host = "http://localhost:10000";
  const { isSignedIn, user } = useUser();

    const handleCheckout = async () => {
        console.log(cartItems);
        try {
          if (!isSignedIn) {
            console.error('User is not signed in.');
            return;
          }
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cartItems,
              userId: user.id, // Use Clerk user ID
            }),
          };
    
          const response = await fetch(`${host}/stripe/create-checkout-session`, requestOptions);
          const data = await response.json();
    
          if (data.url) {
            window.location.href = data.url;
          }

        }catch (error) {
          console.error('Error creating checkout session:', error.message);
        }
    }
  return (
    <>
    <button className="checkout" onClick={handleCheckout}>Check Out</button>
    </>
  )
}

export default PayButton
