const isAdmin = async (req, res, next) => {

    try {
        if(req.user && req.user.role === "restaurantOwner"){
            return next()
        }

        res.code = 401
        throw new Error("Access denied")
    } catch (error) {
        next(error)
    }

}

module.exports = isAdmin