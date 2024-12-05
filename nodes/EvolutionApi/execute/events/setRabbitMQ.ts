import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function setRabbitMQ(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const resourceForRabbitMQ = ef.getNodeParameter('resourceForRabbitMQ', 0);

	let options: IRequestOptions; // Declare a variável antes de usá-la

	if (resourceForRabbitMQ === 'setRabbitMQ') {
		// Configurações do RabbitMQ
		const enabled = ef.getNodeParameter('enabled', 0);
		const rabbitMQEvents = ef.getNodeParameter('rabbitMQEvents', 0) || [];

		const body = {
			rabbitmq: {
				enabled: enabled,
				events: rabbitMQEvents,
			},
		};

		options = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/rabbitmq/set/${instanceName}`,
			body,
			json: true,
		};
	} else if (resourceForRabbitMQ === 'findRabbitMQ') {
		options = {
			method: 'GET' as IHttpRequestMethods,
			uri: `/rabbitmq/find/${instanceName}`,
			json: true,
		};
	} else {
		throw new NodeApiError(ef.getNode(), {
			message: 'Operação de RabbitMQ não reconhecida.',
			description: 'A operação solicitada não é válida para o recurso de RabbitMQ.',
		});
	}

	return await evolutionRequest(ef, options);
}
