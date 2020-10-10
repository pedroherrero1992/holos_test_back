const express = require('express');
const app = express();
const port = 3000;
//<input type="text" id="country_code" name="country_code" pattern="[ACTG]{6,6}-[ACTG]{6,6}-[ACTG]{6,6}-[ACTG]{6,6}-[ACTG]{6,6}-[ACTG]{6,6}" title="Three letter country code"><br><br><input type="submit">


const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

const Schema = {
    name: String,
    otra: String
  };
  const Schema_mutant = {
    dna: String,
    mutant: Boolean
  }
//creo el schema
const Probando_schema = mongoose.model( 'probando', Schema);
const Mutant = mongoose.model ('mutant', Schema_mutant);


app.use(function(req, res, next) {
 // res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});




////////////////////////////////////


app.get('/', (req, res) => {
  res.send('Hello--World!')

});

///////////////////////////
app.get('/getMutant', (req, res) => {

  var id = '5f80cb765b38dd270808c617';
  Mutant.findById(id,function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
    res.send(kittens);
    
  });

 
});
/////////////////////////
app.get('/getUsersList', (req, res) => {

  
  Probando_schema.find({},function (err, data) {
    if (err) return console.error(err);
    
    res.send(data);
    
  });

 
});

/////////////////////////////////////
app.post('/1/:id', (req, res) => {
   

    var id = req.params.id;
    //let algo = require('./conn2.js');



Probando_schema.findById(id,function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
    res.send(kittens);
    
  });


  });



  ////////////////////////////////////

  /////////////////////////////////////
app.post('/create/:data', (req, res) => {
   

  var data_entrada = req.params.data;
  
 
  let data_salida = data_entrada.split("&&&"); 
  //algo2[0]+' ' + algo2[1]+' ' + algo2[2]
  
  
  //let algo = require('./conn2.js');

  const user = new Probando_schema({ name: data_salida[0] , otra: data_salida[1]  });


  user.save(function (err, user) {
    if (err){
      return console.error(err);
      res.sendStatus(403);
    } 
      
    
    if (!err) {
      
      res.send({
        
        "success": true
    });
    }
  
  });


  
});






////////////////////////////////////

/////////////////////////////////////
app.post('/createMutant/:data', (req, res) => {
   
  var mutant ="ATGCGA-CAGTGC-TTATGT-AGAAGG-CCCCTA-TCACTG";
  var no_mutant="ATGCGA-CAGTGC-TTATTT-AGACGG-GCGTCA-TCACTG";

  var data_entrada = req.params.data;
  
 
  //let data_salida = data_entrada.split("&&&"); 
  //algo2[0]+' ' + algo2[1]+' ' + algo2[2]
  
  
  //let algo = require('./conn2.js');

  var user = new Mutant({ dna : mutant , mutant : true});


  user.save(function (err, user) {
    if (err){
      return console.error(err);
      res.sendStatus(403);
    } 
      
    
    if (!err) {
      
      res.send({
        
        "success": true
    });
    }
  
  });


  
});






