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
				action: 'Criar Instancia Basica',
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
				action: 'Criar Instancia com Proxy',
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

			// Conectar Instância
			{
				name: 'Conectar Instancia',
				value: 'instance-connect',
				description: 'Status da instancia',
				action: 'Conectar Instancia',
				routing: {
					request: {
						method: 'GET',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/instance/connect/{{$parameter.instance}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
					},
				},
			},

			// Reiniciar instancia
			{
				name: 'Reiniciar Instancia',
				value: 'restart-instance',
				description: 'Reinicia a instancia',
				action: 'Reiniciar Instancia',
				routing: {
					request: {
						method: 'PUT',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/instance/connect/{{$parameter.instance}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
					},
				},
			},

			// Desconectar instancia
			{
				name: 'Desconectar Instancia',
				value: 'logout-instance',
				description: 'Desconecta o WhatsApp da instancia',
				action: 'Desconectar Instancia',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/instance/logout/{{$parameter.instance}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
					},
				},
			},

			// Deletar instancia
			{
				name: 'Deletar Instancia',
				value: 'delete-instance',
				description: 'Desconecta o WhatsApp da instancia',
				action: 'Desconectar Instancia',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/instance/delete/{{$parameter.instance}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
					},
				},
			},

			// Buscar Instancia
			{
				name: 'Buscar Instancias',
				value: 'fetch-instances',
				description: 'Buscar instancias existentes',
				action: 'Buscar Instancias',
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

			// Definir configurações da instancia
			{
				name: 'Definir configurações',
				value: 'instanceSettings',
				description: 'Define o comportamento da instancia',
				action: 'Definir configurações',
				routing: {
					request: {
						method: 'POST',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/settings/set{{$parameter.instanceName ? "?instanceName=" + $parameter.instanceName : ""}}',
						headers: {
							'Content-Type': 'application/json',
							apikey: '={{$credentials.apikey}}',
						},
						body: {
							rejectCall: '={{$node["Reject Call"].rejectCall}}',
							msgCall: '={{$node["Message Call"].msgCall}}',
							groupsIgnore: '={{$node["Groups Ignore"].groupsIgnore}}',
							alwaysOnline: '={{$node["Always Online"].alwaysOnline}}',
							readMessages: '={{$node["Read Messages"].readMessages}}',
							syncFullHistory: '={{$node["Sync Full History"].syncFullHistory}}',
							readStatus: '={{$node["Read Status"].readStatus}}',
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
				action: 'Enviar Texto',
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

			// Enviar Imagem
			{
				name: 'Enviar Imagem',
				value: 'sendImage',
				description: 'Enviar mensagem de imagem',
				action: 'Enviar Imagem',
				routing: {
					request: {
						method: 'POST',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/message/sendMedia/{{$parameter.instance}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
						body: {
							number: '={{$node["Número"].number}}',
							mediatype: 'image',
							mimetype: '={{$node["Mimetype"].mimetype || "image/png"}}',
							caption: '={{$node["Caption"].caption || "Teste de caption"}}',
							media: '={{$node["Imagem"].media}}',
							fileName: '={{$node["FileName"].fileName || "Imagem.png"}}',
						},
					},
				},
			},

			// Enviar Video
			{
				name: 'Enviar Video',
				value: 'sendVideo',
				description: 'Enviar mensagem de video',
				action: 'Enviar Video',
				routing: {
					request: {
						method: 'POST',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/message/sendMedia/{{$parameter.instance}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
						body: {
							number: '={{$node["Número"].number}}',
							mediatype: 'video',
							mimetype: '={{$node["Mimetype"].mimetype || "video/mp4"}}',
							caption: '={{$node["Caption"].caption || "Teste de caption"}}',
							media: '={{$node["Imagem"].media}}',
							fileName: '={{$node["FileName"].fileName || "Video.mp4"}}',
						},
					},
				},
			},

			// Enviar Audio
			{
				name: 'Enviar Audio',
				value: 'sendAudio',
				description: 'Enviar mensagem de audio',
				action: 'Enviar Audio',
				routing: {
					request: {
						method: 'POST',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/message/sendWhatsAppAudio/{{$parameter.instance}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
						body: {
							number: '={{$node["Número"].number}}',
							media: '={{$node["Audio"].media}}',
						},
					},
				},
			},

			// Enviar Documento
			{
				name: 'Enviar Documento',
				value: 'sendDocumento',
				description: 'Enviar mensagem de video',
				action: 'Enviar Documento',
				routing: {
					request: {
						method: 'POST',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/message/sendMedia/{{$parameter.instance}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
						body: {
							number: '={{$node["Número"].number}}',
							mediatype: 'document',
							media: '={{$node["Documento"].media}}',
							caption: '={{$node["Mensagem"].caption}}',
						},
					},
				},
			},

			// Enviar Enquete
			{
				name: 'Enviar Enquete',
				value: 'sendPoll',
				description: 'Envia uma enquete de até 12 opções',
				action: 'Enviar Enquete',
				routing: {
					request: {
						method: 'POST',
						url: '={{$credentials["server-url"].startsWith("https://") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}/message/sendPoll/{{$parameter.instance}}',
						headers: {
							apikey: '={{$credentials.apikey}}',
						},
						body: {
							number: '={{$node["Número"].number}}',
							name: '={{$node["Mensagem"].caption}}',
							values: '={{$node["Opções"].values}}',
							mentionsEveryOne: '={{$node["Mencionar Todos"].mentionsEveryOne}}',
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

	// Campos = Deletar instancia
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
				operation: ['delete-instance'],
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
				operation: ['sendPoll'],
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
				operation: ['sendPoll'],
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
				operation: ['sendPoll'],
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
				operation: ['sendPoll'],
			},
		},
	},

	// Campos = Enviar Enquete
	{
		displayName: 'Max: 12 opções',
		name: 'notice',
		type: 'notice',
		default: '',
	},
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
		displayName: 'Mensagem da Enquete',
		name: 'caption',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite a mensagem da enquete',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendPoll'],
			},
		},
	},
	{
		displayName: 'Opções',
		name: 'values',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite as opções da enquete (mínimo 2, máximo 12)',
		displayOptions: {
			show: {
				resource: ['messages-api'],
				operation: ['sendPoll'],
			},
		},
		typeOptions: {
			multipleValues: true,
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
		default: true,
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
		default: true,
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
