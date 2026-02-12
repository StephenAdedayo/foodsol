const express = require("express")
const { getUserData, updateUserProfile } = require("../controllers/user")
const upload = require("../init/multer")
const { isAuth } = require("../middlewares")


const userRouter = express.Router()

userRouter.get("/user-data", isAuth, getUserData)
userRouter.post("/update-profile", isAuth, upload.single("image"), updateUserProfile)

module.exports = userRouter