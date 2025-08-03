const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "${VALUE} is not a valid status",
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (this.toUserId.equals(this.fromUserId)) {
    throw new Error("You cannot send a connection request to yourself");
  }
    next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequest;
