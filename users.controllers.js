const bcryptjs = require('bcryptjs');
const userService = require('./users.services');
const User = require('./model/user.model');
// const Cart = require('./cart.model')
// const Product = require('./product_model');
const Category = require('./model/categories_model');
// const Image= require ('./imageproduct')
// const Order= require ('./order_model')


exports.studentRegister = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.proRegister = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.proRegister(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};


exports.adminRegister = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.adminRegister(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.userLogin = (req, res, next) => {
    const { Idcard, password } = req.body;
    userService.userLogin({ Idcard, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.adminLogin = (req, res, next) => {
    const { Idcard, password } = req.body;
    userService.adminLogin({ Idcard, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.shopAdminLogin = (req, res, next) => {
    const { email, password } = req.body;
    userService.shopAdminLogin({ email, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.ownerLogin = (req, res, next) => {
    const { email, password } = req.body;
    userService.ownerLogin({ email, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.bookRegister = (req, res, next) => {
    console.log("ee");
    const{ title, count, author, description, Cname, comments} = req.body;
    const admin = req.user.data2
    if(admin){
    userService.bookRegister(req.body, (error, result) => {
        if (error) {
            return res.send(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
    }
    else{
        console.log(admin)
         return res.status(401).json({message: "Unauthoriesd User"});
     }
};

exports.categorylist = (req, res, next) => {
    // console.log("ee");
    const { name } = req.body;
    const admin = req.user.data2
    if(admin){
    userService.categorylist({ name }, (error, result) => {
        if (error) {
            return next(error);

        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
}
else{
   console.log(admin)
    return res.status(401).json({message: "Unauthoriesd User"});
}
};

exports.houseHoldList = (req, res, next) => {
    // console.log("ee");
    const { Category, product_name, product_price, product_description, product_isLikeMe, product_image, secondary_image } = req.body;
    userService.houseHoldList({ Category, product_name, product_price, product_description, secondary_image, product_isLikeMe, product_image }, (error, result) => {
        if (error) {
            return next(error);

        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.snaksList = (req, res, next) => {
    // console.log("ee");
    const { Category, product_name, product_price, product_description, product_isLikeMe, product_image, secondary_image } = req.body;
    userService.snaksList({ Category, product_name, product_price, product_description, secondary_image, product_isLikeMe, product_image }, (error, result) => {
        if (error) {
            return next(error);

        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};


exports.vegetableGet = async (req, res, next) => {
    console.log("all");
    try {
        const product = await Image.find()
        console.log(product)
        res.json({ data: product })
    } catch (error) {
        console.log("error")
        res.json(error)
    }
};

exports.getonedata = async (req, res, next) => {
    console.log("one");
    try {
        const { _id } = req.params
        const individualuser = await Image.findOne({ _id: _id });

        res.status(200).json({ success: true, data: individualuser })
        console.log(_id)
    } catch (err) {

        res.status(400).json({ success: false })

    }

}
exports.getone = async (req, res, next) => {
    console.log("category1:" + req.query.Category);
    try {
        let category = req.query.Category
        console.log(category)
        
        const product = await Category.find({ name: { $eq: category } })
        console.log(product)
        // const productid = product[0].name
        // console.log("id:" + productid)
        const product1 = await Image.find({ Cname: { $eq: category } });
console.log(product1)

        // // console.log(category+ "=>")
        // // console.log(req.query.Category)
        // console.log("category:" + category)

        // console.log(product1)

        return res.status(200).send(
            product1
            
        );
    } catch (error) {
        console.log("error")
        res.json(error)
    }
};

exports.create = (req, res, next) => {
    var model = {
        userId: req.user.userId,
        products: req.body.products
    };

    userService.addCart(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).sent({
            message: "success",
            data: results,
        });
    });
}

exports.findAll = (req, res, next) => {

    userService.getCart({ userId: req.user.userId }, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).sent({
            message: "success",
            data: results,
        });
    });
}

exports.delete = (req, res, next) => {
    var model = {
        userId: req.user.userId,
        _id: req.body._id,
        qty: req.body.qty
    };

    userService.removeCartItem(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).sent({
            message: "success",
            data: results,
        });
    });
}

exports.cart = async(req,res,next)=>{
    try{
        console.log(req.user.data)
        const owner=req.user.data
        const cart = await Cart.findOne({ owner});
       
              res.status(200).send(cart);
                 
    }catch{
console.log("error")
    }
}

exports.addCart = async(req,res,next) => {
    const owner=req.user.data
    const quantity=req.body.quantity
    const {_id} = req.params;
    const cart=await Cart.findOne({owner})
    try {
        const cart = await Cart.findOne({ owner });
        const item = await Product.findOne({ _id: _id });
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        const price = item.product_price;
        const name = item.product_name;
        //If cart already exists for user,
        if (cart) {
            
            const itemIndex = cart.items.findIndex((item) => item._id ==  _id);
        //check if product exists or not
            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity += quantity;
                cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
                },0)
                cart.items[itemIndex] = product;
                await cart.save();
                res.status(200).send(cart);
            } else {
                cart.items.push({ _id, name, quantity, price });
                cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
                },0)
                await cart.save();
                res.status(200).send(cart);
            }
        } else {
        //no cart exists, create one
        const newCart = await Cart.create({
        owner,
        items: [{ _id, name, quantity, price }],
            bill: quantity * price,
        });
        return res.status(201).send(newCart);
        }
    } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
    }
}

exports.deleteCart = async (req, res, next) => {
    const owner = req.user.data;
    const {_id} = req.params;
    // const quantity=req.body.quantity
    try {
      let cart = await Cart.findOne({ owner });
  
      const itemIndex = cart.items.findIndex((item) => item._id == _id);
      
      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        // item.quantity -= quantity;
        cart.bill -= item.quantity * item.price;
        if(cart.bill < 0) {
            cart.bill = 0
        } 
        cart.items.splice(itemIndex, 1);
        cart.bill = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
      },0)
        cart = await cart.save();
  
        res.status(200).send(cart);
      } else {
      res.status(404).send("item not found");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
}

exports.cartOne = async(req,res,next) => {
    const owner=req.user.data
    const quantity=req.body.quantity
    const {_id} = req.params;
    const cart=await Cart.findOne({owner})
    try {
        const cart = await Cart.findOne({ owner });
        const item = await Product.findOne({ _id: _id });
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        
        const name = item.product_name;
        //If cart already exists for user,
        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item._id ==  _id);
        //check if product exists or not
            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity = quantity;
                cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            },0)
            
            cart.items[itemIndex] = product;
            await cart.save();
            res.status(200).send(cart);
            } else {
            cart.items.push({ _id, name, quantity, price });
            cart.bill = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
            },0)
            await cart.save();
            res.status(200).send(cart);
            }
        } 
        
    } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
    }
}


// exports.addOrder = async(req,res,next) => {
//     const owner=req.user.data
//     const quantity=req.body.quantity
//     const {_id} = req.params;
//     const user= await User.findOne({owner})
//     const order=await Order.findOne({owner})
//     try {
//         console.log(user)
//         const order = await Order.findOne({ owner });
//         const item = await Product.findOne({ _id: _id });
//         if (!item) {
//             res.status(404).send({ message: "item not found" });
//             return;
//         }
//         const price = item.product_price;
//         const name = item.product_name;
//         //If cart already exists for user,
//         const addr =[{
//             phoneNumber:user.phoneNumber,
//             houseNo:user.houseNo,
//             streetName:user.streetName,
//             city:user.city,
//             landMark:user.landMark,
//             pincode:user.pincode
//                 }]
               
//         if (order) {
//             order.address[0] = addr[0];
//                     console.log(addr[0].phoneNumber)
//             const itemIndex = order.items.findIndex((item) => item._id ==  _id);
//         //check if product exists or not
//             if (itemIndex > -1) {
//                 let product = order.items[itemIndex];
//                 product.quantity += quantity;
//                 order.bill = order.items.reduce((acc, curr) => {
//                 return acc + curr.quantity * curr.price;
//             },0)
            
//             order.items[itemIndex] = product;
//             await order.save();
//             res.status(200).send(order);
//             } else {
              
               
//                 order.items.push({ _id, name, quantity, price });
//                 order.bill = order.items.reduce((acc, curr) => {
//             return acc + curr.quantity * curr.price;
//             },0)
//             await order.save();
//             res.status(200).JSON(order);
//             }
//         } else {
//         //no cart exists, create one
//         const newOrder = await Order.create({
//         owner,
//         items: [{ _id, name, quantity, price }],
//             bill: quantity * price,
//             address:addr[0]
//         });
//         return res.status(201).send(newOrder);
//         }
//     } 
//     catch (error) {
//     console.log(error);
//     res.status(500).send("something went wrong");
//     }
// }

exports.addOrder = async (req, res, next) => {
    const owner = req.user.data
const delivery_mode=req.body.delivery_mode
    const quantity = req.body.quantity
    const  _id  = req.body._id;
    const user = await User.findOne({ _id:owner })
    console.log(owner)

    
    console.log(user)
    try {
        console.log(user)
        const order = await Order.findOne({ owner });
        const item = await Image.findOne({ _id: _id });
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        const ownerName = user.username;
        const price = item.product_price;
        const name = item.product_name;
        //If cart already exists for user,
        const addr = [{
            phoneNumber: user.phoneNumber,
            houseNo: user.houseNo,
            streetName: user.streetName,
            city: user.city,
            landMark: user.landMark,
            pincode: user.pincode
        }]

        if (order) {
            order.ownerName = ownerName;
            order.address[0] = addr[0];
            console.log(addr[0].phoneNumber)
            const itemIndex = order.items.findIndex((item) => item._id == _id);
            //check if product exists or not
          
            //no cart exists, create one
            const newOrder = await Order.create({
                owner, ownerName,delivery_mode,
                items: [{ _id, name, quantity, price }],
                bill: quantity * price,
                address: addr[0]
            });
            const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': -quantity} }, {
                new: true
            });
            return res.status(201).send(newOrder);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}


exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "Authorized User" });

};

exports.Product = async (req, res, next) => {
    const owner = req.user.data
    
    const Cname = req.body.Cname
    const product_name = req.body.product_name
    const product_price = req.body.product_price 
    const product_description = req.body.product_description 
    const product_isLikeMe = req.body.product_isLikeMe
    
    const quantity = req.body.quantity
    // const category = await Category1.findOne({ _id: Category  });
    // //const { _id } = req.params;
    // const Cname = category.name;
    const user = await User.findOne({ _id:owner })
    try {
        console.log("USER" + user)
       const addr = [{
        phoneNumber: user.phoneNumber,
        houseNo: user.houseNo,
        streetName: user.streetName,
        city: user.city,
        landMark: user.landMark,
        pincode: user.pincode,
        shopName:user.shopName,
        shopEmail:user.shopEmail,
        shopNumber:user.shopNumber,
        email:user.email,
        username:user.username,
    }]

    var obj = {
       
        img:req.file.filename,
       
    }
    var product = await Image.findOne({product_name:product_name})
    if(!product){
        console.log(req.file)
        const newProduct = await Image.create({path:obj.img, Cname,quantity, product_name,product_price,product_description,product_isLikeMe,
            address: addr[0]});
                        return res.status(201).send(newProduct);;
    }else{
        const { _id } = product._id;
        console.log(req.file)
        const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': quantity} }, {
            new: true
        });
        res.status(201).json(updateduser);
        console.log("item present")
    }
    
} catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
}

};
exports.getimageproduct = async (req, res) => {
    console.log(req.params);
     //const {_id} = req.params;
     console.log("all");
    try {
        var product = await Image.find()
        console.log(product[0]._id)
        res.json(product)
    } catch (error) {
        console.log("error")
        res.json(error)
    }
    }

    exports.oneimageproduct = async (req, res) => {
        console.log(req.params);
      
        try {
            const { _id } = req.params;
            console.log(_id);
            var product = await Image.findOne({_id:_id})
            console.log(product._id)
            res.json(product)
        } catch (error) {
            console.log("error")
            res.json(error)
        }
        }

        exports.cancelbyuser = async (req, res, next) => {
            const owner = req.user.data;
            const { _id } = req.params;
            // const quantity=req.body.quantity
            try {
                let order = await Order.findOne({ owner });
        
                const itemIndex = order.items.findIndex((item) => item._id == _id);
        
                if (itemIndex > -1) {
                    let item = order.items[itemIndex];
                    // item.quantity -= quantity;
                    order.bill -= item.quantity * item.price;
                    if (order.bill < 0) {
                        order.bill = 0
                    }
                    order.items.splice(itemIndex, 1);
                    order.bill = order.items.reduce((acc, curr) => {
                        return acc + curr.quantity * curr.price;
                    }, 0)
                    order = await order.save();
        
                    res.status(200).send(order);
                } else {
                    res.status(404).send("item not found");
                }
            } catch (error) {
                console.log(error);
                res.status(400).send();
            }
        }

        exports.getimageproduct = async (req, res) => {
            console.log(req.params);
             //const {_id} = req.params;
             console.log("all");
            try {
                var product = await Image.find()
                console.log(product[0]._id)
                res.json(product)
            } catch (error) {
                console.log("error")
                res.json(error)
            }
        }
            
        exports.oneimageproduct = async (req, res) => {
                console.log(req.params);
              
                try {
                    const { _id } = req.params;
                    console.log(_id);
                    var product = await Image.findOne({_id:_id})
                    console.log(product._id)
                    res.json(product)
                } catch (error) {
                    console.log("error")
                    res.json(error)
                }
        }