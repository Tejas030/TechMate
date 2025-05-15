const express = require('express')
const {connectDB} = require("./config/database.js")
const { User } = require('./model/user.js')

const app = express()

app.use(express.json())

app.post("/signup" , async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.send("User Details Saved Successfully");

    }
    catch(err)
    {
        res.status(400).send("Error in saving user " + err.message)
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
app.patch("/user" , async(req,res)=>{
    const userId = req.body.userId
    const data = req.body;
    try {
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

 