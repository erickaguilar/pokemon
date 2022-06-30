import { useState, useEffect, useRef } from 'react';
import { PokemonItem } from './PokemonItem';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import * as API from '../services/pokeAPI';

export function PokemonList() {
    const [ pokeAll, setPokeAll ] = useState([]);

    useEffect( () => {
        API.getAllPokemon().then(setPokeAll);
    }, []);

    const form = useRef(null);
    const formAbility = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(form.current);
        const objData = Object.fromEntries([...data.entries()]);
        const nameSearchPoke = objData.namePokemon.toLowerCase();
        if (!nameSearchPoke.trim()) {
            return
        }
        API.getPokemonByName(nameSearchPoke).then(data => {
            setPokeAll([data]);
        });
    }

    const handleSubmitAbility = e => {
        e.preventDefault();
        const data = new FormData(formAbility.current);
        const objData = Object.fromEntries([...data.entries()]);
        const abilitySearchPoke = objData.abilityPokemon.toLowerCase();
        if (!abilitySearchPoke.trim()) {
        return
        }
        API.getPokemonByAbility(abilitySearchPoke).then(setPokeAll);
    }

    return (
        <>
            <section className="container">
            <div className="search-pokemon">
            <Form ref={form} onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                <FormControl
                    placeholder="Pokemon Name"
                    aria-label="Pokemon Name"
                    aria-describedby="basic-addon2"
                    name="namePokemon" 
                />
                <Button variant="outline-secondary" type="submit">
                    Search
                </Button>
                </InputGroup>
            </Form>
            </div>

            <div className="search-pokemon">
  
            <Form ref={formAbility} onSubmit={handleSubmitAbility}>
                <InputGroup className="mb-3">
                <FormControl
                    placeholder="Pokemon Ability"
                    aria-label="Pokemon Ability"
                    aria-describedby="basic-addon2"
                    name="abilityPokemon" 
                />
                <Button variant="outline-secondary" type="submit">
                    Search
                </Button>
                </InputGroup>
            </Form>
            </div>
        </section>

        <section className="container">
            {
                pokeAll.map(poke => 
                    <PokemonItem key={poke.id} {...poke}/>
                )
            }
        </section>
      </>
    )
}