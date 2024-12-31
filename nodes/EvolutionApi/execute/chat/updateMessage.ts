import {
    IExecuteFunctions,
    IRequestOptions,
    IHttpRequestMethods,
    NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function updateMessage(ef: IExecuteFunctions) {
    try {
        const instanceName = ef.getNodeParameter('instanceName', 0) as string;
        const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
        const messageId = ef.getNodeParameter('messageId', 0) as string;
        const text = ef.getNodeParameter('text', 0) as string;

        const body = {
            number: remoteJid,
            key: {
                remoteJid,
                fromMe: true,
                id: messageId,
            },
            text,
        };

        const requestOptions: IRequestOptions = {
            method: 'POST' as IHttpRequestMethods,
            uri: `/chat/updateMessage/${instanceName}`,
            body,
            json: true,
        };

        const response = await evolutionRequest(ef, requestOptions);
        return {
            json: {
                success: true,
                data: response,
            },
        };
    } catch (error) {
        const errorData = {
            success: false,
            error: {
                message: error.message,
                details: 'Erro ao editar mensagem',
                code: error.code || 'UNKNOWN_ERROR',
                timestamp: new Date().toISOString(),
            },
        };

        if (!ef.continueOnFail()) {
            throw new NodeOperationError(ef.getNode(), error.message, {
                message: errorData.error.message,
                description: errorData.error.details,
            });
        }

        return {
            json: errorData,
            error: errorData,
        };
    }
}
