const mongoose = require('mongoose');

//Objeto película
const peliculaSchema = mongoose.Schema({
	name: String,
	year: Number,
	directors: [String],
	cast: [String],
	genres: [String]
}, {versionKey: false})

const PeliculaModel = mongoose.model('peliculas', peliculaSchema)
module.exports = PeliculaModel;