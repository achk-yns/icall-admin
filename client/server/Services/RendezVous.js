const express  = require("express")
const route = express.Router()
const RendezVous = require("../Models/RendezVous")
const localStorage = require('localStorage');
const authMiddleware = require("../middlewares/AuthMiddleware")


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
        res.status(500).send({message: "Server Error"} )
    }
    
})



route.get('/', authMiddleware, async (req, res) => {
    try {
        const user_id = req.userId;
        let AllData = [];
        
        if (req.isAdmin) {
            AllData = await RendezVous.find({});
        } else {
            AllData = await RendezVous.find({ user_id });
        }
        
        if (AllData && AllData.length > 0) {
            res.status(200).send({ data: AllData });
        } else {
            res.status(200).send({ data: [], message: "Aucun Rendez Vous" });
        }
    } catch (error) {
        res.status(500).send({ message: "serveur error" });
    }
});


route.get('/:NOM',authMiddleware,async (req,res) => {
    const {NOM} = req.params 
    const user_id = req.userId  
    const FindRendezvous =await RendezVous.findOne({NOM,user_id});
    if(FindRendezvous){
        res.status(200).send({data: FindRendezvous})
    }
    else{
        res.status(401).send({message: " Aucun Rendez Vous avec ce nom "} )
    }
})

route.put("/:NOM/edit" , authMiddleware , async (req,res)=>{
    try {
        const {NOM} = req.params 
    const user_id = req.userId
    if(req.body){
        const FindRendezvous =await RendezVous.findOneAndUpdate({NOM , user_id },req.body,{new:true});
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



route.delete('/:NOM' , authMiddleware , async (req,res) => {
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
})





module.exports = route