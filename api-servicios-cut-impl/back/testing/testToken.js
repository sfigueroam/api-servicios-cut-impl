var request = require('request');

//https://wstest.tesoreria.cl:443/TokenRest/

var options = {
  'method': 'POST',
  'url': 'https://ws.tesoreria.cl/TokenRest/',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'grant_type': 'client_credentials',
    'scope': '/monex/v1*',
    'client_id': 'OauthRcConsultaCutMonexRSClient',
    'client_secret': 'TGR.C87m0N3!'
  }
};

var t0 = new Date().getTime(); //Tiempo Inicial

request(options, function (error, response) { 
  var t1 = new Date().getTime(); //Tiempo Inicial Final
  console.log("Call to TokenRest: " + (t1 - t0) + " milliseconds.") //Imprime T1-T0
  console.log(response.body);
});