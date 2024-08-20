import { INodeProperties } from 'n8n-workflow';
// Observação deste documento:
// Este documento serve para a Definição de Operações que devem aparecer
// em cada Resource, incluindo a criação de novos campos para cada Operation


//  ██████╗ ██████╗ ███████╗██████╗  █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
// ██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
// ██║   ██║██████╔╝█████╗  ██████╔╝███████║   ██║   ██║██║   ██║██╔██╗ ██║
// ██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
// ╚██████╔╝██║     ███████╗██║  ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
//  ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

// Operation = Funções/Opções de cada Resource (Instancias, Mensagens, Integrações, Conversas, Perfil e Grupo)

// "O que cada Resource vai apresentar ao ser selecionado"

// Exemplo:
// Instancias:
//   • Criar instncia;
//   • Criar instancia com proxy;
//   • Conectar instancia;

export const httpVerbOperations: INodeProperties[] = [

// Cada Resource adicionada tera um desse para listar as opções/funções de cada Resource
// Opções da instances-api (Instancias)
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['instances-api'], // Value do Resource
			},
		},

		// Opções que serão vinculadas a Operação "Instancia"
		options: [

			// Opção = Criar instancia
			{
				// Create Instance Basic
				name: 'Criar Instancia',
				action: 'Criar Instancia',
				description: 'Cria uma nova Instancia',
				value: 'instance-basic',
			},

			// Opção = Criar instancia com proxy
			{
				// Create Instance Basic
				name: 'Criar Instancia com Proxy',
				action: 'Criar Instancia com Proxy',
				description: 'Cria uma nova Instancia com Proxy',
				value: 'instance-proxy',
			},

			// Opção = Conectar Instância
			{
				// Instance Connect
				name: 'Conectar Instancia',
				action: 'Conectar Instancia',
				description: 'Gera a conexão de uma Instancia (QR ou Base64)',
				value: 'instance-connect',
			},

			// Opção = Reiniciar instancia
			{
				// Restart Instance
				name: 'Reiniciar Instancia',
				action: 'Reiniciar Instancia',
				description: 'Reinicia o socket da Instancia',
				value: 'restart-instance',
			},

			// Opção = Desconectar instancia
			{
				// Logout Instance
				name: 'Desconectar Instancia',
				action: 'Desconectar Instancia',
				description: 'Desconecta o WhatsApp da Instancia',
				value: 'logout-instance',
			},

			// Opção = Definir presença
			{
				// Set Presence
				name: 'Definir Presença',
				action: 'Definir Presença',
				description: 'Define a presença na instancia',
				value: 'setPresence',
			},


			// Opção = Buscar Instancia
			{
				// Fetch Instances
				name: 'Buscar Instancia',
				action: 'Buscar Instancia',
				description: 'Busca e lista as Instancias criadas',
				value: 'fetch-instances',
			},

			// Opção = Definir configurações da instancia
			{
				name: 'Definir Configurações',
				action: 'Definir Configurações',
				description: 'Define o comportamento da instancia',
				value: 'instanceSettings',
			},
			// Opção = Deletar instancia
			{
				// Delete Instance
				name: 'Deletar Instancia',
				action: 'Deletar Instancia',
				description: 'Deleta uma Instancia',
				value: 'delete-instance',
			},


		],
		// Definindo como padrão a opção "Criar Instancia"
		default: 'instance-basic',
	},


