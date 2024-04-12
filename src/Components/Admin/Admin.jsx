// import React, { useState ,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// // import {getDownloadURL, getStorage} from 'firebase/storage';
// import { app } from '../../firbase';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import './Admin.css';

// const Admin = () => {
//   const Url = "http://localhost:8000";
//   const [productName, setProductName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const [category, setCategory] = useState('');
//   const [brand, setProductBrand] = useState('');
//   // const [gender, setGender] = useState('');
//   const [productType, setProductType] = useState('');
//   const navigate = useNavigate();
//   // const [ImageFileUploadProgress, setImageFileUploadProgress] = useState(null);
//   // const [ImageFileUploadError, setImageFileUploadError] = useState(null);  
  


//   const [imageFile, setImageFile] = useState(null);
//   const [imageFileUrl, setImageFileUrl] = useState(null);
//   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
//   const [imageFileUploadError, setImageFileUploadError] = useState(null);
//   const [imageFileUploading, setImageFileUploading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Check if file is selected
//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("Category", category);
//         console.log(formData);

//         const uploadResponse = await fetch(`${Url}/upload`, {
//           method: "POST",
//           body: formData,          
//           headers: {
//             "category": category
//           }
//         });

//         if (uploadResponse.ok) {
//           const { filename } = await uploadResponse.json();
//           console.log(filename);
//           console.log(category);
//           // After file upload, submit product data with filename
//           await submitProductData(filename);
//         } else {
//           console.error("Failed to upload file:", uploadResponse.status);
//         }
//       } else {
//         console.log("No file selected");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   const submitProductData = async (filename) => {
//     try {
//       const newProduct = {
//         Category: category,
//         ProductName: productName,
//         ProductDesc: description,
//         ProductPrice: price,
//         ProductBrand: brand,
//         ProductType:productType,
//         // ProductImageURL: filename // Assign the filename to ProductImageURL
//         ProductImageURL: imageFileUrl // Use the URL from Firebase Storage
//       };
//       console.log(newProduct);

//       const response = await fetch(`${Url}/product/newProduct`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProduct),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         navigate(`/SingleProduct/${data._id}`);
//       } else {
//         console.error("Failed to post product:", response.status);
//       }
//     } catch (err) {
//       console.error("Error posting product:", err);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setImageFileUrl(URL.createObjectURL(file));
//     }
//   };
//   useEffect(() => {
//     if (imageFileUrl) {
//       uploadImage();
//     }
//   }, [imageFileUrl]);

//   const uploadImage = async () => {    
//     setImageFileUploadError(null);
//     setImageFileUploading(true);
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + imageFile.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, imageFile);
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

//         setImageFileUploadProgress(progress.toFixed(0));
//       },
//       (error) => {
//         setImageFileUploadError(
//           'Could not upload image (File must be less than 2MB)'
//         );
//         setImageFileUploadProgress(null);
//         setImageFile(null);
//         setImageFileUrl(null);
//         setImageFileUploading(false);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setImageFileUrl(downloadURL);
//             setImageFileUploading(false);
//             console.log('File available at', downloadURL);
//         });
//       }
//     );
//   };

//   return (
//     <div className='write'>
//       <form className='writeForm' onSubmit={handleSubmit}>
//         <div className='writeFormGroup'>
//           <label htmlFor='fileInput'>
//             <FontAwesomeIcon icon={faPlus} className="writeIcon" />
//           </label>
//           {/* <input type="file" name="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
//            */}
//            <input type="file" name="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} />
//           <input type="text" placeholder='Product Name' className='writeInput' autoFocus={true} onChange={e => setProductName(e.target.value)} />
//           <input type="text" placeholder='Product Brand' className='writeInput' autoFocus={true} onChange={e => setProductBrand(e.target.value)} />
//           <input type="number" placeholder='Price' className='writeInput' onChange={e => setPrice(e.target.value)} />
//           <select className='writeInput' value={category} onChange={e => setCategory(e.target.value)}>
//             <option value="">Select Category</option>
//             <option value="Fashion">Fashion</option>
//             <option value="Electronics">Electronics</option>            
//             <option value="Furniture">Furniture</option>
//             <option value="Appliances">Appliances</option>
//             <option value="Toys">Toys</option>
//           </select>
//           {category === 'Fashion' && (
//             <select className='writeInput' onChange={e => setProductType(e.target.value)}>
//               <option value="">Select Gender</option>
//               <option value="Men">Men</option>
//               <option value="Women">Women</option>
//               <option value="Shoes|Slippers">Shoes|Slippers</option>
//               <option value="Accessories">Other Accessories(bags,..)</option>
//             </select>
//           )}
//           {category === 'Appliances' && (
//             <select className='writeInput' onChange={e => setProductType(e.target.value)}>
//               <option value="">Select Product Type</option>
//               <option value="Beds">Beds</option>
//               <option value="Cabinets">Cabinets</option>
//               <option value="Sofas">Sofas</option>
//               <option value="Washing Machines">Washing Machines</option>
//               <option value="AC">AC</option>
//               <option value="Fridge">Fridge</option>
//             </select> 
//           )}

//           {category === 'Furniture' && (
//             <select className='writeInput' onChange={e => setProductType(e.target.value)}>
//               <option value="">Select Product Type</option>
//               <option value="Tables">Tables</option>
//               <option value="Chairs">Chairs</option>
//               <option value="Shelf">Shelf</option>
//             </select>
//           )}

