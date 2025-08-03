const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js")
const {validateEditProfileData, validateEditProfileData} = require("../utils/validation.js")


profileRouter.get("/profile/view" , userAuth, async(req,res)=>{
 try {
    const user = req.user; //Extract user from request

    res.send(user) //Send
    
 } catch (error) {
    res.status(500).send("Error in fetching user " + error.message)
    
 }
    
})

profileRouter.patch("/profile/edit" , userAuth, async(req,res)=>{
 try {
   if(!validateEditProfileData(req))
   {
    return res.status(400).send("Invalid fields to edit")
   }

   const loggedInUser = req.user; //Extract user from request

   Object.keys(req.body).forEach((key) =>{loggedInUser[key] = req.body[key]}) 
   
    await loggedInUser.save()//Update user object with new data

    res.json({message : `${loggedInUser.firstName} , profile updated successfully`,
              data : loggedInUser}) //Send updated user object as response
}
   catch (error) {
      res.status(500).send("Error in editing user " + error.message)
      
   }

   
})


profileRouter.patch("/profile/password", userAuth, async(req,res)=>{
    try {
        const {oldPassword, newPassword} = req.body;
        const user = req.user; //Extract user from request

        if(!oldPassword || !newPassword)
        {
            return res.status(400).send("Old Password and New Password are required");
        }

        if(oldPassword === newPassword)
        {
            return res.status(400).send("Old Password and New Password should not be same");
        }

        const isPasswordValid = await bcrypt.compare(oldPassword,user.password)

        if(isPasswordValid)
        {
            const passwordHash = await bcrypt.hash(newPassword , 10)
            user.password = passwordHash;
            await user.save()
            res.send("Password updated successfully")
        }
        else
        {
            return res.status(400).send("Invalid Old Password")
        }
        
    } catch (error) {
        res.status(500).send("Error in updating password " + error.message)
        
    }
})
module.exports=profileRouter;