import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function setEvolutionBot(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const resourceForEvolutionBot = ef.getNodeParameter('resourceForEvolutionBot', 0);

		let options: IRequestOptions;

		if (resourceForEvolutionBot === 'createEvolutionBot') {
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
				uri: `/evolutionai/set/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForEvolutionBot === 'findEvolutionBot') {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/evolutionai/find/${instanceName}`,
				json: true,
			};
		} else if (resourceForEvolutionBot === 'deleteEvolutionBot') {
			options = {
				method: 'DELETE' as IHttpRequestMethods,
				uri: `/evolutionai/delete/${instanceName}`,
				json: true,
			};
		} else {
			const errorData = {
				success: false,
				error: {
					message: 'Operação do Evolution Bot não reconhecida',
					details: 'A operação solicitada não é válida para o recurso do Evolution Bot',
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
					: 'Erro ao configurar Evolution Bot',
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
