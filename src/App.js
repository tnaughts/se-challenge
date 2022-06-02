import * as React       from 'react';

import {
  Route,
  NavLink,
  HashRouter,
  Routes,
  BrowserRouter as Router,
}                       from "react-router-dom";

import {Pokemon}        from './components/Pokemon'
import {PokemonList}    from './components/PokemonList'

const App = () => (
  <Router>
        <Routes> 
          <Route path="/pokemon/:id" element={<Pokemon/>}/>
          <Route exact path="/" element={<PokemonList/>}/>
        </Routes>
  </Router>

);

export default App;
