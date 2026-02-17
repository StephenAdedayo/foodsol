const Branch = require("../models/Branch")
const Restaurant = require("../models/Restaurant")
const cloudinary = require("cloudinary").v2

const createRestaurantBranch = async (req, res, next) => {

    try {
        const {_id} = req.user
        const {branchName, address, phoneNumber, operatingHours} = req.body

        const {file} = req

        const restaurant = await Restaurant.findOne({ownerId : _id}).populate("ownerId")
        if(!restaurant || !restaurant.isApproved || restaurant.ownerId.role !== "restaurantOwner"){
            res.code = 400
            throw new Error("Not allowed to create a branch")
        }

        let image;
        if(file){
        const imageUrl = await cloudinary.uploader.upload(file.path)
        image = imageUrl.secure_url
        }
        
           
        const newBranchData = {
            restaurantId : restaurant._id,
            branchName,
            address : JSON.parse(address),
            phoneNumber : +phoneNumber,
            operatingHours : JSON.parse(operatingHours), 
            image
        }

        const newBranch = new Branch(newBranchData)

        await newBranch.save()

        res.status(201).json({code : 201, success: true, message : "Branch created successfully", newBranch})

    } catch (error) {
        next(error)
    }

}


const approveRestaurantBranch = async (req, res, next) => {

    try {
        const {branchId} = req.body

        const branch = await Branch.findById(branchId)

        if(!branch){
            res.code = 400
            throw new Error("Branch does not exist")
        }


        await Branch.findByIdAndUpdate(branchId, {isVerified : true})


        res.status(200).json({code : 200, success:true, message : "Branch approved successfully"})
    } catch (error) {
        next(error)
    }

}


const disapproveRestaurantBranch = async (req, res, next) => {


try {
        const {branchId} = req.body

        const branch = await Branch.findById(branchId)

        if(!branch){
            res.code = 400
            throw new Error("Branch does not exist")
        }

        await Branch.findByIdAndUpdate(branchId, {isVerified : false})

        res.status(200).json({code : 200, success:true, message : "Branch disapproved successfully"})
    } catch (error) {
        next(error)
    }


}


const getAllBranches = async (req, res, next) => {

    try {
        const allBranches = await Branch.find({})


        if(!allBranches){
            res.code = 400
            throw new Error("Branches not found")
        }


        res.status(200).json({code : 200, success:true, message : "All branches fetched", allBranches})
    } catch (error) {
        next(error)
    }

}


const getRestaurantBranches = async (req, res, next) => {

    try {
        const {_id} = req.user
        const restaurant = await Restaurant.findOne({ownerId : _id})

        if(!restaurant){
            res.code = 400
            throw new Error("Restaurant not found")
        }

        const branches = await Branch.find({restaurantId: restaurant._id})

        if(!branches){
            res.code = 400
            throw new Error("Branches not found")
        }


        res.status(200).json({code : 200, success:true, branches})


    } catch (error) {
        next(error)
    }

}


const deleteRestaurantBranch = async (req, res, next) => {

    try {
        const {branchId} = req.body

       const branch = await Branch.findOneAndDelete({_id: branchId})

       if(!branch){
            res.code = 400
            throw new Error("Branch not found")
        }

        res.status(200).json({code : 200, success: true, message : "Branch deleted successfully"})
    } catch (error) {
        next(error)
    }

}

const getSingleRestaurantBranch = async (req, res, next) => {


    try {
        const {branchId} = req.params

        const singleBranch = await Branch.findById(branchId)

        if(!singleBranch){
            res.code = 400
            throw new Error("Could not get branch")
        }

       res.status(200).json({code : 200, success: true, singleBranch})

    } catch (error) {
        next(error)
    }

}

const updateRestaurantBranch = async (req, res, next) => {
    try {
        const { branchId } = req.params;
        const { branchName, address, phoneNumber, operatingHours } = req.body;
        const { file } = req;

        // 1. Find the branch first
        const branch = await Branch.findById(branchId);
        if (!branch) {
            res.status(404);
            throw new Error("Branch not found");
        }

        // 2. Prepare the update object
        let updateData = {
            branchName : branchName ? branchName : branch.branchName, 
            phoneNumber : phoneNumber ? phoneNumber : branch.phoneNumber
        };

        // 3. Handle Image update (if a new one is uploaded)
        if (file) {
            const uploadResponse = await cloudinary.uploader.upload(file.path);
            updateData.image = uploadResponse.secure_url;
        }

        // 4. Handle JSON parsing for complex objects
        if (address) {
            updateData.address = typeof address === 'string' ? JSON.parse(address) : address;
        }
        
        if (operatingHours) {
            updateData.operatingHours = typeof operatingHours === 'string' ? JSON.parse(operatingHours) : operatingHours;
        }

        // 5. Save changes
        const updatedBranch = await Branch.findByIdAndUpdate(
            branchId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            code: 200,
            success: true,
            message: "Branch updated successfully",
            updatedBranch
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {createRestaurantBranch, approveRestaurantBranch, disapproveRestaurantBranch, getAllBranches, getRestaurantBranches, deleteRestaurantBranch, getSingleRestaurantBranch, updateRestaurantBranch}