import {
    IExecuteFunctions,
    IRequestOptions,
    IHttpRequestMethods,
    NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function getMediaBase64(ef: IExecuteFunctions) {
    try {
        const instanceName = ef.getNodeParameter('instanceName', 0) as string;
        const messageId = ef.getNodeParameter('messageId', 0) as string;
        const convertToMp4 = ef.getNodeParameter('convertToMp4', 0) as boolean;

        const body = {
            message: {
                key: {
                    id: messageId,
                },
            },
            convertToMp4,
        };

        const requestOptions: IRequestOptions = {
            method: 'POST' as IHttpRequestMethods,
            uri: `/chat/getBase64FromMediaMessage/${instanceName}`,
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
                details: 'Erro ao obter mídia em Base64',
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
