const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

const app = express();




// con.query("SELECT * FROM cabida", function (err, result, fields) {
//   if (err) throw err;
//   console.log('querying the database...')
//   console.log(result);
// });



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/corrida',require('./routes/corrida.routes.js'));

// app.post('/corrida', (req, res) => {
//   console.log("received get request for corrida");
//   // if (!req.body) return res.sendStatus(400);
//   console.log(req.body);
//   // res.setHeader('Content-Type', 'application/json');
//   // res.send(JSON.stringify({ content: "returning response for cabida request" }));
//   res.send('from the server');
// });

app.post('/test', (req, res) => {
  console.log("received post request for corrida");
  // if (!req.body) return res.sendStatus(400);
  // console.log(req.body.cabCocheras.cochVisitas);
  console.log(req.body);
  // res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify({ content: "returning response for cabida request" }));
  res.send({'fromServer':'Hi'});

});


app.get('/corrida', function (req, res) {
  console.log("received get request for cabida");

  // getData().then((data)=> {
  //   console.log('then....');
  //   console.log(data);
  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(JSON.stringify(data));
  // }).catch((err) => setImmediate(() => { throw err; }));;

  // res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify({ content: "returning response for cabida request" }));
  //res.send('from the server');
});

//Create a function with a promise
function getData(){
  return new Promise(function(resolve, reject) {
    con.query("SELECT * FROM cabida", function (err, result, fields) {
      console.log('querying the database...')
      console.log(result);
      if (err) {
          return reject(err);
      }
      resolve(result);
    });
  });
}

app.listen(8000, () => {
  console.log('Server started!');
});


// { cabConstruccion:
//    { areaTerreno: '636',
//      altura: '4',
//      coefAreaConstruida: '65',
//      coefAreaLibre: '35',
//      coefAreaComun: '8' },
//   cabAreasDptos:
//    { areaMax: '120',
//      areaMid: '120',
//      areaMin: '120',
//      dormsAreaMax: '',
//      dormsAreaMid: '',
//      dormsAreaMin: '',
//      cocherasPorDormsOption: 'false' },
//   cabCocheras:
//    { cochVisitas: '10',
//      cochPorDpto: '1',
//      areaTechaSotano: '100',
//      minAreaTechaSotano: '30',
//      areaCochera: '30',
//      cocherasPorDormsOption: 'false' },
//   cabPrimerPisoAreaComun: { areaComunAbs: '', areaComunRel: '', primerPisoSelect
// ion: '1' },
//   cabTerraza:
//    { terrazaAreaLibre: '75',
//      terrazaAreaTechada: '25',
//      terrazaOption: 'false' } }
