const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const commentSchema = new Schema({
    text : String,
    author :{
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
        username : String,
    },
    
    book : {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Book",
        },
        title : String,
    },
    
    date : {type : Date, default : Date.now()},
    });
    

    commentSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.password;
    },
});



const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;