import { Routes, Route, Link } from "react-router-dom";
import { PokemonList } from './components/PokemonList';
import { Pokedex } from './components/Pokedex';
import { Button } from 'react-bootstrap';
import logo from './assets/pokemon.png';
import './App.css';

function App() {
  return (
    <>
      <header className="app-header">
        <img src={logo} alt='logo'/>
        <div className="button-nav">
          <Link to={'/pokedex'} >
            <Button variant="outline-danger" size="sm" className="mb-2">PokeDex</Button>
          </Link>
          <Link to={'/'} >
            <Button variant="outline-primary" size="sm" className="mb-2">Pokemon</Button>
          </Link>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="pokedex" element={<Pokedex />} />
      </Routes>
    </>
  );
}

export default App;
