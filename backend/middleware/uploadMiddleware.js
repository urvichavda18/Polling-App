const multer = require("multer");
const path = require("path");

// configure storage
const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        
        cb(null, path.join(__dirname, 'uploads')); 
    },
    filename: (req,file, cb) => {
        
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to restrict file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .png, and .jpg formats are allowed'), false);
    }
};


const upload = multer({ storage, fileFilter });

module.exports = upload;

