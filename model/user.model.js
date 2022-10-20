const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
      username: {
        type: String,
        trim: true,
      },
      RollNo: {
        type: String,
        trim: true,
        unique:true,
      },
      Idcard:{
        type: String,
        trim: true,
        unique:true,
        required:true, 
      },
      phoneNo:{
        type:Number,
        required:true
      },
      password: {
        type: String,
        required:true,
      },
      year: {
        type:Number,
      },
      deparment:{
        type:String,
      },
      joined: { type: Date, default: Date.now() },
      bookIssueInfo: [
        {
            _id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Issue",
            },
            title : {type : String,ref : 'book', required:true,},
            author : {type : String,ref : 'book',required:true,},
        bookId:{type : Number,ref : 'book',required:true,},
        genre: {type: String,ref: 'book',required: true},
        code: {type: String,ref: 'book',required: true},
          },
      
      ],
      userType: {
        type: String,
        enum : ['Student','Admin','Staff'],
        default: 'Student*'
    },
      address: String,
      image: {
        type: String,
        default: "",
      },
      violationFlag: { type: Boolean, default: false },
      fines: { type: Number, default: 0 },
      isAdmin: { type: Boolean, default: false },
    });
    

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.password;
    },
});

userSchema.plugin(uniqueValidator, {message: "User aldready in Exists."});

const User = mongoose.model("user", userSchema);

module.exports = User;