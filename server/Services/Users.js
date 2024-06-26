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
    if (!EMAIL || !PASSWORD) {
      return res.status(400).send({ message: "Email et mot de passe sont requis" });
    }
    const FindUser = await User.findOne({ EMAIL });
    if (!FindUser) {
      return res.status(401).send({ message: "Email et Mot de passe invalide" });
    }
    const checkPwd = await bcrypt.compare(PASSWORD, FindUser.PASSWORD);
    if (!checkPwd) {
      return res.status(400).send({ message: "Email et Mot de passe invalide" });
    }
    try {
      const { _id, ROLE } = FindUser;
      const Token = await jwt.sign({ _id, ROLE }, process.env.Jwt_SECRETKEY);
      res.header('token', Token);
      res.status(200).send({ message: "Connecté....", Token });
    } catch (error) {
      res.status(500).send({ message: "Erreur lors de la génération du token" });
    }

  } catch (error) {
    // Erreur serveur générique
    res.status(500).send({ message: "Erreur du serveur" });
  }
});



route.post("/"  ,authMiddleFunc,async (req,res)=>{
  try {
    if(req.ROLE ==="admin"){
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
    }else if(req.ROLE==="superviseur"){
      const userData = req.body; 
      const {EMAIL} = userData
      const FindUser =await User.findOne({EMAIL});
      if (!FindUser){
          const hashpwd =await  bcrypt.hash(userData.PASSWORD,10)
          userData.PASSWORD = hashpwd
          userData.ROLE ="agent"
          userData.SUPERVISEUR = req.userId
          const newUser = await User.create(userData);
          res.status(200).send({message: "User created <3 ", data: newUser} )
      }
      else{
          res.status(401).send({message: " User  created before "} )
      }
    }
  } catch (error) {
    res.status(500).send({error:error.message})
  }
})




route.get("/",authMiddleFunc,async (req,res)=>{
    try {
      if(req.ROLE === "admin"){
        const users = await User.find()
        users ? res.status(200).send({message: " success fetching Data" , data : users})
        :res.status(404).send({message:"Aucun user "})
      }else if(req.ROLE === "superviseur"){
        const users = await User.find({SUPERVISEUR:req.userId})
        users ? res.status(200).send({message: "Les Usitilisateurs de Superviseur  " , data : users})
        :res.status(404).send({message:"Aucun user "})
      }else if(req.ROLE === "agent" ){
        const users = await User.find({ROLE:"installeur"})
        users ? res.status(200).send({message: "Liste des installateurs" , data : users})
        :res.status(404).send({message:"Aucun user "})
       
      }
    } catch (error) {
      res.status(500).send({message:"Server error"})
    }
})

route.get("/installeurs",authMiddleFunc,async (req,res)=>{
  try {
      const users = await User.find({ROLE:"installeur"})
      users ? res.status(200).send({message: " success fetching Data" , data : users})
      :res.status(404).send({message:"Aucun user "})
  } catch (error) {
    res.status(500).send({message:"Server error"})
  }
})


module.exports = route 