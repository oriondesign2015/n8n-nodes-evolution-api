import {
    IExecuteFunctions,
    IRequestOptions,
    IHttpRequestMethods,
    NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function updatePrivacySettings(ef: IExecuteFunctions) {
    try {
        const instanceName = ef.getNodeParameter('instanceName', 0) as string;
        const readreceipts = ef.getNodeParameter('readreceipts', 0) as string;
        const profile = ef.getNodeParameter('profile', 0) as string;
        const status = ef.getNodeParameter('status', 0) as string;
        const online = ef.getNodeParameter('online', 0) as string;
        const last = ef.getNodeParameter('last', 0) as string;
        const groupadd = ef.getNodeParameter('groupadd', 0) as string;

        const body = {
            readreceipts,
            profile,
            status,
            online,
            last,
            groupadd,
        };

        const requestOptions: IRequestOptions = {
            method: 'POST' as IHttpRequestMethods,
            uri: `/chat/updatePrivacySettings/${instanceName}`,
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
                details: 'Erro ao atualizar configurações de privacidade',
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
