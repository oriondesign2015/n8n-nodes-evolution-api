import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const httpVerbOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['create-instance'],
			},
		},
		options: [
			{
				name: 'Instancia Basica',
				value: 'instance-basic',
				description: 'Criar uma instancia basica',
				routing: {
					request: {
						method: 'POST',
						url: '/instance/create',
					},
				},
			},
			{
				name: 'Instancia com Proxy',
				value: 'instance-proxy',
				description: 'Criar uma instancia com Proxy',
				routing: {
					request: {
						method: 'POST',
						url: '/instance/create',
					},
				},
			},
		],
		default: 'instance-basic',
	},

	// Aqui vai mostrar a segunda parte (Buscar Instanica)
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['fetch-instances'],
			},
		},
		options: [
			{
				name: 'Buscar Instâncias',
				value: 'fetch-instances',
				description: 'Buscar instâncias existentes',
				routing: {
					request: {
						method: 'GET',
						url: '={{$credentials["server-url"]}}/instance/fetchInstances{{$parameter.instanceName ? "?instanceName=" + $parameter.instanceName : ""}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
					},
				},
			},
		],
		default: 'fetch-instances',
	},
];

// Here we define what to show when the `get` operation is selected.
// We do that by adding `operation: ["get"]` to `displayOptions.show`
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
	// Adicionando novos campos para a instância básica
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['create-instance'],
				operation: ['instance-basic'],
			},
		},
	},
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o token',
		displayOptions: {
			show: {
				resource: ['create-instance'],
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
				resource: ['create-instance'],
				operation: ['instance-basic'],
			},
		},
	},
	// Adicionando novos campos para a instância com Proxy
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['create-instance'],
				operation: ['instance-proxy'],
			},
		},
	},
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o token',
		displayOptions: {
			show: {
				resource: ['create-instance'],
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
				resource: ['create-instance'],
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
				resource: ['create-instance'],
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
				resource: ['create-instance'],
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
				resource: ['create-instance'],
				operation: ['instance-proxy'],
			},
		},
	},
	{
		displayName: 'Proxy Username',
		name: 'proxyUsername',
		type: 'string',
		default: '',
		required: false,
		description: 'Digite o nome de usuário do proxy',
		displayOptions: {
			show: {
				resource: ['create-instance'],
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
		typeOptions: {
			password: true,
		},
		description: 'Digite a senha do proxy',
		displayOptions: {
			show: {
				resource: ['create-instance'],
				operation: ['instance-proxy'],
			},
		},
	},
	// Adicionando novos campos para a operação fetch-instances
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
				operation: ['fetch-instances'],
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
