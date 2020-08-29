import React, { useState, useEffect } from 'react';
import {
  useParams, Link,
} from "react-router-dom";
import "../node_modules/video-react/dist/video-react.css";
import Axios from 'axios';
//import { Player } from 'video-react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function SerieEpisode({nom}){
  
   
    const {id} = useParams();
    const [lien,setLien] = useState("")
    const [episodes, setEpisodes] = useState([]);

    useEffect(()=>{
      async function refresh(){
        const result = await Axios.get("http://localhost:8000/episode/"+nom)
        
        const liste = result.data.sort(compare)
        setEpisodes(liste)
        if(Number.isInteger(Number(id)) && Number(id)>0){
          setLien(liste[id-1].lien)
        }
      }
      refresh();
    },[nom]);
    

    function compare(a, b){
      return a.episode - b.episode;
    }

    function refreshLink(ep){
      console.log(ep)
      Axios.get("http://localhost:8000/episode/"+nom).then((res)=>{
        const liste = res.data.sort(compare)
        setLien(liste[ep-1].lien)
      })
      window.scrollTo(0, 0);
    }
    function affichageButton(id){
      if(id>1){
        return <Container>
          <Row>
            <Col sm>
              <Link to ={`/${nom}/${id-1}`}><Button onClick={()=>refreshLink(Number(id)-1)} variant="light">Episode précédent</Button></Link>
            </Col>
            
            <Col sm >
              <Link to ={`/${nom}/${Number(id)+1}`}><Button onClick={()=>refreshLink(Number(id)+1)} variant="light">Episode suivant</Button></Link>
            </Col>

          </Row>
          </Container>
      }
      else{
        
        return <Link to ={`/${nom}/${Number(id)+1}`}><Button onClick={()=>refreshLink(Number(id)+1)} variant="light">Episode suivant</Button></Link>
      }
    }

    

    return(
      
      <div>
        <Container fluid>
          <Row style={{backgroundColor:"rgb(19,19,19)"}}>
            <Col sm={2} style={{backgroundColor:"rgb(8,8,8)"}}>
            <div style={{width:"100%"}}>
        
        
              <div style={{color:"white"}}>{nom}</div>
              {episodes.map((s,i)=>
              <div key={i}>
                    <Link  to ={`/${nom}/${s.episode}`} style={{textDecoration:"none",color:"white"}} onClick={()=>refreshLink(s.episode)}>{nom} episode {s.episode} : {s.titre} vostfr
                    </Link>
              </div>)}
        
        
            </div>
            </Col>
        
        
            <Col id="main" sm={8}>
            <Container>
              <div style={{color:"white"}}>{nom} Episode {id}</div>
              <iframe id="inlineFrameExample"
                title="Inline Frame Example"
                width="1400"
                height="700"
                frameBorder="0"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                allowFullScreen={true}
                src={lien}>
              </iframe>

            </Container>
            {affichageButton(id)}
          </Col>
          </Row>

          </Container>
      </div>
    );
  
}

export default SerieEpisode;
