const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength: 3
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Email is not valid")
            }

        }
    },
    password : {
        type : String,
        required : true ,
        minLength : 6,
        validate(value)
        {
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Password is not strong. It should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol")
            }

        }
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value)
        {
            if(!["Male" , "Female","Others"].includes(value))
            {
                throw new Error("Gender is Not Valid");
                
            }

        }
    },
    photoUrl : {
        type : String,
        validate(value)
        {
            if(!validator.isURL(value))
            {
                throw new Error("Photo URL is not valid")
            }
        }
    },

    about : {
        type : String,
        default : "Hey there! I am using this app"
    },

    skills : {
        type : [String],
        
    },

},{
    timestamps : true
})

const User = mongoose.model("User",userSchema)

module.exports = {User};