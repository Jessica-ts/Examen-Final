let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let moviesCollection = mongoose.Schema({
	film_ID : {type : String},
	film_title : {type : String},
	year : {type : Number},
	rating : {type: Number}
});

let Movies = mongoose.model('movies', moviesCollection);

let moviesList = {
	getAll: function(){
		return Movies.find()
			.then(movies=>{
				return movies;
			})
			.catch(error=>{
				throw Error(error);
			});
	},

	post : function(newMovies){
		return Movies.create(newMovies)
			.then(movies=>{
				return movies;
			})
			.catch(error=>{
				throw Error(error);
			});
	}
};

module.exports = {moviesList};