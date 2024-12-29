import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendStories(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const type = ef.getNodeParameter('type', 0);
	const content = ef.getNodeParameter('content', 0);
	const caption = ef.getNodeParameter('caption', 0);
	const backgroundColor = ef.getNodeParameter('backgroundColor', 0);
	const font = ef.getNodeParameter('font', 0);
	const allContacts = ef.getNodeParameter('allContacts', 0) as boolean;
	const statusJidListStr = ef.getNodeParameter('statusJidList', 0, '') as string;

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
			allContacts: allContacts,
		},
		json: true,
	};

	if (!allContacts && statusJidListStr) {
		const statusJidList = statusJidListStr
			.split(',')
			.map(num => num.trim())
			.map(num => num.includes('@s.whatsapp.net') ? num : `${num}@s.whatsapp.net`);

		options.body.statusJidList = statusJidList;
	}

	return await evolutionRequest(ef, options);
}
