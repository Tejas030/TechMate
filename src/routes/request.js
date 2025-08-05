const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../model/connectionRequest.js");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    const user = req.user;
    const fromUserId = user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    try {
      const allowedValues = [interested, ignored];
      if (!allowedValues.includes(status)) {
        throw new Error("Invalid status value");
      }

      const validateUserId = await ConnectionRequest.findById({toUserId});
        if (!validateUserId) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res.status(400).json({
          message: "Connection Request Already Exists",
        });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.status(201).json({
        message: "Connection Request Sent",
        data,
      });
    } catch (e) {
      res.status(400).json({
        message: "Error in Sending Connection Request",
        error: e.message,
      });
    }
  }
);
requestRouter.post("/request/review/:status/:requestID" , userAuth , async(req , res) => {
  const {status , requestID} = req.params;
  const allowedStatus = ["accepted","rejected"];
  const loggedInUser = req.user;
  if(!allowedStatus.includes(status))
  {
    rs.json({
      message: "Invalid status value",
    })
  }
  try{
    const connectionRequest = await ConnectionRequest.findOne({
      _id : requestID,
      toUserID : loggedInUser._id,
      status : "interested"
    })
    if(!connectionRequest)
    {
      return res.json({
        message: "Connection Request Not Found or Already Processed"
      })
    }
    connectionRequest.status = status;
    await connectionRequest.save();

  }
  catch(err)
  {
    res.json({
      message: "Error in processing request",
      error: err.message
    })
  }
})

module.exports = requestRouter;
