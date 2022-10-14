const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./db.config');
const User = require('./model/user.model');
const Chat = require('./user_model');
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const {unless} = require('express-unless');
const errors = require('./error');
const { query } = require('express');
const multer=require('multer');
const path= require('path');
const routes = express.Router();
// const router =require('./router')
// app.use("/users",router)
// const file=require("fs")
const model = require('./model')

app.get('/users',(req, res) => {
res.send('We are at home')
});
app.get('/',(req, res) => {
    res.send('Good')
    });
app.get('/admin',(req, res) => {
    res.send('We are at home')
    });

    app.use("/uploads",express.static("uploads"))

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'uploads')
//       console.log(storage);
// },

// filename: function (req, file, cb) {
// cb(null, new Date().toISOString()+file.originalname)
// }
// })

// var upload = multer({ storage: storage })
// // console.log(upload);

// app.post('/upload', upload.single('myFile'), async(req, res, next) => {
// console.log("file")
// const file = req.file
// // console.log(file);
// if (!file) {
//   const error = new Error('Please upload a file')
//   error.httpStatusCode = 400

//   return next("hey error")
// }

// const imagepost= new model({
// image: file.path
// })

// const savedimage= await imagepost.save()
// res.json(savedimage)

// })

// app.get('/image',async(req, res)=>{
//  const image = await model.find()
//  res.json(image)

// });

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, ()=>{
    console.log('server is started', PORT);

    

});
const io = require('socket.io')(server, {cors: {origins: "*:*"}});

        
        const connectedUser = new Set();
        io.use(function(socket, next){
            if (socket.handshake.query && socket.handshake.query.token){
              jwt.verify(socket.handshake.query.token, 'Snippet_SceretKey', function(err, decoded) {
                if (err) return next(new Error('Authentication error'));
                socket.decoded = decoded;
                next();
              });
            }
            else {
                console.log("Authentication error");
              next(new Error('Authentication error'));
            }    
          }).
        
        on('connection', (socket)=>{
            
            socket.join('test');
            console.log("connected Successfully", socket.id);
            connectedUser.add(socket.id);
            console.log(socket.decoded);
            io.emit('connected-user', connectedUser.size);
            socket.on('disconnect', ()=>{
                console.log("Disconnected SuccessFully", socket.id);
                connectedUser.delete(socket.id);
                io.emit('connected-user', connectedUser.size);
            });
        
            socket.on('message', async (data)=>{
                console.log(data);
                if(data == undefined){
                    return callback({message});
                }
                const user = await User.findOne({email:socket.decoded.data});
                

                let model = {
                    message : data.message,
                    socket_id : socket.id,
                    date:  Date.now(),
                    user_id: user._id,

                }
                console.log(user._id);
                console.log(model);
                const chat = new Chat(model);
                chat.save()
                
            //    .then((response) => {
            //     return callback(null, response);
                
            //      }).catch((error) => {
            //         return callback(error);
            //     });
           
                console.log(data);
                socket.emit('message-receive', data);
                socket.broadcast.emit('message-receive', data);
                
          });
        });


        auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/users/sregister", methods: ["POST"] },
            { url: "/users/proRegister", methods: ["POST"] },
            { url: "/users/userLogin", methods: ["POST"] },
            { url: "/admin/adminRegister", methods: ["POST"] },
            { url: "/admin/category", methods: ["POST"] },
            { url: "/admin/adminLogin", methods: ["POST"] },
            { url: "/admin/bookRegister", methods: ["POST"] },
            
            // { url: "/users/shopAdminRegister", methods: ["POST"] },
            // { url: "/product/productregister", methods: ["POST"] },
            // { url: "/users/userLogin", methods: ["POST"] },
            // { url: "/users/ownerLogin", methods: ["POST"] },
            // { url: "/users/shopAdminLogin", methods: ["POST"] },
            // { url: "/users/adminLogin", methods: ["POST"] },
            // { url: "/product/Fruits", methods: ["POST"] },
            // { url: "/product/household", methods: ["POST"] },
            // { url: "/product/snaks", methods: ["POST"] },
            // { url: "/product/vegetableGet", methods: ["GET"] },
            // { url: "/product/fruitklsGet", methods: ["GET"] },
            // { url: "/product/getone", methods: ["GET"] },            
            // { url: "/product/getonedata", methods: ["GET"] },
            // { url: "/users/adminRegister", methods: ["POST"] },
            // { url: "/product/cart", methods: ["POST"] },
            // { url: "/product/cart", methods: ["GET"] },
            // { url: "/product/cart", methods: ["DELETE"] },
            // { url: "/product/getonedata/:_id/addCart", methods: ["GET"] },
            // { url: "/product/getonedata/:_id/deleteCart", methods: ["GET"] },
            // { url: "/product/addOrder", methods: ["POST"] },
            // { url: "/users/profile", methods: ["Post"] },
            // { url: "/product/getimageproduct", methods: ["GET"] },
            // { url: "/product/oneimageproduct/:_id", methods: ["GET"] },
            // { url: "/product/cancelbyuser/:_id", methods: ["GET"] },
            // { url: "/product/getimageproduct", methods: ["GET"] },
            // { url: "/product/oneimageproduct/:_id", methods: ["GET"] },
            // { url: "/product/getonedata/:_id/addCart", methods: ["GET"] },
        ],
    })
);

app.use(express.json());

app.use("/users", require('./users.routes'));
app.use("/admin", require('./users.routes'));
// app.use("/product",async function (req,res ){
//     console.log(req);
// });
app.use(errors.errorHandler);

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log('Database Connected');
    },
    (error) => {
        console.log('Database can`t be connected' + error);
    }
);
