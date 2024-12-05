import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';
import { chatwootRequest } from '../chatwootRequest';

export async function setWebhook(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const resourceForWebhook = ef.getNodeParameter('resourceForWebhook', 0);

	let options: IRequestOptions; // Declare a variável antes de usá-la

	if (resourceForWebhook === 'setWebhook') {
		// Configurações do Webhook
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
		throw new NodeApiError(ef.getNode(), {
			message: 'Operação de webhook não reconhecida.',
			description: 'A operação solicitada não é válida para o recurso de webhook.',
		});
	}
	return await chatwootRequest(ef, options);
}
