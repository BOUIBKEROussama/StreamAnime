import React, { useState, useEffect } from 'react';

import './Accueil.css'
import {
  
  Link
} from "react-router-dom";
import Axios from 'axios';
import { Card } from 'react-bootstrap';
import one from './onepiece.png'
import Bar from './Bar';

function Accueil(){

  const [tab,setTab] = useState([])
  const [tab2,setTab2] = useState([])
  useEffect(()=>{
    async function getAllNames(){
      Axios.get("http://localhost:8000/AnimeName").then((res)=>{
      setTab(res.data)
    }).catch((err)=>{
      console.log(err)
    })
    
    }
    async function getTab(){
      Axios.get("http://localhost:8000/accueil_anime").then((res)=>{
      setTab2(res.data)
    }).catch((err)=>{
      console.log(err)
    })
    
    }
    getTab()
    getAllNames();
  },[]);
    
  /*const carousel = tab.map((s,i)=>
  
  <Carousel.Item key={i}>
    <Link to ={`/${s.lien}/1`}><img
      className="d-block w-100"
      src={s.image}
      alt={s.titre}
    /></Link>
    <Carousel.Caption>
      <h3>{s.titre}</h3>
    </Carousel.Caption>
  </Carousel.Item>





  <div className="carousel">
            <Carousel>
              {carousel}
            </Carousel>
          </div>
        
  )*/

    return(
        <div className="conteneur">
          <Bar />
          <div className="liste-card">
          {tab.map((s,i)=>{
            return <div className="carte">
            <Link to ={`/${s.lien}/1`}>
                <img className="picture" src={s.image} alt={s.titre}/>
            </Link>
              </div>
          })}
          </div>   
      </div>
    
    );
  }

export default Accueil;
