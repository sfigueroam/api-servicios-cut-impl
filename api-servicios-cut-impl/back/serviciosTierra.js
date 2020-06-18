const http = require('http')
const https = require('https')
const genToken=require('./genToken');
const host=process.env.HOST;


function consultaDeudas (token, json) {
  
  return new Promise((resolve, reject) => {
    
    //opciones para poder realizar la conexion al servicio
  
    let options = {
      hostname: host,
      port: 443,
      path: '/recaConsultaDeudasAixWs/api/deuda/aix/consultar', //PARAMETRIZAR v1
      method: 'POST',
      rejectUnauthorized: false,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        "Content-Length": json.length
      }
    };
    //Declaracion de variables y realizacion del request
    // console.log(options);
    let respuesta='';
    let estadoHttp='';
    let req = https.request(options, (res) => {
      
      // console.log('statusCode:', res.statusCode);
      // console.log('headers:', res.headers);
      
      estadoHttp=res.statusCode;
      //guardado de dato obtenidos en respuesta
      res.on('data', (d) => {
        respuesta+=d;
        
      });
      
       console.log('respuesta luego de guardar datos', respuesta);

    }).on('error', (error) => {
      console.error(error);
      reject(error);
    });
    
    //terminado el request parsear la respuesta y entra al primer if donde lo devuelve a la promesa
    req.on('close', () => {
      
    
      if(estadoHttp=="200") {
        respuesta= JSON.parse(respuesta);
        console.log('linea 60 entre aca con el json parseado ', respuesta);
        resolve(respuesta);
      }
      // de lo contrario maneja errores
      else{
        let errores=null;
        
        if(estadoHttp=="500")      
            errores = {
            error : 'usuario'
        };
        
        if(estadoHttp=="404")      
            errores = {
            error : 'idSolicitud no encontrada en base de datos'
        };
        
        if(estadoHttp=="401" && token == null){
        console.log('entre al error 401');
          errores = {
          error : 'token'
        };
        }
        
        if(estadoHttp=="401" && token != null){
        console.log('entre al error 401 por usuario');
          errores = {
          error : 'usuario'
        };
        }
        if(estadoHttp=="400")      
            errores = {
            error : 'Solicitud incorrecta'
        };
        console.log('esto sale de errores', errores);
        resolve(errores);
          
      }
    });
    req.write(json);
    req.end();
  });
}
exports.consultaDeudas=consultaDeudas;

function consultaDeudasRolTotal(token, rol,sistema) {

  return new Promise((resolve, reject) => {
    
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };
    let respuesta = '';
  
    var regex = /[^0-9]/g;
    var myArray2 = regex.exec(rol);
    
    if(myArray2 != null){
        respuesta = JSON.parse('{"errors":[{"message": "Error de validación. Párametro [rol] debe ser numérico."}]}');
        respServicio.respuesta = respuesta;
        respServicio.codeStatus = 400;
        return resolve(respServicio);
    }
        
    if(rol.length > 12){
        respuesta = JSON.parse('{"errors":[{"message": "Error de validación. Párametro [rol] tiene rango maximo de 12."}]}');
        respServicio.respuesta = respuesta;
        respServicio.codeStatus = 400;
       return resolve(respServicio);
    }
    
     if (sistema == null){
        sistema = 92;//defecto
    }

    //opciones para poder realizar la conexion al servicio
    let options = {
      hostname: host,
      port: 443,
      path: '/servicios-recaudacion/v1/liquidacion/deudasrol?rol='+ rol+'&sistema='+sistema,
      method: 'GET',
      rejectUnauthorized: false,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    
    //Declaracion de variables y realizacion del request
    
    let req = https.request(options, (res) => {
      
      respServicio.codeStatus = res.statusCode;

      //guardado de dato obtenidos en respuesta
      res.on('data', (d) => {
        respuesta += d;

      });

    }).on('error', (error) => {
      console.error("Error: "+error);
      reject(error);
    });

    //terminado el request parsear la respuesta y entra al primer if donde lo devuelve a la promesa
    req.on('close', () => {
      
      if (404 == respServicio.codeStatus) {
        respuesta = JSON.parse('{"errors":[{"message": "Recurso no existe"}]}');
        respServicio.respuesta = respuesta;
      } else if  (401 == respServicio.codeStatus) {
        respuesta = JSON.parse('{"errors":[{"message": "No Autorizado"}]}');
        respServicio.respuesta = respuesta;  
      } else {
        respuesta = JSON.parse(respuesta);
        respServicio.respuesta = respuesta;
      }
      
      resolve(respServicio);
      
      
    });

    req.end();
    
  });
}
exports.consultaDeudasRolTotal = consultaDeudasRolTotal;

