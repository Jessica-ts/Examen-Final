import React from 'react';

function NewPelicula(){
	function click(event){
	        event.preventDefault();
	        let nameMovie = {
	            nombre : event.target.nuevo.value 
	        };
	        let yearMovie = {
	        	year : event.target.nuevo.value
	        };
	         let ratingMovie = {
	        	year : event.target.nuevo.value
	        };
	    props.agregaMovie( nameMovie, yearMovie, ratingMovie);

	}


    return (
        <form onSubmit={(event) => click(event)} id="movieForm">
            <p>
	            <label htmlFor="nameMovie"> Nombre : </label>
	            <input name="name" type="text" id="nameMovie" />
            </p>

            <p>
	            <label htmlFor="yearMovie"> Año : </label>
	            <input name="year" type="text" id="yearMovie" />
            </p>

            <p>
        		<label htmlFor="ratingMovie"> Rating : </label>
           		<input name="year" type="text" id="ratingMovie" />
           	</p>
            <button type="submit">
                Agregar
            </button>
        </form>
    )

}

export default NewPelicula;