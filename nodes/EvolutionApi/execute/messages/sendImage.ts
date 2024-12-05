import { evolutionRequest } from '../evolutionRequest';
import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';

export async function sendImage(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const remoteJid = ef.getNodeParameter('remoteJid', 0);
	const media = ef.getNodeParameter('media', 0);
	// const mimetype = this.getNodeParameter('mimetype', 0);
	const caption = ef.getNodeParameter('caption', 0);
	// const fileName = this.getNodeParameter('fileName', 0);
	const mentionsEveryOne = ef.getNodeParameter('mentionsEveryOne', 0);

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		headers: {
			'Content-Type': 'application/json',
		},
		uri: `/message/sendMedia/${instanceName}`,
		body: {
			number: remoteJid,
			mediatype: 'image',
			media: media,
			mimetype: '',
			caption: caption,
			fileName: '',
			mentionsEveryOne: mentionsEveryOne,
		},
		json: true,
	};

	return await evolutionRequest(ef, options);
}
