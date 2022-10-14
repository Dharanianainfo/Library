const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    
    product_name: {
        type: String,
        required: true,
    },

    product_price: {
        type: Number,
        required: true,
        
    },
    product_image: {
        
        type: String,
        required: true,
        
    },
    secondary_image: {
        type: [],
        required: false,
    },
    product_description: {
        type: String,
        required: true,    
    },
    product_isLikeMe: {
            type: [{
                user_id: {
                    type: Schema.Types.ObjectId,
                    ref:"user",
                }, 
            }],
            required: true,    
        },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,    
    },
    // subCategorys: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'subCategorys',
    //     required: true,    
    // },
    // product_rating: {
    //     type: [{
    //         user_id: {
    //             type: Schema.Types.ObjectId,
    //             ref:"user",
    //         },
    //         rating: {
    //             type: Number,
    //             default: 0,
                
    //         }
    //     }],
    //     required: true,    
    // },
    // product_userType: {
    //     type: String,
    //     enum : ['vegtables','Fruits','household','snaks'],  
    // },
    
    date: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;