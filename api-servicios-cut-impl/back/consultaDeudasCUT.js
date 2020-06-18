'use strict';
const genToken=require('./genToken');
const servTierra=require('./serviciosTierra');
const funciones=require('./funciones');

module.exports.consultaDeudas = async (event, context, callback) => {
    
    console.log('tgr-api-consulta-deudaCut','call',event);
    var jsonEntrada = event.body;
    let respuestaSatisfactoria = true;
    var stringComp = 'No se procesa Transaccion. Campo Obligatorio Nulo';
     var list = { 
        'data' :[] 
    }; 
    
    jsonEntrada = JSON.parse(jsonEntrada);
    jsonEntrada = JSON.stringify(jsonEntrada);
    
    console.log(jsonEntrada);
    
    // let parametros = JSON.stringify(jsonEntrada);
    
    let clienteId = process.env.REST_TOKEN_CLIENT_ID;
    let scope = process.env.REST_TOKEN_SCOPE;
    let clientSecret = process.env.REST_TOKEN_CLIENT_SECRET;
    let grantType = process.env.REST_TOKEN_GRANT_TYPE;
    
    let token= await genToken.obtenerToken(clienteId,scope,clientSecret,grantType);
     console.log('este es el token', token);
    let resultadoServicio = await servTierra.consultaDeudas(token,jsonEntrada);
     console.log(resultadoServicio);
     
    if(resultadoServicio == null ){
        respuestaSatisfactoria = false;
        let response = await funciones.error(resultadoServicio, 'datapower');
        callback(null, response);
    } 
     
    if(resultadoServicio.error != null ){
        respuestaSatisfactoria = false;
        let response = funciones.error(resultadoServicio, resultadoServicio.error);
        callback(null, response);
    }
    
    if(resultadoServicio.resultMessage == 'No se encontraron Deudas'){
        respuestaSatisfactoria = false;
        let response = funciones.error(resultadoServicio, resultadoServicio.resultMessage);
        callback(null, response);
    }
    
    if(resultadoServicio.resultMessage.indexOf(stringComp) >= 0){
        respuestaSatisfactoria = false;
        let response = funciones.error(resultadoServicio, stringComp);
        callback(null, response);
    }
    
    
    if(resultadoServicio.resultCode == 1){
        respuestaSatisfactoria = false;
        let response = funciones.error(resultadoServicio, 1);
        callback(null, response);
    }
    
    
    var arr = resultadoServicio.deudaPortalArr;
    
    if(arr == undefined || arr == null || arr.length == 0){
        respuestaSatisfactoria = false;
        let response = funciones.error(resultadoServicio, 'No se encontraron Deudas');
        callback(null, response);
    }
    
    
    for(var item in arr){
        list.data.push({ 
            clienteTipo: arr[item].clienteTipo, 
            condonacion: arr[item].condonacion, 
            fechaAntiguedad: arr[item].fechaAntiguedad, 
            fechaLiquidacion: arr[item].fechaLiquidacion, 
            formFolio: arr[item].formFolio, 
            formOrigCta: arr[item].formOrigCta, 
            formTipo: arr[item].formTipo, 
            formVer: arr[item].formVer, 
            grupo: arr[item].grupo, 
            idLiquidacion: arr[item].idLiquidacion, 
            institucionId: arr[item].institucionId, 
            intereses: arr[item].intereses, 
            liqResultCode: arr[item].liqResultCode, 
            monedaId: arr[item].monedaId, 
            montoPlazo: arr[item].montoPlazo, 
            montoTotalPagar: arr[item].montoTotalPagar, 
            multas: arr[item].multas, 
            periodo: arr[item].periodo, 
            porcCondonacion: arr[item].porcCondonacion, 
            reajustes: arr[item].reajustes, 
            rutRol: arr[item].rutRol, 
            rutRolDv: arr[item].rutRolDv, 
            sistemaOrigen: arr[item].sistemaOrigen, 
            vencimiento: arr[item].vencimiento,
        }); 
    } 
    
    //Enviar 
    if(respuestaSatisfactoria){
    send(200,arr,callback);
    }
    
};

function send(httpCode, resultado, callback) { 
    const response = { 
        statusCode: httpCode, 
        headers: { 
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work 
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS 
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/json' 
        } 
    }; 
 
    if (httpCode) {
        resultado = {
            data : resultado
        }
        response.body = JSON.stringify(resultado); 
        
    }
    console.log('ests es la rpta', response);
    callback(null, response); 
}