/*
process.env.REST_TOKEN_GRANT_TYPE = "client_credentials";
process.env.REST_TOKEN_SCOPE = "/monex/v1/*";
process.env.REST_TOKEN_CLIENT_ID = "OauthRcConsultaCutMonexRSClient";
process.env.REST_TOKEN_CLIENT_SECRET = "TGR.C87m0N3!"; 
process.env.HOST = "wstest.tesoreria.cl";*/


process.env.REST_TOKEN_GRANT_TYPE = "client_credentials";
process.env.REST_TOKEN_SCOPE = "/liquida-deudas-frontera/v1/deudas/* /recaConsultaDeudasAixWs/api/deuda/aix/consultar /servicios-recaudacion/v1/liquidacion/* /monex/v1*";
process.env.REST_TOKEN_CLIENT_ID = "OauthConsultaCuentaRSClientG";
process.env.REST_TOKEN_CLIENT_SECRET = "TGR.C0ns8!Ta"; 
process.env.HOST = "wstest.tesoreria.cl";



const clase = require('../consultaCuentasMonex');

let event = {"queryStringParameters" : {"in_usuario" : 1,"in_id_sistema":1,"in_cliente_tipo":1 ,"in_rut_rol":61806000 }};

clase.consultaCuentasMonex(event, null, (a,response)=>{ console.log(response)});
  
console.log("fin codigo");