import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendPix(ef: IExecuteFunctions) {
    try {
        const instanceName = ef.getNodeParameter('instanceName', 0) as string;
        const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
        const name = ef.getNodeParameter('name', 0) as string;
        const keyType = ef.getNodeParameter('keyType', 0) as string;
        const key = ef.getNodeParameter('key', 0) as string;

        const body: any = {
            number: remoteJid,
            buttons: [
                {
                    type: 'pix',
                    currency: 'BRL',
                    name,
                    keyType,
                    key,
                },
            ],
        };

        const requestOptions: IRequestOptions = {
            method: 'POST' as IHttpRequestMethods,
            headers: {
                'Content-Type': 'application/json',
            },
            uri: `/message/sendButtons/${instanceName}`,
            body,
            json: true,
        };

        return await evolutionRequest(ef, requestOptions);
    } catch (error) {
        if (error.message.includes('Could not get parameter')) {
            throw new NodeApiError(ef.getNode(), {
                message: 'Parâmetros inválidos ou ausentes',
                description: 'Verifique se todos os campos obrigatórios foram preenchidos corretamente',
            });
        }
        throw new NodeApiError(ef.getNode(), error);
    }
}
