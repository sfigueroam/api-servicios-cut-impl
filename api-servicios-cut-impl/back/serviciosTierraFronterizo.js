const http = require('http')
const https = require('https')
const genToken = require('./genToken');
const host=process.env.HOST;


function consultaFechaActual(token) {

  return new Promise((resolve, reject) => {

    //opciones para poder realizar la conexion al servicio

    let options = {
      hostname: host,
      port: 443,
      path: '/liquida-deudas-frontera/v1/fechas/actual', //PARAMETRIZAR v1
      method: 'GET',
      rejectUnauthorized: false,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    //Declaracion de variables y realizacion del request
    let respuesta = '';
    let estadoHttp = '';
    let req = https.request(options, (res) => {

      estadoHttp = res.statusCode;
      //guardado de dato obtenidos en respuesta
      res.on('data', (d) => {
        respuesta += d;
      });


    }).on('error', (error) => {
      console.error(error);
      reject(error);
    });

    //terminado el request parsear la respuesta y entra al primer if donde lo devuelve a la promesa
    req.on('close', () => {

      if (estadoHttp == "200") {
        respuesta = JSON.parse(respuesta);
        resolve(respuesta);
      }
      // de lo contrario maneja errores
      else {
        let errores = null;

        if (estadoHttp == "500")
          errores = {
            error: 'Error Interno al consultar el estado del tramite'
          };

        if (estadoHttp == "404")
          errores = {
            error: 'Recurso no existe'
          };

        if (estadoHttp == "401")
          errores = {
            error: 'token'
          };

        if (estadoHttp == "400")
          errores = {
            error: 'Solicitud incorrecta'
          };

        resolve(errores);

      }
    });

    req.end();
  });
}

function liquidaDeudasFolio(token, folio) {

  return new Promise((resolve, reject) => {
    
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };
    let respuesta = '';
  
    var regex = /[^0-9]/g;
    var myArray2 = regex.exec(folio);
    
    if(myArray2 != null){
        respuesta = JSON.parse('{"errors":[{"message": "Error de validación. Párametro [folio] debe ser numérico."}]}');
        respServicio.respuesta = respuesta;
        respServicio.codeStatus = 400;
        resolve(respServicio);
    }
        
    if(folio.length > 12){
        respuesta = JSON.parse('{"errors":[{"message": "Error de validación. Párametro [folio] tiene rango maximo de 12."}]}');
        respServicio.respuesta = respuesta;
        respServicio.codeStatus = 400;
        resolve(respServicio);
    }

    //opciones para poder realizar la conexion al servicio
    let options = {
      hostname: host,
      port: 443,
      path: '/liquida-deudas-frontera/v1/deudas/' + folio, //PARAMETRIZAR v1
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
      } else {
        respuesta = JSON.parse(respuesta);
        respServicio.respuesta = respuesta;
      }
      
      resolve(respServicio);
      
    });

    req.end();
    
  });
}

function liquidaDePasaporte(token, pasaporte, folio) {

  return new Promise((resolve, reject) => {
    
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };
    let respuesta = '';
   
    var regex = /[^0-9]/g;
    var myArray2 = regex.exec(folio);
    var regexPasaporte = /[^a-z|A-Z|0-9]/g;
   
    if(myArray2 != null){
        respuesta = JSON.parse('{"errors":[{"message": "Error de validación. Párametro [folio] debe ser numérico."}]}');
        respServicio.respuesta = respuesta;
        respServicio.codeStatus = 400;
        resolve(respServicio);
    }
        
    if(folio.toString().length > 12){
        respuesta = JSON.parse('{"errors":[{"message": "Error de validación. Párametro [folio] tiene rango maximo de 12."}]}');
        respServicio.respuesta = respuesta;
        respServicio.codeStatus = 400;
        resolve(respServicio);
    }

    //opciones para poder realizar la conexion al servicio
    let options = {
      hostname: host,
      port: 443,
      path: '/liquida-deudas-frontera/v1/deudas/contribuyentes/'+pasaporte+'/?folio='+folio, //PARAMETRIZAR v1
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
      } else {
        respuesta = JSON.parse(respuesta);
        respServicio.respuesta = respuesta;
      }
      
      console.log(respServicio.codeStatus);
      console.log(respServicio.respuesta);
      
      resolve(respServicio);
      
    });

    req.end();
    
  });
}

exports.consultaFechaActual = consultaFechaActual;
exports.liquidaDeudasFolio = liquidaDeudasFolio;
exports.liquidaDePasaporte = liquidaDePasaporte;