import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';

export async function evolutionRequest(ef: IExecuteFunctions, options: IRequestOptions) {
	const credentials = await ef.getCredentials('evolutionApi');
	const serverUrl = credentials['server-url'];
	const apiKey = credentials.apikey;

	const requestOptions: IRequestOptions = {
		...options,
		headers: {
			apikey: apiKey,
			...(options.headers || {}),
		},
		uri: `${serverUrl}${options.uri}`,
	};

	return await ef.helpers.request(requestOptions);
}
