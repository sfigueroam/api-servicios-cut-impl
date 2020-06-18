'use strict';
const genToken = require('./genToken');
const servTierra = require('./serviciosTierraMonex');
let tokenCache;

module.exports.liquidaCuentasMonex = async(event, context, callback) => {
    
    // console.log("[INICIO] consultaCuentasMonex");
    // // Recupero parametro de entrada.
    // let parametros = event.queryStringParameters;
    // console.log("parametros: ", parametros);
    // let urlParameters = Object.entries(parametros).map(e => e.join('=')).join('&');
    // console.log("urlParameters: ", urlParameters);
    console.log("[INICIO] liquidaCuentasMonex (api_liquidacionCutMonex)");
    console.log('','call',event);
    var jsonEntrada = event.body;
    let respuestaSatisfactoria = true;
    var stringComp = 'No se procesa Transaccion. Campo Obligatorio Nulo';
    var list = { 
        'data' :[] 
    }; 
    
    jsonEntrada = JSON.parse(jsonEntrada);
    // jsonEntrada = JSON.stringify(jsonEntrada);    
    
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
    
    let resultadoServicio = await servTierra.liquidaCuentasMonex(tokenCache, jsonEntrada);
    
    //SFM 12022020 (I) - Suma los monto neto, tanto para los liquidables como no liquidables, y se agrega al objeto con el campo totalLiquidable para que finalmente se vaya al json
    
    if (resultadoServicio.codeStatus == 200) {
        var totalLiquidable = 0;
        const totales = resultadoServicio.respuesta.reduce((p, c) => {
            p[c.liquidable] = (p[c.liquidable] || 0)+ c.montoTotal
            return p;
        }, {});
        
        if (totales['S']) {
            totalLiquidable = totales['S'];
        }
        var total = [{'totalLiquidable':trunc(totalLiquidable,2)}];
        resultadoServicio.respuesta = resultadoServicio.respuesta.concat(total);
    }
    
    //SFM 12022020 (F) - Suma los monto neto, tanto para los liquidables como no liquidables, y se agrega al objeto con el campo totalLiquidable para que finalmente se vaya al json
    
    console.log('Token: ', tokenCache);
    console.log("resultadoServicio: ", resultadoServicio);
    
    //Si Falla el token volvemos a invocar token y servicio Tierra
    if (resultadoServicio.codeStatus == 401)    {
         tokenCache = await genToken.obtenerToken(clienteId, scope, clientSecret, grantType);
         resultadoServicio = await servTierra.liquidaCuentasMonex(tokenCache, jsonEntrada);
    }
   
    send(resultadoServicio,callback);
    console.log("[FIN] liquidaCuentasMonex (api_liquidacionCutMonex)");
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

function trunc(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}