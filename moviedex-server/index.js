let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let morgan = require ('morgan');
let uuid = require('uuid');
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let { moviesList} = require('./model');
let app = express();

app.use(morgan("dev"));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

app.get("/api/moviedex", (req,res)=>{
	moviesList.getAll()
	.then(moviesList=>{
			return res.status(200).json(moviesList);
		})
		.catch(error=>{
			console.log(error);
			res.statusMessage="Hubo un error de conexión con la BD.";
			return res.status(500).send();
		});
});

app.post("/api/moviedex", jsonParser, (req,res)=>{
	let filmtitle = req.body.film_title;
	let year = req.body.year;
	let rating = req.body.rating;

	if(filmtitle=="" || year=="" || rating=="")
	{
		res.statusMessage = "Completa todos los datos";
		return res.status(406).json({
			message : "Completa todos los datos",
			status : 406
		});
	}

	
	let newMovie = {
		film_ID :uuid(),
		film_title : filmtitle,
		year : year,
		rating : rating,
	};

	moviesList.post(newMovie)
	.then(moviesList=>{
			return res.status(201).json(newMovie);
	})
	.catch(error=>{
		console.log(error);
		res.statusMessage="Hubo un error de conexión con la BD.";
		return res.status(500).send();
	});

});

let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}