import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';
import { chatwootRequest } from '../chatwootRequest';

export async function restartInstance(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		uri: `/instance/restart/${instanceName}`,
		json: true,
	};

	return await chatwootRequest(ef, options);
}
