import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function restartInstance(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		uri: `/instance/restart/${instanceName}`,
		json: true,
	};

	return await evolutionRequest(ef, options);
}
