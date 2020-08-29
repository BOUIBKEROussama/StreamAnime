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
      
      <div style={{width:"100%"}}>
        
        
        <div>{nom}</div>
        {episodes.map((s,i)=>
        <div key={i}>
              <Link to ={`/${nom}/${s.episode}`}>{nom} episode {s.episode} : {s.titre} vostfr
              </Link>
        </div>)}
        
        
      </div>
    );
  
}

export default Serie;
