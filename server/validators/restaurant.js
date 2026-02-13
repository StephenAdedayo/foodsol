const { check, param } = require("express-validator");
const  mongoose  = require("mongoose");

const validateRestaurantValidation = [

    check("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("category").notEmpty().withMessage("Category is required")

]

const idValidator = [

    check("restaurantId").custom(async (id) => {
        if(id && !mongoose.Types.ObjectId.isValid(id)){
            throw `Invalid restaurant Id`
        }
    })

]

const singleRestaurantIdValidator = [
    param("id").custom(async (id) => {
        if(id && !mongoose.Types.ObjectId.isValid(id)){
            throw `Invalid restaurant Id`
        }
    })
]


module.exports = {validateRestaurantValidation, idValidator, singleRestaurantIdValidator}