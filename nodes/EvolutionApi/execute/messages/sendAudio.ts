import { evolutionRequest } from '../evolutionRequest';
import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';

export async function sendAudio(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const remoteJid = ef.getNodeParameter('remoteJid', 0);
	const media = ef.getNodeParameter('media', 0);
	const mentionsEveryOne = ef.getNodeParameter('mentionsEveryOne', 0);

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		headers: {
			'Content-Type': 'application/json',
		},
		uri: `/message/sendWhatsAppAudio/${instanceName}`,
		body: {
			number: remoteJid,
			audio: media,
			mentionsEveryOne: mentionsEveryOne,
		},
		json: true,
	};

	return await evolutionRequest(ef, options);
}
