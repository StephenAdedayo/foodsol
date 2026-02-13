const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, // URL to the food image
        required: true
    },
    category: {
        type: String, // e.g., "Swallow", "Proteins", "Sides"
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true // If the kitchen runs out of Jollof, they toggle this off
    },
    // Optional: For things like "Choose Size" or "Add Extra"
    options: [
        {
            name: { type: String }, // e.g., "Extra Beef"
            price: { type: Number } // e.g., 500
        }
    ],
    calories: { type: Number },
    isVegetarian: { type: Boolean, default: false }
}, { timestamps: true });

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu