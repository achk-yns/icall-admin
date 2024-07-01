const express = require("express");
const route = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");


const RdvController = require("../controllers/RdvController");


route.post('/', authMiddleware, RdvController.createRendezVous );

route.get('/', authMiddleware,RdvController.getAllRendezVous);

route.get('/:id', authMiddleware,RdvController.getRendezVousById );


// PUT route to update a RendezVous by ID
route.put("/:id/edit", authMiddleware, RdvController.updateRendezVous);



// DELETE route to delete a RendezVous by ID
route.delete('/:id', authMiddleware,RdvController.deleteRendezVous);

module.exports = route;
