import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import dalleRoutes from './routes/dalle.routes.js';
import { Webhook } from 'svix';  
import connectToMongo from './db.js';
import authRoute from './routes/auth.js';
import cors from 'cors';

import productRoute from './routes/product.js';
import Cartitems from './routes/Cart.js'
import  UserRouter from "./routes/User.js";
import stripe from './routes/stripe.js';
import path from 'path';

dotenv.config(); 
const app = express();
const port = process.env.PORT || 5000;

connectToMongo();
app.use(cors());

// bodyParser middleware should be registered after multer
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Other routes
app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/cart', Cartitems);
app.use('/user', UserRouter);
app.use('/stripe', stripe);
app.use('/api/v1/dalle', dalleRoutes);
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


// app.get('/', (req, res) => {
//   res.status(200).json({ message: "Hello from DALL.E" });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
