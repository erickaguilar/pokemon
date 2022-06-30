import { useState, useEffect } from 'react';
import { Container, Modal, Button, ListGroup } from 'react-bootstrap';
import { PokemonModalItem } from './PokemonModalItem';
import * as API from '../services/pokeAPI';

export function PokemonModal(props) {

  const [isShow, setIsShow] = useState(false);
  const [ evolution, setEvolution ] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [modalPoke, setModalPoke] = useState(true);

  const handleShow = (pokeData) => {
    setModalPoke(pokeData);
    setModalShow(true);
  }

  useEffect( () => {
    if (props.pokemon.name) {
      API.getPokemonBySpeciesToEvo(props.pokemon.name).then(data => {
        if (data) {
          setEvolution(data);
          setIsShow(true);
        }
      });
    }
  }, [props.pokemon.name]);


  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            { props.pokemon.name }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="container-poke-modal">
            <div className="grid-modal">
              <div>
                <h4>Abilities</h4>  
                <ListGroup as="ol" numbered>
                  {
                    props.pokemon.abilities?.map( (ability, item) => 
                      <ListGroup.Item as="li" key={item}>{ability.ability.name}</ListGroup.Item>
                    )
                  }
                </ListGroup>
              </div>
              <div className="sprite-pokemon" onClick={() => handleShow(props.pokemon)}>
                <img src={props.pokemon.sprites?.front_default} alt="pokemon"/>
              </div>
            </div>       
            { isShow && (
              <div className="grid-modal">
                <h4>Evolution</h4>
                {
                  evolution.map( (evo, item) => 
                    <div key={item}>
                      <div>
                        <p>{ evo.name }</p>
                      </div>
                      <div className="sprite-pokemon" onClick={() => handleShow(evo)}>
                        <img src={evo.sprites?.front_default} alt="pokemon"/>
                      </div> 
                    </div>
                  )
                }
              </div>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      <PokemonModalItem show={modalShow} pokemon={modalPoke} onHide={() => setModalShow(false)} />
    </>
  );
}