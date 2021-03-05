/**
 * definition du schema avec mongoose
 */
const mongoose = require('mongoose');

/**
 * la variable schema va lister l'ensemble 
 * des caracteristiques de notre entite
 */
let teamSchema = mongoose.Schema({
    nom: String,
    siegeSocial: String,
    moteur: String,
    chassis: String,
    livree: String,
    sponsors: String
})

var Team = mongoose.model('Formule', teamSchema);

module.exports = Team;