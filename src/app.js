const express = require('express')
const {connectDB} = require("./config/database.js")
const { User } = require('./model/user.js')

const app = express()

app.post("/signup" , async(req,res)=>{
    const user = new User({
        firstName : 'John',
        lastName : "Mathews",
        email : "johnmathews@gmail.com",
        password : "john@123",
        age : 24,
        gender : "M"
    })
    try{
        await user.save()
    res.send("User Details Saved Successfully");

    }
    catch(err)
    {
        res.send("Error in saving user " + err.message)
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

