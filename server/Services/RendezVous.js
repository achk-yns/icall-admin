const express  = require("express")
const route = express.Router()
const RendezVous = require("../Models/RendezVous")

const authMiddleware = require("../middlewares/AuthMiddleware")
const User = require('../Models/User'); 

route.post('/',authMiddleware,async function(req, res){
    try {
        const {NOM , PRENOM , TELEPHONE , ADRESSE} = req.body ; 
    const user_id = req.userId;
    const FindRendezvous =await RendezVous.findOne({NOM,user_id});
    if (!FindRendezvous){
        const newRendezVous = new RendezVous({...req.body,user_id});
        const DataSave = await newRendezVous.save();
        res.status(200).send({message: "Rendez-vous created <3 ", data: DataSave} )
    }
    else{
        res.status(401).send({message: " Rendez vous invalid  or  created before "} )
    }
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Server Error"} )
    }
})



route.get('/', authMiddleware, async (req, res) => {
    try {
        const userid = req.userId;
        let AllData = [];
        if (req.ROLE === "admin") {
            AllData = await RendezVous.find({}).populate('user_id', 'NOM PRENOM EMAIL');
        }else if (req.ROLE === "superviseur") {
            const users = await User.find({ SUPERVISEUR: req.userId });
            const userIds = users.map(user => user._id);
            console.log(userIds) 
            AllData = await RendezVous.find({ user_id: { $in: userIds } }).populate('user_id', 'NOM PRENOM EMAIL');
        } else if (req.ROLE === "installeur"){
            AllData = await RendezVous.find({INSTALLATEUR:req.userId}).populate('user_id', 'NOM PRENOM EMAIL');
        }else{
            AllData = await RendezVous.find({ user_id:userid }).populate('user_id', 'NOM PRENOM EMAIL');
        }
        
        if (AllData && AllData.length > 0) {
           
            res.status(200).send({ data: AllData });
        } else {
            res.status(200).send({ data: [], message: "Aucun Rendez Vous" });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send({ message: "serveur error" });
    }
});

route.get('/:NOM', authMiddleware, async (req, res) => {
    try {
      const { NOM } = req.params;
      const user_id = req.userId;
      let FindRendezvous;
  
      if (req.ROLE === "admin") {
        FindRendezvous = await RendezVous.findOne({ NOM });
      } else {
        FindRendezvous = await RendezVous.findOne({ NOM, user_id });
      }
  
      if (!FindRendezvous) {
        return res.status(401).send({ message: "Aucun Rendez Vous avec ce nom" });
      }
  
      return res.status(200).send({ data: FindRendezvous });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "An error occurred" });
    }
  });
  
route.put("/:NOM/edit" , authMiddleware , async (req,res)=>{

    try {
        const {NOM} = req.params 
        const user_id = req.userId
        if(req.ROLE === "admin"){
            if(req.body){
                const FindRendezvous =await RendezVous.findOneAndUpdate({NOM},req.body,{new:true});
                if(FindRendezvous){
                    res.status(200).send({data: FindRendezvous})
                }
                else{
                    res.status(401).send({message: " Aucun Rendez Vous avec ce nom "} )
                }
            } 
        }else if(req.ROLE === "superviseur"){
                const FindRendezvous =await RendezVous.findOneAndUpdate({NOM , superviseur:user_id },req.body,{new:true});
                if(FindRendezvous){
                    res.status(200).send({data: FindRendezvous})
                }
                else{
                    res.status(401).send({message: " Aucun Rendez Vous avec ce nom "} )
                }
        }
    } catch (error) {
        res.status(500).send({message: "serveur error"} )
    }
    
})

route.put("/:NOM/edit/status" , authMiddleware , async (req,res)=>{
    try {
        const { NOM } = req.params;
        const user_id = req.userId;
        if(req.ROLE ==="admin"){
            if (req.body) {
                const FindRendezvous = await RendezVous.findOneAndUpdate(
                    { NOM },
                    req.body,
                    { new: true }
                );
                if(!FindRendezvous){
                    res.status(401).send({ message: "Aucun Rendez Vous avec ce nom" });
                }
            } 
        }
        } catch (error) {
            res.status(500).send({ message: "Serveur error" });
        }
        }
            
    
    
)


route.delete('/:NOM' , authMiddleware , async (req,res) => {
    if(req.ROLE==="admin"){
        const {NOM} = req.params 
        const user_id = req.userId
        const FindRendezvous =await RendezVous.findOne({NOM,user_id});
        if(FindRendezvous){
            const FindRendezvous =await RendezVous.findOneAndDelete({NOM});
            res.status(200).send({message  : "REMOVE RENDEZ-VOUS",data: FindRendezvous})
        }
        else{
            res.status(401).send({message: " Aucun Rendez Vous avec ce nom "} )
        }
    }else{
        res.status(401).send({message: "Not allowed to delete  "} )
    }
})





module.exports = route