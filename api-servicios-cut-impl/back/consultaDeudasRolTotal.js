'use strict';
 const genToken = require('./genToken');
 const servTierra = require('./serviciosTierra');
 let tokenCache = "A";
 
 module.exports.consultaDeudasRolTotal = async(event, context, callback) => {
     
     // Recupero parametro de entrada.
     let rol = event.queryStringParameters.rol;
     
     /*********** OBTENER TOKEN ON PREMISE**********/
     
     let clienteId = process.env.REST_TOKEN_CLIENT_ID;
     let scope = process.env.REST_TOKEN_SCOPE;
     let clientSecret = process.env.REST_TOKEN_CLIENT_SECRET;
     let grantType = process.env.REST_TOKEN_GRANT_TYPE;
     
     /*********************************************************************************/
 
 
     // Generando el token, funcion se encuentra en genToken.js
   
   /*console.log("Comienza Consulta ROL: "+rol);
   var t0 = new Date().getTime();
     let token = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType);
  console.log("Call to genToken:" + (new Date().getTime() - t0) + " milliseconds.");
  
  var t0 = new Date().getTime();
     let resultadoServicio = await servTierra.consultaDeudasRolTotal(token, rol);
     console.log("Call to consultaDeudasRolTotal: " + (new Date().getTime() - t0) + " milliseconds.");*/

    console.log("Comienza Consulta ROL: "+rol);
    var t0 = new Date().getTime();
   
     console.log("Token Cache = "+tokenCache);   
     let resultadoServicio = await servTierra.consultaDeudasRolTotal(tokenCache, rol);
    
    //Si Falla el token volvemos a invocar token y servicio Tierra
    if (resultadoServicio.codeStatus == 401)
    {
         console.log("Se recalcula Token");
         tokenCache = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType)
         resultadoServicio =  await servTierra.consultaDeudasRolTotal(tokenCache, rol);;
    }
    
    console.log("Call to consultaDeudasRolTotal: " + (new Date().getTime() - t0) + " milliseconds.");
    
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