
const express = require('express'),
      router = express.Router();

var mysql = require('mysql');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "",
  database: "corrida"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});
// router.get('/', (req, res) => {
//   console.log("received get request for corrida");
//   if (!req.body) return res.sendStatus(400);
//   console.log(req.body);
//   // res.setHeader('Content-Type', 'application/json');
//   // res.send(JSON.stringify({ content: "returning response for cabida request" }));
//   res.send('from the server');
// });

router.post('/insertCorrida', (req, res) => {
  console.log("received post request for router corrida");
  console.log('');

  insertintoCabidaTables(req.body);

  // res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify({ content: "returning response for cabida request" }));
  res.send({'fromServer in corrida':'Hi from corrida'});

});

router.get('/getCorridas', (req, res) => {

  queryx("SELECT form_json FROM main Where id=29")
  .then( result =>{
    console.log('The result...')
    console.log(result);
    // res.setHeader('Content-Type', 'application/json');
    res.send(result);
    // res.send(JSON.stringify(res));
  })
  .catch( err => {
      // handle the error
      console.log(err);
  } );
  console.log('end of router get...');


});

//some other endpoints to submit data
module.exports = router;

function insertintoCabidaTables(requestBody){
  var id;
  var something = "default";

  console.log('Inserting Table main ');
  queryx(insertToTableMain(requestBody.proyectoGen, requestBody))
    .then( result => {
        id = result.insertId;
        console.log('inserting CabInGen with id: ' + id);
        return queryx( insertToTableCabInGen(requestBody.cabida.cabConstruccion, id) );
    } )
    .then( result => {
        console.log('inserting table area dptos with id: ' + id);
        return queryx( insertToTableAreaDptos(requestBody.cabida.cabAreasDptos, id) );
    } )
    .then( result => {
        console.log('inserting table cocheras with id: ' + id);
        return queryx( insertToTableCocheras(requestBody.cabida.cabCocheras, id) );
    } )
    .then( result => {
        console.log('inserting table area dptos with id: ' + id);
        return queryx( insertToTablePrimer(requestBody.cabida.cabPrimerPisoAreaComun, id) );
    } )
    .then( result => {
        console.log('inserting table area dptos with id: ' + id);
        return queryx( insertToTableTerraza(requestBody.cabida.cabTerraza, id) );
    } )
    // .then( rows => {
    //
    //     return database.close();
    // }, err => {
    //     return database.close().then( () => { throw err; } )
    // })
    .catch( err => {
        // handle the error
        console.log(err);
    } )

}

function queryx( sql) {
    return new Promise( ( resolve, reject ) => {
        con.query( sql, ( err, result ) => {
            if ( err ){
                console.log('There was an error.. ');
                console.log('Error: ' + err);
                return reject( err );
              }
            console.log('resolving the result...');
            console.log(result);
            resolve( result );
        } );
    } );
}

function insertToTableMain(proyectoGen,proyectoForm){
    var sql = "INSERT INTO main ( project_name," +
                                  "cor_address," +
                                  "cor_price," +
                                  "cor_mcuad_area," +
                                  "cor_address_object," +
                                  "cor_address_number," +
                                  "cor_district," +
                                  "form_json) VALUES ('"+
                                      proyectoGen.nombreProyecto +"','"+
                                      proyectoGen.direccion +"','"+
                                      proyectoGen.precio +"','"+
                                      proyectoGen.area +"',"+
                                      proyectoGen.addressObject +",'"+
                                      proyectoGen.direccionNumero +"','"+
                                      proyectoGen.distrito +"','"+
                                      + proyectoForm + "')";
    return sql;

}



function insertToTableCabInGen(cabConstruccion,id){
    var sql = "INSERT INTO cab_in_generales ( id," +
                                  "altura," +
                                  "coef_area_constructible," +
                                  "coef_area_libre," +
                                  "coef_area_comun_techada) VALUES ('"+
                                      id +"','"+
                                      cabConstruccion.areaTerreno +"','"+
                                      cabConstruccion.coefAreaConstruida +"','"+
                                      cabConstruccion.coefAreaLibre+"','"+
                                      cabConstruccion.coefAreaComun + "')";
    return sql;

}

function insertToTableAreaDptos(cabAreasDptos,id){
    var sql = "INSERT INTO cab_in_area_dptos ( id," +
                                  "area_maxima," +
                                  "area_mediana," +
                                  "area_minima," +
                                  "dor_area_max," +
                                  "dor_area_mid," +
                                  "dor_area_min," +
                                  "cochs_por_dorms) VALUES ('"+
                                      id +"','"+
                                      cabAreasDptos.areaMax +"','"+
                                      cabAreasDptos.areaMid +"','"+
                                      cabAreasDptos.areaMin +"','"+
                                      cabAreasDptos.dormsAreaMax +"','"+
                                      cabAreasDptos.dormsAreaMid +"','"+
                                      cabAreasDptos.dormsAreaMin +"','"+
                                      cabAreasDptos.cocherasPorDormsOption + "')";
    return sql;
}

