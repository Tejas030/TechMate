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

const port = 3000

connectDB().then(()=>{
    console.log("Database is successfully connected");

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    })
    
}).catch((err)=>{
    console.error("Database connection failed" + " "+ err)
})

