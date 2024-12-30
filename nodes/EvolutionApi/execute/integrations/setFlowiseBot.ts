import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function setFlowiseBot(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const resourceForFlowiseBot = ef.getNodeParameter('resourceForFlowiseBot', 0);

		let options: IRequestOptions;

		if (resourceForFlowiseBot === 'createFlowise') {
			const apiKey = ef.getNodeParameter('apiKey', 0) as string;
			const url = ef.getNodeParameter('url', 0) as string;
			const enabled = ef.getNodeParameter('enabled', 0) as boolean;

			const body = {
				apiKey,
				url,
				enabled,
			};

			options = {
				method: 'POST' as IHttpRequestMethods,
				uri: `/flowise/set/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForFlowiseBot === 'findFlowise') {
			const flowiseBotId = ef.getNodeParameter('flowiseBotId', 0) as string;

			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/flowise/find/${flowiseBotId}/${instanceName}`,
				json: true,
			};
		} else if (resourceForFlowiseBot === 'updateFlowise') {
			const flowiseBotId = ef.getNodeParameter('flowiseBotId', 0) as string;
			const apiKey = ef.getNodeParameter('apiKey', 0) as string;
			const url = ef.getNodeParameter('url', 0) as string;
			const enabled = ef.getNodeParameter('enabled', 0) as boolean;

			const body = {
				apiKey,
				url,
				enabled,
			};

			options = {
				method: 'PUT' as IHttpRequestMethods,
				uri: `/flowise/update/${flowiseBotId}/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForFlowiseBot === 'deleteFlowise') {
			const flowiseBotId = ef.getNodeParameter('flowiseBotId', 0) as string;

			options = {
				method: 'DELETE' as IHttpRequestMethods,
				uri: `/flowise/delete/${flowiseBotId}/${instanceName}`,
				json: true,
			};
		} else if (resourceForFlowiseBot === 'fetchSessionsFlowise') {
			const flowiseBotId = ef.getNodeParameter('flowiseBotId', 0) as string;

			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/flowise/fetchSessions/${flowiseBotId}/${instanceName}`,
				json: true,
			};
		} else if (resourceForFlowiseBot === 'changeStatusFlowise') {
			const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
			const status = ef.getNodeParameter('status', 0) as string;

			options = {
				method: 'POST' as IHttpRequestMethods,
				uri: `/flowise/changeStatus/${instanceName}`,
				body: {
					remoteJid,
					status,
				},
				json: true,
			};
		} else {
			const errorData = {
				success: false,
				error: {
					message: 'Operação do Flowise não reconhecida',
					details: 'A operação solicitada não é válida para o recurso do Flowise',
					code: 'INVALID_OPERATION',
					timestamp: new Date().toISOString(),
				},
			};
			throw new NodeOperationError(ef.getNode(), errorData.error.message, {
				message: errorData.error.message,
				description: errorData.error.details,
			});
		}

		const response = await evolutionRequest(ef, options);
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
				message: error.message.includes('Could not get parameter')
					? 'Parâmetros inválidos ou ausentes'
					: 'Erro ao configurar Flowise',
				details: error.message.includes('Could not get parameter')
					? 'Verifique se todos os campos obrigatórios foram preenchidos corretamente'
					: error.message,
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
