const express = require("express")
const route = express.Router()
const User = require("../Models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const authMiddleFunc = require("../middlewares/AuthMiddleware")

route.get("/token",authMiddleFunc,async (req,res)=>{
  const user = await User.findOne({_id:req.userId})
  user? res.status(200).send({message: " success fetching Data" , data : user})
  :res.status(404).send({message:"Aucun user "})
})

route.post("/login", async (req, res) => {
  try {
    const { EMAIL, PASSWORD } = req.body;
    const FindUser = await User.findOne({ EMAIL });

    if (FindUser) {
      const checkPwd = await bcrypt.compare(PASSWORD, FindUser.PASSWORD);
      if (checkPwd) {
        const { _id, isAdmin } = FindUser;
        const Token = await jwt.sign({ _id, isAdmin }, process.env.Jwt_SECRETKEY);
        res.header('token', Token);
        res.status(200).send({ message: "Connected....", Token });
      } else {
        res.status(400).send({ message: "Password invalid" });
      }
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});


route.post("/" , async (req,res)=>{
  try {
    const userData = req.body; 
    const {EMAIL} = userData
    const FindUser =await User.findOne({EMAIL});
    if (!FindUser){
        const hashpwd =await  bcrypt.hash(userData.PASSWORD,10)
        userData.PASSWORD = hashpwd
        const newUser = await User.create(userData);
        res.status(200).send({message: "User created <3 ", data: newUser} )
    }
    else{
        res.status(401).send({message: " User  created before "} )
    }
  } catch (error) {
    res.status(500).send({error:error.message})
  }
    
})




route.get("/",authMiddleFunc,async (req,res)=>{
    try {
      if(req.isAdmin == true ){
        const users = await User.find()
        users ? res.status(200).send({message: " success fetching Data" , data : users})
        :res.status(404).send({message:"Aucun user "})
      }else{
        res.status(404).send({message:"Not Admin"})
      }
    } catch (error) {
      res.status(500).send({message:"Server error"})
    }
    
})



module.exports = route 