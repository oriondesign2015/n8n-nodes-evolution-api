import {
    IExecuteFunctions,
    IRequestOptions,
    IHttpRequestMethods,
    NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function blockContact(ef: IExecuteFunctions) {
    try {
        const instanceName = ef.getNodeParameter('instanceName', 0) as string;
        const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
        const status = ef.getNodeParameter('status', 0) as string;

        const body = {
            number: remoteJid,
            status,
        };

        const requestOptions: IRequestOptions = {
            method: 'POST' as IHttpRequestMethods,
            uri: `/chat/updateBlockStatus/${instanceName}`,
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
                details: 'Erro ao gerenciar bloqueio do contato',
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
