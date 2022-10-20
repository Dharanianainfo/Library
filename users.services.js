const User = require('./model/user.model');
const Product = require('./product_model');
const Cart = require('./cart.model');
const Category = require('./model/categories_model');
const Book = require('./model/book')
const Scategory = require('./model/sub');

const bcrypt = require('bcryptjs');
const auth = require('./auth');
var async = require('async');
const { response } = require('express');



async function userLogin({ Idcard, password }, callback) {
    const user = await User.findOne({"Idcard": Idcard});
    if (user != null ) {
       
        if (bcrypt.compareSync(password, user.password)) {
                    const token = auth.generateAccessToken(user._id);
                    console.log("user")
                    return callback(null, { ...user.toJSON(), token });
                }
                else {
                    return callback({
                        message: "Invalid password",
                    });
                }

    }
    else {
        return callback({
            message: "Invalid username",
        });
    }

}
async function adminLogin({ Idcard, password }, callback) {
    const user = await User.findOne({"Idcard": Idcard});
console.log(user)
    if (user != null) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken1(user._id,user.isAdmin);
            return callback(null, { ...user.toJSON(), token });
        }
        else {
            return callback({
                message: "Invalid username/password",
            });
        }
    }
    else {
        return callback({
            message: "Invalid username/Password",
        });
    }

}
async function register(params, callback) {
    if (params.username === undefined) {

        return callback({ message: "Username Required" });
    }
    params["userType"] = 'Student';

    const user = new User(params);
    user.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}
async function proRegister(params, callback) {
    if (params.username === undefined) {

        return callback({ message: "Username Required" });
    }
    params["userType"] = 'Staff';

    const user = new User(params);
    user.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}
async function adminRegister(params, callback) {
    if (params.username === undefined) {

        return callback({ message: "Username Required" });
    }
    params["userType"] = 'Admin';
    params["isAdmin"] = 'true';

    const user = new User(params);
    user.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}
async function bookRegister(params, callback) {

    
    console.log(params)
    const user = new Book(params);
    await user.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}
async function categorylist(params, callback) {
  
    const product = new Category(params);
    product.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}
async function subcategorylist(params, callback) {
  
    const product = new Scategory(params);
    product.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}


// async function subcategorylist(params, callback) {
  
//     const product = new SubCategory(params);
//     product.save()

//         .then((response) => {
//             return callback(null, response);

//         }).catch((error) => {
//             return callback(error);
//         });
// }

// async function houseHoldList(params, callback) {
//     // console.log("ee");
//     // if(params.category_id === undefined){

//     //     return callback({message: "Required"});
//     // }

//     params["product_userType"] = 'household';
//     const product = new Product(params);
//     product.save()

//         .then((response) => {
//             return callback(null, response);

//         }).catch((error) => {
//             return callback(error);
//         });
// }

// async function snaksList(params, callback) {
//     // console.log("ee");
//     // if(params.category_id === undefined){

//     //     return callback({message: "Required"});
//     // }
//     params["product_userType"] = 'snaks';

//     const product = new Product(params);
//     product.save()

//         .then((response) => {
//             return callback(null, response);

//         }).catch((error) => {
//             return callback(error);
//         });
// }




// async function vegtableGet(params, callback){
//     // console.log("ee");


//     const product = Product(params);
//     product.find()

//     .then((response) => {
//         return callback(null, response);

//     }).catch((error) => {
//         return callback(error);
//     });
// }
// async function addCart(params, callback) {
//     if (!params.userId) {
//         return callback({
//             message: "userId required"
//         });
//     }
//     cart.findOne({ userId: params.userId }, function (err, cartDB) {
//         if (err) {
//             return callback(err);

//         } else {
//             if (cartDB == null) {
//                 const cartModel = new Cart.cart({
//                     userId: params.userId,
//                     products: params.products
//                 });

//                 cartModel
//                     .save()
//                     .then((response) => {
//                         return callback(null, response);
//                     })
//                     .catch((error) => {
//                         return callback(error);
//                     });
//             }
//             else if (cartDB.product.length == 0) {
//                 cartDB.products = params.products;
//                 cartDB.save();
//                 return callback(null, cartDB);
//             }
//             else {
//                 async.eachSeries(params.products, function (product, asyncDone) {
//                     let itemIndex = cartDB.products.findIndex(p => p.product == product.product)

//                     if (itemIndex == -1) {
//                         cartDB.products.push({
//                             product: product.product,
//                             qty: product.qty
//                         });
//                         cartDB.save(asyncDone);
//                     }
//                     else {
//                         cartDB.products[itemIndex].qty = cartDB.products[itemIndex].qty + product.qty;
//                         cartDB.save(asyncDone);
//                     }
//                 });
//                 return callback(null, cartDB);
//             }
//         }
//     })
// }

// async function getCart(params, callback) {
//     cart.findOne({ userId: params.userId })
//         .populate({
//             path: "products",
//             populate: {
//                 path: 'product',
//                 model: 'Product',
//                 select: 'product_name product_price product_image',
//                 populate: {
//                     path: "categorys",
//                     model: 'Category',
//                     select: 'name'
//                 }
//             }
//         })
//         .then((response) => {
//             return callback(null, response);
//         })
//         .catch((error) => {
//             return callback(error);
//         });
// }

// async function removeCartItem(params, callback) {
//     cart.findOne({ userId: params.userId }, function (err, cartDB) {
//         if (err) { return callback(err); }
//         else {
//             if (params._id && params.qty) {
//                 const _id = params._id;
//                 const qty = params.qty;

//                 if (cartDB.products.length == 0) {
//                     return callback(null, "cart empty!");
//                 }
//                 else {
//                     let itemIndex = cartDB.products.findIndex(p => p.product == _id);

//                     if (itemIndex === -1) {
//                         return callback(null, "Invalid Products!");
//                     } else {
//                         if (cartDB.products[itemIndex].qty === qty) {
//                             cartDB.products.splice(itemIndex, 1);
//                         }
//                         else if (cartDB.products[itemIndex].qty > qty) {
//                             cartDB.products[itemIndex].qty = cartDB.products[itemIndex].qty - qty;
//                         }
//                         else {
//                             return callback(null, "Enter lower Qty");
//                         }
//                         cartDB.save((err, cartM) => {
//                             if (err) return callback(err);
//                             return callback(null, "cart updated");
//                         })
//                     }
//                 }
//             }
//         }
//     })
// }

module.exports = {
    userLogin,
    adminLogin,
    proRegister,
    categorylist,
    subcategorylist,
    bookRegister,
    register,
    adminRegister,
    

};