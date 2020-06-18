/*
process.env.REST_TOKEN_GRANT_TYPE = "client_credentials";
process.env.REST_TOKEN_SCOPE = "/servicios-recaudacion/v1/liquidacion/*";
process.env.REST_TOKEN_CLIENT_ID = "OauthRcConsultaCutDeudaRSClient";
process.env.REST_TOKEN_CLIENT_SECRET = "TGR.C0ns8!tAC4t"; 
process.env.HOST = "wstest.tesoreria.cl";
*/
process.env.REST_TOKEN_GRANT_TYPE = "client_credentials";
process.env.REST_TOKEN_SCOPE = "/liquida-deudas-frontera/v1/deudas/* /recaConsultaDeudasAixWs/api/deuda/aix/consultar /servicios-recaudacion/v1/liquidacion/*";
process.env.REST_TOKEN_CLIENT_ID = "OauthConsultaCuentaRSClientG";
process.env.REST_TOKEN_CLIENT_SECRET = "TGR.C0ns8!Ta"; 
process.env.HOST = "wstest.tesoreria.cl";



//const claseb = require('../liquidaDeudasPasaporte');

const clase = require('../consultaDeudasRolTotal');

let event = {"queryStringParameters" : {"rol" : "34000612276"}};


var t0 = new Date().getTime();
clase.consultaDeudasRolTotal(event, null, (a,response)=>{ console.log(response); var t1 =new Date().getTime(); console.log("Tiempo de Ejecucion " + (t1 - t0) + " milliseconds."); });

//var t1 =new Date().getTime();

//console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
  
console.log("fin codigo");