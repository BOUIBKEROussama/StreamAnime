import React from 'react';
import { Card } from 'react-bootstrap';





function Carte ({nom,lien}) {

    return(
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={lien} />
        <Card.Body>
          <Card.Title>{nom}</Card.Title>
          
        </Card.Body>
        </Card>
    );
  
}

export default Carte;
