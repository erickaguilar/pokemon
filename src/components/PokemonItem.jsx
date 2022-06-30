import React, { useState } from 'react';
import { PokemonModal } from './PokemonModal'

export function PokemonItem(poke) {

  const [modalShow, setModalShow] = useState(false);
  const [modalPoke, setModalPoke] = useState(true);

  const handleShow = (pokeData) => {
    setModalPoke(pokeData);
    setModalShow(true);
  }

  return (
    <>
      <PokemonModal show={modalShow} pokemon={modalPoke} onHide={() => setModalShow(false)} />

      <div className="container-poke" onClick={() => handleShow(poke)}>
        <p className="poke-title">{poke?.name} </p>
        <span className="poke-number">#{poke?.id}</span>
        <img src={poke.sprites?.front_shiny} alt="pokemon"/>
      </div>
    </>
  )
}