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

const clase = require('../consultaDeudasRutTotal');

let event = {"queryStringParameters" : {"rut" : 3,"sistema":1,"grupo":3}};

//t event = {"queryStringParameters" : {"ruta" : 3}};



clase.consultaDeudasRutTotal(event, null, (a,response)=>{ console.log(response)});



  
console.log("fin codigo");