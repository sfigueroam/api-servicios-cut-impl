/*
process.env.REST_TOKEN_GRANT_TYPE = "client_credentials";
process.env.REST_TOKEN_SCOPE = "/monex/v1/*";
process.env.REST_TOKEN_CLIENT_ID = "OauthRcConsultaCutMonexRSClient";
process.env.REST_TOKEN_CLIENT_SECRET = "TGR.C87m0N3!"; 
process.env.HOST = "wstest.tesoreria.cl";
*/


process.env.REST_TOKEN_GRANT_TYPE = "client_credentials";
process.env.REST_TOKEN_SCOPE = "/liquida-deudas-frontera/v1/deudas/ /recaConsultaDeudasAixWs/api/deuda/aix/consultar /servicios-recaudacion/v1/liquidacion/* /monex/v1* /monex-liquidacion/v1*";
process.env.REST_TOKEN_CLIENT_ID = "OauthConsultaCuentaRSClientG";
process.env.REST_TOKEN_CLIENT_SECRET = "TGR.C0ns8!Ta"; 
process.env.HOST = "wstest.tesoreria.cl";

const clase = require('../aplicaPagoCuentasMonex');

let obj = 
{
  "inMontoSwift": "12121",
  "inFechaOrdenPago": "111",
  "inFechaDeposito": "111",
  "inOrdenante": "111",
  "inRemesa": "111",
  "inBanco": "111",
  "inNroOrdenPago": "111",
  "inListaArs": "111;121212;12918729",
  "inMontoAplicar": "111"
};

// let event = {"queryStringParameters" : {"in_usuario" : 1,"in_id_sistema":1,"in_cliente_tipo":1 ,"in_rut_rol":61806000 }};
console.log('Inicio de testAplicaPagoCuentasMonex');

let event = {"body": JSON.stringify(obj)}; // json entrada para buscar certificado

// clase.aplicaPagoCuentasMonex(event, null, (a,response)=>{ console.log(response)});
clase.aplicaPagoCuentasMonex(event, null, (a,response)=>{ console.log(response)});

console.log("Fin de testAplicaPagoCuentasMonex");