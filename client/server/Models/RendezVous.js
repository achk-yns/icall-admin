const mongoose = require('mongoose');

const schema = mongoose.model("RendezVous" , {
    user_id :{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    createdRv:{ type: Date, default: Date.now },
      NOM: {
        type: String,
        required: true,
        unique:true
      },
      PRENOM: {
        type: String,
        required: true
      },
      TELEPHONE: {
        type: Number,
        required: true
      },
      ADRESSE: {
        type: String,
        required: true
      },
      MAIL: {
        type: String,
        required: false
      },
      status : {
        type: String,
        enum: ['valid','invalid' , 'pending'],
        default: 'invalid',
        
      },
      COMMENTAIRE: {
          type: String,
          required: false
        },
        //------------------------------------------ step 2 ---------------------------------------------------------------------
      SURFACE_HABITABLE: {
        type: Number,
        required: false //default required (I make is false for testing)
      },
      REVENUE_FISCAL: {
        type: Number,
        required: false //default required (I make is false for testing)
      },
      TRAVAUX_A_PREVOIR: {
        type: String,
        required: false
      },
      PRECARITE: {
        type: String,
        required: false
      },
      NOMBRE_HABITANTS_DECLARE_FISCALEMENT: {
        type: Number,
        
        required: false //default required (I make is false for testing)
      },
      AVIS_FISCAL: {
        type: String,
        required: false
      },
      REF_FISCAL: {
        type: String,
        required: false
      },
      MODE_DE_CHAUFFAGE: {
        type: String,
        required: false
      },
      TYPE_DE_CHAUDIERE: {
        type: String,
        required: false
      },
      ANNEE_CHAUDIERE: {
        type: Number,
        required: false
      },
      ANNEE_CONSTRUCTION: {
        type: Number,
        required: false
      },
      PROPRIETAIRE_DEPUIS: {
        type: Number,
        required: false
      },
      ISO_A_1e: {
        type: String,
        required: false
      },
      OK_POUR_ENLEVER_ANCIENNE_ISO: {
        type: Boolean,
        required: false
      },
      SUPERFICIE_COMBLES: {
        type: Number,
        required: false
      },
      ACCES_COMBLES: {
        type: String,
        required: false
      },
      DPE_EFFECTUER: {
        type: Boolean,
        required: false
      },
      CODE_SECURITE_TRANSMETTRE_CLIENT: {
        type: String,
        required: false
      },
      TYPE_VITRAGE: {
        type: String,
        required: false
      },
      SOUS_SOL: {
        type: Boolean,
        required: false
      },
      VIDE_SANITAIRE: {
        type: Boolean,
        required: false
      },
      CAVE: {
        type: Boolean,
        required: false
      },

      MITOYEN: {
        type: Boolean,
        required: false
      }
})

module.exports = schema