const { redisClient } = require("../init/redis");
const User = require("../models/User")
const cloudinary = require("cloudinary").v2


const getUserData = async (req, res, next) => {

    try {
        const { _id } = req.user

    const cacheKey = `user:${_id}`;

    // VALUE comes from Redis
    const cachedUser = await redisClient.get(cacheKey);

    if (cachedUser) {
      return res.status(200).json({
        success: true,
        source: "cache",
        user: JSON.parse(cachedUser),
      });
    }


        const user = await User.findById(_id).select("-resetPasswordOtp -verifyOtp -resetPasswordOtpExpires -verifyOtpExpiresAt -password")
        if(!user){
            res.code = 404
            throw new Error("User not found")
        }

         await redisClient.setEx(cacheKey, 300, JSON.stringify(user));


        res.status(200).json({code : 200, success: true, userData : user})
    } catch (error) {
        next(error)
    }

}



const updateUserProfile = async (req, res, next) => {

    try {
        const {_id} = req.user
        const {email, phoneNumber, name} = req.body

        const {file} = req

        const user = await User.findById(_id)
        if(!user){
            res.code = 404
            throw new Error("Login to set up your account")
        }

        if(email){
            const isEmailExists = await User.findOne({email})
            if(isEmailExists && isEmailExists.email === email && String(isEmailExists._id) !== String(user._id)){
                res.code = 400
                throw new Error("Email already exists")
            }
        }

        if(phoneNumber){
            const isPhoneExists = await User.findOne({phoneNumber})
            if(isPhoneExists && isPhoneExists.phoneNumber === +phoneNumber && String(isPhoneExists._id) !== String(user._id)){
                res.code = 400
                throw new Error("Phone number already exists")
            }
        }

        if(file){
            const imageUrl = await cloudinary.uploader.upload(file.path)
            const image = imageUrl.secure_url
            user.image = image
        }else{
            user.image = user.image
        }

        user.email = email ? email : user.email,
        user.phoneNumber = phoneNumber ? phoneNumber : user.phoneNumber
        user.name = name ? name : user.name
        // user.address = address ? JSON.parse(address) : user.address
      
        
        await user.save()
        res.status(200).json({code:200, success : true, message: "Profile updated"})
    } catch (error) {
        next(error)
    }

}

const addUserAddress = async (req, res, next) => {
    try {
        // Because the state WAS the address object, 
        // these fields are now at the top level of req.body
        const {_id} = req.user
        const { street, city, lat, lng, label } = req.body;


        const userExists = await User.findById(_id)
        if(!userExists){
            res.code = 401
            throw new Error("Unauthorized")
        } 

        const newEntry = {
            street,
            city,
            label: label || "Home",
            location: {
                type: "Point",
                coordinates: [Number(lng), Number(lat)] 
            }
        }

        const user = await User.findByIdAndUpdate(
            _id,
            { $push: { address: newEntry } },
            { new: true }
        );

        res.status(200).json({ 
            code : 200,
            success: true, 
            message: "Address saved", 
            address: user.address 
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {getUserData, updateUserProfile, addUserAddress}