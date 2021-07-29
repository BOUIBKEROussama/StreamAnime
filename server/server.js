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

app.get('/accueil_anime',(req,res)=>{
    connection.query("SELECT * FROM accueil_anime",(err,result)=>{
        res.json(result)
    })
})

app.post('/accueil_anime',(req,res)=>{
    let sql = "INSERT INTO accueil_anime VALUES(?,?,?)"
    connection.query(sql,[req.body.image,req.body.titre,req.body.lien],(err,result)=>{
        res.json({message:"added " + req.body.titre})
    })
})

app.delete('/accueil_anime',(req,res)=>{
    let sql = "DELETE FROM accueil_anime WHERE titre = ?"
    connection.query(sql,[req.body.titre],(err,result)=>{
        res.json({message:"delete " + req.body.titre})
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
    
    console.log(req.files.text.data)
    fs.writeFileSync("./file/data1.json",req.files.text.data,(err)=>{})
    console.log(req.body.title_database)
    var liste = []
    var d = fs.readFileSync("./file/data1.json")
    var words = JSON.parse(d.toString("utf8"))
    console.log(words)
    const taille = Object.keys(words).length
    console.log(taille)
    let cpt = 0;
    let sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'test';"
    connection.query(sql,(err,result)=>{
        for(j = 0; j < result.length; j++){
            if(req.body.title_database.toLowerCase()===result[j].table_name){
                cpt = 1
                console.log("bdd existante")
            }
            console.log(result[j].table_name)

        }
    });
    /*if(cpt !==0){
        console.log("oui")
        let sql = "CREATE TABLE "+ req.body.title_database +"(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,titre_anime VARCHAR(255),titre_episode VARCHAR(255),episode VARCHAR(255) UNIQUE,likes INT,lien VARCHAR(255));"
        connection.query(sql,
        (err,result)=>{
            console.log("table "+ req.body.title_database +" créer")
            
        });
    }*/
    if(cpt===1){

    }
    else{
        for(i = 0; i < taille+1; i++){
                
            tab = words[i.toString()]
                
                
                
            let sql = "INSERT INTO "+req.body.title_database+"(titre_anime,titre_episode,episode,likes,lien) VALUES (?,?,?,?,?)"
            connection.query(sql,[req.body.title_database,tab[0],tab[0],0,tab[1]],
            (err,result)=>{
                //if(err)throw err;
                console.log("added "+ req.body.title_database +" episode "+ i)
            });
        }

    }

    
    
    //res.json({message: "added "+ taille +" episodes"})
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