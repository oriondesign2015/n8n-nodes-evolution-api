import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';
import { evolutionRequest } from '../chatwootRequest';

export async function setChatwoot(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const resourceForChatwoot = ef.getNodeParameter('resourceForChatwoot', 0);

	let options: IRequestOptions;

	if (resourceForChatwoot === 'setChatwoot') {
		// Configurações do Chatwoot
		const enabled = ef.getNodeParameter('enabled', 0) as boolean;
		const chatwootAccountId = ef.getNodeParameter('chatwootAccountId', 0) as number;
		const chatwootToken = ef.getNodeParameter('chatwootToken', 0) as string;
		const chatwootUrl = ef.getNodeParameter('chatwootUrl', 0) as string;
		const chatwootSignMsg = ef.getNodeParameter('chatwootSignMsg', 0) as boolean;
		const chatwootReopenConversation = ef.getNodeParameter(
			'chatwootReopenConversation',
			0,
		) as boolean;
		const chatwootConversationPending = ef.getNodeParameter(
			'chatwootConversationPending',
			0,
		) as boolean;
		const chatwootImportContacts = ef.getNodeParameter('chatwootImportContacts', 0) as boolean;
		const chatwootNameInbox = ef.getNodeParameter('chatwootNameInbox', 0) as string;
		const chatwootMergeBrazilContacts = ef.getNodeParameter(
			'chatwootMergeBrazilContacts',
			0,
		) as boolean;
		const chatwootImportMessages = ef.getNodeParameter('chatwootImportMessages', 0) as boolean;
		const chatwootAutoCreate = ef.getNodeParameter('chatwootAutoCreate', 0) as boolean;
		const chatwootDaysLimitImportMessages = ef.getNodeParameter(
			'chatwootDaysLimitImportMessages',
			0,
		) as number;
		const chatwootOrganization = ef.getNodeParameter('chatwootOrganization', 0) as string;
		const chatwootLogo = ef.getNodeParameter(
			'chatwootLogo',
			0,
			'https://github.com/user-attachments/assets/4d1e9cd6-377a-4383-820a-9a97e6cfbb63',
		) as string;

		const body = {
			enabled: enabled,
			accountId: chatwootAccountId,
			token: chatwootToken,
			url: chatwootUrl,
			signMsg: chatwootSignMsg,
			reopenConversation: chatwootReopenConversation,
			conversationPending: chatwootConversationPending,
			nameInbox: chatwootNameInbox,
			mergeBrazilContacts: chatwootMergeBrazilContacts,
			importContacts: chatwootImportContacts,
			importMessages: chatwootImportMessages,
			daysLimitImportMessages: chatwootDaysLimitImportMessages,
			signDelimiter: '\n',
			autoCreate: chatwootAutoCreate,
			organization: chatwootOrganization,
			logo: chatwootLogo,
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
		throw new NodeApiError(ef.getNode(), {
			message: 'Operação de Chatwoot não reconhecida.',
			description: 'A operação solicitada não é válida para o recurso de Chatwoot.',
		});
	}

	return await evolutionRequest(ef, options);
}
