import React, { useState, useEffect } from 'react';

import Axios from 'axios';

function ControlPannel() {

    const [file,setFile] = useState(null)
    const [listeTitle,setlisteTitle] = useState([])
    const [listeEp, setlisteEp] = useState([])
    const [adder, setAdder] = useState(false)
    const [titreDatabase, setTitreDatabase] = useState("")

    useEffect(()=>{
      async function refresh(){
        await Axios.get('http://localhost:8000/animeName').then((res)=>{
        console.log(res);
        setlisteTitle(res.data)}
      )}
      refresh()
    },[]);


    function envoyer(e){
      
      let f = file
      var formData = new FormData(); 
      formData.append("text",f);
      formData.append('title_database',titreDatabase);
      //var  options = {contenu: formData};
      Axios({
        method: 'post',
        url: "http://localhost:8000/addLink",
        data: formData,
        headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    
    }

    function HandleClickTitle(lien){
      console.log(lien)
      Axios.get("http://localhost:8000/episode/"+lien).then((res)=>{
        console.log(res.data)
        setlisteEp(res.data.sort(compare))
      })
    }
    function compare(a, b){
      return a.episode - b.episode;
    }

    function deleteEpisode(serie,episode){
      console.log("ca rentre")
      Axios.delete("http://localhost:8000/del/"+serie+"/"+episode)
        .then(function (response) {
            
            listeEp.map((s,i)=>{
              if(s.episode === episode){
                setlisteEp(listeEp.filter(item => item.episode !== episode));
              }
            })
            
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    function addEpisode(serie){
      const res = "<div><input type = 'text'></input><button>Envoyer</button></div>";

      const container = document.getElementById("button");
      container.append(res);
    }
    

    function deleteSerie(serie){
      Axios.delete("http://localhost:8000/del/"+serie)
        .then(function (response) {
          setlisteEp([]);
            
          console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      }

    return(
      <div>
        <div>
          Créer une série :<br /> 
          Titre database : <input type = "text" onChange={e => setTitreDatabase(e.target.value)}></input>
        </div>
        <div>
            Liste de liens (fichier json de type : id:[episode(str(INT)),lien(String)])<input type="file" onChange={e => setFile(e.target.files[0])}></input>
        </div>
        <button onClick={(e)=>envoyer(e)}>Envoyer !</button>
        <div>
          {listeTitle.map((s,i)=><button key={i} onClick = {HandleClickTitle.bind(this,s.lien)}>{s.titre}</button>)}
        </div>
        <div>

          {listeEp.map((s,i)=>{if(i===0){
            
            return <div key={i}>
              <div id="button">
                <button onClick={()=>addEpisode(s.titre_anime)}>Ajouter</button>
                <button onClick={()=>deleteSerie(s.titre_anime)}>Tout Effacer</button>
              </div>
              <div key={i}>{s.titre_anime} episode {s.episode} VOSTFR
             <button onClick={()=>deleteEpisode(s.titre_anime,s.episode)}>effacer</button></div></div>
          }
          return <div key={i}>{s.titre_anime} episode {s.episode} VOSTFR <button onClick={()=>deleteEpisode(s.titre_anime,s.episode)}>effacer</button></div>})
          }
        </div>
      </div>
    );
}

export default ControlPannel;
