'use strict';
const http = require('http');
const https = require('https');
const querystring = require('querystring');
const host=process.env.HOST;



function obtenerToken (clienteId,scope,clientSecret,grantType) {
    return new Promise((resolve, reject) => {

        let data = {
            "grant_type": grantType,
            "client_secret": clientSecret,
            "client_id": clienteId,
            "scope": scope
        };

        let postData = querystring.stringify(data);

        let options = {
            hostname: host,
            port: 443,
            path: '/TokenRest/',
            method: 'POST',
            rejectUnauthorized: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        
        //hace un request y guarda los datos obtenidos en respuesta
        
        let respuesta = '';
        let token = null;
        let req = https.request(options, (res) => {
            
            res.on('data', (d) => {
                respuesta+=d;
            });
        });
        req.write(postData);
        req.on('error', (e) => {
            console.error(e);
            resolve(e);
        });
        //terminado el request y el token obtenido lo parsea a un objeto js
        req.on('close', () => {
            try{
                if(JSON.parse(respuesta).access_token!=null)
                    token= JSON.parse(respuesta).access_token;
                
            }catch (error){
                console.log("error al generar token :"+error);
                console.log("clientId:"+clienteId,"scope:"+scope);
            }
            
            //terminado de parsear el Json lo devuelve en el resolve de la promesa
            resolve(token);
        });
        req.end();
    });
    
}


exports.obtenerToken=obtenerToken;