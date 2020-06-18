'use strict';
const genToken = require('./genToken');
const servTierra = require('./serviciosTierraMonex');
let tokenCache;

module.exports.consultaItemsMonex = async(event, context, callback) => {
    
    console.log("[INICIO] consultaItemsMonex");
    // Recupero parametro de entrada.
    let parametros = event.queryStringParameters;
    let urlParameters = Object.entries(parametros).map(e => e.join('=')).join('&');
    console.log("urlParameters: ", urlParameters);
    
    /*********** OBTENER TOKEN ON PREMISE**********/
    let clienteId = process.env.REST_TOKEN_CLIENT_ID;
    let scope = process.env.REST_TOKEN_SCOPE;
    let clientSecret = process.env.REST_TOKEN_CLIENT_SECRET;
    let grantType = process.env.REST_TOKEN_GRANT_TYPE;
    /*********************************************************************************/

   //Primera Ejecucion
    if(!tokenCache)
        tokenCache = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType);
  
   let resultadoServicio = await servTierra.consultaItemsMonex(tokenCache, urlParameters);
    
    //Si Falla el token volvemos a invocar token y servicio Tierra
    if (resultadoServicio.codeStatus == 401)    {
         
         tokenCache = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType);
         resultadoServicio = await servTierra.consultaItemsMonex(tokenCache, urlParameters);
    }
   
    console.log("resultadoServicio: ", resultadoServicio);
    send(resultadoServicio,callback);
    console.log("[FIN] consultaItemsMonex");

};

function send(resultadoServicio,callback) { 
    
    const response = { 
        statusCode: resultadoServicio.codeStatus, 
        headers: { 
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work 
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS 
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/json; charset=utf-8'
        } 
    }; 
 
    if (resultadoServicio.respuesta) {
        response.body = JSON.stringify(resultadoServicio.respuesta); 
    } 
    
    callback(null, response); 
}