// =====  Espaço para dividir melhor uma coisa da outra  ===== //
// =====  Espaço para dividir melhor uma coisa da outra  ===== //
// =====  Espaço para dividir melhor uma coisa da outra  ===== //


	// Opções da messages-api (Mensagens)
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['messages-api'], // Value do Resource
			},
		},
		options: [

			// Opção = Enviar mensagem de Texto
			{
				// Send Text
				name: 'Enviar Texto',
				action: 'Enviar Texto',
				description: 'Envia mensagem de Texto',
				value: 'sendText',
			},

			// Opção = Enviar Imagem
			{
				// Send Media
				name: 'Enviar Imagem',
				action: 'Enviar Imagem',
				description: 'Envia mensagem de Imagem',
				value: 'sendImage',
			},

			// Opção = Enviar Video
			{
				// Send Media
				name: 'Enviar Video',
				value: 'sendVideo',
				description: 'Enviar mensagem de Video',
				action: 'Enviar Video',
			},

			// Opção = Enviar Audio
			{
				// Send Narrated Audio
				name: 'Enviar Audio',
				action: 'Enviar Audio',
				description: 'Enviar mensagem de Audio',
				value: 'sendAudio',
			},

			// Opção = Enviar Documento
			{
				// Send Media
				name: 'Enviar Documento',
				action: 'Enviar Documento',
				description: 'Enviar mensagem de Video',
				value: 'sendDocumento',
			},

			// Opção = Enviar Enquete
			{
				// Send Poll
				name: 'Enviar Enquete',
				action: 'Enviar Enquete',
				description: 'Envia uma Enquete de até 12 opções',
				value: 'sendPoll',
			},

			// Opção = Enviar Lista
			{
				// Send List
				name: 'Enviar Lista',
				action: 'Enviar Lista',
				description: 'Envia uma Lista de opções',
				value: 'sendList',
			},

			// Opção = Enviar Status
			{
				// Send Status/Stories
				name: 'Enviar Status',
				action: 'Enviar Status',
				description: 'Publicar um Status/Stories',
				value: 'sendStories',
			},

		],
		// Definindo como padrão a opção "Enviar Texto"
		default: 'sendText',
	},
];


// =====  Espaço para dividir melhor uma coisa da outra  ===== //
// =====  Espaço para dividir melhor uma coisa da outra  ===== //
// =====  Espaço para dividir melhor uma coisa da outra  ===== //


//	███████╗██╗     ███████╗███╗   ███╗███████╗███╗   ██╗████████╗███████╗
//	██╔════╝██║     ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
//	█████╗  ██║     █████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   ███████╗
//	██╔══╝  ██║     ██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
//	███████╗███████╗███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   ███████║
//	╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

// Elements = Os campos que aparecem em cada Operation

// "Cada Operation (ex: Enviar mensagem de Texto) tem campos que precisam ser preenchido para fazer uma requisição"

// Exemplo:
// Enviar Mensagem de Texto:
//   • Instancia que vai enviar;
//   • RemoteJid do destinatario;
//   • Mensagem que vai ser enviada;

