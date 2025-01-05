import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function setWebhook(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const resourceForWebhook = ef.getNodeParameter('resourceForWebhook', 0);

		let options: IRequestOptions;

		if (resourceForWebhook === 'setWebhook') {
			const enabled = ef.getNodeParameter('enabled', 0);
			const webhookUrl = ef.getNodeParameter('webhookUrl', 0) || 'vazio';
			const webhookByEvents = ef.getNodeParameter('webhookByEvents', 0);
			const webhookBase64 = ef.getNodeParameter('webhookBase64', 0);
			const webhookEvents = ef.getNodeParameter('webhookEvents', 0) || [];

			const body = {
				webhook: {
					enabled: enabled,
					url: webhookUrl,
					webhookByEvents,
					webhookBase64,
					events: webhookEvents,
				},
			};

			options = {
				method: 'POST' as IHttpRequestMethods,
				uri: `/webhook/set/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForWebhook === 'findWebhook') {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/webhook/find/${instanceName}`,
				json: true,
			};
		} else {
			const errorData = {
				success: false,
				error: {
					message: 'Operação de webhook não reconhecida',
					details: 'A operação solicitada não é válida para o recurso de webhook',
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
					: 'Erro ao configurar webhook',
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
