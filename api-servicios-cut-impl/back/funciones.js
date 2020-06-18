// const uuidv1 = require('uuid/v1');
function error(e, tipo){

	let resultadoFinal=null;
	var statusCod = 200;
	if(tipo=='minimos')
	{
		statusCod= 400;
	}
	
	else if(tipo=='token')
	{
		console.log('entre a este error de token');
		e = {
			errors: [{
            	message: "Token no Válido",
            	code : 500105,
            	// id: uuidv1()
			}]
		};
		statusCod= 500;
	}
	
	
	else if(tipo== 1)
	{
		e = {
			errors: [{
            	message: "Error Interno",
            	code : 500105,
            	// id: uuidv1()
			}]
		};
		statusCod= 500;
	}

	else if(tipo=='usuario')
	{
		e = {
			errors: [{
            	message: "Error en los datos ingresados"
			}]
		};
		statusCod= 400;
	}

	else if(tipo== 'No se procesa Transaccion. Campo Obligatorio Nulo')
	{
		
		e = {
			errors: [{
            	message: "No se procesa Transaccion. Campo Obligatorio Nulo"
			}]
		};
		statusCod= 400;
	}
	
	else if(tipo== 'No se encontraron Deudas')
	{
		
			e = {
			errors: [{
            	message: "No se encontraron deudas asociadas a estos datos"
			}]
			};
			statusCod= 404;
		
	}
	
		else if(tipo=='Solicitud incorrecta')
	{
		
	e = {
			errors: [{
            	message: "Error, revisa los datos y vuelve a intentarlo"
			}]
		};
		statusCod= 400;
		
	}
	
	else if(tipo== 'datapower')
	{
		e = {
			errors: [{
            	message: "Error de Datapower",
            	code : 500103,
            	// id: uuidv1()
			}]
		};
		statusCod= 500;
	}

	const response = {
		statusCode: statusCod,
		body: JSON.stringify(e),
		headers: {
			"Access-Control-Allow-Origin": "*", // Required for CORS support to work
			"Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}

	};
	//console.log('tgr-estado-tramite postFormulario','response');
	console.log(response);
	return response;

}



exports.error=error;
