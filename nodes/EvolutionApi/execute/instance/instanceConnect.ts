import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';
import { evolutionRequest } from '../chatwootRequest';

export async function instanceConnect(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);

	const options: IRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		uri: `/instance/connect/${instanceName}`,
		json: true,
	};

	return await evolutionRequest(ef, options);
}
