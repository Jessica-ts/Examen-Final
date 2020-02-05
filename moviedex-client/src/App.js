import React from 'react';
import './App.css';
import Movies from './Movies';
import NewPelicula from './AddMovie';
import {BrowserRouter, Route, Link} from 'react-router-dom';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      peliculas : [],
      apiURL : "http://localhost:8080"
    }
  }



  componentDidMount(){
    let url = `${this.state.apiURL}/api/moviedex`;
    let settings = {
      method : 'GET'
    }
    
    fetch(url, settings)
      .then( response => {
        if( response.ok ){
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then( responseJSON => {
        this.setState({
          peliculas: responseJSON
        })
      })
      .catch( err => {
        console.log(err);
      });
  }

  render(){
    return (
      <BrowserRouter>
      <nav>
        <Link to='/'> Peliculas </Link>
        <Link to='/AddMovie'> AddPelicula </Link>
       </nav>
       <Route path='/' render={(props) => <Movies lista={this.state.peliculas}/>} />
       //<Route path='/AddMovie' render={(props) => <Movies lista={this.state.peliculas}/>} />
      <div>
        
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
