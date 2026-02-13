const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    role: { 
    type: String, 
    enum: ['customer', 'restaurantOwner', 'driver', 'superAdmin'], 
    default: 'customer' 
    },

    address: {
      type: [String],
      default : [],
    },

    verifyOtp: {
      type: String,
      default: "",
    },

    verifyOtpExpiresAt: {
      type: Number,
      default: 0,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    resetPasswordOtp: {
      type: String,
      default: "",
    },

    authProvider: {
      type: String,
      default: "Local",
    },

    resetPasswordOtpExpires: {
      type: Number,
      default: 0,
    },

    cartData: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true, minimize: false },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
