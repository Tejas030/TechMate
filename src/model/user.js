const mongoose = require("mongoose")

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
    },
    password : {
        type : String,
        required : true ,
        minLength : 6,
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