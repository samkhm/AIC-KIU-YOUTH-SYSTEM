const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params : {
        folder: "aic_kiu_youth_images_folder",
        allowed_formats: ["jpeg", "jpg", "png", "webp"],
    },
});

const upload = multer({ storage });

module.exports = upload;