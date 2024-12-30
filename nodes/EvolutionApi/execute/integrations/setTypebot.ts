import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function setTypebot(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const resourceForTypebot = ef.getNodeParameter('resourceForTypebot', 0);

		let options: IRequestOptions;

		if (resourceForTypebot === 'createTypebot') {
			const apiKey = ef.getNodeParameter('apiKey', 0) as string;
			const url = ef.getNodeParameter('url', 0) as string;
			const enabled = ef.getNodeParameter('enabled', 0) as boolean;
			const expire = ef.getNodeParameter('expire', 0) as boolean;
			const keyExpiration = ef.getNodeParameter('keyExpiration', 0) as string;

			const body = {
				apiKey,
				url,
				enabled,
				expire,
				keyExpiration,
			};

			options = {
				method: 'POST' as IHttpRequestMethods,
				uri: `/typebot/set/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForTypebot === 'findTypebot') {
			const typebotId = ef.getNodeParameter('typebotId', 0) as string;

			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/typebot/find/${typebotId}/${instanceName}`,
				json: true,
			};
		} else if (resourceForTypebot === 'updateTypebot') {
			const typebotId = ef.getNodeParameter('typebotId', 0) as string;
			const apiKey = ef.getNodeParameter('apiKey', 0) as string;
			const url = ef.getNodeParameter('url', 0) as string;
			const enabled = ef.getNodeParameter('enabled', 0) as boolean;
			const expire = ef.getNodeParameter('expire', 0) as boolean;
			const keyExpiration = ef.getNodeParameter('keyExpiration', 0) as string;

			const body = {
				apiKey,
				url,
				enabled,
				expire,
				keyExpiration,
			};

			options = {
				method: 'PUT' as IHttpRequestMethods,
				uri: `/typebot/update/${typebotId}/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForTypebot === 'deleteTypebot') {
			const typebotId = ef.getNodeParameter('typebotId', 0) as string;

			options = {
				method: 'DELETE' as IHttpRequestMethods,
				uri: `/typebot/delete/${typebotId}/${instanceName}`,
				json: true,
			};
		} else {
			const errorData = {
				success: false,
				error: {
					message: 'Operação do Typebot não reconhecida',
					details: 'A operação solicitada não é válida para o recurso do Typebot',
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
					: 'Erro ao configurar Typebot',
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
