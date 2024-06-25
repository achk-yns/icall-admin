const mongoose = require('mongoose');

const schema = mongoose.model("RendezVous", {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdRv: { 
        type: Date, 
        default: Date.now 
    },
    STATUT: {
        type: String,
        enum: ['passage', 'annule', 'installe', 'attente', 'confirme', 'injecte'],
        default: 'injecte'
    },
    DATE_VISITE: {
        type: Date,
        required: true
    },
    DATE_PRIS_RDV: {
        type: Date,
        required: true
    },
    NOM: {
        type: String,
        required: true,
        unique: true
    },
    PRENOM: {
        type: String,
        required: true
    },
    ADRESSE_COMPLETE: {
        type: String,
        required: true
    },
    CODE_POSTAL: {
        type: String,
        required: false
    },
    MOBILE: {
        type: String,
        required: true
    },
    REF_PRODUIT: {
        type: String,
        required: false
    },
    SURFACE_HABITABLE: {
        type: Number,
        required: false
    },
    THERMOSTAT: {
        type: Boolean,
        required: false
    },
    MAIL: {
        type: String,
        required: false
    },
    COMMENTAIRES: {
        type: String,
        required: false
    },
    TETE_THERMOSTATIQUE: {
        type: Boolean,
        required: false
    },
    INSTALLATEUR: {
        type: String,
        required: false
    },
    SOURCE: {
        type: String,
        required: false
    },
    PRIME: {
        type: Number,
        required: false
    },
    RETOUR_INSTALLATEUR: {
        type: String,
        required: false
    }
});

module.exports = schema;
