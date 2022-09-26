const express = require("express");
const app = express();
const port = 3000;

// Conexión a Base de datos
const mongoose = require('mongoose');

//Cosas del enviromment
require('dotenv').config()

mongoose.connect(process.env.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('Base de datos conectada'))
	.catch(e => console.log(e))


//Modelo de pelicula
const PeliculaModel = require('./models/pelicula')

app.get("/", async (req, res) => {
	const peliculas = await PeliculaModel.find()
	res.send(peliculas);
});

app.get("/findById/:id", async (req, res) => {
	let peliculaId = req.params.id;
	console.log(peliculaId)
	const peliculas = await PeliculaModel.findById({_id: peliculaId})
	res.send(peliculas);
});

app.post("/add", async (req, res) => {
	const pelicula = new PeliculaModel({
		name: "Shrek 2",
		year: 2003,
		directors: ["Andrew Adamson", "Vicky Jenson"],
		cast: ["Mike Myers", "Eddie Murphy", "Chris Miller", "Conrad Vernon"],
		genres: ["Comedy", "Fantasy", "Animated"]
	})
	await pelicula.save()
});

app.put("/updateById/:id", async (req, res) => {
	let peliculaId = req.params.id;
	await PeliculaModel.updateOne({_id: peliculaId},
		{
			$set:{
				name: 'Shrek',
				year: 2001
			}
		})
});

app.put("/deleteById/:id", async (req, res) => {
	let peliculaId = req.id;
	await PeliculaModel.deleteOne({_id: peliculaId})
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

//add();
//update("6332067b02148ed6e38c9dd9");
//removeById("6332093b8455b6fa6f112fdb")
//find();