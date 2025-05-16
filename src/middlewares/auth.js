const { User } = require("../model/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req,res,next)=>{
    try {
        const {token} = req.cookies; //Extract token from cookies

        if(!token)
        {
              throw new Error("Token not found")
        }

    let decodeObj = await jwt.verify(token , "secretkey") //Verify the token

    const {_id} = decodeObj

    const user = await User.findById(_id) //Find the user by id
    
    if(!user)
    {
        throw new error("User not Found")
    }//Find the user by id = require("jsonwebtoken");

    req.user = user //Attach user to request object
    
    next() //Call next middleware

        
    } catch (error) {
        res.status(400).send("Error in auth " + error.message) 
        
    }
   

}

module.exports = {userAuth};
