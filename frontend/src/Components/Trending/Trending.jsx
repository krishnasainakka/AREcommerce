// import React, {useState, useEffect} from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Trending.css";
// import '@google/model-viewer';


// const Trending = () => {
//   const host = "http://localhost:8000";
//   const navigate = useNavigate();  
 
//   const productsInitial = [];  
//   const [trendingProducts, setTrendingProducts] = useState(productsInitial);
//   const [trendingElecProducts, setTrendingElecProducts] = useState([]);
//   const [trendingFashProducts, setTrendingFashProducts] = useState([]);
//   const [trendingFurnProducts, setTrendingFurnProducts] = useState([]);
//   const [trendingToysProducts, setTrendingToysProducts] = useState([]);

//   const fetchAllProducts = async () => {
//     try {
//       const response = await fetch(`${host}/product/allproducts`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       setTrendingProducts(jsonData);      
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const fetchAllElectronicsProducts = async () => {
//     try {
//       const response = await fetch(`${host}/product/category/Electronics`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       setTrendingElecProducts(jsonData);      
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const fetchAllFashionProducts = async () => {
//     try {
//       const response = await fetch(`${host}/product/category/Fashion`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       setTrendingFashProducts(jsonData);      
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const fetchAllFurnitureProducts = async () => {
//     try {
//       const response = await fetch(`${host}/product/category/Furniture`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       setTrendingFurnProducts(jsonData);      
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const fetchAllToysProducts = async () => {
//     try {
//       const response = await fetch(`${host}/product/category/Toys`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       setTrendingToysProducts(jsonData);      
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAllProducts();
//     fetchAllElectronicsProducts();
//     fetchAllFurnitureProducts();
//     fetchAllFashionProducts();
//     fetchAllToysProducts();
//   }, []); 

//   const handleAddToCart = () => {
//     console.log("Added to cart");
//   }

//   return (
//     <>
//     <div>
//       <h3 className="heading">Top Trending</h3>
//       <p className="sub-heading">
//         Here's some of our most popular products people are in love with.
//       </p>
//       <div className="grid-container">
//         {trendingProducts.slice(0, 10).map((cur) => (
//           <div key={cur._id} className="product-container-card">          
//               <div className="image-container-card">
//                 <model-viewer class="product-image-card" src={cur.ProductImageURL} alt="Card 1 Model" camera-controls auto-rotate ar>              
//                 </model-viewer>
//               </div>
//               <Link to={`/SingleProduct/${cur._id}`} className="link">
//                 <div className="info-container-card">
//                   <p className="product-name-card">{cur.ProductName}</p>
//                   <p className="product-price-card">RS {cur.ProductPrice}</p>
//                 </div>
//               </Link>
//               <button onClick={handleAddToCart} className="btn" id="add-to-cart-button"> Add to Cart</button>
              
//           </div>
//         ))}
//       </div>
//     </div>

//     <div>
//       <h3 className="heading">Top Trending - Electronics</h3>
//       <p className="sub-heading">
//         Here's some of our most popular products people are in love with.
//       </p>
//       <div className="grid-container">
//         {trendingElecProducts.slice(0, 10).map((cur) => (
//           <div key={cur._id} className="product-container-card">          
//               <div className="image-container-card">
//                 <model-viewer class="product-image-card" src={cur.ProductImageURL} alt="Card 1 Model" camera-controls auto-rotate ar>              
//                 </model-viewer>
//               </div>
//               <Link to={`/SingleProduct/${cur._id}`} className="link">
//                 <div className="info-container-card">
//                   <p className="product-name-card">{cur.ProductName}</p>
//                   <p className="product-price-card">RS {cur.ProductPrice}</p>
//                 </div>
//               </Link>
//               <button onClick={handleAddToCart} className="btn" id="add-to-cart-button"> Add to Cart</button>
              
//           </div>
//         ))}
//       </div>
//     </div>

//     <div>
//       <h3 className="heading">Top Trending - Fashion</h3>
//       <p className="sub-heading">
//         Here's some of our most popular products people are in love with.
//       </p>
//       <div className="grid-container">
//         {trendingFashProducts.slice(0, 10).map((cur) => (
//           <div key={cur._id} className="product-container-card">          
//               <div className="image-container-card">
//                 <model-viewer class="product-image-card" src={cur.ProductImageURL} alt="Card 1 Model" camera-controls auto-rotate ar>              
//                 </model-viewer>
//               </div>
//               <Link to={`/SingleProduct/${cur._id}`} className="link">
//                 <div className="info-container-card">
//                   <p className="product-name-card">{cur.ProductName}</p>
//                   <p className="product-price-card">RS {cur.ProductPrice}</p>
//                 </div>
//               </Link>
//               <button onClick={handleAddToCart} className="btn" id="add-to-cart-button"> Add to Cart</button>
              
//           </div>
//         ))}
//       </div>
//     </div>

//     <div>
//       <h3 className="heading">Top Trending - Furniture</h3>
//       <p className="sub-heading">
//         Here's some of our most popular products people are in love with.
//       </p>
//       <div className="grid-container">
//         {trendingFurnProducts.slice(0, 10).map((cur) => (
//           <div key={cur._id} className="product-container-card">          
//               <div className="image-container-card">
//                 <model-viewer class="product-image-card" src={cur.ProductImageURL} alt="Card 1 Model" camera-controls auto-rotate ar>              
//                 </model-viewer>
//               </div>
//               <Link to={`/SingleProduct/${cur._id}`} className="link">
//                 <div className="info-container-card">
//                   <p className="product-name-card">{cur.ProductName}</p>
//                   <p className="product-price-card">RS {cur.ProductPrice}</p>
//                 </div>
//               </Link>
//               <button onClick={handleAddToCart} className="btn" id="add-to-cart-button"> Add to Cart</button>
              
//           </div>
//         ))}
//       </div>
//     </div>

//     <div>
//       <h3 className="heading">Top Trending - Toys</h3>
//       <p className="sub-heading">
//         Here's some of our most popular products people are in love with.
//       </p>
//       <div className="grid-container">
//         {trendingToysProducts.slice(0, 10).map((cur) => (
//           <div key={cur._id} className="product-container-card">          
//               <div className="image-container-card">
//                 <model-viewer class="product-image-card" src={cur.ProductImageURL} alt="Card 1 Model" camera-controls auto-rotate ar>              
//                 </model-viewer>
//               </div>
//               <Link to={`/SingleProduct/${cur._id}`} className="link">
//                 <div className="info-container-card">
//                   <p className="product-name-card">{cur.ProductName}</p>
//                   <p className="product-price-card">RS {cur.ProductPrice}</p>
//                 </div>
//               </Link>
//               <button onClick={handleAddToCart} className="btn" id="add-to-cart-button"> Add to Cart</button>
              
//           </div>
//         ))}
//       </div>
//     </div>
    
//     </>
    
//   );
// };
// export default Trending;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "./Trending.css";
import '@google/model-viewer';

const ProductCard = ({ product }) => {
  // Calculate the discounted price (assuming a 10% discount)
  const discountPrice = product.ProductPrice * 0.9;
  
  return (
    <div className="product-container-card">
      <div className="image-container-card">
        <model-viewer class="product-image-card" src={product.ProductImageURL} alt="Product Model" camera-controls auto-rotate ar>
        </model-viewer>
      </div>
      <Link to={`/SingleProduct/${product._id}`} className="link">
        <div className="info-container-card">
          <p className="product-name-card">{product.ProductName}</p>
          <p className="product-price-card">
            <span className="discounted-price">RS {discountPrice.toFixed(2)} </span>
            <span className="old-price">RS {product.ProductPrice}</span>
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
      {/* <button className="btn" id="add-to-cart-button"> Add to Cart</button> */}
    </div>
  );
};


const Trending = () => {  
  const host = `http://localhost:10000`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingProducts, setTrendingProducts] = useState({
    Electronics: [],
    Fashion: [],
    Furniture: [],
    Appliances:[],
    Toys: [],
  });

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const categories = ["Electronics", "Fashion", "Furniture", "Appliances", "Toys"];
        const promises = categories.map((category) =>
          fetch(`${host}/product/category/${category}`).then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${category} products`);
            }
            return response.json();
          })
        );
        const results = await Promise.all(promises);
        setTrendingProducts((prevProducts) => ({
          ...prevProducts,
          Electronics: results[0],
          Fashion: results[1],
          Furniture: results[2],
          Appliances: results[3],
          Toys: results[4],
        }));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <>
      {Object.entries(trendingProducts).map(([category, products]) => (
        <div key={category}>
          <h3 className="heading">Top Trending - {category}</h3>
          <p className="sub-heading">
            Here's some of our most popular {category.toLowerCase()} products people are in love with.
          </p>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="grid-container">
              {products.slice(0, 10).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Trending;
