import {
    IExecuteFunctions,
    IRequestOptions,
    IHttpRequestMethods,
    NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendPresence(ef: IExecuteFunctions) {
    try {
        const instanceName = ef.getNodeParameter('instanceName', 0) as string;
        const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
        const presence = ef.getNodeParameter('presence', 0) as string;
        const delay = ef.getNodeParameter('delay', 0) as number;

        const body = {
            number: remoteJid,
            presence,
            delay,
        };

        const requestOptions: IRequestOptions = {
            method: 'POST' as IHttpRequestMethods,
            uri: `/chat/sendPresence/${instanceName}`,
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
                details: 'Erro ao enviar presença',
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
