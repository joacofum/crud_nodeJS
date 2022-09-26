const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

//Modelo de pelicula
const PeliculaModel = require('./models/pelicula')

// Conexión a Base de datos
const mongoose = require('mongoose');
const uri = "mongodb+srv://peliculas:peliculas@clusterpeliculas.jvfynvf.mongodb.net/peliculasDB?retryWrites=true&w=majority";

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('Base de datos conectada'))
	.catch(e => console.log(e))



//Find
const find = async() => {
	const peliculas = await PeliculaModel.find()
	console.log(peliculas)
}

//Add
const add = async() => {
	const pelicula = new PeliculaModel({
		name: "Shrek 2",
		year: 2003,
		directors: ["Andrew Adamson", "Vicky Jenson"],
		cast: ["Mike Myers", "Eddie Murphy", "Chris Miller", "Conrad Vernon"],
		genres: ["Comedy", "Fantasy", "Animated"]
	})
	const resultado = await pelicula.save()
	console.log(resultado);
}

//Update by _id
const update = async(id) => {
	const pelicula = await PeliculaModel.updateOne({_id:id},
	{
		$set:{
			name: 'Shrek',
			year: 2001
		}
	})
}

//Delete by _id
const removeById = async(id) => {
	const pelicula = await PeliculaModel.deleteOne({_id:id})
}

//add();
//update("6332067b02148ed6e38c9dd9");
//removeById("6332093b8455b6fa6f112fdb")
find();