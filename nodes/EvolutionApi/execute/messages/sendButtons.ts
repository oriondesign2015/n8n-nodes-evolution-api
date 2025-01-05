import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
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

		// Validação dos botões
		if (!Array.isArray(buttons) || buttons.length === 0 || buttons.length > 3) {
			const errorData = {
				success: false,
				error: {
					message: 'Lista de botões inválida',
					details: 'É necessário fornecer entre 1 e 3 botões',
					code: 'INVALID_BUTTONS',
					timestamp: new Date().toISOString(),
				},
			};
			return {
				json: errorData,
				error: errorData,
			};
		}

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

		const response = await evolutionRequest(ef, requestOptions);
		return {
			json: {
				success: true,
				data: response,
			},
		};
	} catch (error) {
		const errorData = {
			success: false,
			error: {
				message: error.message.includes('Could not get parameter')
					? 'Parâmetros inválidos ou ausentes'
					: 'Erro ao enviar botões',
				details: error.message.includes('Could not get parameter')
					? 'Verifique se todos os campos obrigatórios foram preenchidos corretamente'
					: error.message,
				code: error.code || 'UNKNOWN_ERROR',
				timestamp: new Date().toISOString(),
			},
		};

		if (!ef.continueOnFail()) {
			throw new NodeOperationError(ef.getNode(), error.message, {
				message: errorData.error.message,
				description: errorData.error.details,
			});
		}

		return {
			json: errorData,
			error: errorData,
		};
	}
}
