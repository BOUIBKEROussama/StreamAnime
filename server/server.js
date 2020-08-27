const express = require('express');
const app = express();
var mysql = require('mysql');
const bodyParser = require('body-parser')
var fs = require('fs')
var cors = require('cors')
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}))
//var bodyParser = require('body-parser');
var multer = require('multer');
var forms = multer();
//app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: false }));
var fileupload = require('express-fileupload')
app.use(fileupload())
var cpt = 0;
app.use(cors())
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

app.get('/anime',(req, res)=>{
    connection.query("SELECT * FROM anime",(err,rows, fields)=>{
        if(!err)res.send(rows);
        else{
            console.log(err);
        }

    })
})

app.delete("/del/:serie",(req,res)=>{
    let sql = "TRUNCATE TABLE "+req.params.serie
    connection.query(sql,(err,result)=>{
        console.log(req.params.serie + " supprimer")
        res.json({message:"delete all "+req.params.serie})
    })
})


app.post("/add",(req,res)=>{
    
    var titre_anime = req.body.titre_anime
    var titre_episode = req.body.titre_episode
    var episode = req.body.episode
    //var id = req.body.id
    var likes = req.body.likes
    var lien = req.body.lien
    let sql = "INSERT INTO anime(titre_anime,titre_episode,episode,id,likes,lien) VALUES (?,?,?,?,?,?)"
    connection.query(sql,[titre_anime,titre_episode,episode,cpt,likes,lien],
        (err,result)=>{
            //if(err)throw err;
            console.log("1 record inserted")
            cpt++;
            
            res.json({message: "added "+ titre_anime + " " + titre_episode + " episode " + episode })
            res.end();
    });
})

app.delete("/del/:serie/:episode",(req,res)=>{
    
    let sql = "DELETE FROM " + req.params.serie +" where episode = "+req.params.episode
    connection.query(sql,
        (err,result)=>{
            if(err)throw err;
            console.log( req.params.episode + " supprimée")
            res.json({message: "delete "+ req.params.episode})
            res.end();
    });
})

app.get("/episode",(req,res)=>{
    var titre_anime = req.body.titre_anime
    var episode = req.body.episode

    let sql = "SELECT * FROM "+ titre_anime + " where titre_anime = ? AND episode = ?"
    connection.query(sql,[titre_anime,titre_anime,episode],
        (err,result)=>{
            if(err)throw err;
            //console.log(JSON.stringify(result))
            //res.json({data: [result.app]})
            res.json(result)
    });

})

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.get("/episode/:serie",(req,res)=>{

    let sql = "SELECT * FROM " + req.params.serie +" where titre_anime = ?"
    console.log(req.params.serie)
    connection.query(sql,[req.params.serie],(err,result)=>{
            if(err){
                res.status(404).json(err)
            }
            //console.log(JSON.stringify(result))
            //res.json({data: [result.app]})
            res.json(result)
    });

})

app.post("/addLink", (req,res)=>{
    
    //console.log(req.files.text.data)
    //fs.writeFileSync("./file/data1.json",req.files.text.data,(err)=>{    
    var liste = []
    var d = fs.readFileSync("./file/NarutoShippudenJSON.json")
    var words = JSON.parse(d.toString("utf8"))
    console.log(words["1"])
    const taille = Object.keys(words).length
    console.log(taille)
    for(i = 0; i < taille; i++){
        
        tab = words[i.toString()]
        let sql = "INSERT INTO NarutoShippuden(titre_anime,titre_episode,episode,likes,lien) VALUES (?,?,?,?,?)"
        connection.query(sql,["NarutoShippuden",tab[0],tab[0].split(' ')[2],0,tab[1]],
        (err,result)=>{
            //if(err)throw err;
            console.log("added "+ "NarutoShippuden" + i)
        });
    }
    
    res.json({message: "added "+ taille +" episodes"})
    res.end();
})


app.get("/",(req,res)=>{
    res.send("tout marche");
})

app.post("/addAnimeList",(req,res)=>{
    let sql = "INSERT INTO liste_anime(titre,lien,image) VALUES (?,?,?)"
    connection.query(sql,[req.body.titre,req.body.lien,req.body.image],(err,result)=>{
        if(err){
            res.status(404).json(err);
        }
        res.json(result)
    })
})

app.get("/animeName",(req,res)=>{
    let sql = "SELECT * FROM liste_anime"
    connection.query(sql,(err,result)=>{
        if(err){
            res.status(404).json(err);
        }
        res.json(result)
    })
})


/*connection.end((err) => {
    if(err){
        console.log('error');
        return;
    }
    console.log("end");
  });
  */
  app.get("/listAllSeries",(req,res)=>{
    let sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'test';"
    connection.query(sql,(err,result)=>{
        if(err)throw err;
            res.json(result)
            res.end
    });
  })

app.listen(8000,()=>{console.log("server is listening port 8000")})