////////////////////////////////////
  app.put('/2/:id', (req, res) => {
      res.send('update')
    var id = req.params.id;
   


   Probando_schema.findByIdAndUpdate(id,{ name:  'putos', })


  });

  ////////////////////////////////////

  app.post('/delete/:id', (req, res) => {
    
    res.send({
        
      "success": true,
      "delete" : 'delete'

  })
    var id = req.params.id;
    Probando_schema.deleteOne({_id: id }, function (err) {});
  });

  app.post('/mutant/:dna', (req, res) => {

    var mutant = req.params.dna;
    if (/[ACTG]{6,6}-[ACTG]{6,6}-[ACTG]{6,6}-[ACTG]{6,6}-[ACTG]{6,6}-[ACTG]{6,6}/.test(mutant)) {
      
      // var mutant = "ATGCGA-CAGTGC-TTATGT-AGAAGG-CCCCTA-TCACTG";
      // var no_mutant = "ATGCGA-CAGTGC-TTATTT-AGACGG-GCGTCA-TCACTG";
       var cadena = mutant.split("-").join('');
       var cadena2 = cadena.split("");
     
       var bandera = 0;
       var cadena3 = new Array(6).fill(0).map(() => new Array(6).fill(0));
       var algo = 0;
       var bandera = 0;
       var bandera_diagonal = 1;
       var bandera_horizontal = 1;
       var bandera_horizontal_find = 0;
       var bandera_vertical = 1;
       var bandera_vertical_find = 0;
       for (let i = 0; i < 6; i++) {
         for (let e = 0; e < 6; e++) {
     
           cadena3[i][e] = cadena2[bandera];
           bandera++
     
     
           //diagonal
           if (i == e && i !== 0 && e !== 0) {
             if (cadena3[i][e] == cadena3[i - 1][e - 1]) {
     
               bandera_diagonal++
     
             }
     
           }//end diagonal
     
           //horinzontal
           if (cadena3[i][e] == cadena3[i][e - 1] && i !== 0) {
             bandera_horizontal++
             // console.log("horizontal"+ cadena3[i][e] )
             if (bandera_horizontal >= 4) {
               bandera_horizontal_find = 1
     
             }
             if (e == 5) {
               bandera_horizontal = 1;
               // console.log("h reset");
             }
           }
           if (cadena3[i][e] !== cadena3[i][e - 1] && i !== 0) {
             bandera_horizontal = 1;
             //console.log("h reset");
           }
           //end horizontal
       }
     }//end for
     
     for (let i = 0; i < 6; i++) {
       for (let e = 0; e < 6; e++) {
         //vertical
         
        
         //console.log(cadena3[e][i]);
         if (e!==0 && cadena3[e][i] == cadena3[e-1][i]) {
          // console.log('entro '+cadena3[e][i] )
           bandera_vertical++
           if (bandera_vertical >= 4) {
             bandera_vertical_find = 1
     
           }
           
         }
     
         if (e!==0 && cadena3[e][i] !== cadena3[e-1][i] ) {
           bandera_vertical=1;
         }
         
         //end vertical
     
       }
       
     }
     
     
     
     if (bandera_diagonal == 1 || bandera_horizontal_find == 1 || bandera_vertical_find == 1) {
      
      Mutant.find({ dna: mutant },function (err, docs) {


        if (docs.length >0) {
          

          res.send({status: 200, save: ' not save'})
        } else{
          var save_mutant= new Mutant({ dna : mutant , mutant : true});
          save_mutant.save(function (err, user) {
            if (err){
             return console.error(err);
              res.send(200 +' err : Mutant Match --can´t save the record-- ');
            } if (!err) {
              
              res.send({status: 200, save: ' save'});
             // res.send({"success": true });
            }
          
          });
        }

    
    
      });

     


       

     }else{
      
      Mutant.find({ dna: mutant },function (err, docs) {


        if (docs.length >0) {
          
         
          res.send( {status: 403, save: ' not save'})
        } else{
          var save_mutant= new Mutant({ dna : mutant , mutant : false});
          save_mutant.save(function (err, user) {
            if (err){
             return console.error(err);
              res.send(403 +' err : Mutant Match --can´t save the record-- ');
            } if (!err) {
              
              res.send( {status: 403, save: '  save'});
             // res.send({"success": true });
            }
          
          });
        }

    
    
      });
       
     
     }
        
     
     
     
       //console.log(bandera_diagonal);
       //console.log(bandera_horizontal_find);
       //console.log(bandera_vertical_find);
       //res.send(cadena3);
     
    }else{

      res.send({msj:'patter don´t match use for example : ATGCGA-CAGTGC-TTATGT-AGAAGG-CCCCTA-TCACTG'});
    }
   });
   
   
   
   /////////////////////////////////////

   app.get('/stats', (req, res) => {

    var mutantes = 0;
    var no_mutantes = 0;
    var contandor=0;
    Mutant.find({},function (err, data) {
        if (err) return console.error(err);
        
      data.forEach(element => {
           if (element.mutant == true) {
              mutantes++
           }else{
                no_mutantes++


           }
           contandor++
        });
        
        var porcentaje_mutan= 100*mutantes/contandor;
        var porcentaje_no_mutan= 100*no_mutantes/contandor;
        if (no_mutantes == 0) {
            var ratio = mutantes;
        }else {
            var ratio = mutantes/no_mutantes;

        }
        

       //res.send('ratio mutantes ' + porcentaje_mutan + '  ratio no mutant :'+ porcentaje_no_mutan);
        res.send( {count_mutant_dna: mutantes, count_human_dna: no_mutantes,  ratio: ratio})
        
      });

  



});

//////////////////////////



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});