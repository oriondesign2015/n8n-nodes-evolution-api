import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendInviteLink(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const groupJid = ef.getNodeParameter('groupJid', 0) as string;
		const description = ef.getNodeParameter('description', 0) as string;
		const numbersString = ef.getNodeParameter('numbers', 0) as string;

		const numbers = numbersString.split(',').map(number => number.trim());

		const body = {
			groupJid,
			description,
			numbers,
		};

		const requestOptions: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/group/sendInvite/${instanceName}`,
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
				message: error.message,
				details: 'Erro ao enviar link de convite do grupo',
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
