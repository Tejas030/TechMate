const express = require('express')
const {connectDB} = require("./config/database.js")
const cookieParser = require("cookie-parser")
const app = express()

app.use(express.json())

app.use(cookieParser)
const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")            
const requestRouter = require("./routes/request.js")


app.use("/" , authRouter)
app.use("/" , profileRouter)        
app.use("/" , requestRouter)

/*// This is a sample route to fetch user details
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
*/

const port = 3000

connectDB().then(()=>{
    console.log("Database is successfully connected");

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    })
    
}).catch((err)=>{
    console.error("Database connection failed" + " "+ err)
})

 