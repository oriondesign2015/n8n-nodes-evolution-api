import { INodeProperties } from 'n8n-workflow';

export const integrationsFields: INodeProperties[] = [
	// Campos = Chatwoot
	{
		displayName: 'Nome Da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar a mensagem',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
			},
		},
	},
	{
		displayName: 'O Que Deseja Fazer',
		name: 'resourceForChatwoot',
		type: 'options',
		options: [
			{
				name: 'Definir Chatwoot',
				value: 'setChatwoot',
			},
			{
				name: 'Verificar Chatwoot',
				value: 'findChatwoot',
			},
		],
		default: 'setChatwoot',
		description: 'Escolha entre ativar/desativar Chatwoot ou verificar o Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
			},
		},
	},
	{
		displayName: 'Ativar Chatwoot',
		name: 'enabled',
		type: 'boolean',
		default: true,
		description: 'Whether to enable or disable integration with Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Link Do Chatwoot',
		name: 'chatwootUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o link do Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'ID Da Conta Do Chatwoot',
		name: 'chatwootAccountId',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o ID da conta do Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Token De Admin Do Chatwoot',
		name: 'chatwootToken',
		type: 'string',
		required: true,
		typeOptions: {
			password: true,
		},
		default: '',
		description: 'Digite o token de admin do Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Assinatura Do Agente Do Chatwoot',
		name: 'chatwootSignMsg',
		type: 'boolean',
		default: false,
		description: 'Whether to enable or disable the Chatwoot agent signature',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Reabrir Mensagens No Chatwoot',
		name: 'chatwootReopenConversation',
		type: 'boolean',
		default: false,
		description: 'Whether to enable or disable reopening messages in Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Iniciar Conversas Como Pendentes No Chatwoot',
		name: 'chatwootConversationPending',
		type: 'boolean',
		default: false,
		description: 'Whether to start conversations as pending in Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Importar Contatos Para O Chatwoot',
		name: 'chatwootImportContacts',
		type: 'boolean',
		default: false,
		description: 'Whether to import contacts to Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Nome Da Inbox Do Chatwoot',
		name: 'chatwootNameInbox',
		type: 'string',
		default: '',
		description: 'Opicional: Digite o nome da Inbox do Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Mesclar Contatos Brasileiros No Chatwoot',
		name: 'chatwootMergeBrazilContacts',
		type: 'boolean',
		default: false,
		description: 'Whether to merge Brazilian contacts in Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Importar Mensagens Para O Chatwoot',
		name: 'chatwootImportMessages',
		type: 'boolean',
		default: false,
		description: 'Whether to import messages to Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Importar Mensagens De Quantos Dias Para O Chatwoot',
		name: 'chatwootDaysLimitImportMessages',
		type: 'number',
		default: 0,
		description:
			'Opicional: Digite o número de dias para limitar a importação de mensagens para o Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Criar Caixa De Entrada',
		name: 'chatwootAutoCreate',
		type: 'boolean',
		default: true,
		description: 'Whether to create an inbox automatically',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Nome Do Contato De QRCode No Chatwoot',
		name: 'chatwootOrganization',
		type: 'string',
		default: '',
		description: 'Opicional: Digite o nome do contato de QRCode no Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},
	{
		displayName: 'Url Do Logo Para O Contato No Chatwoot',
		name: 'chatwootLogo',
		type: 'string',
		default: 'https://github.com/user-attachments/assets/4d1e9cd6-377a-4383-820a-9a97e6cfbb63',
		description: 'Opicional: Digite a URL do logo para o contato no Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['chatwoot'],
				resourceForChatwoot: ['setChatwoot'],
			},
		},
	},

	// Campos = Typebot
	{
		displayName: 'Nome Da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar a mensagem',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
			},
		},
	},

	{
		displayName: 'O Que Deseja Fazer',
		name: 'resourceForTypebot',
		type: 'options',
		options: [
			{
				name: 'Adicionar Typebot',
				value: 'createTypebot',
			},
			{
				name: 'Verificar Typebot',
				value: 'findTypebot',
			},
			{
				name: 'Atualizar Typebot',
				value: 'updateTypebot',
			},
			{
				name: 'Deletar Typebot',
				value: 'deleteTypebot',
			},
			{
				name: 'Iniciar Typebot',
				value: 'startTypebot',
			},
			{
				name: 'Procurar Sessão No Typebot',
				value: 'fetchSessionsTypebot',
			},
			{
				name: 'Alterar Status Da Sessão No Typebot',
				value: 'changeStatusTypebot',
			},
		],
		default: 'createTypebot',
		description: 'Escolha uma opção para realizar com a integração do Typebot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
			},
		},
	},

	// updateTypebot
	{
		displayName: 'ID Do Typebot',
		name: 'typebotId',
		type: 'string',
		default: '',
		description: 'Digite o ID do Typebot que deseja buscar, deixe vazio para procurar todos',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: [
					'updateTypebot',
					'findTypebot',
					'deleteTypebot',
					'fetchSessionsTypebot',
					'changeStatusTypebot',
				],
			},
		},
	},

	//Se createTypebot ou updateTypebot
	{
		displayName: 'URL Da API Do Typebot',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite a URL do seu typebot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot', 'startTypebot'],
			},
		},
	},
	{
		displayName: 'Nome Do Typebot',
		name: 'typebot',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome do seu fluxo no typebot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot', 'startTypebot'],
			},
		},
	},
	{
		displayName: 'Tipo De Gatilho',
		name: 'triggerType',
		type: 'options',
		options: [
			{
				name: 'Palavra Chave',
				value: 'keyword',
			},
			{
				name: 'Todos',
				value: 'all',
			},
		],
		default: 'keyword',
		description: 'Escolha uma opção para realizar com a integração do Typebot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
			},
		},
	},
	{
		displayName: 'Operador Do Gatilho',
		name: 'triggerOperator',
		type: 'options',
		options: [
			{
				name: 'Contem',
				value: 'contains',
			},
			{
				name: 'Igual À',
				value: 'equals',
			},
			{
				name: 'Começa com',
				value: 'startsWith',
			},
			{
				name: 'Termina com',
				value: 'endsWith',
			},
			{
				name: 'Regex',
				value: 'regex',
			},
		],
		default: 'contains',
		description: 'Escolha uma opção para realizar com a integração do Typebot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
				triggerType: ['keyword'],
			},
		},
	},
	{
		displayName: 'Gatilho',
		name: 'triggerValue',
		type: 'string',
		default: '',
		required: true,
		description:
			'Digite a palavra/frase ou regex para ser usado como gatilho para iniciar o Typebot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
				triggerType: ['keyword'],
			},
		},
	},
	{
		displayName: 'Expira Em (Minutos)',
		name: 'expire',
		type: 'number',
		default: 0,
		required: true,
		description: 'Digite quantos minutos sem respostas o bot devera ser desativado',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
			},
		},
	},
	{
		displayName: 'Palavra Chave De Finalização',
		name: 'keywordFinish',
		type: 'string',
		default: '#sair',
		required: true,
		description: 'Digite a palavra/frase que sera usado para fechar o bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
			},
		},
	},
	{
		displayName: 'Delay Padrão Da Mensagem (Em Milésimos)',
		name: 'delayMessage',
		type: 'number',
		default: 1000,
		required: true,
		description: 'Digite quantos milisegundos o bot terá de delay',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
			},
		},
	},
	{
		displayName: 'Palavra Chave De Finalização',
		name: 'unknownMessage',
		type: 'string',
		default: 'Mensagem não reconhecida',
		required: true,
		description: 'Digite a palavra/frase que sera usado para fechar o bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
			},
		},
	},
	{
		displayName: 'Escuta Mensagens Enviadas Por Mim',
		name: 'listeningFromMe',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
			},
		},
	},
	{
		displayName: 'Pausa O Bot Quando Eu Enviar Uma Mensagem',
		name: 'stopBotFromMe',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
			},
		},
	},
	{
		displayName: 'Mantem a Sessão Do Bot Aberta',
		name: 'keepOpen',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
			},
		},
	},
	{
		displayName: 'Tempo De Espera (Em Segundos)',
		name: 'debounceTime',
		type: 'number',
		default: 0,
		required: true,
		description:
			'Este é o tempo que o bot ficará esperando as proximas mensagens após receber uma mensagem, depois ele juntará todas as mensagens em uma só',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['createTypebot', 'updateTypebot'],
			},
		},
	},

	// startTypebot
	{
		displayName: 'Numero Do Destinatario',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'RemoteJid do destinarario',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['startTypebot', 'changeStatusTypebot'],
			},
		},
	},
	{
		displayName: 'Iniciar Seção',
		name: 'startSession',
		type: 'boolean',
		default: false,
		description: 'Whether to enable or disable integration with Chatwoot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['startTypebot'],
			},
		},
	},
	{
		displayName: 'Variáveis',
		name: 'variables',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		options: [
			{
				name: 'variable',
				displayName: 'Variável',
				values: [
					{
						displayName: 'Nome Da Variavel',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome da variável',
					},
					{
						displayName: 'Valor Da Variavel',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Valor da variável',
					},
				],
			},
		],
		description: 'Variáveis para enviar ao typebot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['startTypebot'],
			},
		},
	},

	// Change Session Status
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Aberta',
				value: 'opened',
			},
			{
				name: 'Pausada',
				value: 'paused',
			},
			{
				name: 'Fechada',
				value: 'closed',
			},
		],
		default: 'opened',
		description: 'Escolha qual será o status da seção',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['typebot'],
				resourceForTypebot: ['changeStatusTypebot'],
			},
		},
	},

	// EVOLUTION BOT
	{
		displayName: 'Nome Da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar a mensagem',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
			},
		},
	},

	{
		displayName: 'O Que Deseja Fazer',
		name: 'resourceForEvolutionBot',
		type: 'options',
		options: [
			{
				name: 'Adicionar Evolution Bot',
				value: 'createEvolutionBot',
			},
			{
				name: 'Verificar Evolution Bot',
				value: 'findEvolutionBot',
			},
			{
				name: 'Atualizar Evolution Bot',
				value: 'updateEvolutionBot',
			},
			{
				name: 'Deletar Evolution Bot',
				value: 'deleteEvolutionBot',
			},
			{
				name: 'Procurar Sessão No Evolution Bot',
				value: 'fetchSessionsEvolutionBot',
			},
			{
				name: 'Alterar Status Da Sessão No Evolution Bot',
				value: 'changeStatusEvolutionBot',
			},
		],
		default: 'createEvolutionBot',
		description: 'Escolha uma opção para realizar com a integração do EvolutionBot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
			},
		},
	},

	// update EvolutionBot
	{
		displayName: 'ID Do Evolution Bot',
		name: 'evolutionBotId',
		type: 'string',
		default: '',
		description: 'Digite o ID do Evolution Bot que deseja buscar, deixe vazio para procurar todos',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: [
					'findEvolutionBot',
					'updateEvolutionBot',
					'deleteEvolutionBot',
					'fetchSessionsEvolutionBot',
					'changeStatusEvolutionBot',
				],
			},
		},
	},

	//Se createEvolutionBot ou updateEvolutionBot
	{
		displayName: 'URL Da API Do Evolution Bot',
		name: 'apiUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite a URL do seu Evolution Bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'ApiKey Da Evolution Bot',
		name: 'apiKeyBot',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		description: 'Digite a ApiKey do seu Evolution Bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Tipo De Gatilho',
		name: 'triggerType',
		type: 'options',
		options: [
			{
				name: 'Palavra Chave',
				value: 'keyword',
			},
			{
				name: 'Todos',
				value: 'all',
			},
		],
		default: 'keyword',
		description: 'Escolha uma opção para realizar com a integração do EvolutionBot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Operador Do Gatilho',
		name: 'triggerOperator',
		type: 'options',
		options: [
			{
				name: 'Contem',
				value: 'contains',
			},
			{
				name: 'Igual À',
				value: 'equals',
			},
			{
				name: 'Começa com',
				value: 'startsWith',
			},
			{
				name: 'Termina com',
				value: 'endsWith',
			},
			{
				name: 'Regex',
				value: 'regex',
			},
		],
		default: 'contains',
		description: 'Escolha uma opção para realizar com a integração do EvolutionBot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
				triggerType: ['keyword'],
			},
		},
	},
	{
		displayName: 'Gatilho',
		name: 'triggerValue',
		type: 'string',
		default: '',
		required: true,
		description:
			'Digite a palavra/frase ou regex para ser usado como gatilho para iniciar o EvolutionBot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
				triggerType: ['keyword'],
			},
		},
	},
	{
		displayName: 'Expira Em (Minutos)',
		name: 'expire',
		type: 'number',
		default: 0,
		required: true,
		description: 'Digite quantos minutos sem respostas o bot devera ser desativado',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Palavra Chave De Finalização',
		name: 'keywordFinish',
		type: 'string',
		default: '#sair',
		required: true,
		description: 'Digite a palavra/frase que sera usado para fechar o bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Delay Padrão Da Mensagem (Em Milésimos)',
		name: 'delayMessage',
		type: 'number',
		default: 1000,
		required: true,
		description: 'Digite quantos milisegundos o bot terá de delay',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Palavra Chave De Finalização',
		name: 'unknownMessage',
		type: 'string',
		default: 'Mensagem não reconhecida',
		required: true,
		description: 'Digite a palavra/frase que sera usado para fechar o bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Escuta Mensagens Enviadas Por Mim',
		name: 'listeningFromMe',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Pausa O Bot Quando Eu Enviar Uma Mensagem',
		name: 'stopBotFromMe',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Mantem a Sessão Do Bot Aberta',
		name: 'keepOpen',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Tempo De Espera (Em Segundos)',
		name: 'debounceTime',
		type: 'number',
		default: 0,
		required: true,
		description:
			'Este é o tempo que o bot ficará esperando as proximas mensagens após receber uma mensagem, depois ele juntará todas as mensagens em uma só',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},

	// Change Session Status EvolutionBot
	{
		displayName: 'Numero Do Destinatario',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'RemoteJid do destinarario',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['changeStatusEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Aberta',
				value: 'opened',
			},
			{
				name: 'Pausada',
				value: 'paused',
			},
			{
				name: 'Fechada',
				value: 'closed',
			},
		],
		default: 'opened',
		description: 'Escolha qual será o status da seção',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['changeStatusEvolutionBot'],
			},
		},
	},

	// Dify
	{
		displayName: 'Nome Da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar a mensagem',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
			},
		},
	},
	{
		displayName: 'O Que Deseja Fazer',
		name: 'resourceForDifyBot',
		type: 'options',
		options: [
			{
				name: 'Adicionar Dify',
				value: 'createDify',
			},
			{
				name: 'Verificar Dify',
				value: 'findDify',
			},
			{
				name: 'Atualizar Dify',
				value: 'updateDify',
			},
			{
				name: 'Deletar Dify',
				value: 'deleteDify',
			},
			{
				name: 'Procurar Sessão No Dify',
				value: 'fetchSessionsDify',
			},
			{
				name: 'Alterar Status Da Sessão No Dify',
				value: 'changeStatusDify',
			},
		],
		default: 'createDify',
		description: 'Escolha uma opção para realizar com a integração do Dify',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
			},
		},
	},
	{
		displayName: 'Tipo Do Bot',
		name: 'botType',
		type: 'options',
		options: [
			{
				name: 'Bot De Chat',
				value: 'chatBot',
			},
			{
				name: 'Gerador De Texto',
				value: 'textGenerator',
			},
			{
				name: 'Agente',
				value: 'agent',
			},
			{
				name: 'Fluxo De Trabalho',
				value: 'workflow',
			},
		],
		default: 'chatBot',
		required: true,
		description: 'Escolha o tipo do bot Dify',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['dify'],
				resourceForDifyBot: ['createDify'],
			},
		},
	},

	// update Dify
	{
		displayName: 'ID Do Dify',
		name: 'difyBotId',
		type: 'string',
		default: '',
		description: 'Digite o ID do Dify que deseja buscar, deixe vazio para procurar todos',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: [
					'findDify',
					'updateDify',
					'deleteDify',
					'fetchSessionsDify',
					'changeStatusDify',
				],
			},
		},
	},

	//Se createDify ou updateDify
	{
		displayName: 'Url Do Dify',
		name: 'apiUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite a URL do seu Dify',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},
	{
		displayName: 'ApiKey Do Dify',
		name: 'apiKeyBot',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		required: true,
		description: 'Digite a ApiKey do seu bot do Dify',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},
	{
		displayName: 'Tipo De Gatilho',
		name: 'triggerType',
		type: 'options',
		options: [
			{
				name: 'Palavra Chave',
				value: 'keyword',
			},
			{
				name: 'Todos',
				value: 'all',
			},
		],
		default: 'keyword',
		description: 'Escolha uma opção para realizar com a integração do Dify',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},
	{
		displayName: 'Operador Do Gatilho',
		name: 'triggerOperator',
		type: 'options',
		options: [
			{
				name: 'Contem',
				value: 'contains',
			},
			{
				name: 'Igual À',
				value: 'equals',
			},
			{
				name: 'Começa com',
				value: 'startsWith',
			},
			{
				name: 'Termina com',
				value: 'endsWith',
			},
			{
				name: 'Regex',
				value: 'regex',
			},
		],
		default: 'contains',
		description: 'Escolha uma opção para realizar com a integração do Dify',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
				triggerType: ['keyword'],
			},
		},
	},
	{
		displayName: 'Gatilho',
		name: 'triggerValue',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite a palavra/frase ou regex para ser usado como gatilho para iniciar o Dify',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
				triggerType: ['keyword'],
			},
		},
	},
	{
		displayName: 'Expira Em (Minutos)',
		name: 'expire',
		type: 'number',
		default: 0,
		required: true,
		description: 'Digite quantos minutos sem respostas o bot devera ser desativado',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},
	{
		displayName: 'Palavra Chave De Finalização',
		name: 'keywordFinish',
		type: 'string',
		default: '#sair',
		required: true,
		description: 'Digite a palavra/frase que sera usado para fechar o bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},
	{
		displayName: 'Delay Padrão Da Mensagem (Em Milésimos)',
		name: 'delayMessage',
		type: 'number',
		default: 1000,
		required: true,
		description: 'Digite quantos milisegundos o bot terá de delay',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},
	{
		displayName: 'Palavra Chave De Finalização',
		name: 'unknownMessage',
		type: 'string',
		default: 'Mensagem não reconhecida',
		required: true,
		description: 'Digite a palavra/frase que sera usado para fechar o bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},
	{
		displayName: 'Escuta Mensagens Enviadas Por Mim',
		name: 'listeningFromMe',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},
	{
		displayName: 'Pausa O Bot Quando Eu Enviar Uma Mensagem',
		name: 'stopBotFromMe',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},
	{
		displayName: 'Mantem a Sessão Do Bot Aberta',
		name: 'keepOpen',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},
	{
		displayName: 'Tempo De Espera (Em Segundos)',
		name: 'debounceTime',
		type: 'number',
		default: 0,
		required: true,
		description:
			'Este é o tempo que o bot ficará esperando as proximas mensagens após receber uma mensagem, depois ele juntará todas as mensagens em uma só',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['createDify', 'updateDify'],
			},
		},
	},

	// Change Session Status Dify
	{
		displayName: 'Numero Do Destinatario',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'RemoteJid do destinarario',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['changeStatusDify'],
			},
		},
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Aberta',
				value: 'opened',
			},
			{
				name: 'Pausada',
				value: 'paused',
			},
			{
				name: 'Fechada',
				value: 'closed',
			},
		],
		default: 'opened',
		description: 'Escolha qual será o status da seção',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['difyBot'],
				resourceForDifyBot: ['changeStatusDify'],
			},
		},
	},

	{
		displayName: 'Nome Da Instancia',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar a mensagem',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
			},
		},
	},
	{
		displayName: 'O Que Deseja Fazer',
		name: 'resourceForFlowiseBot',
		type: 'options',
		options: [
			{
				name: 'Adicionar Flowise',
				value: 'createFlowise',
			},
			{
				name: 'Verificar Flowise',
				value: 'findFlowise',
			},
			{
				name: 'Atualizar Flowise',
				value: 'updateFlowise',
			},
			{
				name: 'Deletar Flowise',
				value: 'deleteFlowise',
			},
			{
				name: 'Procurar Sessão No Flowise',
				value: 'fetchSessionsFlowise',
			},
			{
				name: 'Alterar Status Da Sessão No Flowise',
				value: 'changeStatusFlowise',
			},
		],
		default: 'createFlowise',
		description: 'Escolha uma opção para realizar com a integração do Flowise',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
			},
		},
	},

	// update Flowise
	{
		displayName: 'ID Do Flowise',
		name: 'flowiseBotId',
		type: 'string',
		default: '',
		description: 'Digite o ID do Flowise que deseja buscar, deixe vazio para procurar todos',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: [
					'updateFlowise',
					'findFlowise',
					'deleteFlowise',
					'fetchSessionsFlowise',
					'changeStatusFlowise',
				],
			},
		},
	},

	//Se createFlowise ou updateFlowise
	{
		displayName: 'Url Do Flowise',
		name: 'apiUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'Digite a URL do seu Flowise',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},
	{
		displayName: 'ApiKey Do Flowise',
		name: 'apiKeyBot',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		description: 'Digite a ApiKey do seu bot do Flowise',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},
	{
		displayName: 'Tipo De Gatilho',
		name: 'triggerType',
		type: 'options',
		options: [
			{
				name: 'Palavra Chave',
				value: 'keyword',
			},
			{
				name: 'Todos',
				value: 'all',
			},
		],
		default: 'keyword',
		description: 'Escolha uma opção para realizar com a integração do Flowise',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},
	{
		displayName: 'Operador Do Gatilho',
		name: 'triggerOperator',
		type: 'options',
		options: [
			{
				name: 'Contem',
				value: 'contains',
			},
			{
				name: 'Igual À',
				value: 'equals',
			},
			{
				name: 'Começa com',
				value: 'startsWith',
			},
			{
				name: 'Termina com',
				value: 'endsWith',
			},
			{
				name: 'Regex',
				value: 'regex',
			},
		],
		default: 'contains',
		description: 'Escolha uma opção para realizar com a integração do Flowise',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
				triggerType: ['keyword'],
			},
		},
	},
	{
		displayName: 'Gatilho',
		name: 'triggerValue',
		type: 'string',
		default: '',
		required: true,
		description:
			'Digite a palavra/frase ou regex para ser usado como gatilho para iniciar o Flowise',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
				triggerType: ['keyword'],
			},
		},
	},
	{
		displayName: 'Expira Em (Minutos)',
		name: 'expire',
		type: 'number',
		default: 0,
		required: true,
		description: 'Digite quantos minutos sem respostas o bot devera ser desativado',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},
	{
		displayName: 'Palavra Chave De Finalização',
		name: 'keywordFinish',
		type: 'string',
		default: '#sair',
		required: true,
		description: 'Digite a palavra/frase que sera usado para fechar o bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},
	{
		displayName: 'Delay Padrão Da Mensagem (Em Milésimos)',
		name: 'delayMessage',
		type: 'number',
		default: 1000,
		required: true,
		description: 'Digite quantos milisegundos o bot terá de delay',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},
	{
		displayName: 'Palavra Chave De Finalização',
		name: 'unknownMessage',
		type: 'string',
		default: 'Mensagem não reconhecida',
		required: true,
		description: 'Digite a palavra/frase que sera usado para fechar o bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},
	{
		displayName: 'Escuta Mensagens Enviadas Por Mim',
		name: 'listeningFromMe',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},
	{
		displayName: 'Pausa O Bot Quando Eu Enviar Uma Mensagem',
		name: 'stopBotFromMe',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},
	{
		displayName: 'Mantem a Sessão Do Bot Aberta',
		name: 'keepOpen',
		type: 'boolean',
		default: false,
		description: 'Whether',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},
	{
		displayName: 'Tempo De Espera (Em Segundos)',
		name: 'debounceTime',
		type: 'number',
		default: 0,
		required: true,
		description:
			'Este é o tempo que o bot ficará esperando as proximas mensagens após receber uma mensagem, depois ele juntará todas as mensagens em uma só',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['createFlowise', 'updateFlowise'],
			},
		},
	},

	// Change Session Status Flowise
	{
		displayName: 'Numero Do Destinatario',
		name: 'remoteJid',
		type: 'string',
		default: '',
		required: true,
		description: 'RemoteJid do destinarario',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['changeStatusFlowise'],
			},
		},
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Aberta',
				value: 'opened',
			},
			{
				name: 'Pausada',
				value: 'paused',
			},
			{
				name: 'Fechada',
				value: 'closed',
			},
		],
		default: 'opened',
		description: 'Escolha qual será o status da seção',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['flowiseBot'],
				resourceForFlowiseBot: ['changeStatusFlowise'],
			},
		},
	},

	{
		displayName: 'JIDs Ignorados',
		name: 'ignoreJids',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		default: [],
		description: 'Lista de JIDs que serão ignorados pelo bot',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	},
	{
		displayName: 'Tipo do Operador',
		name: 'triggerOperator',
		type: 'options',
		options: [
			{
				name: 'Contém',
				value: 'contains',
			},
			{
				name: 'Igual',
				value: 'equals',
			},
			{
				name: 'Começa Com',
				value: 'startsWith',
			},
			{
				name: 'Termina Com',
				value: 'endsWith',
			},
			{
				name: 'Regex',
				value: 'regex',
			},
			{
				name: 'Nenhum',
				value: 'none',
			},
		],
		default: 'equals',
		description: 'Escolha o tipo de operador para o gatilho',
		displayOptions: {
			show: {
				resource: ['integrations-api'],
				operation: ['evolution-bot'],
				resourceForEvolutionBot: ['createEvolutionBot', 'updateEvolutionBot'],
			},
		},
	}
];
