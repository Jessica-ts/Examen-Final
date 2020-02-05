import React from 'react';
function Movies( props ) {
    return (<div>
        {props.lista.map( (peliculas, index) => {
            return (
                <div>
                    <h2>{peliculas.film_title} </h2>
                    <p> {peliculas.year}</p>
                    <p> {peliculas.rating}</p>
                </div>
            )   
        })}
    </div>)
}

export default Movies;