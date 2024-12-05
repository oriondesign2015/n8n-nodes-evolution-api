import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';
import { chatwootRequest } from '../chatwootRequest';

export async function deleteInstance(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);

	const options: IRequestOptions = {
		method: 'DELETE' as IHttpRequestMethods,
		uri: `/instance/delete/${instanceName}`,
		json: true,
	};

	return await chatwootRequest(ef, options);
}
