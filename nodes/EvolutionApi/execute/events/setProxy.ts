import {
		IExecuteFunctions,
		IRequestOptions,
		IHttpRequestMethods,
		NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function setProxy(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const enabled = ef.getNodeParameter('enabled', 0) || '';
		const proxyHost = ef.getNodeParameter('proxyHost', 0) || '1234';
		const proxyPort = ef.getNodeParameter('proxyPort', 0) || '';
		const proxyProtocol = ef.getNodeParameter('proxyProtocol', 0) || '';
		const proxyUsername = ef.getNodeParameter('proxyUsername', 0) || '';
		const proxyPassword = ef.getNodeParameter('proxyPassword', 0) || '';

		const body = {
			enabled: enabled,
			host: proxyHost,
			port: proxyPort,
			protocol: proxyProtocol,
			username: proxyUsername,
			password: proxyPassword,
		};

		const options: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/proxy/set/${instanceName}`,
			body,
			json: true,
		};

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
					: 'Erro ao configurar proxy',
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