function consultaDeudasRutTotal(token, rut,sistema,grupo) {

  return new Promise((resolve, reject) => {
    
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };
    let respuesta = '';
  
    var regex = /[^0-9]/g;
    var myArray2 = regex.exec(rut);
    
    if(myArray2 != null){
        respuesta = JSON.parse('{"errors":[{"message": "Error de validación. Párametro [rut] debe ser numérico."}]}');
        respServicio.codeStatus = 400;
       return resolve(respServicio);
       
    }
    
    if (sistema == null){
        respuesta = JSON.parse('{"errors":[{"message": "Error de validación. Párametro [sistema] no puede ser nulo."}]}');
        respServicio.respuesta = respuesta;
        respServicio.codeStatus = 400;
        return resolve(respServicio);
    }
    
    if (grupo == null){
        respuesta = JSON.parse('{"errors":[{"message": "Error de validación. Párametro [grupo] no puede ser nulo."}]}');
        respServicio.respuesta = respuesta;
        respServicio.codeStatus = 400;
         return resolve(respServicio);
    }
 
    //opciones para poder realizar la conexion al servicio
    let options = {
      hostname: host,
      port: 443,
      path: '/servicios-recaudacion/v1/liquidacion/deudasrut?rut='+ rut+'&sistema='+sistema+'&grupo='+grupo,
      method: 'GET',
      rejectUnauthorized: false,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    
    //Declaracion de variables y realizacion del request
    
    let req = https.request(options, (res) => {
      
      respServicio.codeStatus = res.statusCode;

      //guardado de dato obtenidos en respuesta
      res.on('data', (d) => {
        respuesta += d;

      });

    }).on('error', (error) => {
      console.error("Error: "+error);
      reject(error);
    });

    //terminado el request parsear la respuesta y entra al primer if donde lo devuelve a la promesa
    req.on('close', () => {
      
      if (404 == respServicio.codeStatus) {
        respuesta = JSON.parse('{"errors":[{"message": "Recurso no existe"}]}');
        respServicio.respuesta = respuesta;
      } else if  (401 == respServicio.codeStatus) {
        respuesta = JSON.parse('{"errors":[{"message": "No Autorizado"}]}');
        respServicio.respuesta = respuesta;
      } else {
        respuesta = JSON.parse(respuesta);
        respServicio.respuesta = respuesta;
      }
      
      resolve(respServicio);
      
      
    });

    req.end();
    
  });
}
exports.consultaDeudasRutTotal = consultaDeudasRutTotal;


function ingresaMultiAr(token, json) {

  return new Promise((resolve, reject) => {
    
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };
    let respuesta = '';
    

    //opciones para poder realizar la conexion al servicio
    let options = {
      hostname: host,
      port: 443,
      path: '/servicios-recaudacion/v1/liquidacion/ingresamultiar',
      method: 'POST',
      rejectUnauthorized: false,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    
    //Declaracion de variables y realizacion del request
    let req = https.request(options, (res) => {
      
      respServicio.codeStatus = res.statusCode;

      //guardado de dato obtenidos en respuesta
      res.on('data', (d) => {
        respuesta += d;

      });

    }).on('error', (error) => {
      console.error("Error: "+error);
      reject(error);
    });

    //terminado el request parsear la respuesta y entra al primer if donde lo devuelve a la promesa
    req.on('close', () => {
      
      if (404 == respServicio.codeStatus) {
        respuesta = JSON.parse('{"errors":[{"message": "Recurso no existe"}]}');
        respServicio.respuesta = respuesta;
      } else if  (401 == respServicio.codeStatus) {
        respuesta = JSON.parse('{"errors":[{"message": "No Autorizado"}]}');
        respServicio.respuesta = respuesta;  
      } else {
        respuesta = JSON.parse(respuesta);
        respServicio.respuesta = respuesta;
      }
      
      resolve(respServicio);
      
      
    });
    
    //req.write(JSON.stringify(json));
    req.write(json);
    req.end();
    
  });
}
exports.ingresaMultiAr = ingresaMultiAr;