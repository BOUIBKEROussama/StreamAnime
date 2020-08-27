import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {
  
  Link
} from "react-router-dom";
import Axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

function Accueil(){

  const [tab,setTab] = useState([])

  useEffect(()=>{
    async function getAllNames(){
      Axios.get("http://localhost:8000/AnimeName").then((res)=>{
      setTab(res.data)
    }).catch((err)=>{
      console.log(err)
    })
    
    }
    getAllNames();
  },[]);
  
  const a = tab.map((s,i)=><div key={i}><Link to ={`/${s.lien}`}> {s.titre}</Link></div>)
  const carousel = tab.map((s,i)=>
  
  <Carousel.Item key={i}>
    <img
      className="d-block w-100"
      src={s.image}
      alt={s.titre}
    />
    <Carousel.Caption>
      <h3>{s.titre}</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  
  )

    return(
      <div>
        <Container fluid >
          <Row>
          <Col style={{backgroundColor:"black"}}></Col>
            <Col xs={6} style={{backgroundColor:"black"}}>
              <Carousel>
                {carousel}
              </Carousel>
            </Col>
          <Col style={{backgroundColor:"black"}}></Col>
          </Row>
        
        </Container>
        {a}
        
        


        <div>
            <Link to ="/OnePiece">
                <button>One Piece</button>
            </Link>
        </div>
        <div>
            <Link to ="/Naruto">
                <button>Naruto</button>
            </Link>
        </div>
       
        <div>
          <Link to ="/FairyTail">
              <button>Fairy Tail</button>
          </Link>
        </div>
      </div>
    );
  }

export default Accueil;