function insertToTableCocheras(cabCocheras, id){
    var sql = "INSERT INTO cab_in_cocheras (id," +
                                  "coef_cochera_visitas," +
                                  "cocheras_vivienda," +
                                  "coef_area_tech_coch_sotano," +
                                  "area_min_tech_coch_sotano," +
                                  "area_cochera," +
                                  "cochs_por_dorms) VALUES ('"+
                                       id+"','"+
                                       cabCocheras.cochVisitas+"','"+
                                       cabCocheras.cochPorDpto+"','"+
                                       cabCocheras.areaTechaSotano+"','"+
                                       cabCocheras.minAreaTechaSotano+"','"+
                                       cabCocheras.areaCochera+"','"+
                                       cabCocheras.cocherasPorDormsOption+ "')";
    return sql;
}

function insertToTablePrimer(cabPrimerPisoAreaComun, id){
    var sql = "INSERT INTO cab_in_primer_area_comun (id," +
                                  "area_absoluta," +
                                  "area_relative_coef," +
                                  "selection) VALUES ('"+
                                      id +"','"+
                                      cabPrimerPisoAreaComun.areaComunAbs +"','"+
                                      cabPrimerPisoAreaComun.areaComunRel +"','"+
                                      cabPrimerPisoAreaComun.primerPisoSelection + "')";
    return sql;

}

function insertToTableTerraza(cabTerraza, id){
    var sql = "INSERT INTO cab_in_ultimo_piso_con_terraza (id," +
                                  "coef_area_terraza," +
                                  "coef_area_techada," +
                                  "con_terraza) VALUES ('"+
                                      id +"','"+
                                      cabTerraza.terrazaAreaLibre +"','"+
                                      cabTerraza.terrazaAreaTechada +"','"+
                                      cabTerraza.terrazaOption + "')";
    return sql;

}



// { proyectoGen:            table : main date_created	date_updated
//    { nombreProyecto: '',      project_name
//      direccion: '',           cor_address
//      precio: '',              cor_price
//      area: '',                cor_mcuad_area
//      addressObject: '' },     cor_address_object
//      direccionNumero          cor_address_number
//      distrito                 cor_district
// { cabConstruccion:           table : cab_in_generales
//    { areaTerreno: '636',
//      altura: '4',              altura
//      coefAreaConstruida: '65', coef_area_constructible
//      coefAreaLibre: '35',      coef_area_libre
//      coefAreaComun: '8' },     coef_area_comun_techada
//   cabAreasDptos:         table: cab_in_area_dptos
//    { areaMax: '120',       area_maxima
//      areaMid: '120',       area_mediana
//      areaMin: '120',       area_minima
//      dormsAreaMax: '',     dor_area_max
//      dormsAreaMid: '',     dor_area_mid
//      dormsAreaMin: '',     dor_area_min
//      cocherasPorDormsOption: 'false' },  cochs_por_dorms
//   cabCocheras:   		      table : cab_in_cocheras
//    { cochVisitas: '10',                coef_cochera_visitas
//      cochPorDpto: '1',                 cocheras_vivienda
//      areaTechaSotano: '100',           coef_area_tech_coch_sotano
//      minAreaTechaSotano: '30',         area_min_tech_coch_sotano
//      areaCochera: '30',                  area_cochera
//      cocherasPorDormsOption: 'false' },  cochs_por_dorms
//   cabPrimerPisoAreaComun: { 	   table : cab_in_primer_area_comun
//            areaComunAbs: '',       area_absoluta
//            areaComunRel: '',       area_relative_coef
//            primerPisoSelection: '1' },   selection
//   cabTerraza: table : `cab_in_ultimo_piso_con_terraza`
//    { terrazaAreaLibre: '75',     coef_area_terraza
//      terrazaAreaTechada: '25',   coef_area_techada
//      terrazaOption: 'false' } }  con_terraza










// con.query(insertToTableMain(requestBody.proyectoGen), function (err, result) {
//   if (err) throw err;
//   console.log("ProyectoGen record inserted with id: " + result.insertId);
//   id = result.insertId;
//   something = "something";
// });
// console.log('The function id is:  ' + id);
// console.log('The something is:  ' + something);
//
// console.log('Inserting Table CabInGen ');
// con.query(insertToTableCabInGen(requestBody.cabConstruccion, id), function (err, result) {
//   if (err) throw err;
//   console.log("CabGen record inserted");
// });
//
// con.query(insertToTableAreaDptos(requestBody.cabAreasDptos, id), function (err, result) {
//   if (err) throw err;
//   console.log("AreaDptos record inserted");
// });

// con.query(insertToTableCocheras(requestBody.cabCocheras, id), function (err, result) {
//   if (err) throw err;
//   console.log("TablaCocheras record inserted");
// });
//
// con.query(insertToTablePrimer(requestBody.cabPrimerPisoAreaComun, id), function (err, result) {
//   if (err) throw err;
//   console.log("PrimerPispComun record inserted");
// });
//
// con.query(insertToTableTerraza(requestBody.cabTerraza, id), function (err, result) {
//   if (err) throw err;
//   console.log("Terraza record inserted");
// });
