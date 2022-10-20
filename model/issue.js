const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const issueSchema = new Schema({
    book_info : {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Book', 
        },
        title : {type : String,ref : 'book', required:true,},
        author : {type : String,ref : 'book',required:true,},
        bookId:{type : Number,ref : 'book',required:true,},
        Sname:{type:String,ref: 'book',required: true},
        genre: {type: String,ref: 'book',required: true},
        stock : {
            type: Number,
           },
       
        issueDate : {type : Date, default : Date.now()},
        returnDate : {type : Date, default : Date.now() + 7*24*60*60*1000},
        isRenewed : {type : Boolean, default : false},
    }, 
    
    user_id : {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        },
        
        username : String,
    },
    });
    

    issueSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.password;
    },
});

// userSchema.plugin(uniqueValidator, {message: "User aldready in Exists."});

const Issue = mongoose.model("issue", issueSchema);

module.exports = Issue;