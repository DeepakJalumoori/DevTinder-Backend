const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId : {
      type : String,
      ref : "User",
      required : true
    },
    toUserId : {
      type : String,
      ref : "User",
      required : true
    },
    status : {
      type : String,
      required : true,
      enum : {
        values : ["ignored","interested","accepted","rejected"],
        message : `{VALUE} is incorrect status type`
      }
    }
  },
  {
    timestamps : true
  }
);

connectionRequestSchema.pre("save", function(next){
  const connectionRequest = this;
  if(connectionRequest.fromUserId == connectionRequest.toUserId){
    throw new Error("Cannot send connection to yourself");
  }
});

const connectionRequestModel = mongoose.model("connectionRequest",connectionRequestSchema);
module.exports = connectionRequestModel;