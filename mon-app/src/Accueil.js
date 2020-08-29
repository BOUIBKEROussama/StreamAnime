import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {
  
  Link
} from "react-router-dom";
import Axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

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
      <Container fluid style={{height:"969px",backgroundColor:"rgb(19,19,19)"}}>
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
        <Container style={{marginTop:"20px"}}>
        <Row>
        {tab.map((s,i)=>{
          return <Col style={{textalign:"center"}}>
          
          <Link to ={`/${s.lien}/1`}>
            <Button variant="light"> {s.titre}</Button>
          </Link>
          </Col>
        })}
        </Row>
        </Container>
      </Container>
    );
  }

export default Accueil;
