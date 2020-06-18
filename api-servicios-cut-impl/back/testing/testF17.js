process.env.BUILD_WST_GRANT_TYPE_LIQ_FRONT = "client_credentials";
process.env.BUILD_WST_CLIENT_SECRET_LIQ_FRONT = "TGR.D3uUd!1"; 
process.env.BUILD_WST_CLIENT_ID_LIQ_FRONT = "OauthRcConsultaDeudaFronterizoTgrClient";
process.env.BUILD_WST_SCOPE_LIQ_FRONT = "/liquida-deudas-frontera/v1/*";
process.env.BUILD_WST_HOST = "wstest.tesoreria.cl";


const clase = require('../liquidaDeudasPasaporte');

let event = {"pathParameters": {"pasaporte":"P454P0RT3"} , "queryStringParameters" : {"folio" : 3150561978002}};

clase.liquidaDeudasPasaporte(event, null, ()=>{ console.log("fin")});
