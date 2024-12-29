import {
	NodeApiError,
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendText(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const remoteJid = ef.getNodeParameter('remoteJid', 0);
		const messageText = ef.getNodeParameter('messageText', 0);
		const options = ef.getNodeParameter('options_message', 0, {}) as {
			delay?: number;
			linkPreview?: boolean;
			quoted?: {
				messageQuoted: {
					messageId: string;
				};
			};
			mentions?: {
				mentionsSettings: {
					mentionsEveryOne: boolean;
					mentioned?: string;
				};
			};
		};

		const body: any = {
			number: remoteJid,
			text: messageText,
		};

		if (options.delay) {
			body.delay = options.delay;
		}

		if (options.linkPreview !== undefined) {
			body.linkPreview = options.linkPreview;
		}

		if (options.quoted?.messageQuoted?.messageId) {
			body.quoted = {
				key: {
					id: options.quoted.messageQuoted.messageId,
				},
			};
		}

		if (options.mentions?.mentionsSettings) {
			const { mentionsEveryOne, mentioned } = options.mentions.mentionsSettings;

			if (mentionsEveryOne) {
				body.mentionsEveryOne = true;
			} else if (mentioned) {
				// Garante que cada número tenha o formato correto para menção
				const mentionedNumbers = mentioned.split(',')
					.map(num => num.trim())
					.map(num => num.includes('@s.whatsapp.net') ? num : `${num}@s.whatsapp.net`);

				body.mentioned = mentionedNumbers;
			}
		}

		const requestOptions: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			headers: {
				'Content-Type': 'application/json',
			},
			uri: `/message/sendText/${instanceName}`,
			body,
			json: true,
		};

		return await evolutionRequest(ef, requestOptions);
	} catch (error) {
		throw new NodeApiError(ef.getNode(), error);
	}
}
