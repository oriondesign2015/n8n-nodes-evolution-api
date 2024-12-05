import { chatwootRequest } from '../chatwootRequest';
import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';

export async function fetchInstances(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);

	const options: IRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		uri: `/instance/fetchInstances${instanceName ? `?instanceName=${instanceName}` : ''}`,
		json: true,
	};

	return await chatwootRequest(ef, options);
}
