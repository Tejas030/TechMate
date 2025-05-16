const validator = require("validator")

const validateSignUpData = (req)=>{
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName)
    {
        throw new Error("First Name and Last Name are required");
    }
    else if(!validator.isEmail(email))
    {
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Password is not strong. It should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol");
    }
    else if(!validator.isLength(firstName, {min: 3}))
    {
        throw new Error("First Name should be at least 3 characters long");
    }
    else if(!validator.isLength(lastName, {min: 3}))
    {
        throw new Error("Last Name should be at least 3 characters long");
    }
}
module.exports = {
    validateSignUpData
}