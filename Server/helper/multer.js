const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Configure Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Cafe', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Allowed file formats
    },
});

const upload = multer({ storage });

module.exports = upload;
