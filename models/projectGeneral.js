const mongoose = require('mongoose');

const projectMainGenSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombreProyecto: String ,
    direccion: String,
    distrito: String,
    direccionNumero: String,
    precio: Number,
    area: String,
    addressObject: String
});

module.exports = mongoose.model('ProjectMainGeneralModel', projectMainGenSchema);
