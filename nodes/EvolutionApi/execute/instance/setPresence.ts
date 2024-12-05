import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';
import { evolutionRequest } from '../chatwootRequest';

export async function setPresence(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const presence = ef.getNodeParameter('presence', 0);

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		headers: {
			'Content-Type': 'application/json',
		},
		uri: `/instance/setPresence/${instanceName}`,
		body: {
			presence: presence,
		},
		json: true,
	};

	return await evolutionRequest(ef, options);
}
