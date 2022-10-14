const userController = require('./users.controllers');
const userService = require('./users.services');
const express = require('express');
const routes = express.Router();
const verifyToken = require('./auth');
const upload = require('./multer');



routes.post("/sregister", userController.studentRegister);
routes.post("/proRegister", userController.proRegister);
routes.post("/userLogin", userController.userLogin);
//admin
routes.post("/adminRegister", userController.adminRegister);
routes.post("/adminLogin", userController.adminLogin);
//book
routes.post("/category",verifyToken.authenticateToken, userController.categorylist);
routes.post("/bookRegister", verifyToken.authenticateToken,userController.bookRegister);

routes.post("/ownerLogin", userController.ownerLogin);
routes.post("/shopAdminLogin", userController.shopAdminLogin);
routes.get("/user-profile", userController.userProfile);
routes.post("/category",verifyToken.authenticateToken, userController.categorylist);
routes.post("/household", userController.houseHoldList);
routes.post("/snacks", userController.snaksList);
routes.post("/adminRegister", userController.adminRegister);
routes.post("/cart", userController.create);
routes.get("/cart", userController.findAll);
// routes.get("/getonedata/:_id/addOrder", verifyToken.authenticateToken ,userController.addOrder);
routes.delete("/cart", userController.delete);
routes.post("/addOrder", verifyToken.authenticateToken ,userController.addOrder)
// routes.get("/getonedata", function () {
//     console.log("log");
// } );
routes.get("/getonedata/:_id/addCart", verifyToken.authenticateToken ,userController.addCart)
routes.get("/getonedata/:_id/deleteCart", verifyToken.authenticateToken ,userController.deleteCart)
routes.get("/cartone/:_id", verifyToken.authenticateToken ,userController.cartOne)

routes.get("/getonedata/:_id", verifyToken.authenticateToken,userController.getonedata);
routes.get("/vegetableGet", verifyToken.authenticateToken, userController.vegetableGet);
routes.get("/getone", verifyToken.authenticateToken, userController.getone);
routes.get("/getimageproduct", verifyToken.authenticateToken, userController.getimageproduct);
routes.get("/oneimageproduct/:_id", verifyToken.authenticateToken, userController.oneimageproduct);
// routes.get("/productList", async function (req,res ){
//     console.log(req);
// } );
// routes.post("/profile",upload.single('image'),verifyToken.authenticateToken,userController.Product)
// routes.get("/getimageproduct",verifyToken.authenticateToken,userController.getimageproduct)
// routes.get("/oneimageproduct/:_id",verifyToken.authenticateToken,userController.oneimageproduct)
// routes.get("/cancelbyuser/:_id", verifyToken.authenticateToken ,userController.cancelbyuser)

module.exports = routes;