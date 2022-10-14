const mongoose = require('mongoose')
const { Schema } = mongoose;

const cartSchema = new Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
       },
       items: [{
        _id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product',
         required: true
      },
      name: String,
      quantity: {
         type: Number,
         required: true,
         min: 1,
         max:10,
         default: 1},
         price: Number
       }],
      bill: {
          type: Number,
          required: true,
         default: 0
        }
    });
    
    const Cart = mongoose.model("Cart", cartSchema);
    
    module.exports = Cart;
