const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriesSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },
});

const Category = mongoose.model("categorys", categoriesSchema);

module.exports = Category;