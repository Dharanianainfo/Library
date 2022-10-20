const userController = require('./users.controllers');
const userService = require('./users.services');
const express = require('express');
const routes = express.Router();
const verifyToken = require('./auth');
const upload = require('./multer');



routes.post("/sregister", userController.studentRegister);
routes.post("/proRegister", userController.proRegister);
routes.post("/userLogin", userController.userLogin);
routes.get("/getoneUser/:_id", verifyToken.authenticateToken,userController.getoneUser);
routes.post("/upload-file",upload.array("imgUrl"), userController.getFileUrl);
routes.get("/profile-picture", verifyToken.authenticateToken,userController.profilePic);
routes.post("/profile-change",verifyToken.authenticateToken,upload.array("imgUrl"),userController.Profilepic_change);
routes.post("/issuebooks", verifyToken.authenticateToken, userController.postIssueBook);
routes.get("/return-renew", verifyToken.authenticateToken, userController.getShowRenewReturn);
routes.post("/book-renew", verifyToken.authenticateToken, userController.postRenewBook);
routes.post("/book-return/:_id", verifyToken.authenticateToken, userController.postReturnBook);
routes.get("/user-flag/:_id", verifyToken.authenticateToken, userController.getFlagUser);
//admin
routes.post("/adminRegister", userController.adminRegister);
routes.post("/adminLogin", userController.adminLogin);
//book
routes.post("/category",verifyToken.authenticateToken, userController.categorylist);
routes.get("/getbycategory", verifyToken.authenticateToken, userController.getbyCategory);
routes.get("/getbysubcategory", verifyToken.authenticateToken, userController.getbysubCategory);
routes.post("/subcategory",verifyToken.authenticateToken, userController.subcategorylist);
routes.post("/bookRegister", verifyToken.authenticateToken,upload.array("imgUrl"),userController.bookRegister);
routes.get("/getAllbook", verifyToken.authenticateToken,userController.getAllbook);
routes.get("/deleteUser/:_id", verifyToken.authenticateToken,userController.deleteUser);
routes.get("/updateUser/:_id", verifyToken.authenticateToken,userController.updateUser);
routes.get("/deleteBook/:_id", verifyToken.authenticateToken,userController.deleteBook);
routes.get("/updateBook/:_id", verifyToken.authenticateToken,userController.updateBook);

module.exports = routes;