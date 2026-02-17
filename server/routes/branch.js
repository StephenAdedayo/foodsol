const express = require("express")
const { isAuth } = require("../middlewares")
const isAdmin = require("../middlewares/isAdmin")
const { createRestaurantBranch, approveRestaurantBranch, disapproveRestaurantBranch, getAllBranches, getRestaurantBranches, deleteRestaurantBranch, getSingleRestaurantBranch, updateRestaurantBranch } = require("../controllers/branch")
const { createBranchValidator, bodyIdValidator, idValidator } = require("../validators/branch")
const validate = require("../validators/validate")
const upload = require("../init/multer")
const isSuperAdmin = require("../middlewares/isSuperAdmin")


const branchRouter = express.Router()


branchRouter.post("/create-branch", isAuth, isAdmin, upload.single("image"), createBranchValidator, validate, createRestaurantBranch)
branchRouter.post("/approve-branch", isAuth, isSuperAdmin, bodyIdValidator, validate, approveRestaurantBranch)
branchRouter.post("/disapprove-branch", isAuth, isSuperAdmin, bodyIdValidator, validate, disapproveRestaurantBranch)
branchRouter.get("/all-branches", getAllBranches)
branchRouter.get("/restaurant-branches", isAuth, isAdmin, getRestaurantBranches)
branchRouter.delete("/delete-branch", isAuth, isAdmin, bodyIdValidator, validate, deleteRestaurantBranch)
branchRouter.get("/single-restaurant-branch/:branchId", idValidator, validate, getSingleRestaurantBranch)
branchRouter.post("/update-branch/:branchId", isAuth, isAdmin, upload.single("image"), idValidator, validate, updateRestaurantBranch)


module.exports = branchRouter