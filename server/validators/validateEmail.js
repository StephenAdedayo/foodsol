const validateEmail = (email) => {

    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

} 

module.exports = validateEmail