import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const envrend = async (event) => {
  

    const { dataCliente, dataArchivo, carta, monto, cantidad, nomina, archivoProd } = JSON.parse(event.body);
    
     const pk = v4();  
  
    const item = {
        pk,
        dataCliente,
        dataArchivo,
        carta,
        monto,
        cantidad,
        nomina,
        archivoProd,

      };

const  validateItem = () => {
    if (item.carta == null) {
      return "Carta es requerido";
    }
    return true;
   }

  if (validateItem() == true) {
    
        const response = {
        
          statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin':'*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
          
          
          message: "Secuencia: '2131238123982', Retorno: '13212389123912837'  MsgErrores: 'ninguno' ",
      }, null, 2),
      };
      return response;
  }  else {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al procesar la solicitud"
      }),
    };
  }
}
export { envrend };