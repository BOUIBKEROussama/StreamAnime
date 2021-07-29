import React, { useState, useEffect } from 'react';
import {
  useParams, Link,
} from "react-router-dom";
import "../node_modules/video-react/dist/video-react.css";
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import './SerieEpisode.css'
import Bar from './Bar';
function SerieEpisode({nom}){
  
   
    const {id} = useParams();
    const [lien,setLien] = useState("");
    const [searches,setSearches] = useState([]);
    const [cpt,setCpt] = useState(1)
    const [taille,setTaille] = useState(0)

    useEffect(()=>{
      async function refresh(){
        const result = await Axios.get("http://localhost:8000/episode/"+nom)
        
        const liste = result.data.sort(compare)
        setTaille(liste.length)
        let query = []
        liste.map((s,i)=>{
          
          if(i%20===0){
            setSearches(searches=>[...searches,query])
            query = []
            query.push(s)
          }
          else{
            query.push(s)
          }
        })
        setSearches(searches=>[...searches,query])
        if(Number.isInteger(Number(id)) && Number(id)>0){
          setLien(liste[id-1].lien)
        }
      }
      refresh();
    },[nom,id]);
    

    function compare(a, b){
      return a.episode - b.episode;
    }
    

    function refreshLink(ep){
      parcoursTab(parseInt(ep))
      Axios.get("http://localhost:8000/episode/"+nom).then((res)=>{
        
        const liste = res.data.sort(compare)
        
        setLien(liste[ep-1].lien)
      })
      window.scrollTo(0, 0);
    }


    function affichageButton(id){
      
      if(id >= taille){
        return <Link to ={`/${nom}/${id-1}`}><Button onClick={()=>refreshLink(Number(id)-1)} variant="primary">Episode précédent</Button></Link>
      }
      if(id>1){
        return <div style={{

          display: "flex",
          justifyContent: "space-between"
        }}>
          
            
              <Link to ={`/${nom}/${id-1}`}><Button onClick={()=>refreshLink(Number(id)-1)} variant="primary">Episode précédent</Button></Link>
            
            
            
            
              <Link to ={`/${nom}/${Number(id)+1}`}><Button onClick={()=>refreshLink(Number(id)+1)} variant="primary">Episode suivant</Button></Link>
            

          
          </div>
      }
      else{
        
        return <Link to ={`/${nom}/${Number(id)+1}`}><Button onClick={()=>refreshLink(Number(id)+1)} variant="primary">Episode suivant</Button></Link>
      }
    }

   

    function buttonCpt(){
      if(cpt===1){
        return <div style={{display: "flex",justifyContent: "space-between",marginLeft:"10%",marginRight:"10%"}}>
          <div></div><Button variant="primary" onClick={()=>setCpt(cpt+1)}>+</Button>
          </div>
      }
      
      if(cpt===searches.length-1){
        return <div style={{display: "flex",marginLeft:"10%",marginRight:"10%"}}>
          <div></div><Button variant="primary" onClick={()=>setCpt(cpt-1)}>-</Button>
          </div>
      }
      else{
        return <div style={{display: "flex",justifyContent: "space-between",marginLeft:"10%",marginRight:"10%"}}><Button variant="primary" onClick={()=>setCpt(cpt-1)}> - </Button><Button variant="primary" onClick={()=>setCpt(cpt+1)}>+</Button></div>
      }
    }
  
    function parcoursTab(ep){
      for(let i = 0; i <searches.length;i++){
        searches[i].map((s)=>{
          if(ep === parseInt(s.episode)){
            if(i !== cpt){
              setCpt(i)
            }
          }
        })
      }
      console.log(parseInt(cpt))

    }

    /*{episodes.map((s,i)=>
              <div key={i}>
                    <Link  to ={`/${nom}/${s.episode}`} style={{textDecoration:"none",color:"white"}} onClick={()=>refreshLink(s.episode)}>{nom} episode {s.episode} : {s.titre} vostfr
                    </Link>
              </div>)}*/
    return(
      
      <div style={{height:"1080px"}}>
        
        <Bar />
        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"row"}}>


          <div style={{backgroundColor:"rgb(18,18,18)",width:"20%"}}>
            
            <div style={{color:"white",backgroundColor:"rgb(18,18,18)",width:"100%"}}>{nom}</div>
            {searches[cpt]!==undefined?searches[cpt].map((s,j)=>
              <div className={`hvr-grow ${s.episode===id ? "active" : ""}`} key={j}>
                <Link className="lien"  to ={`/${nom}/${s.episode}`} onClick={()=>refreshLink(s.episode)} >{nom} episode {s.episode} : {s.titre} vostfr
                </Link>
              </div>):<div></div>
              }
              {buttonCpt()}
          </div>

          <div style={{backgroundColor:"rgb(8,8,8)",width:"80%"}}>
            <div style={{marginLeft:"15%",marginRight:"15%"}}>

              <div>
                <iframe style={{width:"100%"}} id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="1000"
                    height="700"
                    frameBorder="0"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    allowFullScreen={true}
                    src={lien}/>
              </div>
      
                <div style={{color:"white",display: "flex",justifyContent: "center"}}>
                  <div>
                    {nom} Episode {id}
                  </div>
                </div>
                {affichageButton(id)}
            </div>
            </div>

        </div>

      </div>
      )
}

export default SerieEpisode;
