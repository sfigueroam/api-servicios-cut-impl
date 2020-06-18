process.env.REST_TOKEN_GRANT_TYPE = "client_credentials";
process.env.REST_TOKEN_SCOPE = "/liquida-deudas-frontera/v1/deudas/* /recaConsultaDeudasAixWs/api/deuda/aix/consultar /servicios-recaudacion/v1/liquidacion/*";
process.env.REST_TOKEN_CLIENT_ID = "OauthConsultaCuentaRSClientG";
process.env.REST_TOKEN_CLIENT_SECRET = "TGR.C0ns8!Ta"; 
process.env.HOST = "wstest.tesoreria.cl";

const crear = require('../fechaServidorPDF');


// console.log('Inicio de funcion');
let event = {"pathParameters": {"idRol":"18001747039"}}; // json entrada para buscar certificado

//21141130-9


crear.fechaActual(event, null, ()=>{ console.log("fin")});