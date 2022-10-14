const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        console.log('Image!')
    }
});
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == "image/jpeg" || file.mimetype == "images/png") {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

module.exports = multer({ storage: storage });