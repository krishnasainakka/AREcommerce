import mongoose from 'mongoose';

// const mongoURI = "mongodb://0.0.0.0:27017/EcommerceProject"; //  database

const mongoURI = process.env.MONGO_STRING; //  database

async function connectToMongo() {  // Connecting to datatbase
    await mongoose.connect(mongoURI)
    .then(()=> console.log("Connected to Mongo Successfully"))
    .catch(err => console.log(err));
}

export default  connectToMongo; 