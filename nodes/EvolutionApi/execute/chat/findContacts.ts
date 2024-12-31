import {
    IExecuteFunctions,
    IRequestOptions,
    IHttpRequestMethods,
    NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function findContacts(ef: IExecuteFunctions) {
    try {
        const instanceName = ef.getNodeParameter('instanceName', 0) as string;
        const listAll = ef.getNodeParameter('listAll', 0) as boolean;

        let body = {};

        if (!listAll) {
            const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
            body = {
                where: {
                    id: remoteJid.includes('@') ? remoteJid : `${remoteJid}@s.whatsapp.net`,
                },
            };
        }

        const requestOptions: IRequestOptions = {
            method: 'POST' as IHttpRequestMethods,
            uri: `/chat/findContacts/${instanceName}`,
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
                details: 'Erro ao buscar contatos',
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
