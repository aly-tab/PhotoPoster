const PhotoController = require('../controllers/photo.controller');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

module.exports = function(app) {
    app.get("/api/photos", PhotoController.list);
    app.post("/api/photos", upload.single("photo"), PhotoController.create);
    app.get("/api/photos/:id", PhotoController.detail);
    app.put("/api/photos/:id", PhotoController.update);
    app.delete('/api/photos/:id', PhotoController.delete);
    app.get('/api/photos/user/:userId', PhotoController.findAllPhotos)
}