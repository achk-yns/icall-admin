const express = require("express");
const route = express.Router();
const RendezVous = require("../Models/RendezVous");
const moment = require('moment');
const authMiddleware = require("../middlewares/AuthMiddleware");
const User = require('../Models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Use the original filename
    }
});

const upload = multer({ storage: storage });


route.post('/', authMiddleware, upload.array('documents', 5), async (req, res) => {
    try {
        const { MOBILE } = req.body;
        const user_id = req.userId;
        const FindRendezvous = await RendezVous.findOne({ MOBILE });
        
        if (!FindRendezvous) {
            let documents = [];
            // Check if req.files exists and is an array before mapping
            if (req.files && Array.isArray(req.files)) {
                // Extract file metadata from req.files array (uploaded by multer)
                documents = req.files.map(file => ({
                    filename: file.originalname,
                    contentType: file.mimetype,
                    size: file.size
                }));
            }

            const newRendezVous = new RendezVous({ ...req.body, user_id, documents });

            const DataSave = await newRendezVous.save();

            // Fetch all RendezVous data based on user role
            let AllData;
            if (req.ROLE === "admin") {
                AllData = await RendezVous.find({}).populate('user_id', 'NOM PRENOM EMAIL');
            } else if (req.ROLE === "superviseur") {
                const users = await User.find({ SUPERVISEUR: req.userId });
                const userIds = users.map(user => user._id);
                AllData = await RendezVous.find({ user_id: { $in: userIds } }).populate('user_id', 'NOM PRENOM EMAIL');
            } else if (req.ROLE === "installeur") {
                AllData = await RendezVous.find({ INSTALLATEUR: req.userId }).populate('user_id', 'NOM PRENOM EMAIL');
            } else {
                AllData = await RendezVous.find({ user_id: req.userId }).populate('user_id', 'NOM PRENOM EMAIL');
            }

            const formattedData = AllData.map(rdv => ({
                ...rdv._doc,
                DATE_PRIS_RDV: moment(rdv.DATE_PRIS_RDV).format('DD-MM-YYYY'),
                DATE_VISITE: moment(rdv.DATE_VISITE).format('DD-MM-YYYY')
            }));

            res.status(200).send({ message: "Rendez-vous créé avec succès", data: formattedData });
        } else {
            res.status(401).send({ message: "Rendez-vous déjà existant avec ce numéro de mobile" });
        }
    } catch (error) {
        console.error("Erreur lors de la création du rendez-vous :", error);
        res.status(500).send({ message: "Erreur serveur" });
    }
});

route.get('/', authMiddleware, async (req, res) => {
    try {
        let AllData = [];
        if (req.ROLE === "admin") {
            AllData = await RendezVous.find({}).populate('user_id', 'NOM PRENOM EMAIL');
        } else if (req.ROLE === "superviseur") {
            const users = await User.find({ SUPERVISEUR: req.userId });
            const userIds = users.map(user => user._id);
            AllData = await RendezVous.find({ user_id: { $in: userIds } }).populate('user_id', 'NOM PRENOM EMAIL');
        } else if (req.ROLE === "installeur") {
            AllData = await RendezVous.find({ INSTALLATEUR: req.userId }).populate('user_id', 'NOM PRENOM EMAIL');
        } else {
            AllData = await RendezVous.find({ user_id: req.userId }).populate('user_id', 'NOM PRENOM EMAIL');
        }

        if (AllData.length > 0) {
            const formattedData = AllData.map(rdv => ({
                ...rdv._doc,
                DATE_PRIS_RDV: moment(rdv.DATE_PRIS_RDV).format('DD-MM-YYYY'),
                DATE_VISITE: moment(rdv.DATE_VISITE).format('DD-MM-YYYY')
            }));
            res.status(200).send({ data: formattedData });
        } else {
            res.status(200).send({ data: [], message: "Aucun Rendez Vous trouvé" });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).send({ message: "Erreur serveur" });
    }
});

// GET route to fetch a single RendezVous by ID
route.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.userId;
        let FindRendezvous;

        if (req.ROLE === "admin") {
            FindRendezvous = await RendezVous.findById(id);
        } else {
            FindRendezvous = await RendezVous.findOne({ _id: id, user_id });
        }

        if (!FindRendezvous) {
            return res.status(401).send({ message: "Aucun Rendez Vous trouvé avec cet ID" });
        }

        res.status(200).send({ data: FindRendezvous });
    } catch (error) {
        console.error("Erreur lors de la récupération du rendez-vous :", error);
        res.status(500).send({ message: "Erreur serveur" });
    }
});


// PUT route to update a RendezVous by ID
route.put("/:id/edit", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.userId;
        const Rdv = await RendezVous.findById(id);

        if (req.ROLE === "admin" || req.ROLE === "superviseur") {
            // Check if the mobile number is already used in another rendez-vous
            if (req.body && req.body.MOBILE) {
                const existingRdv = await RendezVous.findOne({ MOBILE: req.body.MOBILE });
                if (existingRdv && existingRdv._id.toString() !== id) {
                    return res.status(400).json({ message: "Le numéro de mobile est déjà utilisé dans un autre rendez-vous" });
                }
            }

            // Update the RendezVous
            const query = req.ROLE === "admin" ? { _id: id } : { _id: id, superviseur: user_id };
            const updatedRendezvous = await RendezVous.findOneAndUpdate(query, req.body, { new: true });

            if (updatedRendezvous) {
                // Fetch all RendezVous data based on user role after update
                const AlldataRDV = req.ROLE === "admin" ? await RendezVous.find({}) : await RendezVous.find({ _id: id, superviseur: user_id })

                const formattedData = AlldataRDV.map(rdv => ({
                    ...rdv._doc,
                    DATE_PRIS_RDV: moment(rdv.DATE_PRIS_RDV).format('DD-MM-YYYY'),
                    DATE_VISITE: moment(rdv.DATE_VISITE).format('DD-MM-YYYY')
                }));

                res.status(200).json({ data: formattedData });
            } else {
                res.status(404).json({ message: "Aucun Rendez Vous trouvé avec cet ID" });
            }
        } else {
            res.status(403).json({ message: "Vous n'avez pas les permissions nécessaires pour effectuer cette action" });
        }
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            res.status(400).json({ message: `Le numéro de mobile "${error.keyValue.MOBILE}" doit être unique` });
        } else {
            console.error("Erreur lors de la mise à jour du rendez-vous :", error);
            res.status(500).json({ message: "Erreur serveur lors de la mise à jour du rendez-vous" });
        }
    }
});



// DELETE route to delete a RendezVous by ID
route.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        if (req.ROLE === "admin") {
            const user_id = req.userId;
            const FindRendezvous = await RendezVous.findOne({ _id: id });
            if (FindRendezvous) {
                await RendezVous.findByIdAndDelete(id);
                const data = await RendezVous.find({})
                console.log(data)
                res.status(200).send({ message: "Rendez-vous supprimé", data });
            } else {
                res.status(401).send({ message: "Aucun Rendez Vous trouvé avec cet ID" });
            }
        } else {
            res.status(403).send({ message: "Vous n'avez pas les permissions nécessaires pour effectuer cette action" });
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du rendez-vous :", error);
        res.status(500).send({ message: "Erreur serveur" });
    }
});

module.exports = route;
