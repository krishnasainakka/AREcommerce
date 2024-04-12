import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    Category:{
        type: String,
        required: true
    },
    ProductName:{
        type: String,
        required: true
    },
    ProductDesc:{
        type: String,
        required: true 
    },
    ProductPrice:{
        type: String,
        required: true,        
    },    
    ProductImageURL:{
        type: String,
        required: true
    },    
    ProductBrand:{
        type: String,
        // required: true
    },
    ProductType:{
        type:String,
    },
    ProductDate:{
        type: String,
        default: () => new Date().toISOString(),
        required: true
    }   
})

const product = mongoose.model("product", productSchema)
export default  product