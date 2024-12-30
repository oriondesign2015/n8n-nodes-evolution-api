import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendContact(ef: IExecuteFunctions) {
	try {
		// Parâmetros obrigatórios
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const remoteJid = ef.getNodeParameter('remoteJid', 0);
		const contacts = ef.getNodeParameter('contacts.contactValues', 0) as {
			fullName: string;
			wuid: string;
			phoneNumber: string;
			organization?: string;
			email?: string;
			url?: string;
		}[];

		// Validação dos contatos
		if (!Array.isArray(contacts) || contacts.length === 0) {
			const errorData = {
				success: false,
				error: {
					message: 'Lista de contatos inválida',
					details: 'É necessário fornecer pelo menos um contato',
					code: 'INVALID_CONTACTS',
					timestamp: new Date().toISOString(),
				},
			};
			return {
				json: errorData,
				error: errorData,
			};
		}

		const body: any = {
			number: remoteJid,
			contact: contacts.map(contact => ({
				fullName: contact.fullName,
				wuid: contact.wuid,
				phoneNumber: contact.phoneNumber,
				...(contact.organization && { organization: contact.organization }),
				...(contact.email && { email: contact.email }),
				...(contact.url && { url: contact.url }),
			})),
		};

		const requestOptions: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			headers: {
				'Content-Type': 'application/json',
			},
			uri: `/message/sendContact/${instanceName}`,
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
					: 'Erro ao enviar contato',
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
