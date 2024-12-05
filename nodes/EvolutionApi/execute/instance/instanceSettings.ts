import { evolutionRequest } from '../chatwootRequest';
import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';

export async function instanceSettings(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const rejectCall = ef.getNodeParameter('rejectCall', 0);
	const msgCall = ef.getNodeParameter('msgCall', 0) || ''; // Define um valor padrão
	const groupsIgnore = ef.getNodeParameter('groupsIgnore', 0);
	const alwaysOnline = ef.getNodeParameter('alwaysOnline', 0);
	const readMessages = ef.getNodeParameter('readMessages', 0);
	const syncFullHistory = ef.getNodeParameter('syncFullHistory', 0);
	const readStatus = ef.getNodeParameter('readStatus', 0);

	const body: any = {
		rejectCall,
		msgCall: msgCall || '',
		groupsIgnore,
		alwaysOnline,
		readMessages,
		syncFullHistory,
		readStatus,
	};

	// Adiciona msgCall apenas se rejectCall for true
	if (rejectCall) {
		body.msgCall = msgCall || '';
	}

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		headers: {
			'Content-Type': 'application/json',
		},
		uri: `/settings/set/${instanceName}`,
		body,
		json: true,
	};

	return await evolutionRequest(ef, options);
}
