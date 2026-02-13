const express = require("express")
const { isAuth } = require("../middlewares")
const { createRestaurant, approveRestaurant, disApproveRestaurant, getAllRestaurants, deleteRestaurant, getSingleRestaurant, getMyRestaurantProfile, updateRestaurantProfile } = require("../controllers/restaurant")
const { validateRestaurantValidation, idValidator, singleRestaurantIdValidator } = require("../validators/restaurant")
const validate = require("../validators/validate")
const upload = require("../init/multer")
const isSuperAdmin = require("../middlewares/isSuperAdmin")
const isAdmin = require("../middlewares/isAdmin")

const restaurantRouter = express.Router()

restaurantRouter.post("/register-restaurant", isAuth, upload.fields([{name : "logo", maxCount : 1}, {name : "banner", maxCount : 4}]), validateRestaurantValidation, validate, createRestaurant)
restaurantRouter.post("/approve-restaurant", isAuth, isSuperAdmin, idValidator, validate, approveRestaurant)
restaurantRouter.post("/disapprove-restaurant", isAuth, isSuperAdmin, idValidator, validate, disApproveRestaurant)
restaurantRouter.get("/get-restaurants", isAuth, isSuperAdmin, getAllRestaurants)
restaurantRouter.delete("/delete-restaurant", isAuth, isSuperAdmin, idValidator, validate,  deleteRestaurant)
restaurantRouter.get("/single-restaurant/:id", isAuth, singleRestaurantIdValidator, validate, getSingleRestaurant)
restaurantRouter.get("/get-restaurant-profile", isAuth, isAdmin, getMyRestaurantProfile)
restaurantRouter.post("/update-restaurant-profile", isAuth, isAdmin, upload.fields([{name : "logo", maxCount : 1}, {name : "banner", maxCount : 4}]), updateRestaurantProfile)

module.exports = restaurantRouter