const mongoose = require('mongoose');
const { Schema } = mongoose;

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code:{
        type:String,
        required: true,
    },
    genreid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
})

const Scategory = mongoose.model("subCategorys", subCategorySchema);

module.exports = Scategory;