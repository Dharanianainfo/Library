const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);
const imgSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },

    product_price: {
        type: String,
        required: true,

    },
    img:
    {
        data: Buffer,
        contentType: String,
    },
    path: {
        type: String,
    },
    product_description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
    },
    product_isLikeMe: {
        type: [{
            user_id: {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        }],
        required: true,
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorys',
        required: false,
    },
    Cname: {
        type: String,
        ref: 'Categorys',
        required: true,
    },
    address: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        shopName: {
            type: String,
            required: false,
        },
        shopNumber: {
            type: String,
            required: false,
        },
        shopEmail: {
            type: String,
            required: false,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        houseNo: {
            type: String,
            required: true,
        },
        streetName: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        landMark: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
    }],
    subCategorys: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategorys',
        required: false,
    },

    reviews: [reviewSchema],
    ratings: { type: Number, required: false },
    date: {
        type: Date,
        default: Date.now()
    },


});

const Image = mongoose.model("Img", imgSchema);

module.exports = Image;