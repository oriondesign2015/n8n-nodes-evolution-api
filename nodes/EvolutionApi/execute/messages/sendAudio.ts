import { evolutionRequest } from '../evolutionRequest';
import {
	NodeApiError,
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods
} from 'n8n-workflow';

export async function sendAudio(ef: IExecuteFunctions) {
	try {
		// Parâmetros obrigatórios
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
		const media = ef.getNodeParameter('media', 0) as string;

		// Parâmetros opcionais com valores padrão
		const mimetype = (ef.getNodeParameter('mimetype', 0, 'audio/mp3') as string) || 'audio/mp3';
		const fileName = (ef.getNodeParameter('fileName', 0, 'audio.mp3') as string) || 'audio.mp3';

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
					mentioned?: string;
				};
			};
		};

		const body: any = {
			number: remoteJid,
			audio: media,
			mimetype: mimetype,
			fileName: fileName,
		};

		if (options.delay) {
			body.delay = options.delay;
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
			uri: `/message/sendWhatsAppAudio/${instanceName}`,
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
