const { GOOGLE_WEB_CLIENT_ID } = require("../config/keys")
const User = require("../models/User")
const comparePassword = require("../utils/comparePassword")
const generateCode = require("../utils/generateCode")
const generateToken = require("../utils/generateToken")
const hashPassword = require("../utils/hashPassword")
const sendEmail = require("../utils/sendEmails")
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(GOOGLE_WEB_CLIENT_ID);

const registerUser = async (req, res, next) => {

    try {
        const {email, phoneNumber, password} = req.body

        if(email){
            const emailExists = await User.findOne({email})
            if(emailExists){
                res.code = 400
                throw new Error("User already exists")
            }
        }

        if(phoneNumber){
            const phoneExists = await User.findOne({phoneNumber})
            if(phoneExists){
                res.code = 400
                throw new Error("User already exists")
            }
        }

        const hashedPassword = await hashPassword(password)

        const userData = {
            email, phoneNumber : +phoneNumber, password : hashedPassword
        }

        const newUser = new User(userData)

        await newUser.save()

        const token = generateToken(newUser)

        await sendEmail({
            emailTo : newUser.email,
            subject : "User Registration",
            html : `
            <div>
             <p>You have successfully registered on Foodsol</p>
            </div>
            `
        })
        
        res.status(201).json({code: 201, success: true, message : "User created successfully", token, newUser})
    } catch (error) {
        next(error)
    }

}


const loginUser = async (req, res, next) => {

    try {
        const {email, password} = req.body

        if(email && password){
            const user = await User.findOne({email})
            if(!user){
               res.code = 400
               throw new Error("Email not found")
            }


            const isMatch = await comparePassword(password, user.password)

            if(!isMatch){
                res.code = 400
                throw new Error("Password does not match")
            }


        if(!user.isAccountVerified){
         const otp = generateCode(4)
         user.verifyOtp = otp

         user.verifyOtpExpiresAt = Date.now() + 5 * 60 * 1000;
        
        await user.save()

        await sendEmail({
            emailTo : user.email,
            subject : "Account verification code",
            html : `
            <div>
             <p>Use the code below to verify your account</p>
             <p>Your verification otp is ${otp} expires in 5 minutes</p>
            </div>
            `
        })
        }

    
        const token = generateToken(user)
        res.status(200).json({code : 200, success: true, message : "User Logged in successfully", token})
        }

    } catch (error) {
        next(error)
    }

}


const verifyAccount = async (req, res, next) => {

    try {
        const {email, otp} = req.body

        if(email){
            const user = await User.findOne({email})

            if(!user){
               res.code = 400
               throw new Error("user not found")
            }


        if(!user.isAccountVerified){
            if(user.verifyOtp !== otp || user.verifyOtp === ""){
                res.code = 400
                throw new Error("Otp does not match")
            }

            if(user.verifyOtpExpiresAt < Date.now()){
                res.code = 400;
                throw new Error("Otp already expired");
            }
        }

         user.isAccountVerified = true
         user.verifyOtp = ""
         user.verifyOtpExpiresAt = 0

         await user.save()

         res.status(200).json({code : 200, status : true, message : "Account Verified successfully"})
        }
    } catch (error) {
        next(error)
    }

}

const resendResetPasswordOtp = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400);
            throw new Error("Email is required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        // 1. Generate new OTP (e.g., a 6-digit number)
        const otp = generateCode(4)

        // 2. Set expiration (e.g., 15 minutes from now)
        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        // 3. Send the OTP via email
        // Note: Use your existing mailer configuration here
        await sendEmail({
            emailTo: user.email,
            subject: "Your Password Reset OTP",
                html : `
                  <div>
                  <p>Use the otp below to reset your password</p>
                  <p>Your otp is ${otp}. Expires in 5 minutes </p>
                  </div>
                `        });

        res.status(200).json({
            code: 200,
            success: true,
            message : "Reset opt sent successfully"        });

    } catch (error) {
        next(error);
    }
};

const resetPasswordOtp = async (req, res, next ) => {

    try {
        const {email} = req.body

        if(email){
            const user = await User.findOne({email})
            if(!user){
                res.code = 400
                throw new Error("User not found")
            }

            const otp = generateCode(4)
            user.resetPasswordOtp = otp
            user.resetPasswordOtpExpires = Date.now() + 5  * 60 * 1000;

            await user.save()
            

            await sendEmail({
                emailTo : user.email,
                subject : "Reset password Otp",
                html : `
                  <div>
                  <p>Use the otp below to reset your password</p>
                  <p>Your otp is ${otp}. Expires in 5 minutes </p>
                  </div>
                `
            })

            res.status(200).json({code : 200, success : true, message : "Reset opt sent successfully"})
        }
    } catch (error) {
        next(error)
    }
}


const resetPassword = async (req, res, next) => {

    try {
        const {email, otp, newPassword} = req.body

        const user = await User.findOne({email})
        if(!user){
            res.code = 400
            throw new Error("User not found")
        } 

        if(user.resetPasswordOtp !== otp || user.resetPasswordOtp === ""){
            res.code = 400
            throw new Error("Otp does not match")
        }

        if(user.resetPasswordOtpExpires < Date.now()){
            res.code = 400
            throw new Error("Otp already expires")
        }


        const hashedPassword = await hashPassword(newPassword)

        user.password = hashedPassword
        user.resetPasswordOtp = ""
        user.resetPasswordOtpExpires = 0

        await user.save()

        res.status(200).json({code : 200, success: true, message : "Password reset successfully"})
    } catch (error) {
        next(error)
    }

}




const googleAuth = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_WEB_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        image: picture,
        authProvider: "google",
        isAccountVerified: false,
        googleId,
      });
    }

    const token = generateToken(user);

    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

module.exports = {registerUser, loginUser, verifyAccount, resetPasswordOtp, resetPassword, resendResetPasswordOtp, googleAuth}