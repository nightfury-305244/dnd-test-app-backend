const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/stones');  // Make sure the uploads directory exists
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const stoneUpload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }  // Limit of 1MB for file size
}).fields([
  { name: 'frontImage', maxCount: 1 },
  { name: 'leftImage', maxCount: 1 },
  { name: 'rightImage', maxCount: 1 },
  { name: 'backImage', maxCount: 1 }
]);

module.exports = stoneUpload;
