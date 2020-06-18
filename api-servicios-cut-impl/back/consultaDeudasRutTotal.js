'use strict';
const genToken = require('./genToken');
const servTierra = require('./serviciosTierra');
let tokenCache = "A";

module.exports.consultaDeudasRutTotal = async(event, context, callback) => {
    
    // Recupero parametro de entrada.
    let rut = event.queryStringParameters.rut;
    let sistema = event.queryStringParameters.sistema;
    let grupo = event.queryStringParameters.grupo;
    
    /*********** OBTENER TOKEN ON PREMISE**********/
    
    let clienteId = process.env.REST_TOKEN_CLIENT_ID;
    let scope = process.env.REST_TOKEN_SCOPE;
    let clientSecret = process.env.REST_TOKEN_CLIENT_SECRET;
    let grantType = process.env.REST_TOKEN_GRANT_TYPE;
    
    /*********************************************************************************/


    // Generando el token, funcion se encuentra en genToken.js
  
    /*console.log("tokenCache antes token" +tokenCache); tokenCache
    let token = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType);
    tokenCache = token;
    console.log("tokenCache despues token" +tokenCache); tokenCache*/
 
    //tokenCache = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType);
 
    let resultadoServicio = await servTierra.consultaDeudasRutTotal(tokenCache, rut,sistema,grupo);
    
    //Si Falla el token volvemos a invocar token y servicio Tierra
    if (resultadoServicio.codeStatus == 401)
    {
         tokenCache = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType)
         resultadoServicio = await servTierra.consultaDeudasRutTotal(tokenCache, rut,sistema,grupo);
    }

  
   
    send(resultadoServicio,callback);

};

function send(resultadoServicio,callback) { 
    
    var resultado;
    
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