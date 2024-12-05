import { IExecuteFunctions, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';
import { chatwootRequest } from '../chatwootRequest';

export async function createInstanceBasic(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const token = ef.getNodeParameter('token', 0) || '';
	const number = ef.getNodeParameter('number', 0) || '';

	// Inicializa o corpo básico da requisição
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
			proxyPort: proxySettings.proxyPort ? String(proxySettings.proxyPort) : '1234', // Converte para string
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
	body.chatwootAccountId = chatwootSettings.chatwootAccountId || '';
	body.chatwootToken = chatwootSettings.chatwootToken || '';
	body.chatwootUrl = chatwootSettings.chatwootUrl || '';
	body.chatwootSignMsg =
		chatwootSettings.chatwootSignMsg !== undefined ? chatwootSettings.chatwootSignMsg : false;
	body.chatwootReopenConversation = chatwootSettings.chatwootReopenConversation || false;
	body.chatwootConversationPending = chatwootSettings.chatwootConversationPending || false;
	body.chatwootImportContacts = chatwootSettings.chatwootImportContacts || false;
	body.chatwootNameInbox = chatwootSettings.chatwootNameInbox || '';
	body.chatwootMergeBrazilContacts = chatwootSettings.chatwootMergeBrazilContacts || false;
	body.chatwootImportMessages = chatwootSettings.chatwootImportMessages || false;
	body.chatwootDaysLimitImportMessages = chatwootSettings.chatwootDaysLimitImportMessages || 0;
	body.chatwootOrganization = chatwootSettings.chatwootOrganization || '';
	body.chatwootLogo = chatwootSettings.chatwootLogo || '';

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		headers: {
			'Content-Type': 'application/json',
		},
		uri: `/instance/create`,
		body,
		json: true,
	};

	return await chatwootRequest(ef, options);
}
