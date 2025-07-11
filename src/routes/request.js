const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js")

requestRouter.post("/sendConnectionRequest" , userAuth, async(req,res)=>{
    const user = req.user
    res.send(user.firstName + " " + user.lastName + " " + "sent you a connection request")
}
)

module.exports=requestRouter;