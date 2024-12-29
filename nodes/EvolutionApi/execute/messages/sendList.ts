import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendList(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
		const title = ef.getNodeParameter('title', 0) as string;
		const description = ef.getNodeParameter('description', 0) as string;
		const buttonText = ef.getNodeParameter('buttonText', 0, 'Clique Aqui') as string;
		const footerText = ef.getNodeParameter('footerText', 0, '') as string;
		const sections = ef.getNodeParameter('sections.sectionValues', 0, []) as Array<{
			title: string;
			rows: {
				rowValues: Array<{
					title: string;
					description: string;
					rowId: string;
				}>;
			};
		}>;

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
			footerText: footerText || ' ',
			buttonText,
			sections: sections.map(section => ({
				title: section.title,
				rows: section.rows.rowValues.map(row => ({
					title: row.title,
					description: row.description || ' ',
					rowId: row.rowId,
				})),
			})),
		};

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
			uri: `/message/sendList/${instanceName}`,
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
