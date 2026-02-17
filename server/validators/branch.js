const { check, param } = require("express-validator");

const createBranchValidator = [

    check("branchName").notEmpty().withMessage("Branch Name is required"),
    check("phoneNumber").isLength({min : 10, max : 11}).withMessage("Phone number should be 10 or 11 characters long").notEmpty().withMessage("Phone number is required"),
    check("address").notEmpty().withMessage("Address is required"),
    check("operatingHours").notEmpty().withMessage("Operating Hours is required")

]


const idValidator = [

    param("branchId").custom(async (id) => {
        if(id && !mongoose.Types.ObjectId.isValid(id)){
            throw `Invalid branch Id`
        }
    })

]

const bodyIdValidator = [

        check("branchId").custom(async (id) => {
        if(id && !mongoose.Types.ObjectId.isValid(id)){
            throw `Invalid branch Id`
        }
    })

]

module.exports = {createBranchValidator, idValidator, bodyIdValidator}