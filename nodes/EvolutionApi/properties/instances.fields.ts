import { INodeProperties } from 'n8n-workflow';

// Campos das instancias
export const instancesFields: INodeProperties[] = [
	// Campos = Criar Instancia
	{
		displayName: 'Nome Da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome para a instância',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-basic'],
			},
		},
	},
	{
		displayName: 'Apikey Para Instancia',
		name: 'token',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',

		description: 'Opicional: Digite um Token para a instancia',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-basic'],
			},
		},
	},
	{
		displayName: 'Número Do WhatsApp',
		name: 'number',
		type: 'string',
		default: '',

		description:
			'Opicional: Numero que vai ser conectado na instancia, para receber o Código de pareamento',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-basic'],
			},
		},
	},
	{
		displayName: 'Opções',
		name: 'options_Create_instance',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		options: [
			{
				displayName: 'Chatwoot',
				name: 'chatwoot',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'Configurações Do Chatwoot',
						name: 'chatwootSettings',
						values: [
							{
								displayName: 'ID Da Conta Do Chatwoot',
								name: 'chatwootAccountId',
								type: 'string',
								default: '',
								description: 'Digite o ID da conta do Chatwoot',
							},
							{
								displayName: 'Token De Admin Do Chatwoot',
								name: 'chatwootToken',
								type: 'string',
								typeOptions: {
									password: true,
								},
								default: '',
								description: 'Digite o token de admin do Chatwoot',
							},
							{
								displayName: 'Link Do Chatwoot',
								name: 'chatwootUrl',
								type: 'string',
								default: '',
								description: 'Digite o link do Chatwoot',
							},
							{
								displayName: 'Assinatura Do Agente Do Chatwoot',
								name: 'chatwootSignMsg',
								type: 'boolean',
								default: false,
								description: 'Whether to enable or disable the Chatwoot agent signature',
							},
							{
								displayName: 'Reabrir Mensagens No Chatwoot',
								name: 'chatwootReopenConversation',
								type: 'boolean',
								default: false,
								description: 'Whether to enable or disable reopening messages in Chatwoot',
							},
							{
								displayName: 'Iniciar Conversas Como Pendentes No Chatwoot',
								name: 'chatwootConversationPending',
								type: 'boolean',
								default: false,
								description: 'Whether to start conversations as pending in Chatwoot',
							},
							{
								displayName: 'Importar Contatos Para O Chatwoot',
								name: 'chatwootImportContacts',
								type: 'boolean',
								default: false,
								description: 'Whether to import contacts to Chatwoot',
							},
							{
								displayName: 'Nome Da Inbox Do Chatwoot',
								name: 'chatwootNameInbox',
								type: 'string',
								default: '',
								description: 'Digite o nome da Inbox do Chatwoot',
							},
							{
								displayName: 'Mesclar Contatos Brasileiros No Chatwoot',
								name: 'chatwootMergeBrazilContacts',
								type: 'boolean',
								default: false,
								description: 'Whether to merge Brazilian contacts in Chatwoot',
							},
							{
								displayName: 'Importar Mensagens Para O Chatwoot',
								name: 'chatwootImportMessages',
								type: 'boolean',
								default: false,
								description: 'Whether to import messages to Chatwoot',
							},
							{
								displayName: 'Importar Mensagens De Quantos Dias Para O Chatwoot',
								name: 'chatwootDaysLimitImportMessages',
								type: 'number',
								default: 0,
								description:
									'Digite o número de dias para limitar a importação de mensagens para o Chatwoot',
							},
							{
								displayName: 'Nome Do Contato De QRCode No Chatwoot',
								name: 'chatwootOrganization',
								type: 'string',
								default: '',
								description: 'Digite o nome do contato de QRCode no Chatwoot',
							},
							{
								displayName: 'Url Do Logo Para O Contato No Chatwoot',
								name: 'chatwootLogo',
								type: 'string',
								default:
									'https://github.com/user-attachments/assets/4d1e9cd6-377a-4383-820a-9a97e6cfbb63',
								description: 'Digite a URL do logo para o contato no Chatwoot',
							},
						],
					},
				],
				description: 'Configurações do Chatwoot',
			},
			{
				displayName: 'Comportamento',
				name: 'instanceSettings',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'Comportamento Da Instancia',
						name: 'settings',
						values: [
							{
								displayName: 'Rejeitar Ligações',
								name: 'rejectCall',
								type: 'boolean',
								default: false,
								description: 'Whether to automatically reject incoming calls',
							},
							{
								displayName: 'Mensagem Ao Rejeitar',
								name: 'msgCall',
								type: 'string',
								default: '',
								description:
									'Whether to send a message after rejecting a call, and if so, what message',
							},
							{
								displayName: 'Ignorar Grupos',
								name: 'groupsIgnore',
								type: 'boolean',
								default: false,
								description: 'Whether to ignore messages from groups',
							},
							{
								displayName: 'Sempre Online',
								name: 'alwaysOnline',
								type: 'boolean',
								default: false,
								description: 'Whether to keep the status always set to Online',
							},
							{
								displayName: 'Ler Mensagens',
								name: 'readMessages',
								type: 'boolean',
								default: false,
								description: 'Whether to automatically mark messages as read',
							},
							{
								displayName: 'Ler Status',
								name: 'readStatus',
								type: 'boolean',
								default: false,
								description: 'Whether to allow the API to view the Status of added contacts',
							},
							{
								displayName: 'Sincronizar Histórico',
								name: 'syncFullHistory',
								type: 'boolean',
								default: false,
								description: 'Whether to synchronize the full message history with the API',
							},
						],
					},
				],
				description: 'Comportamento da instância',
			},
			{
				displayName: 'Proxy',
				name: 'proxy',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'Configurações Do Proxy',
						name: 'proxySettings',
						values: [
							{
								displayName: 'Host Do Proxy',
								name: 'proxyHost',
								type: 'string',
								default: '',
								description: 'Digite o host do proxy',
							},
							{
								displayName: 'Porta Do Proxy',
								name: 'proxyPort',
								type: 'string',
								default: '1234',
								description: 'Digite a porta do proxy',
							},
							{
								displayName: 'Protocolo Do Proxy',
								name: 'proxyProtocol',
								type: 'options',
								options: [
									{
										name: 'HTTP',
										value: 'http',
									},
									{
										name: 'HTTPS',
										value: 'https',
									},
								],
								default: 'http',
								description: 'Selecione o protocolo do proxy',
							},
							{
								displayName: 'Usuário Do Proxy',
								name: 'proxyUsername',
								type: 'string',
								default: '',
								description: 'Digite o usuário do proxy',
							},
							{
								displayName: 'Senha Do Proxy',
								name: 'proxyPassword',
								type: 'string',
								typeOptions: {
									password: true,
								},
								default: '',
								description: 'Digite a senha do proxy',
							},
						],
					},
				],
				description: 'Configurações do proxy',
			},
			{
				displayName: 'RabbitMQ',
				name: 'rabbitmq',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'Configurações Do RabbitMQ',
						name: 'rabbitmqSettings',
						values: [
							{
								displayName: 'Ativa Ou Desativa O RabbitMQ',
								name: 'rabbitmqEnabled',
								type: 'boolean',
								default: false,
								description: 'Whether to send media data in base64 format in the RabbitMQ', // Atualizado
							},
							{
								displayName: 'Eventos',
								name: 'rabbitmqEvents',
								type: 'multiOptions',
								default: [], // Adicionado para resolver o erro
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
						],
					},
				],
				description: 'Os eventos a serem monitorados',
			},
			{
				displayName: 'Webhook',
				name: 'webhook',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'Configurações Do Webhook',
						name: 'webhookSettings',
						values: [
							{
								displayName: 'Url Do Webhook',
								name: 'webhookUrl',
								type: 'string',
								default: '',
								description: 'Digite a URL que vai receber os eventos do Webhook',
							},
							{
								displayName: 'Webhook Por Eventos',
								name: 'webhookByEvents',
								type: 'boolean',
								default: false,
								description:
									'Whether to create a route for each event by appending the event name to the end of the URL', // Atualizado
							},
							{
								displayName: 'Base64 No Webhook',
								name: 'webhookBase64',
								type: 'boolean',
								default: false,
								description: 'Whether to send media data in base64 format in the webhook', // Atualizado
							},
							{
								displayName: 'Eventos',
								name: 'webhookEvents',
								type: 'multiOptions',
								default: [], // Adicionado para resolver o erro
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
						],
					},
				],
				description: 'Os eventos a serem monitorados',
			},
		],
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-basic'],
			},
		},
	},

	// Campos = Conectar Instância
	{
		displayName: 'Nome Da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que deseja pesquisar',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-connect'],
			},
		},
	},

	// Campos = Buscar Instancia
	{
		displayName: 'Nome Da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',

		description: 'Digite o nome da instância que deseja pesquisar',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['fetch-instances'],
			},
		},
	},

	// Campos = Definir Comportamento
	{
		displayName: 'Nome Da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome para a instância',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Rejeitar Chamadas',
		name: 'rejectCall',
		type: 'boolean',
		default: false,
		description: 'Whether to reject calls or not',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Mensagem De Chamadas',
		name: 'msgCall',
		type: 'string',
		default: 'Não aceitamos ligações telefônicas.',

		description: 'Mensagem a ser enviada se as chamadas forem rejeitadas',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Ignorar Grupos',
		name: 'groupsIgnore',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Sempre Online',
		name: 'alwaysOnline',
		type: 'boolean',
		default: false,
		description: 'Whether the instance should always be online or not',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Ler Mensagens',
		name: 'readMessages',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Sincronizar Histórico Completo',
		name: 'syncFullHistory',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all history or not',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Ler Status',
		name: 'readStatus',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},

	// Campos = Definir presença
	{
		displayName: 'Nome Da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-presence'],
			},
		},
	},
	{
		displayName: 'Presença',
		name: 'presence',
		type: 'options',
		options: [
			{
				name: 'Disponível',
				value: 'available',
			},
			{
				name: 'Indisponível',
				value: 'unavailable',
			},
		],
		default: 'available',
		required: true,
		description: 'Status de presença da instância',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-presence'],
			},
		},
	},

	// Campos = Proxy
	{
		displayName: 'Nome Da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar a mensagem',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
			},
		},
	},

	{
		displayName: 'O Que Deseja Fazer',
		name: 'resourceForProxy',
		type: 'options',
		options: [
			{
				name: 'Definir Proxy',
				value: 'setProxy',
			},
			{
				name: 'Verificar Proxy',
				value: 'findProxy',
			},
		],
		default: 'setProxy',
		description: 'Escolha entre ativar/desativar proxy ou verificar o proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
			},
		},
	},
	{
		displayName: 'Ativar Proxy',
		name: 'enabled',
		type: 'boolean',
		default: true,
		description: 'Whether to enable or disable integration with proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
	},
	{
		displayName: 'Protocolo Do Proxy',
		name: 'proxyProtocol',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
		type: 'options',
		options: [
			{
				name: 'HTTP',
				value: 'http',
			},
			{
				name: 'HTTPS',
				value: 'https',
			},
		],
		default: 'http',
		description: 'Selecione o protocolo do proxy',
	},
	{
		displayName: 'Host Do Proxy',
		name: 'proxyHost',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o host do proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
	},
	{
		displayName: 'Porta Do Proxy',
		name: 'proxyPort',
		type: 'string',
		default: '1234',
		required: true,
		description: 'Digite a porta do proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
	},
	{
		displayName: 'Usuário Do Proxy',
		name: 'proxyUsername',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o usuário do proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
	},
	{
		displayName: 'Senha Do Proxy',
		name: 'proxyPassword',
		type: 'string',
		required: true,
		typeOptions: {
			password: true,
		},
		default: '',
		description: 'Digite a senha do proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
	},

	// Campos = Reiniciar instancia
	{
		displayName: 'Nome Da Insticância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que deseja pesquisar',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['restart-instance'],
			},
		},
	},

	// Campos = Desconectar instancia
	{
		displayName: 'Nome Da Insticância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que deseja pesquisar',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['logout-instance'],
			},
		},
	},

	// Campos = Deletar instancia
	{
		displayName: 'Nome Da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai ser deletada',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['delete-instance'],
			},
		},
	},
];
