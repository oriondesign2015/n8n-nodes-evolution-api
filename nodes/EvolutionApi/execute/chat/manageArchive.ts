import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function manageArchive(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const chat = ef.getNodeParameter('chat', 0) as string;
		const archive = ef.getNodeParameter('archive', 0) as boolean;
		const fromMe = ef.getNodeParameter('fromMe', 0) as boolean;
		const messageId = ef.getNodeParameter('messageId', 0) as string;

		const body = {
			lastMessage: {
				key: {
					remoteJid: chat,
					fromMe,
					id: messageId
				}
			},
			chat,
			archive,
		};

		const requestOptions: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/chat/archiveChat/${instanceName}`,
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
				details: 'Erro ao gerenciar arquivo da conversa',
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
