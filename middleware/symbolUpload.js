const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/symbols');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const symbolUpload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }
}).fields([
  { name: 'image', maxCount: 1 },
]);

module.exports = symbolUpload;
