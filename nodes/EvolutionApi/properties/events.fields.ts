import { INodeProperties } from 'n8n-workflow';

// Campo das Eventos
export const eventsFields: INodeProperties[] = [
	// Campos = Webhook
	{
		displayName: 'Nome Da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar a mensagem',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['webhook'],
			},
		},
	},
	{
		displayName: 'O Que Deseja Fazer',
		name: 'resourceForWebhook',
		type: 'options',
		options: [
			{
				name: 'Definir Webhook',
				value: 'setWebhook',
			},
			{
				name: 'Verificar Webhook',
				value: 'findWebhook',
			},
		],
		default: 'setWebhook',
		description: 'Escolha entre definir um novo webhook ou verificar o webhook',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['webhook'],
			},
		},
	},
	{
		displayName: 'Ativar Webhook',
		name: 'enabled',
		type: 'boolean',
		default: true,
		description: 'Whether to enable or disable integration with Webhook',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['webhook'],
				resourceForWebhook: ['setWebhook'],
			},
		},
	},
	{
		displayName: 'Url Do Webhook',
		name: 'webhookUrl',
		type: 'string',
		default: '',
		description: 'Digite a URL que vai receber os eventos do Webhook',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['webhook'],
				resourceForWebhook: ['setWebhook'],
			},
		},
	},
	{
		displayName: 'Webhook Por Eventos',
		name: 'webhookByEvents',
		type: 'boolean',
		default: false,
		description:
			'Whether to create a route for each event by appending the event name to the end of the URL',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['webhook'],
				resourceForWebhook: ['setWebhook'],
			},
		},
	},
	{
		displayName: 'Base64 No Webhook',
		name: 'webhookBase64',
		type: 'boolean',
		default: false,
		description: 'Whether to send media data in base64 format in the webhook',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['webhook'],
				resourceForWebhook: ['setWebhook'],
			},
		},
	},
	{
		displayName: 'Eventos',
		name: 'webhookEvents',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['webhook'],
				resourceForWebhook: ['setWebhook'],
			},
		},
		default: [],
		options: [
			{
				name: 'CALL',
				value: 'CALL',
			},
			{
				name: 'CHATS_DELETE',
				value: 'CHATS_DELETE',
			},
			{
				name: 'CHATS_SET',
				value: 'CHATS_SET',
			},
			{
				name: 'CHATS_UPDATE',
				value: 'CHATS_UPDATE',
			},
			{
				name: 'CHATS_UPSERT',
				value: 'CHATS_UPSERT',
			},
			{
				name: 'CONNECTION_UPDATE',
				value: 'CONNECTION_UPDATE',
			},
			{
				name: 'CONTACTS_SET',
				value: 'CONTACTS_SET',
			},
			{
				name: 'CONTACTS_UPDATE',
				value: 'CONTACTS_UPDATE',
			},
			{
				name: 'CONTACTS_UPSERT',
				value: 'CONTACTS_UPSERT',
			},
			{
				name: 'GROUP_PARTICIPANTS_UPDATE',
				value: 'GROUP_PARTICIPANTS_UPDATE',
			},
			{
				name: 'GROUP_UPDATE',
				value: 'GROUP_UPDATE',
			},
			{
				name: 'GROUPS_UPSERT',
				value: 'GROUPS_UPSERT',
			},
			{
				name: 'LABELS_ASSOCIATION',
				value: 'LABELS_ASSOCIATION',
			},
			{
				name: 'LABELS_EDIT',
				value: 'LABELS_EDIT',
			},
			{
				name: 'MESSAGES_DELETE',
				value: 'MESSAGES_DELETE',
			},
			{
				name: 'MESSAGES_SET',
				value: 'MESSAGES_SET',
			},
			{
				name: 'MESSAGES_UPDATE',
				value: 'MESSAGES_UPDATE',
			},
			{
				name: 'MESSAGES_UPSERT',
				value: 'MESSAGES_UPSERT',
			},
			{
				name: 'PRESENCE_UPDATE',
				value: 'PRESENCE_UPDATE',
			},
			{
				name: 'QRCODE_UPDATED',
				value: 'QRCODE_UPDATED',
			},
			{
				name: 'SEND_MESSAGE',
				value: 'SEND_MESSAGE',
			},
			{
				name: 'TYPEBOT_CHANGE_STATUS',
				value: 'TYPEBOT_CHANGE_STATUS',
			},
			{
				name: 'TYPEBOT_START',
				value: 'TYPEBOT_START',
			},
		],
	},

	// Campos = RabbitMQ
	{
		displayName: 'Nome Da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar a mensagem',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['rabbitmq'],
			},
		},
	},
	{
		displayName: 'O Que Deseja Fazer',
		name: 'resourceForRabbitMQ',
		type: 'options',
		options: [
			{
				name: 'Definir RabbitMQ',
				value: 'setRabbitMQ',
			},
			{
				name: 'Verificar RabbitMQ',
				value: 'findRabbitMQ',
			},
		],
		default: 'setRabbitMQ',
		description: 'Escolha entre ativar/desativar RabbitMQ ou verificar o RabbitMQ',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['rabbitmq'],
			},
		},
	},
	{
		displayName: 'Ativar RabbitMQ',
		name: 'enabled',
		type: 'boolean',
		default: true,
		description: 'Whether to enable or disable integration with RabbitMQ',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['rabbitmq'],
				resourceForRabbitMQ: ['setRabbitMQ'],
			},
		},
	},
	{
		displayName: 'Eventos',
		name: 'rabbitMQEvents',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['events-api'],
				operation: ['rabbitmq'],
				resourceForRabbitMQ: ['setRabbitMQ'],
			},
		},
		default: [],
		options: [
			{
				name: 'CALL',
				value: 'CALL',
			},
			{
				name: 'CHATS_DELETE',
				value: 'CHATS_DELETE',
			},
			{
				name: 'CHATS_SET',
				value: 'CHATS_SET',
			},
			{
				name: 'CHATS_UPDATE',
				value: 'CHATS_UPDATE',
			},
			{
				name: 'CHATS_UPSERT',
				value: 'CHATS_UPSERT',
			},
			{
				name: 'CONNECTION_UPDATE',
				value: 'CONNECTION_UPDATE',
			},
			{
				name: 'CONTACTS_SET',
				value: 'CONTACTS_SET',
			},
			{
				name: 'CONTACTS_UPDATE',
				value: 'CONTACTS_UPDATE',
			},
			{
				name: 'CONTACTS_UPSERT',
				value: 'CONTACTS_UPSERT',
			},
			{
				name: 'GROUP_PARTICIPANTS_UPDATE',
				value: 'GROUP_PARTICIPANTS_UPDATE',
			},
			{
				name: 'GROUP_UPDATE',
				value: 'GROUP_UPDATE',
			},
			{
				name: 'GROUPS_UPSERT',
				value: 'GROUPS_UPSERT',
			},
			{
				name: 'LABELS_ASSOCIATION',
				value: 'LABELS_ASSOCIATION',
			},
			{
				name: 'LABELS_EDIT',
				value: 'LABELS_EDIT',
			},
			{
				name: 'MESSAGES_DELETE',
				value: 'MESSAGES_DELETE',
			},
			{
				name: 'MESSAGES_SET',
				value: 'MESSAGES_SET',
			},
			{
				name: 'MESSAGES_UPDATE',
				value: 'MESSAGES_UPDATE',
			},
			{
				name: 'MESSAGES_UPSERT',
				value: 'MESSAGES_UPSERT',
			},
			{
				name: 'PRESENCE_UPDATE',
				value: 'PRESENCE_UPDATE',
			},
			{
				name: 'QRCODE_UPDATED',
				value: 'QRCODE_UPDATED',
			},
			{
				name: 'SEND_MESSAGE',
				value: 'SEND_MESSAGE',
			},
			{
				name: 'TYPEBOT_CHANGE_STATUS',
				value: 'TYPEBOT_CHANGE_STATUS',
			},
			{
				name: 'TYPEBOT_START',
				value: 'TYPEBOT_START',
			},
		],
	},
];
