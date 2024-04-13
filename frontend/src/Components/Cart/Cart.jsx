import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import '@google/model-viewer';
import PayButton from './PayButton';
import { useUser } from "@clerk/clerk-react";

import './Cart.css';

const Cart = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const [cartItems, setCartItems] = useState([]);
    const [qty, setQty] = useState({});
    const location = useLocation();
    const u_id = location.pathname.split("/")[2];
    const host = "https://arecommerce.onrender.com";

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const response = await fetch(`${host}/carts/${u_id}`, {
                    method: "GET",
                });
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
                    const initialQty = {};
                    data.forEach(item => {
                        initialQty[item._id] = item.Quantity;
                    });
                    setQty(initialQty);
                } else {
                    console.error('Failed to fetch cart items:', response.status);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
    
        if (isSignedIn && isLoaded) {
            getCartItems();
        }
    }, [isSignedIn, isLoaded, u_id, host]);
    

    const updateQty = (itemId, newQty) => {
        setQty(prevQty => ({
            ...prevQty,
            [itemId]: newQty
        }));
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += (item.ProductPrice - item.ProductPrice * 0.1) * qty[item._id];
        });
        return totalPrice;
    };

    const handleDelete = async (pid) => {
        try {
            const response = await fetch(`${host}/carts/${pid}/${u_id}`, {
                method: "DELETE", 
            });
            window.location.reload();
            const data = await response.json();
            if (data.message === "Product is deleted") {
                const updatedCartItems = cartItems.filter(item => item.ProductId !== pid);
                setCartItems(updatedCartItems);
            } else {
                console.log("Error deleting product:", data);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className='cart-container'>
            <h2 className='cart-heading'>Shopping Cart</h2>
            <hr />
            {cartItems.length === 0 ? (
            <div className="empty-cart">
                <p>No products added to cart</p>
                <Link to="/" className="shop-button">Shop</Link>
            </div>
            ) : (
                <>
                <div className='cart-items'>
                    {cartItems.map((cur) => (
                        <div key={cur._id} className='cart-item'>
                            <div className='cart-item-img'>
                                <model-viewer className="product-image" src={cur?.ProductImageURL} alt="Product Model" camera-controls auto-rotate ar ar-status > </model-viewer>
                            </div>
                            <div className='cart-item-details'>
                                <h4>{cur.ProductName}</h4>
                                <div className="qty-box">
                                    <span><b>Qty: </b></span>
                                    <button className="qty-btn" onClick={() => updateQty(cur._id, qty[cur._id] - 1)}>-</button>
                                    <span className="qty"><b>{qty[cur._id]}</b></span>
                                    <button className="qty-btn" onClick={() => updateQty(cur._id, qty[cur._id] + 1)}>+</button>
                                </div>
                                <button onClick={() => handleDelete(cur.ProductId)} className="delete-btn">Delete</button>
                            <Link to={`/category/${cur.Category}`} className='link'><button className="see-more-btn">See more like this</button></Link>
                            <button className="share-btn">Share</button>

                            </div>
                            <div>
                                <span className='time-deal'><b>Limited time deal</b></span>
                                <span className='off-perct'><b>10% off</b></span>
                                <p><b>Rs. {(cur.ProductPrice - cur.ProductPrice * 0.1) * qty[cur._id]}</b></p>
                                <p id="org-price">Rs. {cur.ProductPrice}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='sub-total'>
                    <h4><b>Sub Total({cartItems.length} Items): Rs. {calculateTotalPrice().toFixed(2)}</b></h4>
                    <PayButton cartItems={cartItems}></PayButton>
                </div>
            </>
            )}
        </div>
    );
};

export default Cart;

