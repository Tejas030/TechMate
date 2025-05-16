const express = require('express')
const {connectDB} = require("./config/database.js")
const { User } = require('./model/user.js')
const {validateSignUpData} = require('./utils/validtion.js')
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth.js")

const app = express()

app.use(express.json())

app.use(cookieParser)

// This is a sample route to signup
app.post("/signup" , async(req,res)=>{
    
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

// This is a sample route to login
app.post("/login" , async(req,res)=>{
    
    try {

        const {email , password} = req.body

        const user = await User.findOne({email : email})

        if(!user)
        {
            throw new error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(isPasswordValid)
        {
            const token = await jwt.sign({_id : user._id} , "secretkey")

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

app.get("/profile" , userAuth, async(req,res)=>{
 try {
    const user = req.user; //Extract user from request

    res.send(user) //Send
    
 } catch (error) {
    res.status(500).send("Error in fetching user " + error.message)
    
 }
    
})
// This is a sample route to fetch user details
app.get("/user" , async (req,res)=>{
    const userDetail = req.body.email
    try {
        const user = await User.findOne({email : userDetail})
        if(!user)
        {
            return res.status(404).send("User not found")
        }
        res.send(user);
        
    } catch (error) {
        res.status(500).send("Error in fetching user " + error.message)
        
    }
})
// This is a sample route to fetch all users
app.get("/feed" , async(req,res)=>{
    try {
        const users =  await User.find({});
        res.send(users);
        
    } catch (error) {
        res.status(500).send("Error in fetching user " + error.message)
        
    }
  
})

// This is a sample route to delete user details
app.delete("/user" , async(req,res)=>{
    const userId = req.body.userId
    console.log(userId)
    try {
        const user = await User.findByIdAndDelete(userId)
        if(!user)
        {
            return res.status(404).send("User not found")
        }
        res.send("User deleted successfully");
        
    } catch (error) {
        res.status(500).send("Error in deleting user " + error.message)
        
    }
})

// This  is a sampLe route to update user details
app.patch("/user/:userId" , async(req,res)=>{

    const userId = req.params?.userId
    const data = req.body;

    try {
        ALLOWED_UPDATES = ["firstName" , "lastName" , "password" , "skills" , "about" , "photoUrl"]

        const isValidOperation = Object.keys(data).every((update) => {

            return ALLOWED_UPDATES.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid Updates")
        }

        if(data?.skills.length > 5)
        {
            return res.status(400).send("Skills should be less than 5")
        }

        await User.findByIdAndUpdate({_id : userId}, data , {
            returnDocument : "before",
            runValidators : true
        })
        res.send("Updated Succesfully");
        
    } catch (error) {
        res.status(400).send("Patch Unsuccessful");


     }
})

const port = 3000

connectDB().then(()=>{
    console.log("Database is successfully connected");

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    })
    
}).catch((err)=>{
    console.error("Database connection failed" + " "+ err)
})

 