import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import './SingleProduct.css';
import '@google/model-viewer';
import { useUser } from "@clerk/clerk-react";


const SingleProduct = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const { id } = useParams();    
    const [qty, setQty] = useState(1);
    const [activeProduct, setActiveProduct] = useState(null);
    const [CategoryData, setCategoryData] = useState([]);
    const host = "http://localhost:10000";    
    // const { addToCart } = useCart();

    const getSingleProduct = async () => {
        try {
            const response = await fetch(`${host}/product/SingleProduct/${id}`, {
                method: "GET",
            });            

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const jsonData = await response.json();
            const category = jsonData.Category;
           // console.log(category); 
            const responseCategory = await fetch(`${host}/product/category/${category}`, {
                method: "GET",
            });

            const catJson = await responseCategory.json();
            //console.log(catJson);
            setActiveProduct(jsonData);
            setCategoryData(catJson);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };    

    useEffect(() => {
        getSingleProduct();
        setQty(1);
    }, [id]);

    const handleAddToCart = async () => {
        try {
            if (!isSignedIn) {
                // If the user is not signed in, you may want to redirect them to the sign-in page.
                // You can use the useHistory hook for this.
                console.error('User is not signed in.');
                return; 
            }
            const newItem = {
                ProductId: activeData._id,
                ProductName: activeData.ProductName,
                ProductImageURL: activeData.ProductImageURL,
                ProductPrice: activeData.ProductPrice,
                Category: activeData.Category,
                Quantity: qty,
                ProductBrand: activeData.ProductBrand,
              };
              console.log(newItem)
              const res = await fetch(`${host}/carts/product/${user.id}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
              });
              
              
          if (res.ok) {
            console.log('Product added to cart successfully.');
          } else {
            console.error('Error adding product to cart:', res.statusText);
          }
        } catch (error) {
          console.error('Error adding product to cart:', error.message);
        }
      };
      
    const activeData = activeProduct; 
    const activeCategory = activeData?.Category;
    const incrementQty = () => {
        setQty(qty+1);
    };
    const decrementQty = () => {
        (qty > 1) ? setQty(qty-1): 1;
    };

    if (!isLoaded) {
        return <Skeleton height={400} />;
    }

    return (        
        <div className="product-detail-container"> 
            {activeData ? (
                <div  className="product-detail">
                    <div id="prodetails" className="product-info">
                        
                        <div className="single-pro-image">                            
                            <model-viewer className="product-image" src={activeData.ProductImageURL} alt="Card 1 Model" camera-controls auto-rotate ar ar-status style={{"width": "100%", "height":"80%"}}> </model-viewer>
                        </div>                        
                        <div className="single-pro-details">
                            <h2 style={{"font-size":"2rem"}}><b>{activeData.ProductName}</b></h2>
                            <div>
                                <FontAwesomeIcon icon={solidStar} style={{ color: "#FFD43B" }} />
                                <FontAwesomeIcon icon={solidStar} style={{ color: "#FFD43B" }} />
                                <FontAwesomeIcon icon={solidStar} style={{ color: "#FFD43B" }} />
                                <FontAwesomeIcon icon={regularStar} />
                                <FontAwesomeIcon icon={regularStar} />
                            </div>
                            <span className="discounted-price">RS {(activeData.ProductPrice * 0.9).toFixed(2)} </span>
                            <h5 id="price">$ {activeData.ProductPrice}</h5>
                            <h6 className="deal-of-day">Deal of the Day: 10% Off</h6>
                            <div className="item-details">
                                <h2 style={{"font-size":"1.5rem"}}><b>Product Details</b></h2>
                                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque impedit esse necessitatibus obcaecati autem modi distinctio est dolorem qui, consequuntur aspernatur enim deserunt magnam unde labore expedita similique porro nobis.{activeData.ProductDesc}</span>
                            </div>
                            <div className="icon-container">
                                <div className="icon-box">
                                    <FontAwesomeIcon className="icon" icon={faTruck} />
                                    <p>Free delivery</p>
                                </div>
                                <div className="icon-box">
                                    <FontAwesomeIcon className="icon" icon={faLock} />
                                    <p>Secure Transaction</p>
                                </div>
                                <div className="icon-box">
                                    <FontAwesomeIcon className="icon" icon={faShield} />
                                    <p>2 years Warranty</p>
                                </div>
                            </div>

                            <div className="extra-info">
                                <p>Available: <b>In stock</b></p>
                                <p>Brand: <b>{activeData.ProductBrand}</b></p>
                                <p>Category: <b>{activeData.Category}</b></p>
                            </div>

                            {/* <select name="" id="">
                                <option value="">Select Size</option>
                                <option value="">XL</option>
                                <option value="">XXL</option>
                                <option value="">Small</option>
                                <option value="">Large</option>
                            </select> */}
                            <div className="qty-box">
                                <span>Quantity: </span>
                                <button className="qty-btn" onClick={decrementQty}>-</button>
                                <span className="qty"><b>{qty}</b></span>
                                <button className="qty-btn" onClick={incrementQty}>+</button>
                            </div>
                            <Link to={`/cart/${user.id}`}><button className="cart-btn" onClick={handleAddToCart}>Add To Cart</button></Link>
                        </div>
                    </div>

                    <div className="related-products">
                        <h3 className="related-products-title">Related Products</h3>
                        <div className="grid-container">
                            {CategoryData.map((cur) => (
                            <div key={cur._id} className="product-container-card" id="product-container-card-id">          
                                <div className="image-container-card">
                                    <model-viewer className="product-image-card" src={cur.ProductImageURL} style={{backgroundColor:"whitesmoke"}} alt="Card 1 Model" camera-controls auto-rotate ar>              
                                    </model-viewer>
                                </div>
                                <Link to={`/SingleProduct/${cur._id}`} className="link">
                                    <div className="info-container-card">
                                    <p className="product-name-card">{cur.ProductName}</p>
                                    <p className="product-price-card">
                                        <span className="discounted-price">RS {(cur.ProductPrice * 0.9).toFixed(2)} </span>
                                        <span className="old-price">RS {cur.ProductPrice}</span>
                                        <span className="discount-info">(10% off)</span>
                                    </p> 
                                    <div className="ratings-container">
                                        <b>Rating:</b>
                                        <span className="product-rating">                            
                                        <FontAwesomeIcon  icon={faStar} style={{ color: '#ffc107' }} /> 
                                        <FontAwesomeIcon  icon={faStar} style={{ color: '#ffc107' }} /> 
                                        <FontAwesomeIcon  icon={faStar} style={{ color: '#ffc107' }} /> 
                                        <FontAwesomeIcon  icon={faStar} style={{ color: '#ffc107' }} /> 
                                        <FontAwesomeIcon  icon={faStar} style={{ color: '#ffc107' }} />              
                                        </span> 
                                    </div>
                                    </div>
                                </Link>                              
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="no-data">No data found</div>
            )}
        </div>
    );
};

export default SingleProduct;



