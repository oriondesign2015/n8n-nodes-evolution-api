import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendPoll(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const remoteJid = ef.getNodeParameter('remoteJid', 0);
		const pollTitle = ef.getNodeParameter('caption', 0);
		const options = ef.getNodeParameter('options_display.metadataValues', 0) as {
			optionValue: string;
		}[];
		const mentionsEveryOne = ef.getNodeParameter('mentionsEveryOne', 0);

		// Verifica se options é um array e não está vazio
		const pollOptions = Array.isArray(options) ? options.map((option) => option.optionValue) : [];

		const requestOptions: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			headers: {
				'Content-Type': 'application/json',
			},
			uri: `/message/sendPoll/${instanceName}`,
			body: {
				number: remoteJid,
				name: pollTitle,
				selectableCount: 1,
				mentionsEveryOne: mentionsEveryOne,
				values: pollOptions,
			},
			json: true,
		};

		return await evolutionRequest(ef, requestOptions);
	} catch (error) {
		// console.error('Erro ao enviar a enquete:', error);
		throw new NodeApiError(ef.getNode(), error); // Substitua aqui
	}
}
