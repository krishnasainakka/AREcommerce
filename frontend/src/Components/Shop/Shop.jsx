import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import '@google/model-viewer';
import './Shop.css';

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categoryTrack, setCategoryTrack] = useState(false);
  const [sortedTrack, setSortedTrack] = useState(false);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsAvailable, setProductsAvailable] = useState(true);
  const host = "https://arecommerce.onrender.com";
  const [sortBy, setSortBy] = useState('normal');
  const [selectedType, setSelectedType] = useState('');    
  const [showFilters, setShowFilters] = useState(false); // State to track whether filters are shown


  useEffect(() => {
    const getCategory = async () => {
      setLoading(true);
      try {
        let categoryParam;
        if (location.pathname.includes('/category/')) {
          categoryParam = location.pathname.split('/').pop();
        } else {
          categoryParam = 'all';
        }

        const res = await fetch(`${host}/product/category/${categoryParam}`);
        if (res.ok) {
          const data = await res.json();
          setCategory(data);
          setProductsAvailable(data.length > 0);
        } else {
          console.error('Failed to fetch products:', res.status);
          setCategory([]);
          setProductsAvailable(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setCategory([]);
        setProductsAvailable(false);
      } finally {
        setLoading(false);
      }
    };
    getCategory();
  }, [location.pathname]);
  

  const categoryChange = async (value) => {
    try {
      const res = await fetch(`${host}/product${value === 'all' ? '' : `/category/${value}`}`);
      if (res.ok) {
        const data = await res.json();
        setCategory(data);
        setProductsAvailable(data.length > 0);
      } else {
        console.error('Failed to fetch products:', res.status);
        setCategory([]);
        setProductsAvailable(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setCategory([]);
      setProductsAvailable(false);
    }
  };

  const getProductsByType = async (type) => {
    setLoading(true);
    try {
      const res = await fetch(`${host}/product/productType/${type}`);
      if (res.ok) {
        const data = await res.json();
        setCategory(data);
        setProductsAvailable(data.length > 0);
      } else {
        console.error('Failed to fetch products:', res.status);
        setCategory([]);
        setProductsAvailable(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setCategory([]);
      setProductsAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const sortedChange = () => {
    setSortedTrack((prevState) => !prevState);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const showDrop = () => {
    setCategoryTrack((prevState) => !prevState);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    getProductsByType(value);
  };   
  
  // Function to handle toggling of filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };


  // Define a function to render the second dropdown based on the selected category
  const renderSecondDropdown = () => {
    if (categoryTrack && category.length > 0) {
      const currentCategory = category[0].Category; // Assuming the category is in the first element
      switch (currentCategory) {
        case 'Appliances':
          return (
            <div className="shop-category-filter">
              <div className="header" onClick={showDrop}>
                <h2 className="uppercase">
                  Product Type
                </h2>
              </div>
              <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Beds" id="Beds" onChange={(e) => handleTypeChange(e.target.value)} />
                    <label htmlFor="Beds" className="cursor-pointer">Beds</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Cabinets" id="Cabinets" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Cabinets" className="cursor-pointer">Cabinets</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Sofas" id="Sofas" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Sofas" className="cursor-pointer">Sofas</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Washing Machines" id="Washing Machines" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Washing Machines" className="cursor-pointer">Washing Machines</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="AC" id="AC" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="AC" className="cursor-pointer">AC</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Fridge" id="Fridge" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Fridge" className="cursor-pointer">Fridge</label>
                  </div>
                </div>
              </div>            
          );
        case 'Furniture':
          return (
            <div className="shop-category-filter">
              <div className="header" onClick={showDrop}>
                <h2 className="uppercase">
                  Product Type
                </h2>
              </div>
              <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Tables" id="Tables" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Tables" className="cursor-pointer">Tables</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Chairs" id="Chairs" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Chairs" className="cursor-pointer">Chairs</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Shelf" id="Shelf" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Shelf" className="cursor-pointer">Shelf</label>
                  </div>
                </div>
              </div>            
          );
        case 'Fashion':
          return (
            <div className="shop-category-filter">
              <div className="header" onClick={showDrop}>
                <h2 className="uppercase">
                  Product Type
                </h2>
              </div>
              <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Men" id="Men" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Men" className="cursor-pointer">Men</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Women" id="Women" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Women" className="cursor-pointer">Women</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Shoes|Slippers" id="Shoes|Slippers" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Shoes|Slippers" className="cursor-pointer">Shoes|Slippers</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Accessories" id="Accessories" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Accessories" className="cursor-pointer">Accessories(Bags,..)</label>
                  </div>
                </div>
              </div>            
          );
        case 'Electronics':
          return (
            <div className="shop-category-filter">
              <div className="header" onClick={showDrop}>
                <h2 className="uppercase">
                  Product Type
                </h2>
              </div>
              <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="TV" id="TV" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="TV" className="cursor-pointer">TV</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Audio&Accessories" id="Audio&Accessories" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Audio&Accessories" className="cursor-pointer">Audio&Accessories</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Cameras" id="Cameras" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Cameras" className="cursor-pointer">Cameras</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Lights|Fans" id="Lights|Fans" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Lights|Fans" className="cursor-pointer">Lights|Fans</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Mobiles" id="Mobiles" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Mobiles" className="cursor-pointer">Mobiles</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Lights|Fans" id="Lights|Fans" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Lights|Fans" className="cursor-pointer">Lights|Fans</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Laptops" id="Laptops" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Laptops" className="cursor-pointer">Laptops</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Watches" id="Watches" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Watches" className="cursor-pointer">Watches</label>
                  </div>
                </div>
              </div>            
          );
          case 'Toys':
          return (
            <div className="shop-category-filter">
              <div className="header" onClick={showDrop}>
                <h2 className="uppercase">
                  Product Type
                </h2>
              </div>
              <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Sports Toys" id="Sports Toys"  onChange={(e) => handleTypeChange(e.target.value)}/>
                  <label htmlFor="Sports Toys" className="cursor-pointer">
                    Sports Toys
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Board games" id="Board games" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Board games" className="cursor-pointer">
                    Board games
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Video games" id="Video games" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Video games" className="cursor-pointer">
                    Video games
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Action figures" id="Action figures" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Action figures" className="cursor-pointer">
                    Action figures
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Dolls" id="Dolls" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Dolls" className="cursor-pointer">
                    Dolls
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Stuffed animals" id="Stuffed animals" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Stuffed animals" className="cursor-pointer">
                    Stuffed animals
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Remote control toys" id="Remote control toys" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Remote control toys" className="cursor-pointer">
                    Remote control toys
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Puzzles" id="Puzzles" onChange={(e) => handleTypeChange(e.target.value)}/>
                  <label htmlFor="Puzzles" className="cursor-pointer">
                    Puzzles
                  </label>
                </div>                                                                                                                                                                
              </div>
            </div>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };
  

  const sortedProducts = () => {
    if (sortBy === 'ascending') {
      return [...category].sort((a, b) => a.ProductName.localeCompare(b.ProductName));
    } else if (sortBy === 'descending') {
      return [...category].sort((a, b) => b.ProductName.localeCompare(a.ProductName));
    } else if (sortBy === 'lowToHigh') {
      return [...category].sort((a, b) => a.ProductPrice - b.ProductPrice);
    } else if (sortBy === 'highToLow') {
      return [...category].sort((a, b) => b.ProductPrice - a.ProductPrice);
    } else {
      return category;
    }
  };

  return (
    <div className="shop-container">  
      <button className="filter-btn" onClick={toggleFilters}>
        {showFilters ? 'Close Filters' : 'Show Filters'}
      </button>         
      <div className={`filters-tab ${showFilters ? 'show' : 'hide'}`}>                     
          <div className={`shop-category-filter  ${categoryTrack ? 'height-fit' : ''}` }>
            <div className="header" onClick={showDrop}>
              <h2 className="uppercase">
                Category
              </h2>
            </div>
            <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
              <div className="radio-group">
                <input type="radio" name="select" value="all" id="all" onChange={() => categoryChange('all')} />
                <label htmlFor="all" className="cursor-pointer">
                  All
                </label>
              </div>
              <div className="radio-group">
                <input type="radio" name="select" value="furniture" id="furniture"  onChange={() => categoryChange('Furniture')} />
                <label htmlFor="furniture" className="cursor-pointer">
                  Furniture
                </label>
              </div>
              <div className="radio-group">
                <input type="radio" name="select" value="appliances" id="appliances" onChange={() => categoryChange('Appliances')} />
                <label htmlFor="appliances" className="cursor-pointer">
                  Appliances
                </label>
              </div>
              <div className="radio-group">
                <input type="radio" name="select" value="electronics" id="electronics" onChange={() => categoryChange('Electronics')} />
                <label htmlFor="electronics" className="cursor-pointer">
                  Electronics
                </label>
              </div>
              <div className="radio-group">
                <input type="radio" name="select" value="fashion" id="fashion" onChange={() => categoryChange('Fashion')} />
                <label htmlFor="fashion" className="cursor-pointer">
                  Fashion
                </label>
              </div>
              <div className="radio-group">
                <input type="radio" name="select" value="toys" id="toys" onChange={() => categoryChange('Toys')} />
                <label htmlFor="Toys" className="cursor-pointer">
                  Toys
                </label>
              </div>
            </div>
          </div>

          <div >
            {renderSecondDropdown()}
          </div>
          
                    
          <div className={`sort-container ${sortedTrack ? 'expanded' : ''}`}>
            <div className="sort-header" onClick={sortedChange}>
              <h2 className="uppercase">sorted-by</h2>
              <i className={`arrow-icon ${sortedTrack ? 'rotate-180' : ''}`}></i>
            </div>
            <div className={`sort-options ${sortedTrack ? 'visible' : ''}`}>
              <div className="sort-option">
                <input type="radio" name="sort" value="normal" id="normal" onChange={() => handleSortChange('normal')} />
                <label htmlFor="normal" className="cursor-pointer">
                  Normal
                </label>
              </div>
              <div className="sort-option">
                <input type="radio" name="sort" value="ascending" id="ascending"  onChange={() => handleSortChange('ascending')} />
                <label htmlFor="ascending" className="cursor-pointer">
                  Ascending order (A-Z)
                </label>
              </div>
              <div className="sort-option">
                <input type="radio" name="sort" value="descending" id="descending"  onChange={() => handleSortChange('descending')} />
                <label htmlFor="descending" className="cursor-pointer">
                  Descending order (Z-A)
                </label>
              </div>
              <div className="sort-option">
                <input type="radio" name="sort" value="highToLow" id="highToLow" onChange={() => handleSortChange('highToLow')} />
                <label htmlFor="highToLow" className="cursor-pointer">
                  Price (high to low)
                </label>
              </div>
              <div className="sort-option">
                <input type="radio" name="sort" value="lowToHigh" id="lowToHigh" onChange={() => handleSortChange('lowToHigh')}  />
                <label htmlFor="lowToHigh" className="cursor-pointer">
                  Price (low to high)
                </label>
              </div>
            </div>
          </div>                 
      </div>    
      <div className={`related-products-container ${showFilters ? 'hide' : ''}`} style={{overflowY: 'scroll', height: 'calc(100vh - 100px)'}}>
        <div className="related-products">
          
          <h3 className="related-products-title">Related Products</h3>
          {loading ? (
            <p>Loading...</p>
          ) : !productsAvailable ? (
            <p>No products available for this category.</p>
          ) : (
            <div className="related-products-grid">
              {sortedProducts().map((product) => (                
                <div key={product._id} className="product-container-card">
                  <div className="image-container-card">
                    <model-viewer className="product-image-card" src={product.ProductImageURL} style={{backgroundColor:"whitesmoke", width:"100%", }} alt="Product Model" camera-controls auto-rotate ar>
                    </model-viewer>
                  </div>
                  <Link to={`/SingleProduct/${product._id}`} className="link">
                    <div className="info-container-card">
                      <p className="product-name-card">{product.ProductName}</p>
                      <p className="product-price-card">
                        <span className="discounted-price">RS {(product.ProductPrice * 0.9).toFixed(2)} </span>
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  </div>
);
};

export default Shop;
