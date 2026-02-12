const bcrypt = require("bcryptjs")


const hashPassword =  (password) => {

    const hashed = new Promise((resolve, reject) => {

        bcrypt.genSalt(12, (error, salt) => {
            if(error){
                reject(error)
            }


            bcrypt.hash(password, salt, (error, hash) => {
            if(error){
                reject(error)
            }

            resolve(hash)
        })

        })

    })

    return hashed

}

module.exports = hashPassword