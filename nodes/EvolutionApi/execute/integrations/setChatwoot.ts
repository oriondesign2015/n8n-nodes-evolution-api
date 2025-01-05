import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function setChatwoot(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const resourceForChatwoot = ef.getNodeParameter('resourceForChatwoot', 0);

		let options: IRequestOptions;

		if (resourceForChatwoot === 'setChatwoot') {
			const accountId = ef.getNodeParameter('chatwootAccountId', 0) as string;
			const token = ef.getNodeParameter('chatwootToken', 0) as string;
			const url = ef.getNodeParameter('chatwootUrl', 0) as string;
			const signMsg = ef.getNodeParameter('chatwootSignMsg', 0) as boolean;
			const reopenConversation = ef.getNodeParameter('chatwootReopenConversation', 0) as boolean;
			const conversationPending = ef.getNodeParameter('chatwootConversationPending', 0) as boolean;
			const nameInbox = ef.getNodeParameter('chatwootNameInbox', 0) as string;
			const mergeBrazilContacts = ef.getNodeParameter('chatwootMergeBrazilContacts', 0) as boolean;
			const importContacts = ef.getNodeParameter('chatwootImportContacts', 0) as boolean;
			const importMessages = ef.getNodeParameter('chatwootImportMessages', 0) as boolean;
			const daysLimitImportMessages = ef.getNodeParameter('chatwootDaysLimitImportMessages', 0) as number;
			const autoCreate = ef.getNodeParameter('chatwootAutoCreate', 0) as boolean;
			const organization = ef.getNodeParameter('chatwootOrganization', 0) as string;
			const logo = ef.getNodeParameter('chatwootLogo', 0) as string;

			const body = {
				enabled: true,
				accountId,
				token,
				url,
				signMsg,
				reopenConversation,
				conversationPending,
				nameInbox,
				mergeBrazilContacts,
				importContacts,
				importMessages,
				daysLimitImportMessages,
				signDelimiter: '\n',
				autoCreate,
				organization,
				logo,
				ignoreJids: ['']
			};

			options = {
				method: 'POST' as IHttpRequestMethods,
				uri: `/chatwoot/set/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForChatwoot === 'findChatwoot') {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/chatwoot/find/${instanceName}`,
				json: true,
			};
		} else {
			const errorData = {
				success: false,
				error: {
					message: 'Operação do Chatwoot não reconhecida',
					details: 'A operação solicitada não é válida para o recurso do Chatwoot',
					code: 'INVALID_OPERATION',
					timestamp: new Date().toISOString(),
				},
			};
			throw new NodeOperationError(ef.getNode(), errorData.error.message, {
				message: errorData.error.message,
				description: errorData.error.details,
			});
		}

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
					: 'Erro ao configurar Chatwoot',
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
