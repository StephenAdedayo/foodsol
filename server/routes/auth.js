const express = require("express")
const {validateUserRegistration, validateUserLogin, validateAccountVerification, validateResetPasswordOtp, validateResetPassword} = require("../validators/auth")
const validate = require("../validators/validate")
const { registerUser, loginUser, verifyAccount, resetPasswordOtp, resetPassword, googleAuth, resendResetPasswordOtp } = require("../controllers/auth")

const authRouter = express.Router()

authRouter.post("/sign-up", validateUserRegistration, validate, registerUser)
authRouter.post("/sign-in", validateUserLogin, validate, loginUser)
authRouter.post("/verify-account", validateAccountVerification, validate, verifyAccount)
authRouter.post("/send-otp", validateResetPasswordOtp, validate, resetPasswordOtp)
authRouter.post("/reset-password", validateResetPassword, validate, resetPassword)
authRouter.post("/resend-otp", validateResetPasswordOtp, validate, resendResetPasswordOtp)
authRouter.post("/google-auth", googleAuth)

module.exports = authRouter