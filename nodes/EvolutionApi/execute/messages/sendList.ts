import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendList(ef: IExecuteFunctions) {
	try {
		// Parâmetros obrigatórios
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const remoteJid = ef.getNodeParameter('remoteJid', 0);
		const title = ef.getNodeParameter('title', 0);
		const description = ef.getNodeParameter('description', 0);
		const buttonText = ef.getNodeParameter('buttonText', 0);
		const sections = ef.getNodeParameter('sections.sectionValues', 0) as {
			title: string;
			rows: {
				rowValues: {
					title: string;
					description?: string;
					rowId?: string;
				}[];
			};
		}[];

		// Validação das seções
		if (!Array.isArray(sections) || sections.length === 0) {
			const errorData = {
				success: false,
				error: {
					message: 'Lista de seções inválida',
					details: 'É necessário fornecer pelo menos uma seção com opções',
					code: 'INVALID_SECTIONS',
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
			footer?: string;
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
			title,
			description,
			buttonText,
			footerText: options.footer || '',
			sections: sections.map(section => ({
				title: section.title,
				rows: section.rows.rowValues.map(row => ({
					title: row.title,
					description: row.description || '',
					rowId: row.rowId || `${section.title}_${row.title}`
				}))
			}))
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
					.map(num => num.includes('@s.whatsapp.net') ? num : `${num}@s.whatsapp.net`);

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
					: 'Erro ao enviar lista',
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
