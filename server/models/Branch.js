const mongoose = require("mongoose")


const branchSchema = new mongoose.Schema({

    restaurantId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Restaurant"
    },
    
    branchName: {
        type: String, 
        required: true // e.g., "Ikeja GRA Branch" or "Lekki Phase 1"
    },

    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, default: "Osun" },
        // GeoJSON is a must for distance-based search
        location: {
            type: { type: String, default: "Point" },
            coordinates: { type: [Number], required: true } // [longitude, latitude]
        }
    },

    phoneNumber: {
        type: String,
        required: true
    },

    operatingHours: [
        {
            day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
            open: { type: String }, // e.g., "08:00"
            close: { type: String } // e.g., "22:00"
        }
    ],

    isOpen: {
        type: Boolean,
        default: true // Allows the branch to manually "Close" for a few hours if busy
    },
    isVerified: {
        type: Boolean,
        default: false // Set by Superadmin after inspecting the location
    },
    averageRating: {
        type: Number,
        default: 0
    }


}, {timestamps : true})

// This index is CRITICAL. It allows you to find branches near a customer.
branchSchema.index({ "address.location": "2dsphere" });

const Branch = mongoose.model("Branch", branchSchema)

module.exports = Branch