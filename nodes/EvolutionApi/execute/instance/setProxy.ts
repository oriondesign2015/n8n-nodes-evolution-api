import { chatwootRequest } from '../chatwootRequest';
import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';

export async function setProxy(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const resourceForProxy = ef.getNodeParameter('resourceForProxy', 0);

	let options: IRequestOptions; // Declare a variável antes de usá-la

	if (resourceForProxy === 'setProxy') {
		// Configurações do Proxy
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

		options = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/proxy/set/${instanceName}`,
			body,
			json: true,
		};
	} else if (resourceForProxy === 'findProxy') {
		options = {
			method: 'GET' as IHttpRequestMethods,
			uri: `/proxy/find/${instanceName}`,
			json: true,
		};
	} else {
		throw new NodeApiError(ef.getNode(), {
			message: 'Operação de Proxy não reconhecida.',
			description: 'A operação solicitada não é válida para o recurso de Proxy.',
		});
	}

	return await chatwootRequest(ef, options);
}
