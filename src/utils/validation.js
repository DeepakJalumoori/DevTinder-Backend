const validator = require("validator");

const validateSignup = ((req) => {
  const {firstName, lastName, emailId, password } = req;

  if(!firstName || !lastName || !emailId || !password){
    throw new Error("Required fields are missing...")
  }
  else if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid!!")
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Password is weak!!");
  }
});

const validateEditProfile = (req) => {
  const allowedEditFields = ["firstName","lastName","emailId","photoUrl","age","gender","about"];

  const isEditAllowed = Object.keys(req.body).every(
    (field) => {
      return allowedEditFields.includes(field);
    }
  );  
  return isEditAllowed;
};

module.exports = {validateSignup,validateEditProfile};