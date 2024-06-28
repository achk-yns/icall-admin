const express = require("express");
const route = express.Router();
const RendezVous = require("../Models/RendezVous");
const moment = require('moment');
const authMiddleware = require("../middlewares/AuthMiddleware");
const User = require('../Models/User');


route.post('/', authMiddleware, async (req, res) => {
    try {
        const { MOBILE } = req.body;
        const user_id = req.userId;
        const FindRendezvous = await RendezVous.findOne({ MOBILE });
        if (!FindRendezvous) {
            const newRendezVous = new RendezVous({ ...req.body, user_id });

            const DataSave = await newRendezVous.save();
            let AllData ;
            if (req.ROLE === "admin") {
                AllData = await RendezVous.find({}).populate('user_id', 'NOM PRENOM EMAIL');
            } else if (req.ROLE === "superviseur") {
                const users = await User.find({ SUPERVISEUR: req.userId });
                const userIds = users.map(user => user._id);
                AllData = await RendezVous.find({ user_id: { $in: userIds } }).populate('user_id', 'NOM PRENOM EMAIL');
            } else if (req.ROLE === "installeur") {
                AllData = await RendezVous.find({ INSTALLATEUR: req.userId }).populate('user_id', 'NOM PRENOM EMAIL');
            } else {
                AllData = await RendezVous.find({ user_id: userId }).populate('user_id', 'NOM PRENOM EMAIL');
            }

            const formattedData = AllData.map(rdv => ({
                ...rdv._doc,
                DATE_PRIS_RDV: moment(rdv.DATE_PRIS_RDV).format('DD-MM-YYYY'),
                DATE_VISITE: moment(rdv.DATE_VISITE).format('DD-MM-YYYY')
            }));
            
            res.status(200).send({ message: "Rendez-vous créé <3", data: formattedData });
            
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
        const userId = req.userId;
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
            AllData = await RendezVous.find({ user_id: userId }).populate('user_id', 'NOM PRENOM EMAIL');
        }

        if (AllData.length > 0) {
            const formattedData = AllData.map(rdv => ({
                ...rdv._doc,
                DATE_PRIS_RDV: moment(rdv.DATE_PRIS_RDV).format('DD-MM-YYYY'),
                DATE_VISITE: moment(rdv.DATE_VISITE).format('DD-MM-YYYY')
            }));
            res.status(200).send({ data: formattedData });
        } else {
            res.status(200).send({ data: [], message: "Aucun Rendez Vous" });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).send({ message: "Erreur serveur" });
    }
});

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

        return res.status(200).send({ data: FindRendezvous });
    } catch (error) {
        console.error("Erreur lors de la récupération du rendez-vous :", error);
        return res.status(500).send({ message: "Une erreur est survenue" });
    }
});

route.put("/:id/edit", authMiddleware, async (req, res) => {
  try {
      const { id } = req.params;
      const user_id = req.userId;
      const Rdv = await RendezVous.findById(id);

      if (req.ROLE === "admin" || req.ROLE === "superviseur") {
          if (req.body && req.body.MOBILE) {
              const existingRdv = await RendezVous.findOne({ MOBILE: req.body.MOBILE });
              if (existingRdv && existingRdv._id.toString() !== id) {
                  return res.status(400).json({ message: "Le numéro de mobile est déjà utilisé dans un autre rendez-vous" });
              }
          }

          const query = req.ROLE === "admin" ? { _id: id } : { _id: id, superviseur: user_id };
          const updatedRendezvous = await RendezVous.findOneAndUpdate(query, req.body, { new: true });
          if (updatedRendezvous) {
              const AlldataRDV = req.ROLE === "admin" ? await RendezVous.find({}) : await RendezVous.find({ _id: id, superviseur: user_id })

                const formattedData = AlldataRDV.map(rdv => ({
                    ...rdv._doc,
                    DATE_PRIS_RDV: moment(rdv.DATE_PRIS_RDV).format('DD-MM-YYYY'),
                    DATE_VISITE: moment(rdv.DATE_VISITE).format('DD-MM-YYYY')
                }));

              res.status(200).json({ data: formattedData});
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
