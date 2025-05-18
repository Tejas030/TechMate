const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js")


profileRouter.get("/profile/view" , userAuth, async(req,res)=>{
 try {
    const user = req.user; //Extract user from request

    res.send(user) //Send
    
 } catch (error) {
    res.status(500).send("Error in fetching user " + error.message)
    
 }
    
})

profileRouter.patch("/profile/edit" , userAuth, async(req,res)=>{
   
})
module.exports=profileRouter;