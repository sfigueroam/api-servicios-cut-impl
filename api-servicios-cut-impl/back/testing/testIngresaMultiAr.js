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

const clase = require('../ingresaMultiAr');

let obj = 
{ 
   "listaCid":[ 
      { 
         "idMoneda":0,
         "codigoBarra":"0114910001022001310301031K",
         "montoTotal":73236
      }
   ],
   "usuario":"PruebaIngreso",
   "montoTotalPagar":"73236"
};
/*
obj = 
{
   "listaCid":[
      {
         "idMoneda":0,
         "codigoBarra":"12059200005319123103014410",
         "montoTotal":877892
      },
      {
         "idMoneda":0,
         "codigoBarra":"12059200005619123103014617",
         "montoTotal":645482
      }
   ],
   "usuario":"PruebaIngreso",
   "montoTotalPagar":1343374
};
*/
console.log('Inicio de funcion');
let event = {"body": JSON.stringify(obj)}; // json entrada para buscar certificado



clase.ingresaMultiAr(event, null,(a,response)=>{ console.log(response)});