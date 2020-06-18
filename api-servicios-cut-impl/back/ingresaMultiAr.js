'use strict';
 const genToken = require('./genToken');
 const servTierra = require('./serviciosTierra');
 
 module.exports.ingresaMultiAr = async(event, context, callback) => {
     
     
     //console.console("Event"+event);
     // Recupero parametro de entrada.
     var jsonEntrada = event.body;
     //jsonEntrada = JSON.parse(jsonEntrada);
    // jsonEntrada = JSON.stringify(jsonEntrada);
    
    console.log(jsonEntrada);
     
     /*********** OBTENER TOKEN ON PREMISE**********/
     
     let clienteId = process.env.REST_TOKEN_CLIENT_ID;
     let scope = process.env.REST_TOKEN_SCOPE;
     let clientSecret = process.env.REST_TOKEN_CLIENT_SECRET;
     let grantType = process.env.REST_TOKEN_GRANT_TYPE;
     
     /*********************************************************************************/
 
 
     // Generando el token, funcion se encuentra en genToken.js
   
     let token = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType);
  
     let resultadoServicio = await servTierra.ingresaMultiAr(token, jsonEntrada);
    
    
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