// Campos das instancias
const instanceOperation: INodeProperties[] = [

	// Campos = Criar Instancia
	{
		displayName: 'Nome da Instância',
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
		displayName: 'Apikey para instancia',
		name: 'token',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: false,
		description: 'Opicional: Digite um Token para a instancia',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-basic'],
			},
		},
	},
	{
		displayName: 'Número do WhatsApp',
		name: 'number',
		type: 'string',
		default: '',
		required: false,
		description: 'Opicional: Numero que vai ser conectado na instancia, para receber o Código de pareamento',
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
				displayName: 'Configurações',
				name: 'instanceSettings',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'Configurações',
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
								description: 'Whether to send a message after rejecting a call, and if so, what message',
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
				description: 'Configurações da instância',
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
								type: 'number',
								default: 0,
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
								type: 'number',
								default: 0,
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
								description: 'Digite o número de dias para limitar a importação de mensagens para o Chatwoot',
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
								default: 'https://github.com/user-attachments/assets/4d1e9cd6-377a-4383-820a-9a97e6cfbb63',
								description: 'Digite a URL do logo para o contato no Chatwoot',
							},
						],
					},
				],
				description: 'Configurações do Chatwoot',
			},
		],
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-basic'],
			},
		},
	},

	// Campos = Criar Instancia com Proxy
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-proxy'],
			},
		},
	},
	{
		displayName: 'Apikey para instancia',
		name: 'token',
		type: 'string',
		default: '',
		required: false,
		description: 'Opicional: Digite um Token para a instancia',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-proxy'],
			},
		},
	},
	{
		displayName: 'Integração',
		name: 'integration',
		type: 'options',
		options: [
			{
				name: 'WHATSAPP-BAILEYS',
				value: 'whatsapp-baileys',
			},
			{
				name: 'WHATSAPP-BUSINESS',
				value: 'whatsapp-business',
			},
		],
		default: 'whatsapp-baileys',
		description: 'Escolha a integração',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-proxy'],
			},
		},
	},
	{
		displayName: 'Proxy Host',
		name: 'proxyHost',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o host do proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-proxy'],
			},
		},
	},
	{
		displayName: 'Proxy Port',
		name: 'proxyPort',
		type: 'number',
		default: 8080,
		required: true,
		description: 'Digite a porta do proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-proxy'],
			},
		},
	},
	{
		displayName: 'Proxy Protocol',
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
		description: 'Escolha o protocolo do proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-proxy'],
			},
		},
	},
	{
		displayName: 'Proxy Username',
		name: 'proxyUsername',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome de usuário do proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-proxy'],
			},
		},
	},
	{
		displayName: 'Proxy Password',
		name: 'proxyPassword',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite a senha do proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-proxy'],
			},
		},
	},


	// Campos = Conectar Instância
	{
		displayName: 'Nome da Instância',
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


	// Campos = Reiniciar instancia
	{
		displayName: 'Nome da Insticância',
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
		displayName: 'Nome da Insticância',
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


	// Campos = Buscar Instancia
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o nome da instância que deseja pesquisar',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['fetch-instances'],
			},
		},
	},


	// Campos = Definir configurações
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome para a instância',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instanceSettings'],
			},
		},
	},
	{
		displayName: 'Rejeitar Chamadas',
		name: 'rejectCall',
		type: 'boolean',
		default: false,
		description: 'Whether to reject calls or not.',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instanceSettings'],
			},
		},
	},
	{
		displayName: 'Mensagem de Chamadas',
		name: 'msgCall',
		type: 'string',
		default: 'Não aceitamos ligações telefônicas.',
		required: false,
		description: 'Mensagem a ser enviada se as chamadas forem rejeitadas.',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instanceSettings'],
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
				operation: ['instanceSettings'],
			},
		},
	},
	{
		displayName: 'Sempre Online',
		name: 'alwaysOnline',
		type: 'boolean',
		default: false,
		description: 'Whether the instance should always be online or not.',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instanceSettings'],
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
				operation: ['instanceSettings'],
			},
		},
	},
	{
		displayName: 'Sincronizar Histórico Completo',
		name: 'syncFullHistory',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all history or not.',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instanceSettings'],
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
				operation: ['instanceSettings'],
			},
		},
	},

	// Campos = Definir presença
	{
		displayName: 'Nome da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o nome da instância que vai ser deletada',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['setPresence'],
			},
		},
	},
	{
		displayName: 'Presença',
		name: 'presence',
		type: 'options',
		description: 'Define o status da presença na instancia',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['setPresence'],
			},
		},
		options: [
			{
				name: 'Disponivel',
				value: 'available',
			},
			{
				name: 'Indisponível',
				value: 'unavailable',
			},
		],
		default: 'available',
	},


	// Campos = Deletar instancia
	{
		displayName: 'Nome da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o nome da instância que vai ser deletada',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['delete-instance'],
			},
		},
	},

];

