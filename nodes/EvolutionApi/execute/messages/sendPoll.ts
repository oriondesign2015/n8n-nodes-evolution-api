import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendPoll(ef: IExecuteFunctions) {
	try {
		// Parâmetros obrigatórios
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const remoteJid = ef.getNodeParameter('remoteJid', 0);
		const pollTitle = ef.getNodeParameter('caption', 0);
		const options = ef.getNodeParameter('options_display.metadataValues', 0) as {
			optionValue: string;
		}[];

		// Opções adicionais
		const options_message = ef.getNodeParameter('options_message', 0, {}) as {
			delay?: number;
			quoted?: {
				messageQuoted: {
					messageId: string;
				};
			};
		};

		// Verifica se options é um array e não está vazio
		const pollOptions = Array.isArray(options) ? options.map((option) => option.optionValue) : [];

		const body: any = {
			number: remoteJid,
			name: pollTitle,
			selectableCount: 1,
			values: pollOptions,
		};

		// Adiciona delay se especificado
		if (options_message.delay) {
			body.delay = options_message.delay;
		}

		// Adiciona quoted se especificado
		if (options_message.quoted?.messageQuoted?.messageId) {
			body.quoted = {
				key: {
					id: options_message.quoted.messageQuoted.messageId,
				},
			};
		}

		const requestOptions: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			headers: {
				'Content-Type': 'application/json',
			},
			uri: `/message/sendPoll/${instanceName}`,
			body,
			json: true,
		};

		return await evolutionRequest(ef, requestOptions);
	} catch (error) {
		if (error.message.includes('Could not get parameter')) {
			throw new NodeApiError(ef.getNode(), {
				message: 'Parâmetros inválidos ou ausentes',
				description: 'Verifique se todos os campos obrigatórios foram preenchidos corretamente',
			});
		}
		throw new NodeApiError(ef.getNode(), error);
	}
}
