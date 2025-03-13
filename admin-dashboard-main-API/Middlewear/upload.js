// const multer = require('multer');
// const path = require("path");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'Uploads/'); // specify the upload directory
//   },
//   filename: (req, file, cb) => {
//     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// // File Filter Function to Allow Only Images
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif/; // Allowed image extensions
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase()); // Check extension
//     const mimetype = allowedTypes.test(file.mimetype); // Check MIME type
  
//     if (extname && mimetype) {
//       cb(null, true); // Accept file
//     } else {
//       cb(new Error("Only image files are allowed (jpeg, jpg, png, gif)!"), false); // Reject file
//     }
//   };

// // Create the upload middleware
// const upload = multer({ storage: storage, fileFilter: fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size (5MB)
//     });

// module.exports = upload;


const multer = require("multer");
const path = require("path");

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure 'uploads/' directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Configure multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;  // ✅ Ensure this is exported
