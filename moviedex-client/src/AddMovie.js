import React from 'react';

function NewPelicula{
	function click(event){
	        event.preventDefault();
	        let nameMovie = {
	            nombre : event.target.nuevo.value 
	        },
	        let yearMovie = {
	        	year : event.target.nuevo.value
	        },
	         let yearMovie = {
	        	year : event.target.nuevo.value
	        }
	        props.agregaMovie( NameMovie );

	}


    return (
        <form onSubmit={(event) => click(event)} id="movieForm">
            <label htmlFor="nameMovie"> Nombre : </label>
            <input name="name" type="text" id="nameMovie" />
            <button type="submit">
                Agregar
            </button>

            <label htmlFor="yearMovie"> Año : </label>
            <input name="year" type="text" id="yearMovie" />
            <button type="submit">
                Agregar
            </button>
        </form>

        <label htmlFor="ratingMovie"> Rating : </label>
            <input name="year" type="text" id="ratingMovie" />
            <button type="submit">
                Agregar
            </button>
        </form>
    )

}

export default NewPelicula;