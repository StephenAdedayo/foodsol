const isSuperAdmin = async (req, res, next) => {

    try {
        if(req.user && req.user.role === "superAdmin"){
            return next()
        }

        res.status(403); 
        throw new Error("Access denied. Superadmin privileges required.");
    } catch (error) {
        next(error)
    }

}

module.exports = isSuperAdmin