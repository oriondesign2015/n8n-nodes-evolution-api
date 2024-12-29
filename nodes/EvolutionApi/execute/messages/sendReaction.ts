import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendReaction(ef: IExecuteFunctions) {
    try {
        const instanceName = ef.getNodeParameter('instanceName', 0) as string;
        const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
        const messageId = ef.getNodeParameter('messageId', 0) as string;
        const fromMe = ef.getNodeParameter('fromMe', 0) as boolean;
        const reaction = ef.getNodeParameter('reaction', 0) as string;

        const body: any = {
            key: {
                remoteJid,
                fromMe,
                id: messageId,
            },
            reaction,
        };

        const requestOptions: IRequestOptions = {
            method: 'POST' as IHttpRequestMethods,
            headers: {
                'Content-Type': 'application/json',
            },
            uri: `/message/sendReaction/${instanceName}`,
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
