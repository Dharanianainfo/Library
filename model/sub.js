const mongoose = require('mongoose');
const { Schema } = mongoose;

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
})

module.exports = mongoose.model('SubCategory', subCategorySchema);