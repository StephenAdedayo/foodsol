const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } = require("../config/keys")

const cloudinary = require("cloudinary").v2


const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name : CLOUDINARY_CLOUD_NAME,
        api_key : CLOUDINARY_API_KEY,
        api_secret : CLOUDINARY_SECRET_KEY
    })

}


module.exports = connectCloudinary