//           {category === 'Toys' && (
//             <select className='writeInput' onChange={e => setProductType(e.target.value)}>
//               <option value="">Select Product Type</option>
//               <option value="Sports Toys">Sports Toys</option>
//               <option value="Board games">Board games</option>
//               <option value="Video games">Video games</option>
//               <option value="Action figures">Action figures</option>
//               <option value="Dolls">Dolls</option>
//               <option value="Stuffed animals">Stuffed animals</option>
//               <option value="Remote control toys">Remote control toys</option>
//               <option value="Puzzles">Puzzles</option>
//             </select>
//           )}

//           {category === 'Electronics' && (
//             <select className='writeInput' onChange={e => setProductType(e.target.value)}>
//               <option value="">Select Product Type</option>
//               <option value="TV">TV</option>
//               <option value="Audio&Accessories">Audio&Accessories</option>
//               <option value="Cameras">Cameras</option>
//               <option value="Printers">Printers</option>
//               <option value="Mobiles">Mobiles</option>
//               <option value="Laptops">Laptops</option>
//               <option value="Watches">Watches</option>
//             </select>
//           )}

//         </div>
//         <div className="writeFileGroup">
//           <textarea className="writeInput writeText" cols="30" rows="10" placeholder='Description' onChange={e => setDescription(e.target.value)}></textarea>
//         </div>
//         <button className="writeSubmit" type="submit">Post</button>
//       </form>
//     </div>
//   );
// }

// export default Admin;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {app} from '../../firbase'; // Ensure correct import path
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import './Admin.css';

const Admin = () => {
  const Url = "http://localhost:8000";
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setProductBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${imageFile.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFileUrl) {
      console.error("Image not uploaded yet or upload failed.");
      return;
    }

    const newProduct = {
      Category: category,
      ProductName: productName,
      ProductDesc: description,
      ProductPrice: price,
      ProductBrand: brand,
      ProductType: productType,
      ProductImageURL: imageFileUrl
    };
    console.log(newProduct);

    try {
      const response = await fetch(`${Url}/product/newProduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/SingleProduct/${data._id}`);
      } else {
        console.error("Failed to post product:", response.status);
      }
    } catch (err) {
      console.error("Error posting product:", err);
    }
  };

  return (
        <div className='write'>
          <form className='writeForm' onSubmit={handleSubmit}>
            <div className='writeFormGroup'>
              <label htmlFor='fileInput'>
                <FontAwesomeIcon icon={faPlus} className="writeIcon" />
              </label>
              {/* <input type="file" name="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
               */}
               <input type="file" name="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} />
              <input type="text" placeholder='Product Name' className='writeInput' autoFocus={true} onChange={e => setProductName(e.target.value)} />
              <input type="text" placeholder='Product Brand' className='writeInput' autoFocus={true} onChange={e => setProductBrand(e.target.value)} />
              <input type="number" placeholder='Price' className='writeInput' onChange={e => setPrice(e.target.value)} />
              <select className='writeInput' value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>            
                <option value="Furniture">Furniture</option>
                <option value="Appliances">Appliances</option>
                <option value="Toys">Toys</option>
              </select>
              {category === 'Fashion' && (
                <select className='writeInput' onChange={e => setProductType(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Shoes|Slippers">Shoes|Slippers</option>
                  <option value="Accessories">Other Accessories(bags,..)</option>
                </select>
              )}
              {category === 'Appliances' && (
                <select className='writeInput' onChange={e => setProductType(e.target.value)}>
                  <option value="">Select Product Type</option>
                  <option value="Beds">Beds</option>
                  <option value="Cabinets">Cabinets</option>
                  <option value="Sofas">Sofas</option>
                  <option value="Washing Machines">Washing Machines</option>
                  <option value="AC">AC</option>
                  <option value="Fridge">Fridge</option>
                </select> 
              )}
    
              {category === 'Furniture' && (
                <select className='writeInput' onChange={e => setProductType(e.target.value)}>
                  <option value="">Select Product Type</option>
                  <option value="Tables">Tables</option>
                  <option value="Chairs">Chairs</option>
                  <option value="Shelf">Shelf</option>
                </select>
              )}
    
              {category === 'Toys' && (
                <select className='writeInput' onChange={e => setProductType(e.target.value)}>
                  <option value="">Select Product Type</option>
                  <option value="Sports Toys">Sports Toys</option>
                  <option value="Board games">Board games</option>
                  <option value="Video games">Video games</option>
                  <option value="Action figures">Action figures</option>
                  <option value="Dolls">Dolls</option>
                  <option value="Stuffed animals">Stuffed animals</option>
                  <option value="Remote control toys">Remote control toys</option>
                  <option value="Puzzles">Puzzles</option>
                </select>
              )}
    
              {category === 'Electronics' && (
                <select className='writeInput' onChange={e => setProductType(e.target.value)}>
                  <option value="">Select Product Type</option>
                  <option value="TV">TV</option>
                  <option value="Audio&Accessories">Audio&Accessories</option>
                  <option value="Cameras">Cameras</option>
                  <option value="Lights|Fans">Lights|Fans</option>
                  <option value="Mobiles">Mobiles</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Watches">Watches</option>
                </select>
              )}
    
            </div>
            <div className="writeFileGroup">
              <textarea className="writeInput writeText" cols="30" rows="10" placeholder='Description' onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <button className="writeSubmit" type="submit">Post</button>
          </form>
        </div>
      );
    }
    
    export default Admin;