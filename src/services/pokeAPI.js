const API_URL = 'https://pokeapi.co/api/v2';

export async function getAllPokemon() {
    try {
        const response = await fetch(`${API_URL}/pokemon?limit=151&offset=0`)
        .then(response => response.json())
        .then(data => {
          let results = data.results;
          let promisesArray = results.map(result => {
            return fetch(result.url).then(response => response.json());
          })
          return Promise.all(promisesArray);
        });
        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPokemonByName(name) {
    try {
        const response = await fetch(`${API_URL}/pokemon/${name}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPokemonByAbility(ability) {
    try {
        const response = await fetch(`${API_URL}/ability/${ability}`)
        .then(response => response.json())
        .then(data => {
          let results = data.pokemon;
          let promisesArray = results.map(result => {
            return fetch(result.pokemon.url).then(response => response.json());
          })
          return Promise.all(promisesArray);
        });
        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
} 

export async function getPokemonBySpeciesToEvo(id) {
    try {
        const response = await fetch(`${API_URL}/pokemon-species/${id}`)
        .then(response => response.json())
        .then(data => {
            let results = data.evolution_chain.url;
            return fetch(results).then(response => response.json());
        });
        
        if (response.chain.evolves_to[0]) {
            let call = response.chain.evolves_to;
            let promisesArray = call.map(result => {
                return fetch(result.species.url).then(response => response.json());
            })

            let resPromise = Promise.all(promisesArray).then(element => {
                let promArray = element.map(evoRes => {
                    return fetch(`${API_URL}/pokemon/${evoRes.id}`).then(response => response.json());
                });
                return Promise.all(promArray);
            })            
            return resPromise;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}
