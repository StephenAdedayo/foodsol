const { check } = require("express-validator");

const addAddressValidator = [

    check("street").notEmpty().withMessage("Street is required"),
    check("city").notEmpty().withMessage("City is required"),
    check("lat").notEmpty().withMessage("Lat is required"),
    check("lng").notEmpty().withMessage("Lng is required")

]

module.exports = {addAddressValidator}