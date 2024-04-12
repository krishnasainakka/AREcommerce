    import express from 'express';
    const router = express.Router();
    import multer from 'multer';
    import path from 'path';

    import Product from '../models/products.js';

    // Get all products
    router.get('/', async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
            console.log(products);
        } catch (err) {
            res.status(400).json(err);
        }
    });

    // Get a single product by ID
    router.get('/SingleProduct/:productId', async (req, res) => {
        try {
            const product = await Product.findById(req.params.productId);
            res.json(product);
        } catch (err) {
            res.status(400).json(err);
        }
    });

    // Get products by Category
    router.get('/category/:Category', async (req, res) => {
        console.log(req.params.Category);
        try {
            // console.log(req.params.Category);
            const products = await Product.find({ Category: req.params.Category });
            console.log(products);
            if (products.length === 0) {
                // If no products are found for the specified category
                return res.status(404).json({ message: 'No products found for the specified category.' });
            }
    
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    });

    //Get a product by ProductType
    router.get('/productType/:ProdType', async (req, res) => {
        console.log(req.params.ProdType);
        try {            
            const products = await Product.find({ ProductType: req.params.ProdType});
            console.log(products);
            if (products.length === 0) {
                // If no products are found for the specified category
                return res.status(404).json({ message: 'No products found for the specified category.' });
            }
    
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    });

            
    // Route to create a new product with image upload
    router.post('/newproduct', async (req, res) => {
        try {
          const { Category, ProductName, ProductDesc, ProductPrice, ProductImageURL, ProductType, ProductBrand } = req.body;
        //   const completeImageURL = `../../../public/models/${Category}/${ProductImageURL}`;
          console.log("New Product started");
          console.log(req.body);
          const newItem = { Category, ProductName, ProductDesc, ProductPrice, ProductType, ProductBrand, ProductImageURL };
          const item = await Product.create(newItem);
      
          res.status(201).json(item);
        } catch (err) {
          res.status(400).json(err);
        }
      });

    // Update a product by ID
    router.put('/:productId', async (req, res) => {
        try {        
            const productId = req.params.productId;
            // console.log(productId);
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                {$set:req.body},
                { new: true }
            );
            
            res.json(updatedProduct);
        } catch (err) {
            res.status(400).json(err);
        }
    });

    // Delete a product by ID
    router.delete('/:productId', async (req, res) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
            res.json(deletedProduct);
        } catch (err) {
            res.status(400).json(err);
        }
    });


    export default router;
