process.env.REST_TOKEN_CLIENT_ID = "OauthConsultaCuentaRSClientG";
process.env.REST_TOKEN_SCOPE = "/liquida-deudas-frontera/v1/* /recaConsultaDeudasAixWs/api/deuda/aix/consultar" ;
process.env.REST_TOKEN_CLIENT_SECRET = "TGR.C0ns8!Ta";
process.env.REST_TOKEN_GRANT_TYPE = "client_credentials";
process.env.HOST = "wstest.tesoreria.cl";

const crear = require('../consultaDeudasCUT');

let obj = 
{
   "rutRol": 18513653,
   "fechaOrigen": "2019-07-03T11:22:44",
   "clienteTipo": 1,
   "canal": 4,
   "grupo": 2,
   "idConsulta": 1,
   "codTransac": "AWSPPF",
   "usuario": 1,
   "formTipo": 17,
   "formFolio": 54991,
   "sistema": 17,
   "rutRolDv": 1
}

console.log('Inicio de funcion');
let event = {"body": obj}; // json entrada para buscar certificado



crear.consultaDeudas(event, null, ()=>{ console.log("fin")});