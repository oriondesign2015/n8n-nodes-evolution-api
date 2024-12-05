import { evolutionRequest } from '../chatwootRequest';
import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';

export async function sendText(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const remoteJid = ef.getNodeParameter('remoteJid', 0);
	const messageText = ef.getNodeParameter('messageText', 0);
	const mentionsEveryOne = ef.getNodeParameter('mentionsEveryOne', 0);

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		headers: {
			'Content-Type': 'application/json',
		},
		uri: `/message/sendText/${instanceName}`,
		body: {
			number: remoteJid,
			text: messageText,
			mentionsEveryOne: mentionsEveryOne,
		},
		json: true,
	};

	return await evolutionRequest(ef, options);
}
