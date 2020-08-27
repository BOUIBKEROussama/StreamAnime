import React, { useState, useEffect } from 'react';
import {
  useParams,
} from "react-router-dom";
import "../node_modules/video-react/dist/video-react.css";
import Axios from 'axios';
//import { Player } from 'video-react';


function SerieEpisode({nom}){
  
   
    const {id} = useParams();
    const [lien,setLien] = useState("")
    useEffect(()=>{
      async function refresh(){
        const result = await Axios.get("http://localhost:8000/episode/"+nom)
        const liste = result.data.sort(compare)
        setLien(liste[id-1].lien)
      }
      refresh();
    },[nom]);

    function compare(a, b){
      return a.episode - b.episode;
    }

    return(
      
      <div>
        
        {nom} Episode {id}
        <iframe id="inlineFrameExample"
    title="Inline Frame Example"
    width="1903"
    height="751"
    frameBorder="0"
    webkitallowfullscreen="true"
     mozallowfullscreen="true"
    allowFullScreen={true}
    src={lien}>
</iframe>
      </div>
    );
  
}

export default SerieEpisode;
