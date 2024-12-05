import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendStories(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const type = ef.getNodeParameter('type', 0);
	const content = ef.getNodeParameter('content', 0);
	const caption = ef.getNodeParameter('caption', 0);
	const backgroundColor = ef.getNodeParameter('backgroundColor', 0);
	const font = ef.getNodeParameter('font', 0);

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		headers: {
			'Content-Type': 'application/json',
		},
		uri: `/message/sendStatus/${instanceName}`,
		body: {
			type: type,
			content: content,
			caption: caption,
			backgroundColor: backgroundColor,
			font: font,
			allContacts: true,
		},
		json: true,
	};

	return await evolutionRequest(ef, options);
}
