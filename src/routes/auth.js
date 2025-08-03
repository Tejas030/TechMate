const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require('../utils/validation.js')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require('../model/user.js')


authRouter.post("/signup" , async(req,res)=>{
    
    try{
        validateSignUpData(req)  //Validate the data

        const {password} = req.body; //Extract password from request body
        //Hash the password 
        const passwordHash = await bcrypt.hash(password , 10)
        console.log(passwordHash)

        const user = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
        })//After validation create a new user
        await user.save()
        res.send("User Details Saved Successfully");

    }
    catch(err)
    {
        res.status(400).send("Error in saving user " + err.message)
    }
    
})

authRouter.post("/login" , async(req,res)=>{
    
    try {

        const {email , password} = req.body

        const user = await User.findOne({email : email})

        if(!user)
        {
            throw new error("Invalid email or password");
        }

        const isPasswordValid = await user.validatePassword(password) //Validate password using method from user model

        if(isPasswordValid)
        {
            const token = await user.getJWT() //Get JWT token from user model

            res.cookie("token" , token)

            res.send("Login Successful")
        }
        else
        {
            throw new error("Invalid email or password");
        }
    }
    catch(err)
    {
        res.status(400).send("Error in login " + err.message)
    }
})

authRouter.get("/logout" , async(req,res)=>{
    try {
        res.cookie("token",null, {
            expires : new Date(Date.now())
        })
        res.send("Logout Successful")
    } catch (error) {
        res.status(400).send("Error in logout " + error.message)
    }
})

module.exports = authRouter;