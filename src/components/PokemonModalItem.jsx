import { Modal, Button } from 'react-bootstrap';

export function PokemonModalItem(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            { props.pokemon.name }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-poke-modal-item">
            <img className="card-img-item" src={props.pokemon.sprites?.other.dream_world.front_default} alt="pokemon" />
            <div>            
                {
                    props.pokemon.stats?.map((poke, index) => 
                    <h5 key={index}> {poke.base_stat} {poke.stat.name} </h5>
                    )
                }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}