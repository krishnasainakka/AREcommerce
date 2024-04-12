import mongoose from 'mongoose';

const { Schema } = mongoose;

const registrationSchema = new Schema({
    UserName:{
        type: String,
        required: true
    },
    Mobile:{
        type: Number,
        required: true 
    },
    Email:{
        type: String,
        required: true,
        unique: true,
    },
    Password:{
        type: String,
        required: true
    },
    ConfirmPassword:{
        type: String,
        required: true
    },       
})

const registration = mongoose.model("registration", registrationSchema)
export default  registration