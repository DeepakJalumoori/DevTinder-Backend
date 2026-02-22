const jwt = require("jsonwebtoken");
const User = require("../src/models/user")

const userAuth = async (req,res,next) => {
  try{
    const token = req.cookies.token;
    //validate jwt token
    if(!token){
      throw new Error("Token is invalid..");
    }
    const decodeObj = jwt.verify(token,"DevTinder@2004");
    const {_id} = decodeObj;

    const user = await User.findById(_id);
    if(!user){
      throw new Error("User not found!!!");
    }
    
    req.user = user;
    next();
  }
  catch(err){
    res.status(400).send(err.message);
  }
};

module.exports = {
  userAuth
};