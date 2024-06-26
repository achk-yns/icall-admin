const mongoose = require('mongoose');

const schema = mongoose.model("User", {
    NOM: {
        type: String,
        required: true
    },
    PRENOM: {
        type: String,
        required: true
    },
    EMAIL: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    PASSWORD: {
        type: String,
        required: true,
        minlength: 8,
    },
    ROLE: {
        type: String,
        enum: ['admin', 'agent', 'superviseur', 'installeur'],
        default: 'agent' 
    },
    SUPERVISEUR: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
});

module.exports = schema;
