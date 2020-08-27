import React, { Component, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Serie from './Serie';
import Accueil from './Accueil';


import SerieEpisode from './SerieEpisode';
import ControlPannel from './ControlPannel';
import Axios from 'axios';




function App () {

    const [liste,setListe] = useState([]);
    
    useEffect( () => {
      async function fresh () {
        const res = await Axios.get("http://localhost:8000/animeName")
        //console.log(res.data.map((s)=>s.lien))
        res.data.map((s)=>setListe(liste => liste.concat(s.lien)))
      }

      fresh();
    },[])
  
    /*return(
      <div>
        <Router>
          <Switch>

            <Route path="/" exact component = {Accueil}></Route>
            <Route path="/OnePiece" exact component = {()=><Serie nom={"OnePiece"}/>} ></Route>
            <Route path="/OnePiece/:id" exact component = {()=><SerieEpisode nom={"OnePiece"}/>}></Route>
            <Route path="/Naruto/:id" exact component = {()=><SerieEpisode nom={"Naruto"}/>}></Route>
            <Route path="/Naruto" exact component = {()=><Serie nom={"Naruto"}/>}></Route>
            <Route path="/FairyTail" exact component = {()=><Serie nom={"FairyTail"}/>}></Route>
            <Route path="/FairyTail/:id" exact component = {()=><SerieEpisode nom={"FairyTail"}/>}></Route>
            <Route path="/NarutoShippuden" exact component = {()=><Serie nom={"NarutoShippuden"}/>} ></Route>
            <Route path="/NarutoShippuden/:id" exact component = {()=><SerieEpisode nom={"NarutoShippuden"}/>}></Route>
            <Route path="/Pannel" exact component = {ControlPannel}></Route>
            
            <Route path="*"><h1>Not Found</h1></Route>
          </Switch>
        </Router>
        
      </div>
    );*/

    return(
      <div>
        <Router>
          <Route path="/" exact component = {Accueil}></Route>
          <Route path="/Pannel" exact component = {ControlPannel}></Route>
          
          {liste.map((s,i)=><div key = {i}>
            <Route path={`/${s}`} exact component = {()=><Serie nom={s}/>} ></Route>
            <Route path={`/${s}/:id`} exact component = {()=><SerieEpisode nom={s}/>}></Route>
            </div>
          )}
        </Router>
      </div>
    );
  
}

export default App;
