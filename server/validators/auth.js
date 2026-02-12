const {check} = require("express-validator")
const validateEmail = require("./validateEmail")


const validateUserRegistration = [

    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check("phoneNumber").isLength({min : 10, max : 11}).withMessage("Phone number should be 10 or 11 characters long a").isMobilePhone().withMessage("invalid phone number").notEmpty().withMessage("Phone Number is required"),
    check("password").isLength({min : 7}).withMessage("Password should be at least 7 characters long").notEmpty().withMessage("Password is required")

]

const validateUserLogin = [
        check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
        check("password").isLength({min : 7}).withMessage("Password should be at least 7 characters long").notEmpty().withMessage("Password is required")
]

const validateAccountVerification = [
    check("email").custom(async (email) => {
        if(email){
        validateEmail(email)
        }
    }).notEmpty().withMessage("Email is required"),
    check("otp").isLength({min:4, max:4}).withMessage("otp should be 4 characters long").notEmpty().withMessage("Otp is required")
]

const validateResetPasswordOtp = [
    check("email").custom(async (email) => {
        if(email){
        validateEmail(email)
        }
    }).notEmpty().withMessage("Email is required")
]

const validateResetPassword = [
check("email").custom(async (email) => {
        if(email){
        validateEmail(email)
        }
    }).notEmpty().withMessage("Email is required"),

check("otp").isLength({min:4, max:4}).withMessage("otp should be 4 characters long").notEmpty().withMessage("Otp is required"),

 check("newPassword").isLength({min : 7}).withMessage("Password should be at least 7 characters long").notEmpty().withMessage("Password is required")


]

module.exports = {validateUserRegistration, validateUserLogin, validateAccountVerification, validateResetPasswordOtp, validateResetPassword}