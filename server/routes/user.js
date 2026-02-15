const express = require("express")
const { getUserData, updateUserProfile, addUserAddress } = require("../controllers/user")
const upload = require("../init/multer")
const { isAuth } = require("../middlewares")
const { addAddressValidator } = require("../validators/user")
const validate = require("../validators/validate")


const userRouter = express.Router()

userRouter.get("/user-data", isAuth, getUserData)
userRouter.post("/update-profile", isAuth, upload.single("image"), updateUserProfile)
userRouter.post("/add-address", isAuth, addAddressValidator, validate, addUserAddress)

module.exports = userRouter