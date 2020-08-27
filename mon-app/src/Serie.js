import React, { useState,useEffect } from 'react';


import axios from 'axios';
import { Link } from 'react-router-dom';
import { CardDeck, Container, Row, Col, Image } from 'react-bootstrap';
import Carte from './Carte'




function Serie ({nom}) {
    
  
    const [episodes, setEpisodes] = useState([]);
    

    useEffect(()=>{
      async function refresh(){
        await axios.get("http://localhost:8000/episode/"+nom).then((res)=>{
          setEpisodes(res.data.sort(compare))
        }).catch((err)=>{
          console.log(err)
        })
      }
          
      refresh();
    },[nom]);

    function compare(a, b){
      return a.episode - b.episode;
    }


    return(
      
      <div style={{backgroundColor:"black"}}>
        
        
        <div>{nom}</div>
        {console.log(episodes)}
        {episodes.map((s,i)=>
        <div key={i}><Container  style={{marginTop:"1%"}}>
          <Row style={{height:"50px"}}>
            <Col xs lg="2" style={{backgroundColor:"grey",textAlign:"center"}}>
              <Image width="75px" height="100%" src="https://cdn.radiofrance.fr/s3/cruiser-production/2019/01/db7527af-fa5c-4e69-8df9-c045d1be88f2/1200x680_118806.jpg"></Image>
            </Col>
            <Col xl lg="2" style={{backgroundColor:"grey"}}>
              <Link to ={`/${nom}/${s.episode}`}>{nom} episode {s.episode} : {s.titre} vostfr
              </Link>
            </Col>
          </Row>
        </Container>
        </div>)}
        
        
      </div>
    );
  
}

export default Serie;
