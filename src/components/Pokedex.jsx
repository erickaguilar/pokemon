import { useState, useRef } from 'react';
import { Form, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import * as API from '../services/pokeAPI';

export function Pokedex() {

  const [ poke, setPoke ] = useState([]);

  const form = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(form.current);
    const objData = Object.fromEntries([...data.entries()]);
    const nameSearchPoke = objData.namePokemon.toLowerCase();
    if (!nameSearchPoke.trim()) {
      return
    }
    API.getPokemonByName(nameSearchPoke).then(setPoke);
  }

  return (
    <>
      <div className="container">
        <div className="search-pokedex">
          <Form ref={form} onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
            <FormControl
              placeholder="Pokemon Name or Id"
              name="namePokemon" 
            />
            <Button variant="outline-secondary" type="submit">
              Search
            </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
      <div className="container">
        <Card className="card-container">
          <Card.Img className="card-img" src={poke.sprites?.other.dream_world.front_default} />
          <Card.Body>
              <h1>{poke.name?.toUpperCase()}</h1>             
              {
                poke.stats?.map((poke, index) => 
                  <h5 key={index}> {poke.base_stat} {poke.stat.name} </h5>
                )
              }
          </Card.Body>
        </Card>
      </div>
    </>
  )
}