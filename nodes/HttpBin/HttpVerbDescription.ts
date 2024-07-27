import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const httpVerbOperations: INodeProperties[] = [

	// Carregar novo "módulo" de operação = Instancias
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['instances-api'],
			},
		},
		options: [

			// Criar instancia basica
			{
				name: 'Criar Instancia Basica',
				value: 'instance-basic',
				description: 'Criar uma instancia basica',
				routing: {
					request: {
						method: 'POST',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/instance/create',
						headers: {
							'Content-Type': 'application/json',
							apikey: '={{$credentials.apikey}}',
						},
						body: {
							instanceName: '={{$node["Nome da Instância"].instanceName}}',
							token: '={{$node["Token"].token}}',
							integration: '={{$node["Integração"].integration}}',
						},
					},
				},
			},

			// Criar instancia com proxy
			{
				name: 'Criar Instancia com Proxy',
				value: 'instance-proxy',
				description: 'Criar uma instancia com Proxy',
				routing: {
					request: {
						method: 'POST',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/instance/create',
						headers: {
							'Content-Type': 'application/json',
							apikey: '={{$credentials.apikey}}',
						},
						body: {
							instanceName: '={{$node["Nome da Instância"].instanceName}}',
							token: '={{$node["Token"].token}}',
							integration: 'WHATSAPP-BAILEYS',
							proxy: {
								host: '={{$node["Proxy Host"].proxyHost}}',
								port: '={{$node["Proxy Port"].proxyPort}}',
								protocol: '={{$node["Proxy Protocol"].proxyProtocol}}',
								username: '={{$node["Proxy Username"].proxyUsername}}',
								password: '={{$node["Proxy Password"].proxyPassword}}',
							},
						},
					},
				},
			},

			// Buscar Instancia
			{
				name: 'Buscar Instâncias',
				value: 'fetch-instances',
				description: 'Buscar instâncias existentes',
				routing: {
					request: {
						method: 'GET',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/instance/fetchInstances{{$parameter.instanceName ? "?instanceName=" + $parameter.instanceName : ""}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
					},
				},
			},
		],
		default: 'instance-basic',
	},

	// Carregar novo "módulo" de operação = Mensagens
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['messages-api'],
			},
		},
		options: [

			// Enviar mensagem de Texto
			{
				name: 'Enviar Texto',
				value: 'sendText',
				description: 'Enviar mensagem de texto',
				routing: {
					request: {
						method: 'POST',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/message/sendText/{{$parameter.instance}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
						body: {
							number: '={{$node["Número"].number}}',
							text: '={{$node["Mensagem"].text}}',
						},
					},
				},
			},

			// Enviar mensagem de Midia
			{
				name: 'Enviar Midia',
				value: 'sendMedia',
				description: 'Buscar instâncias existentes',
				routing: {
					request: {
						method: 'GET',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/instance/fetchInstances{{$parameter.instanceName ? "?instanceName=" + $parameter.instanceName : ""}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
					},
				},
			},
		],
		default: 'sendText',
	},
];

// Opções que aparecem em cada módulo
const getOperation: INodeProperties[] = [
	{
		displayName: 'Query Parameters',
		name: 'arguments',
		default: {},
		description: "The request's query parameters",
		displayOptions: {
			show: {
				resource: ['httpVerb'],
				operation: ['get'],
			},
		},
		options: [
			{
				name: 'keyvalue',
				displayName: 'Key:Value',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						required: true,
						description: 'Key of query parameter',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: '={{$parent.key}}',
								type: 'query',
							},
						},
						required: true,
						description: 'Value of query parameter',
					},
				],
			},
		],
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
	},

	// Campos = Criar Instancia Basica
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
		displayName: 'Token',
		name: 'token',
		type: 'string',
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
		displayName: 'Token',
		name: 'token',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o token',
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
		required: true,
		//typeOptions: {
		//	password: false,
		//},
		description: 'Digite a senha do proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-proxy'],
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
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['fetch-instances'],
				operation: ['instances-api'],
			},
		},
	},

	// Campos = Enviar mensagem de texto
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância',
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

];


// Here we define what to show when the DELETE Operation is selected.
// We do that by adding `operation: ["delete"]` to `displayOptions.show`
const deleteOperation: INodeProperties[] = [
	{
		displayName: 'Query Parameters',
		name: 'arguments',
		default: {},
		description: "The request's query parameters",
		displayOptions: {
			show: {
				resource: ['httpVerb'],
				operation: ['delete'],
			},
		},
		options: [
			{
				name: 'keyvalue',
				displayName: 'Key:Value',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						required: true,
						description: 'Key of query parameter',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: '={{$parent.key}}',
								type: 'query',
							},
						},
						required: true,
						description: 'Value of query parameter',
					},
				],
			},
		],
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
	},
	{
		displayName: 'JSON Object',
		name: 'arguments',
		default: {},
		description: "The request's JSON properties",
		displayOptions: {
			show: {
				resource: ['httpVerb'],
				operation: ['delete'],
			},
		},
		options: [
			{
				name: 'keyvalue',
				displayName: 'Key:Value',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						required: true,
						description: 'Key of JSON property',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: '={{$parent.key}}',
								type: 'body',
							},
						},
						required: true,
						description: 'Value of JSON property',
					},
				],
			},
		],
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
	},
];

export const httpVerbFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                httpVerb:get                                */
	/* -------------------------------------------------------------------------- */
	...getOperation,

	/* -------------------------------------------------------------------------- */
	/*                              httpVerb:delete                               */
	/* -------------------------------------------------------------------------- */
	...deleteOperation,
];