// Campo das Mensagens
const messageOperation: INodeProperties[] = [
	// Campos = Enviar mensagem de texto
	{
		displayName: 'Nome da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o nome da instância que vai enviar a mensagem',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendText'],
			},
		},
	},
	{
		displayName: 'Numero do destinatario',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'remoteJid do destinarario',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendText'],
			},
		},
	},
	{
		displayName: 'Mensagem',
		name: 'messageText',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite a mensagem de texto que será enviado',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendText'],
			},
		},
	},
	{
		displayName: 'Enviar com Marcação Fantasma?',
		name: 'mentionsEveryOne',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendText'],
			},
		},
	},


	// Campos = Enviar Imagem
	{
		displayName: 'Nome da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o nome da instância que vai enviar a mensagem',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendImage'],
			},
		},
	},
	{
		displayName: 'Número do Destinatário',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'Número do destinatário',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendImage'],
			},
		},
	},
	{
		displayName: 'Imagem',
		name: 'media',
		type: 'string',
		default: '',
		required: true,
		description: 'URL ou base64 da imagem',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendImage'],
			},
		},
	},
	{
		displayName: 'Caption',
		name: 'caption',
		type: 'string',
		default: '',
		required: false,
		description: 'Texto a ser enviado junto a imagem',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendImage'],
			},
		},
	},
	{
		displayName: 'Mimetype',
		name: 'mimetype',
		type: 'string',
		default: 'image/png',
		required: false,
		description: 'Tipo MIME da imagem',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendImage'],
			},
		},
	},
	{
		displayName: 'Nome do Arquivo',
		name: 'fileName',
		type: 'string',
		default: 'Imagem.png',
		required: false,
		description: 'Nome do arquivo da imagem',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendImage'],
			},
		},
	},
	{
		displayName: 'Enviar com Marcação Fantasma?',
		name: 'mentionsEveryOne',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendImage'],
			},
		},
	},


	// Campos = Enviar Video
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o nome da instância que vai enviar o vídeo',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Número do Destinatário',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'Número do destinatário',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Vídeo',
		name: 'media',
		type: 'string',
		default: '',
		required: true,
		description: 'URL ou base64 do vídeo',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Caption',
		name: 'caption',
		type: 'string',
		default: '',
		required: false,
		description: 'Texto a ser enviado junto ao vídeo',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Mimetype',
		name: 'mimetype',
		type: 'string',
		default: 'video/mp4',
		required: false,
		description: 'Tipo MIME do vídeo',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Nome do Arquivo',
		name: 'fileName',
		type: 'string',
		default: 'Video.mp4',
		required: false,
		description: 'Nome do arquivo do vídeo',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Enviar com Marcação Fantasma?',
		name: 'mentionsEveryOne',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendVideo'],
			},
		},
	},


	// Campos = Enviar Audio
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o nome da instância que vai enviar o áudio',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendAudio'],
			},
		},
	},
	{
		displayName: 'Número do Destinatário',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'Número do destinatário',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendAudio'],
			},
		},
	},
	{
		displayName: 'Audio',
		name: 'media',
		type: 'string',
		default: '',
		required: true,
		description: 'URL ou base64 do áudio',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendAudio'],
			},
		},
	},
	{
		displayName: 'Enviar com Marcação Fantasma?',
		name: 'mentionsEveryOne',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendAudio'],
			},
		},
	},


	// Campos = Enviar Documento
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o nome da instância que vai enviar o documento',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendDocumento'],
			},
		},
	},
	{
		displayName: 'Número do Destinatário',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'Número do destinatário',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendDocumento'],
			},
		},
	},
	{
		displayName: 'Documento',
		name: 'media',
		type: 'string',
		default: '',
		required: true,
		description: 'URL ou base64 do documento',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendDocumento'],
			},
		},
	},
	{
		displayName: 'Mensagem',
		name: 'caption',
		type: 'string',
		default: '',
		required: false,
		description: 'Texto a ser enviado junto ao documento',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendDocumento'],
			},
		},
	},
	{
		displayName: 'Nome do Arquivo',
		name: 'fileName',
		type: 'string',
		default: '',
		required: false,
		description: 'Nome do arquivo do vídeo',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendDocumento'],
			},
		},
	},
	{
		displayName: 'Enviar com Marcação Fantasma?',
		name: 'mentionsEveryOne',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendDocumento'],
			},
		},
	},


	// Campos = Enviar Enquete
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o nome da instância que vai enviar a enquete',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendPoll'],
			},
		},
	},
	{
		displayName: 'Número do Destinatário',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'Número do destinatário',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendPoll'],
			},
		},
	},
	{
		displayName: 'Titulo da Enquete',
		name: 'caption',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o titulo da sua enquete',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendPoll'],
			},
		},
	},
	{
		displayName: 'Mínimo 2 opções, Máximo 12. Cada opção deve ser única.',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendPoll'],
			},
		},
	},
	{
		displayName: 'Opções',
		name: 'options_display',
		type: 'fixedCollection',
		default: '',
		required: true,
		typeOptions: {
			multipleValues: true,
		},
		description: 'Digite as opções da enquete (mínimo 2, máximo 12). Cada opção deve ser única.',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Opção',
						name: 'optionValue',
						type: 'string',
						default: '',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendPoll'],
			},
		},
	},
	{
		displayName: 'Enviar com Marcação Fantasma?',
		name: 'mentionsEveryOne',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendPoll'],
			},
		},
	},


	// Campos = Enviar Lista
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar a lista',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendList'],
			},
		},
	},
	{
		displayName: 'Número do Destinatário',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'Número do destinatário',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendList'],
			},
		},
	},
	{
		displayName: 'Título',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		description: 'Título da lista',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendList'],
			},
		},
	},
	{
		displayName: 'Descrição',
		name: 'description',
		type: 'string',
		default: '',
		required: true,
		description: 'Descrição da lista',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendList'],
			},
		},
	},
	{
		displayName: 'Texto do Rodapé',
		name: 'footerText',
		type: 'string',
		default: '',
		required: false,
		description: 'Texto do rodapé da lista',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendList'],
			},
		},
	},
	{
		displayName: 'Texto do Botão',
		name: 'buttonText',
		type: 'string',
		default: 'Selecionar opção',
		required: true,
		description: 'Texto do botão da lista',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendList'],
			},
		},
	},
	{
		displayName: 'Opções',
		name: 'options_display',
		type: 'fixedCollection',
		default: '',
		required: true,
		typeOptions: {
			multipleValues: true,
		},
		description: 'Digite as opções da lista (mínimo 1). Cada opção deve ser única.',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Título da Opção',
						name: 'optionTitle',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Descrição da Opção',
						name: 'optionDescription',
						type: 'string',
						default: '',
						required: false,
					},
					{
						displayName: 'ID da Linha',
						name: 'rowId',
						type: 'string',
						default: '',
						required: true,
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendList'],
			},
		},
	},
	// Campos = Enviar Status
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar o status',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendStories'],
			},
		},
	},
	{
		displayName: 'Tipo do status',
		name: 'type',
		type: 'options',
		description: 'Escolha o tipo de status você vai postar',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendStories'],
			},
		},
		options: [
			{
				name: 'Status de Texto',
				value: 'text',
			},
			{
				name: 'Status de imagem',
				value: 'image',
			},
			{
				name: 'Status de Video',
				value: 'video',
			},
			{
				name: 'Status de Audio',
				value: 'audio',
			},
		],
		default: 'text',
	},
	{
		displayName: 'Conteudo ou URL',
		name: 'content',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o conteudo ou Url da imagem/video/audio a ser postado',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendStories'],
			},
		},
	},
	{
		displayName: 'Texto para status de Imagem/Video',
		name: 'caption',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o texto para status de Imagem/Video',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendStories'],
			},
		},
	},
	{
		displayName: 'Cor do Background',
		name: 'backgroundColor',
		type: 'color',
		default: '#000000',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendStories'],
			},
		},
	},
	{
		displayName: 'Font do texto',
		name: 'font',
		type: 'options',
		description: 'Escolha o tipo da font do seu texto',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendStories'],
			},
		},
		options: [
			{
				name: 'SERIF',
				value: 1,
			},
			{
				name: 'NORICAN REGULAR',
				value: 2,
			},
			{
				name: 'BRYNDAN WRITE',
				value: 3,
			},
			{
				name: 'BEBASNEUE REGULAR',
				value: 4,
			},
			{
				name: 'OSWALD HEAVY',
				value: 5,
			},
		],
		default: 1,
	},



];

export const httpVerbFields: INodeProperties[] = [
	...instanceOperation,
	...messageOperation,
];
