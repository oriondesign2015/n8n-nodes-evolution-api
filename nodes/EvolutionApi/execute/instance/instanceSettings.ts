import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function instanceSettings(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const rejectCall = ef.getNodeParameter('rejectCall', 0);
		const msgCall = ef.getNodeParameter('msgCall', 0) || '';
		const groupsIgnore = ef.getNodeParameter('groupsIgnore', 0);
		const alwaysOnline = ef.getNodeParameter('alwaysOnline', 0);
		const readMessages = ef.getNodeParameter('readMessages', 0);
		const syncFullHistory = ef.getNodeParameter('syncFullHistory', 0);
		const readStatus = ef.getNodeParameter('readStatus', 0);

		const body: any = {
			rejectCall,
			msgCall: msgCall || '',
			groupsIgnore,
			alwaysOnline,
			readMessages,
			syncFullHistory,
			readStatus,
		};

		if (rejectCall) {
			body.msgCall = msgCall || '';
		}

		const options: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			headers: {
				'Content-Type': 'application/json',
			},
			uri: `/settings/set/${instanceName}`,
			body,
			json: true,
		};

		const response = await evolutionRequest(ef, options);
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
					: 'Erro ao definir configurações da instância',
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
