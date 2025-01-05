import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function createInstanceBasic(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const token = ef.getNodeParameter('token', 0) || '';
		const number = ef.getNodeParameter('number', 0) || '';

		const body: any = {
			instanceName,
			integration: 'WHATSAPP-BAILEYS',
		};

		if (token) {
			body.token = token;
		}
		if (number) {
			body.number = number;
		}

		// Verifica e adiciona configurações da instância se existirem
		const instanceSettings = ef.getNodeParameter(
			'options_Create_instance.instanceSettings.settings',
			0,
			{},
		) as {
			rejectCall?: boolean;
			msgCall?: string;
			groupsIgnore?: boolean;
			alwaysOnline?: boolean;
			readMessages?: boolean;
			readStatus?: boolean;
			syncFullHistory?: boolean;
		};
		if (instanceSettings && Object.keys(instanceSettings).length > 0) {
			Object.assign(body, instanceSettings);
		}

		// Verifica e adiciona configurações de proxy se existirem
		const proxySettings = ef.getNodeParameter(
			'options_Create_instance.proxy.proxySettings',
			0,
			{},
		) as {
			proxyHost?: string;
			proxyPort?: number;
			proxyProtocol?: string;
			proxyUsername?: string;
			proxyPassword?: string;
		};
		if (proxySettings && Object.keys(proxySettings).length > 0) {
			Object.assign(body, {
				proxyHost: proxySettings.proxyHost || '',
				proxyPort: proxySettings.proxyPort ? String(proxySettings.proxyPort) : '1234',
				proxyProtocol: proxySettings.proxyProtocol || '',
				proxyUsername: proxySettings.proxyUsername || '',
				proxyPassword: proxySettings.proxyPassword || '',
			});
		}

		// Verifica e adiciona configurações do Webhook se existirem
		const webhookSettings = ef.getNodeParameter(
			'options_Create_instance.webhook.webhookSettings',
			0,
			{},
		) as {
			webhookUrl?: string;
			webhookByEvents?: boolean;
			webhookBase64?: boolean;
			webhookEvents?: string[];
		};

		if (webhookSettings && Object.keys(webhookSettings).length > 0) {
			Object.assign(body, {
				webhook: {
					url: webhookSettings.webhookUrl || '',
					byEvents: webhookSettings.webhookByEvents || false,
					base64: webhookSettings.webhookBase64 || false,
					events: webhookSettings.webhookEvents || [],
				},
			});
		}

		// Verifica e adiciona configurações do RabbitMQ se existirem
		const rabbitmqSettings = ef.getNodeParameter(
			'options_Create_instance.rabbitmq.rabbitmqSettings',
			0,
			{},
		) as {
			rabbitmqEnabled?: boolean;
			rabbitmqEvents?: string[];
		};
		if (rabbitmqSettings && Object.keys(rabbitmqSettings).length > 0) {
			Object.assign(body, {
				rabbitmq: {
					enabled: rabbitmqSettings.rabbitmqEnabled || false,
					events: rabbitmqSettings.rabbitmqEvents || [],
				},
			});
		}

		// Verifica e adiciona configurações do Chatwoot se existirem
		const chatwootSettings = ef.getNodeParameter(
			'options_Create_instance.chatwoot.chatwootSettings',
			0,
			{},
		) as {
			chatwootAccountId?: number;
			chatwootToken?: string;
			chatwootUrl?: string;
			chatwootSignMsg?: boolean;
			chatwootReopenConversation?: boolean;
			chatwootConversationPending?: boolean;
			chatwootImportContacts?: boolean;
			chatwootNameInbox?: string;
			chatwootMergeBrazilContacts?: boolean;
			chatwootImportMessages?: boolean;
			chatwootDaysLimitImportMessages?: number;
			chatwootOrganization?: string;
			chatwootLogo?: string;
		};

		// Adiciona todos os campos do Chatwoot
		if (chatwootSettings && Object.keys(chatwootSettings).length > 0) {
			Object.assign(body, {
				chatwootAccountId: chatwootSettings.chatwootAccountId || '',
				chatwootToken: chatwootSettings.chatwootToken || '',
				chatwootUrl: chatwootSettings.chatwootUrl || '',
				chatwootSignMsg: chatwootSettings.chatwootSignMsg !== undefined ? chatwootSettings.chatwootSignMsg : false,
			});
		}

		const options: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/instance/create`,
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
					: 'Erro ao criar instância',
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
