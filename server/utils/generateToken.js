const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/keys")


const generateToken = (user) => {

    return jwt.sign({id : user._id}, JWT_SECRET, {expiresIn : "7d"})

}


module.exports = generateToken