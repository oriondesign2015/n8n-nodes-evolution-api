import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendButtons(ef: IExecuteFunctions) {
	try {
		// Parâmetros obrigatórios
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
		const title = ef.getNodeParameter('title', 0) as string;
		const description = ef.getNodeParameter('description', 0) as string;
		const footer = ef.getNodeParameter('footer', 0, '') as string;
		const buttons = ef.getNodeParameter('buttons.buttonValues', 0, []) as Array<{
			type: 'reply' | 'copy' | 'url' | 'call';
			displayText: string;
			id?: string;
			copyCode?: string;
			url?: string;
			phoneNumber?: string;
		}>;

		// Opções adicionais
		const options = ef.getNodeParameter('options_message', 0, {}) as {
			delay?: number;
			quoted?: {
				messageQuoted: {
					messageId: string;
				};
			};
			mentions?: {
				mentionsSettings: {
					mentionsEveryOne: boolean;
					mentioned: string;
				};
			};
		};

		const body: any = {
			number: remoteJid,
			title,
			description,
			buttons: buttons.map(button => {
				const baseButton = {
					type: button.type,
					displayText: button.displayText,
				};

				switch (button.type) {
					case 'reply':
						return { ...baseButton, id: button.id };
					case 'copy':
						return { ...baseButton, copyCode: button.copyCode };
					case 'url':
						return { ...baseButton, url: button.url };
					case 'call':
						return { ...baseButton, phoneNumber: button.phoneNumber };
					default:
						return baseButton;
				}
			}),
		};

		if (footer) body.footer = footer;
		if (options.delay) body.delay = options.delay;

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
				const mentionedNumbers = mentioned
					.split(',')
					.map(num => num.trim())
					.map(num => (num.includes('@s.whatsapp.net') ? num : `${num}@s.whatsapp.net`));

				body.mentioned = mentionedNumbers;
			}
		}

		const requestOptions: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			headers: {
				'Content-Type': 'application/json',
			},
			uri: `/message/sendButtons/${instanceName}`,
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
