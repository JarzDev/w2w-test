import { dynamodb } from '../aws/dynamodb.mjs';

const TABLE_NAME = `tgr-${process.env.ENV}-api-gestor-medios-pago-bitacora`;

const binnacle = {

    insertBinnacle: async (responses) => {
        const promises = [];
        responses.map(ordenPago => {
            const item2save = ordenPago.payload.error ? insertRejectEvent(ordenPago) : insertReceiptEvent(ordenPago);
            console.log(JSON.stringify({item2save}));
            promises.push(dynamodb.insertRecord(TABLE_NAME, item2save));
        });
    
        await Promise.all(promises);
    },

    insertRecord: async ( record ) => {
        console.log({record});
        const insert = await dynamodb.insertRecord(TABLE_NAME, record);
        return insert;
    },

    updateRecord: async ({transactionId, estado}) => {
        const params = {
            tableName: TABLE_NAME,
            key: { pk: transactionId },
            updateExpression: `set estado = :estado`,
            expressionValues: { ':estado': estado }
    
        };
        console.log(params)
        const updated = await dynamodb.updateRecord(params);
        return updated;
    }

}

const baseParams = (ordenPago) => {
    const { conceptoPago } = ordenPago.id;
    const { cuentaDeposito, direccionCheque } = ordenPago.receptor;
    const { fechaPago, medioPago, tipoProcesamiento } = ordenPago.pago;
    const [ yyyy, mm, dd ] = fechaPago.split('T')[0].split('-');
    const fechaPagoFormat = `${yyyy}#${mm}#${dd}`;
    return {
        PK: `${ordenPago.payload.transactionId}`,
        SK: `${fechaPagoFormat}#${medioPago}#${tipoProcesamiento}#${conceptoPago}`,
        fechaPago,
        conceptoPago,
        cuentaDeposito,
        direccionCheque,
        priorizacion: ``,
        fechaCreacion: new Date().toISOString()
    }
}

const insertReceiptEvent = (ordenPago) => {
    const base = baseParams(ordenPago);
    const estado = `RECEPCIONADA`;
    return {
        ...base,
        SK: `${base.SK}#${estado}`,
        estado,
        medioPago: ordenPago.pago.medioPago,
        tipoProcesamiento: ordenPago.pago.tipoProcesamiento,
    }
};

const insertRejectEvent = (ordenPago) => {
    const base = baseParams(ordenPago);
    const estado = `RECHAZADA`;
    return {
        ...base,
        SK: `${base.SK}#${estado}`,
        estado,
        motivo: `${ordenPago.payload.error}`,
    }
}

export { binnacle };
