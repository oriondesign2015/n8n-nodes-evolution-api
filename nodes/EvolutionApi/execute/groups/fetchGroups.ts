import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function fetchGroups(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const searchMethod = ef.getNodeParameter('searchMethod', 0) as string;
		let requestOptions: IRequestOptions;

		switch (searchMethod) {
			case 'inviteCode':
				const inviteCode = ef.getNodeParameter('inviteCode', 0) as string;
				requestOptions = {
					method: 'GET' as IHttpRequestMethods,
					uri: `/group/inviteInfo/${instanceName}?inviteCode=${inviteCode}`,
					json: true,
				};
				break;

			case 'groupJid':
				const groupJid = ef.getNodeParameter('groupJid', 0) as string;
				requestOptions = {
					method: 'GET' as IHttpRequestMethods,
					uri: `/group/findGroupInfos/${instanceName}?groupJid=${groupJid}`,
					json: true,
				};
				break;

			case 'fetchAll':
				const getParticipants = ef.getNodeParameter('getParticipants', 0) as boolean;
				requestOptions = {
					method: 'GET' as IHttpRequestMethods,
						uri: `/group/fetchAllGroups/${instanceName}?getParticipants=${getParticipants}`,
						json: true,
				};
				break;

			default:
				throw new Error('Método de busca inválido');
		}

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
				details: 'Erro ao buscar informações do(s) grupo(s)',
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
