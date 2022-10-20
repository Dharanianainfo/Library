const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const bookSchema = new Schema({
   title : String,
   bookId:{
    type: Number,
    required:true,
    unique:true,
   },
   image:{type:String},
   stock : {
    type: Number,
    min: 0,
   },
   author : String,
   description : String,
   genreid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  SubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: false
  },
 code:{
  type:String,
  ref: 'SubCategory',
  required: true
},
Sname:{
  type:String,
  ref: 'SubCategory',
  required: true
},
genre: {
    type: String,
    ref: 'Categorys',
    required: true,
},

   comments : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : "Comment",
    }],
});

bookSchema.plugin(uniqueValidator, {message: "Book aldready in Exists."});

const Book = mongoose.model("book", bookSchema);

module.exports = Book;