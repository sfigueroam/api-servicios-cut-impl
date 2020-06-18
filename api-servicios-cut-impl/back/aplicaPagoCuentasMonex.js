'use strict';
const genToken = require('./genToken');
const servTierra = require('./serviciosTierraMonex');
let tokenCache;

module.exports.aplicaPagoCuentasMonex = async(event, context, callback) => {
    
    // console.log("[INICIO] consultaCuentasMonex");
    // // Recupero parametro de entrada.
    // let parametros = event.queryStringParameters;
    // console.log("parametros: ", parametros);
    // let urlParameters = Object.entries(parametros).map(e => e.join('=')).join('&');
    // console.log("urlParameters: ", urlParameters);
    console.log("[INICIO] aplicaPagoCuentasMonex (api_impuestoDigital)");
    console.log('','call',event);
    var jsonEntrada = event.body;
    let respuestaSatisfactoria = true;
    var stringComp = 'No se procesa Transaccion. Campo Obligatorio Nulo';
     var list = { 
        'data' :[] 
    }; 
    
    jsonEntrada = JSON.parse(jsonEntrada);
    jsonEntrada = JSON.stringify(jsonEntrada);    
    
    console.log("jsonEntrada: ", jsonEntrada);
    
    /*********** OBTENER TOKEN ON PREMISE**********/
    let clienteId = process.env.REST_TOKEN_CLIENT_ID;
    let scope = process.env.REST_TOKEN_SCOPE;
    let clientSecret = process.env.REST_TOKEN_CLIENT_SECRET;
    let grantType = process.env.REST_TOKEN_GRANT_TYPE;
    /*********************************************************************************/

    //Primera Ejecucion
    if(!tokenCache)
        tokenCache = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType);
    
    let resultadoServicio = await servTierra.aplicaPagoCuentasMonex(tokenCache, jsonEntrada);
    console.log('Token: ', tokenCache);
    console.log("resultadoServicio: ", resultadoServicio);
    
    //Si Falla el token volvemos a invocar token y servicio Tierra
    if (resultadoServicio.codeStatus == 401)    {
         tokenCache = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType);
         resultadoServicio = await servTierra.aplicaPagoCuentasMonex(tokenCache, jsonEntrada);
    }
   
    // console.log("resultadoServicio: ", resultadoServicio);
    send(resultadoServicio,callback);
    console.log("[FIN] aplicaPagoCuentasMonex (api_impuestoDigital)");
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