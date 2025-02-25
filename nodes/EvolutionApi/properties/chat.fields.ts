import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const chatFields: INodeProperties[] = [
	// Campos comuns para todas as operações
	{
		displayName: 'Nome Da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['chat-api'],
			},
		},
	},

	// Campos para verificar número
	{
		displayName: 'Números',
		name: 'numbers',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Lista de números para verificar (separados por vírgula)',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['check-number'],
			},
		},
	},

	// Campos para ler mensagens
	{
		displayName: 'Contato',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['read-messages'],
			},
		},
	},
	{
		displayName: 'ID Da Mensagem',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,

		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['read-messages'],
			},
		},
	},
	{
		displayName: 'Mensagem É Minha',
		name: 'fromMe',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		required: true,
		description: 'Se a mensagem foi enviada pela instância',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['read-messages'],
			},
		},
	},

	// Campos para gerenciar arquivo
	{
		displayName: 'Contato',
		name: 'chat',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['manage-archive'],
			},
		},
	},
	{
		displayName: 'Ação',
		name: 'archive',
		type: 'options' as NodePropertyTypes,
		options: [
			{
				name: 'Arquivar',
				value: true,
			},
			{
				name: 'Desarquivar',
				value: false,
			},
		],
		default: true,
		required: true,
		description: 'Escolha se deseja arquivar ou desarquivar a conversa',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['manage-archive'],
			},
		},
	},
	{
		displayName: 'ID Da Mensagem',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID da última mensagem',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['manage-archive'],
			},
		},
	},
	{
		displayName: 'Mensagem É Minha',
		name: 'fromMe',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		required: true,
		description: 'Se a mensagem foi enviada pela instância',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['manage-archive'],
			},
		},
	},

	// Campos para marcar como não lido
	{
		displayName: 'Contato',
		name: 'chat',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['mark-unread'],
			},
		},
	},
	{
		displayName: 'ID Da Mensagem',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID da última mensagem',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['mark-unread'],
			},
		},
	},
	{
		displayName: 'Mensagem É Minha',
		name: 'fromMe',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		required: true,
		description: 'Se a mensagem foi enviada pela instância',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['mark-unread'],
			},
		},
	},

	// Campos para deletar mensagem
	{
		displayName: 'Contato',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['delete-message'],
			},
		},
	},
	{
		displayName: 'ID Da Mensagem',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID da mensagem que será deletada',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['delete-message'],
			},
		},
	},
	{
		displayName: 'Mensagem É Minha',
		name: 'fromMe',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		required: true,
		description: 'Se a mensagem foi enviada pela instância',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['delete-message'],
			},
		},
	},
	{
		displayName: 'Número Do Participante',
		name: 'participant',
		type: 'string',
		default: '',
		required: true,
		description: 'Número do participante que enviou a mensagem',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['delete-message'],
				fromMe: [false],
			},
		},
	},

	// Campos para buscar foto do perfil
	{
		displayName: 'Contato',
		name: 'number',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato (ex: 5511999999999)',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['fetch-profile-picture'],
			},
		},
	},

	// Campos para obter mídia em Base64
	{
		displayName: 'ID Da Mensagem',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID da mensagem que contém a mídia',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['get-media-base64'],
			},
		},
	},
	{
		displayName: 'Converter Para MP4',
		name: 'convertToMp4',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		required: true,
		description: 'Se deve converter o vídeo para formato MP4',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['get-media-base64'],
			},
		},
	},

	// Campos para editar mensagem
	{
		displayName: 'Contato',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['update-message'],
			},
		},
	},
	{
		displayName: 'ID Da Mensagem',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID da mensagem que será editada',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['update-message'],
			},
		},
	},
	{
		displayName: 'Nova Mensagem',
		name: 'text',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Novo texto da mensagem',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['update-message'],
			},
		},
	},

	// Campos para enviar presença
	{
		displayName: 'Contato',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['send-presence'],
			},
		},
	},
	{
		displayName: 'Presença',
		name: 'presence',
		type: 'options',
		options: [
			{
				name: 'Escrevendo...',
				value: 'composing',
			},
			{
				name: 'Gravando...',
				value: 'recording',
			},
		],
		default: 'composing',
		required: true,
		description: 'Tipo de presença a ser enviada',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['send-presence'],
			},
		},
	},
	{
		displayName: 'Delay',
		name: 'delay',
		type: 'number' as NodePropertyTypes,
		default: 1200,
		required: true,
		description: 'Tempo em milissegundos que a presença ficará ativa',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['send-presence'],
			},
		},
	},

	// Campos para bloquear contato
	{
		displayName: 'Contato',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['block-contact'],
			},
		},
	},
	{
		displayName: 'Ação',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Bloquear',
				value: 'block',
			},
			{
				name: 'Desbloquear',
				value: 'unblock',
			},
		],
		default: 'block',
		required: true,
		description: 'Ação a ser executada',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['block-contact'],
			},
		},
	},

	// Campos para listar contatos
	{
		displayName: 'Listar Todos',
		name: 'listAll',
		type: 'boolean' as NodePropertyTypes,
		default: true,
		required: true,
		description: 'Se deve listar todos os contatos',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-contacts'],
			},
		},
	},
	{
		displayName: 'Contato',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato específico',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-contacts'],
				listAll: [false],
			},
		},
	},

	// Campos para procurar mensagens
	{
		displayName: 'Contato',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-messages'],
			},
		},
	},
	{
		displayName: 'Página',
		name: 'page',
		type: 'number' as NodePropertyTypes,
		default: 1,

		description: 'Número da página',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-messages'],
			},
		},
	},
	{
		displayName: 'Quantidade Por Página',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		default: 10,

		description: 'Quantidade de mensagens por página',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-messages'],
			},
		},
	},

	// Campos para procurar status de mensagens
	{
		displayName: 'Contato',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-status-messages'],
			},
		},
	},
	{
		displayName: 'ID Da Mensagem',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,

		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-status-messages'],
			},
		},
	},
	{
		displayName: 'Página',
		name: 'page',
		type: 'number' as NodePropertyTypes,
		default: 1,

		description: 'Número da página',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-status-messages'],
			},
		},
	},
	{
		displayName: 'Quantidade Por Página',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		default: 10,

		description: 'Quantidade de mensagens por página',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-status-messages'],
			},
		},
	},

	// Campos para procurar chats
	{
		displayName: 'Contato',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Número do contato',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-chats'],
			},
		},
	},
	{
		displayName: 'ID Da Mensagem',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,

		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-chats'],
			},
		},
	},
	{
		displayName: 'Página',
		name: 'page',
		type: 'number' as NodePropertyTypes,
		default: 1,

		description: 'Número da página',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-chats'],
			},
		},
	},
	{
		displayName: 'Quantidade Por Página',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		default: 10,

		description: 'Quantidade de chats por página',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-chats'],
			},
		},
	},
];
