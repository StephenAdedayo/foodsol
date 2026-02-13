const mongoose = require("mongoose")


const restaurantSchema = new mongoose.Schema({

    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },

    restaurantName : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    logo : {
        type : String,
        required : true
    },

    banner : {
        type : [String],
        required : true
    },

    category : {
        type : [String],
        required : true
    },

    isApproved: {
        type: Boolean,
        default: false // Only Superadmin can change this to true
    }



}, {timestamps : true, minimize : false})


const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant