const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    // ride_id: {
    //     type: String,
    //     required: true,
    // },

    socket_id: {
        type: String,
        required: true,
        
    },
    user_id: {
        type: String,
        required: true,
        
        
    },
    
    date: {
        type: Date,
        default: Date.now()
    }
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;