'use strict';
const genToken = require('./genToken');
const servTierra = require('./serviciosTierraFronterizo');
const funciones = require('./funciones');

module.exports.fechaActual = async(event, context, callback) => {

    console.log('tgr-pago-paso-fronterizo', 'call', event);

    /*********** OBTENER TOKEN ON PREMISE**********/
    let resultadoServicio;
    let clienteId = process.env.REST_TOKEN_CLIENT_ID;
    let scope = process.env.REST_TOKEN_SCOPE;
    let clientSecret = process.env.REST_TOKEN_CLIENT_SECRET;
    let grantType = process.env.REST_TOKEN_GRANT_TYPE;
    
    /*********************************************************************************/

    // Generando el token, funcion se encuentra en genToken.js
    let token = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType);
    console.log("Token : "+token)
    if(token!= null || token != undefined){
    
         resultadoServicio = {
              data : { fecha : new Date()}  
            } 
        
        
    }
    else{
     let  data = {
             error: "En estos momentos no podemos resolver su solicitud" 
            } 
        resultadoServicio = data;
    }
    // let resultadoServicio = await servTierra.consultaFechaActual(token);
    
    console.log("RESPUESTA API TIERRA -> " , JSON.stringify(resultadoServicio));

    const response = {
        statusCode: 200,
        body: JSON.stringify(resultadoServicio),
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8'
        }
    }
  

    callback(null,response);

};