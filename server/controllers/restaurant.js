const Restaurant = require("../models/Restaurant")
const User = require("../models/User")
const cloudinary = require("cloudinary").v2

const createRestaurant = async (req, res, next) => {

    try {
        
    const { restaurantName, description,  category } = req.body
    const ownerId = req.user._id

    const isRestaurantExists = await Restaurant.findOne({ownerId})
    if(isRestaurantExists){
        res.code = 401
        throw new Error("Restaurant already exists")
    }

    const logo = req.files['logo'] ? req.files['logo'][0] : null;
    const banner = req.files['banner'] || [];

    const imageUrl = await cloudinary.uploader.upload(logo.path)
    const image = imageUrl.secure_url

    const uploadImages = banner.map(async (file) => {
                const response = await cloudinary.uploader.upload(file.path)
                return response.secure_url
            })
    const imagesUrl = await Promise.all((uploadImages))

    const restaurantData = {
        ownerId,
        restaurantName,
        description,
        category : JSON.parse(category),
        logo : image,
        banner : imagesUrl
    }

    const newRestaurant = new Restaurant(restaurantData)

    
    await newRestaurant.save()

    res.status(201).json({code : 201, success: true, message : "Restaurant created successfully", newRestaurant})

    } catch (error) {
        next(error)
    }
} 


const approveRestaurant = async (req, res, next) => {

    try {
        const {restaurantId} = req.body

        const restaurant = await Restaurant.findOne({_id : restaurantId})
        const ownerId = restaurant.ownerId
        if(!restaurant){
            res.code = 401
            throw new Error("Restaurant does not exist")
        }

        restaurant.isApproved = true
          
        await restaurant.save()

        await User.findByIdAndUpdate(ownerId, {role : "restaurantOwner"})

        res.status(200).json({code : 200, success: true, message : "Restaurant approved successfully"})
    } catch (error) {
        next(error)
    }

}

const disApproveRestaurant = async (req, res, next) => {

    try {
        const {restaurantId} = req.body

        const restaurant = await Restaurant.findOne({_id : restaurantId})
        
        if(!restaurant){
            res.code = 401
            throw new Error("Restaurant does not exist")
        }

        restaurant.isApproved = false

        await restaurant.save()

        res.status(200).json({code : 200, success: true, message : "Restaurant approved revoked"})
    } catch (error) {
        next(error)
    }



}


const getAllRestaurants = async (req, res, next) => {

    try {
        const restaurants = await Restaurant.find({})

        if(!restaurants){
            res.code = 400
            throw new Error("Could not get restaurants")
        }

        res.status(200).json({code : 200, success : true, restaurants})
    } catch (error) {
        next(error)
    }

}

const deleteRestaurant = async (req, res, next) => {

    try {
        const {restaurantId} = req.body

       const restaurant = await Restaurant.findOneAndDelete({_id: restaurantId})

       if(!restaurant){
            res.code = 400
            throw new Error("Could not get restaurants")
        }

        res.status(200).json({code : 200, success: true, message : "Restaurant deleted successfully"})
    } catch (error) {
        next(error)
    }

}


const getSingleRestaurant = async (req, res, next) => {

    try {
        const {id} = req.params

        const restaurant = await Restaurant.findById(id).populate("ownerId", "name email image")

        if (!restaurant) {
            res.status(404);
            throw new Error("Restaurant not found");
        }

        res.status(200).json({code:200, success: true, restaurant });
    } catch (error) {
        next(error)
    }
}



const getMyRestaurantProfile = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({ ownerId: req.user._id });
        if (!restaurant) {
            res.code = 400
            throw new Error("Restaurant details not found")
        }
        res.status(200).json({code: 200, success: true, restaurantData : restaurant });
    } catch (error) {
        next(error);
    }
};


const updateRestaurantProfile = async (req, res, next) => {
    try {
                 const ownerId = req.user._id
                 
        const { restaurantName, description, category } = req.body;

        const restaurant = await Restaurant.findOne({ownerId : ownerId})
        
        if(!restaurant){
            res.code = 400
            throw new Error("Restaurant not found")
        }

    const logo = req.files['logo'] ? req.files['logo'][0] : null;
    const banner = req.files['banner'] || [];

        if(req.files && req.files["logo"]){
        const imageUrl = await cloudinary.uploader.upload(logo.path)
        const image = imageUrl.secure_url
        restaurant.logo = image
        }

        

        if(req.files && req.files["banner"]){
            const uploadImages = banner.map(async (file) => {
                const response = await cloudinary.uploader.upload(file.path)
                return response.secure_url
            })
         const imagesUrl = await Promise.all((uploadImages))

         restaurant.banner = imagesUrl
        }

        
        restaurant.restaurantName = restaurantName ? restaurantName : restaurant.restaurantName
        restaurant.description = description ? description : restaurant.description
        restaurant.category = category ? JSON.parse(category) : restaurant.category


        await restaurant.save()

        res.status(200).json({ success: true, message: "Profile updated", restaurant });
    } catch (error) {
        next(error);
    }
};

module.exports = {createRestaurant, approveRestaurant, disApproveRestaurant, getAllRestaurants, deleteRestaurant, getSingleRestaurant, getMyRestaurantProfile, updateRestaurantProfile}