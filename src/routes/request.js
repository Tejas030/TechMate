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

module.exports = requestRouter;
