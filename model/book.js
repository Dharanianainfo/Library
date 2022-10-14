const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
   title : String,
   count :{
    type: Number,
    required:true,
   },
   stock : {
    type: Number,
    min: 0,
   },
   author : String,
   description : String,
   Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  },
 
  Cname: {
    type: String,
    ref: 'Categorys',
    required: true,
},

   comments : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : "Comment",
    }],
});

const Book = mongoose.model("book", bookSchema);

module.exports = Book;