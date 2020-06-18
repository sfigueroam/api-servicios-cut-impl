const https = require('https')
const genToken=require('./genToken');
const host=process.env.HOST;

function consultaCuentasMonex(token, parametros) {

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
      path: '/monex/v1/cuentasme?'+ parametros,
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
exports.consultaCuentasMonex = consultaCuentasMonex;

function consultaMovsMonex(token, parametros) {

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
      path: '/monex/v1/movimientosme?'+ parametros,
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
exports.consultaMovsMonex = consultaMovsMonex;

function consultaItemsMonex(token, parametros) {

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
      path: '/monex/v1/itemsme?'+ parametros,
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
exports.consultaItemsMonex = consultaItemsMonex;

function aplicaPagoCuentasMonex(token, json) {

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
      // path: '/servicios-recaudacion/v1/liquidacion/ingresamultiar',
      path: '/monex/v1/aplicapago',
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
exports.aplicaPagoCuentasMonex = aplicaPagoCuentasMonex;

function liquidaCuentasMonex(token, json) {

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
      // path: '/servicios-recaudacion/v1/liquidacion/ingresamultiar',
      path: '/monex-liquidacion/v1/liquidacuentas',
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
    
    req.write(JSON.stringify(json));
    // req.write(json);
    req.end();
    
  });
}
exports.liquidaCuentasMonex = liquidaCuentasMonex;