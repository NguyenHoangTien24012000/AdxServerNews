const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/public")
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



module.exports  = upload;


