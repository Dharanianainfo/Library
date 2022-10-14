const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
   info : {
       _id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : "Book",
       },
       title : String,
   },
   
    category : String,
    
    time : {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Issue",
        },
        returnDate : Date,
        issueDate : Date,
    },
    
    user_id : {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
        username : String,
    },
    
    fine : {
        amount : Number,
        date : Date,
    },
    
    entryTime : {
        type : Date,
        default : Date.now(),
    }
});

module.exports =  mongoose.model("Activity", activitySchema);
