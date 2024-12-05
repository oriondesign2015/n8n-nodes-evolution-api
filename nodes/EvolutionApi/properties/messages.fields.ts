import { INodeProperties } from 'n8n-workflow';

export const messagesFields: INodeProperties[] = [
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
		required: true,
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
	//{
	//	displayName: 'Mimetype',
	//	name: 'mimetype',
	//	type: 'string',
	//	default: 'image/png',
	//	required: false,
	//	description: 'Tipo MIME da imagem',
	//	displayOptions: {
	//		show: {
	//			resource: ['messages-api'],
	//			operation: ['sendImage'],
	//		},
	//	},
	//},
	//{
	//	displayName: 'Nome do Arquivo',
	//	name: 'fileName',
	//	type: 'string',
	//	default: 'Imagem.png',
	//	required: false,
	//	description: 'Nome do arquivo da imagem',
	//	displayOptions: {
	//		show: {
	//			resource: ['messages-api'],
	//			operation: ['sendImage'],
	//		},
	//	},
	//},
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
		required: true,
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
	// {
	// 	displayName: 'Mimetype',
	// 	name: 'mimetype',
	// 	type: 'string',
	// 	default: 'video/mp4',
	// 	required: false,
	// 	description: 'Tipo MIME do vídeo',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['messages-api'],
	// 			operation: ['sendVideo'],
	// 		},
	// 	},
	// },
	// {
	// 	displayName: 'Nome do Arquivo',
	// 	name: 'fileName',
	// 	type: 'string',
	// 	default: 'Video.mp4',
	// 	required: false,
	// 	description: 'Nome do arquivo do vídeo',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['messages-api'],
	// 			operation: ['sendVideo'],
	// 		},
	// 	},
	// },
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
		required: true,
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
		required: true,
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
	//{
	//	displayName: 'Nome do Arquivo',
	//	name: 'fileName',
	//	type: 'string',
	//	default: '',
	//	required: false,
	//	description: 'Nome do arquivo do vídeo',
	//	displayOptions: {
	//		show: {
	//			resource: ['messages-api'],
	//			operation: ['sendDocumento'],
	//		},
	//	},
	//},
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
		required: true,
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
		default: { metadataValues: [] },
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
