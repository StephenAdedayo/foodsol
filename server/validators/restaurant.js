const { check } = require("express-validator");

const validateRestaurantValidation = [

    check("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("category").notEmpty().withMessage("Category is required")

]

module.exports = {validateRestaurantValidation}