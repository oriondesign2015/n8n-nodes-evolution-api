import { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData, IRequestOptions, IHttpRequestMethods, IDataObject, NodeApiError } from 'n8n-workflow';
import { httpVerbFields, httpVerbOperations } from './HttpVerbDescription';
// Observação deste documento:
// Este documento serve para a realizar as requisições do node
// Utilizando os campos definidos no HttpVerbDescription.ts

export class HttpBin implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Evolution API',
		name: 'httpBin',
		icon: 'file:evolutionapi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Evolution API',
		defaults: {
			name: 'Evolution API',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'httpbinApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://doc.evolution-api.com/api-reference',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Instancia',
						value: 'instances-api',
					},
					{
						name: 'Mensagem',
						value: 'messages-api',
					},
				],
				default: 'instances-api',
			},
			...httpVerbOperations,
			...httpVerbFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		let responseData;

		if (resource === 'instances-api' && operation === 'instance-basic') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0) as string;
			const token = this.getNodeParameter('token', 0, '') as string;
			const number = this.getNodeParameter('number', 0, '') as string;

			const optionsCreateInstance = this.getNodeParameter('options_Create_instance', 0) as IDataObject;

			// Verifica se optionsCreateInstance é um objeto
			if (typeof optionsCreateInstance !== 'object' || optionsCreateInstance === null) {
				throw new NodeApiError(this.getNode(), 'options_Create_instance deve ser um objeto.');
			}

			const requestBody: IDataObject = {
				instanceName,
				token: token || undefined,
				number: number || undefined,
				integration: 'whatsapp-baileys', // ou outro valor conforme necessário
				// Campos do Proxy
				proxyHost: (optionsCreateInstance.proxy && optionsCreateInstance.proxy.proxyHost) || undefined,
				proxyPort: (optionsCreateInstance.proxy && optionsCreateInstance.proxy.proxyPort) || undefined,
				proxyProtocol: (optionsCreateInstance.proxy && optionsCreateInstance.proxy.proxyProtocol) || undefined,
				proxyUsername: (optionsCreateInstance.proxy && optionsCreateInstance.proxy.proxyUsername) || undefined,
				proxyPassword: (optionsCreateInstance.proxy && optionsCreateInstance.proxy.proxyPassword) || undefined,
				// Campos do Chatwoot
				chatwootAccountId: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootAccountId) || undefined,
				chatwootToken: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootToken) || undefined,
				chatwootUrl: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootUrl) || undefined,
				chatwootSignMsg: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootSignMsg) || undefined,
				chatwootReopenConversation: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootReopenConversation) || undefined,
				chatwootConversationPending: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootConversationPending) || undefined,
				chatwootImportContacts: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootImportContacts) || undefined,
				chatwootNameInbox: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootNameInbox) || undefined,
				chatwootMergeBrazilContacts: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootMergeBrazilContacts) || undefined,
				chatwootImportMessages: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootImportMessages) || undefined,
				chatwootDaysLimitImportMessages: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootDaysLimitImportMessages) || undefined,
				chatwootOrganization: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootOrganization) || undefined,
				chatwootLogo: (optionsCreateInstance.chatwoot && optionsCreateInstance.chatwoot.chatwootLogo) || undefined,
				// Campos do Typebot
				typebotUrl: (optionsCreateInstance.typebot && optionsCreateInstance.typebot.typebotUrl) || undefined,
				typebot: (optionsCreateInstance.typebot && optionsCreateInstance.typebot.typebot) || undefined,
				typebotExpire: (optionsCreateInstance.typebot && optionsCreateInstance.typebot.typebotExpire) || undefined,
				typebotKeywordFinish: (optionsCreateInstance.typebot && optionsCreateInstance.typebot.typebotKeywordFinish) || undefined,
				typebotDelayMessage: (optionsCreateInstance.typebot && optionsCreateInstance.typebot.typebotDelayMessage) || undefined,
				typebotUnknownMessage: (optionsCreateInstance.typebot && optionsCreateInstance.typebot.typebotUnknownMessage) || undefined,
				typebotListeningFromMe: (optionsCreateInstance.typebot && optionsCreateInstance.typebot.typebotListeningFromMe) || undefined,
				// Outros campos adicionais
				rejectCall: (optionsCreateInstance.instanceSettings && optionsCreateInstance.instanceSettings.rejectCall) || undefined,
				msgCall: (optionsCreateInstance.instanceSettings && optionsCreateInstance.instanceSettings.msgCall) || undefined,
				groupsIgnore: (optionsCreateInstance.instanceSettings && optionsCreateInstance.instanceSettings.groupsIgnore) || undefined,
				alwaysOnline: (optionsCreateInstance.instanceSettings && optionsCreateInstance.instanceSettings.alwaysOnline) || undefined,
				readMessages: (optionsCreateInstance.instanceSettings && optionsCreateInstance.instanceSettings.readMessages) || undefined,
				readStatus: (optionsCreateInstance.instanceSettings && optionsCreateInstance.instanceSettings.readStatus) || undefined,
				syncFullHistory: (optionsCreateInstance.instanceSettings && optionsCreateInstance.instanceSettings.syncFullHistory) || undefined,
			};

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/instance/create`,
				body: requestBody,
				json: true,
			};

			responseData = await this.helpers.request(options);
		}

		// Criar instancia com Proxy
		if (resource === 'instances-api' && operation === 'instance-proxy') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const token = this.getNodeParameter('token', 0);
			const integration = this.getNodeParameter('integration', 0);
			const proxyHost = this.getNodeParameter('proxyHost', 0);
			const proxyPort = this.getNodeParameter('proxyPort', 0);
			const proxyProtocol = this.getNodeParameter('proxyProtocol', 0);
			const proxyUsername = this.getNodeParameter('proxyUsername', 0);
			const proxyPassword = this.getNodeParameter('proxyPassword', 0);

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/instance/create`,
				body: {
					instanceName,
					token,
					integration,
					proxyHost,
					proxyPort,
					proxyProtocol,
					proxyUsername,
					proxyPassword,
				},
				json: true,
			};

			responseData = await this.helpers.request(options);
		}

		// Conectar Instância
		if (resource === 'instances-api' && operation === 'instance-connect') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);

			const options: IRequestOptions = {
				method: 'GET' as IHttpRequestMethods,
				headers: {
					apikey: apiKey,
				},
				uri: `${serverUrl}/instance/connect/${instanceName}`,
				json: true,
			};

			responseData = await this.helpers.request(options);
		}

		// Reiniciar Instancia
		if (resource === 'instances-api' && operation === 'restart-instance') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					apikey: apiKey,
				},
				uri: `${serverUrl}/instance/restart/${instanceName}`,
				json: true,
			};

			responseData = await this.helpers.request(options);
		}

		// Desconectar instancia
		if (resource === 'instances-api' && operation === 'logout-instance') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);

			const options: IRequestOptions = {
				method: 'DELETE' as IHttpRequestMethods,
				headers: {
					apikey: apiKey,
				},
				uri: `${serverUrl}/instance/logout/${instanceName}`,
				json: true,
			};

			responseData = await this.helpers.request(options);
		}

		// Definir presença
		if (resource === 'instances-api' && operation === 'setPresence') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const presence = this.getNodeParameter('presence', 0);

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/instance/setPresence/${instanceName}`,
				body: {
					presence: presence,
				},
				json: true,
			};
			responseData = await this.helpers.request(options);
		}

		// Deletar instancia
		if (resource === 'instances-api' && operation === 'delete-instance') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);

			const options: IRequestOptions = {
				method: 'DELETE' as IHttpRequestMethods,
				headers: {
					apikey: apiKey,
				},
				uri: `${serverUrl}/instance/delete/${instanceName}`,
				json: true,
			};

			responseData = await this.helpers.request(options);
		}

		// Buscar Instancia
		if (resource === 'instances-api' && operation === 'fetch-instances') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);

			const options: IRequestOptions = {
				method: 'GET' as IHttpRequestMethods,
				headers: {
					apikey: apiKey,
				},
				uri: `${serverUrl}/instance/fetchInstances${instanceName ? `?instanceName=${instanceName}` : ''}`,
				json: true,
			};

			responseData = await this.helpers.request(options);
		}

		// Confiturações da instancia
		if (resource === 'instances-api' && operation === 'instanceSettings') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const rejectCall = this.getNodeParameter('rejectCall', 0);
			const msgCall = this.getNodeParameter('msgCall', 0) || ''; // Define um valor padrão
			const groupsIgnore = this.getNodeParameter('groupsIgnore', 0);
			const alwaysOnline = this.getNodeParameter('alwaysOnline', 0);
			const readMessages = this.getNodeParameter('readMessages', 0);
			const syncFullHistory = this.getNodeParameter('syncFullHistory', 0);
			const readStatus = this.getNodeParameter('readStatus', 0);

			const body: any = {
				rejectCall,
				msgCall: msgCall || '',
				groupsIgnore,
				alwaysOnline,
				readMessages,
				syncFullHistory,
				readStatus,
			};

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/settings/set/${instanceName}`,
				body,
				json: true,
			};
			responseData = await this.helpers.request(options);
			// Adiciona msgCall apenas se rejectCall for true
			if (rejectCall) {
				body.msgCall = msgCall || '';
			}
		}

		// Enviar mensagem de texto
		if (resource === 'messages-api' && operation === 'sendText') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const remoteJid = this.getNodeParameter('remoteJid', 0);
			const messageText = this.getNodeParameter('messageText', 0);
			const mentionsEveryOne = this.getNodeParameter('mentionsEveryOne', 0);

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/message/sendText/${instanceName}`,
				body: {
					number: remoteJid,
					text: messageText,
					mentionsEveryOne: mentionsEveryOne,
				},
				json: true,
			};
			responseData = await this.helpers.request(options);
		}

		// Enviar mensagem de imagem
		if (resource === 'messages-api' && operation === 'sendImage') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const remoteJid = this.getNodeParameter('remoteJid', 0);
			const media = this.getNodeParameter('media', 0);
			const mimetype = this.getNodeParameter('mimetype', 0);
			const caption = this.getNodeParameter('caption', 0);
			const fileName = this.getNodeParameter('fileName', 0);
			const mentionsEveryOne = this.getNodeParameter('mentionsEveryOne', 0);

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/message/sendMedia/${instanceName}`,
				body: {
					number: remoteJid,
					'mediatype': 'image',
					media: media,
					mimetype: mimetype,
					caption: caption,
					fileName: fileName,
					mentionsEveryOne: mentionsEveryOne,

				},
				json: true,
			};
			responseData = await this.helpers.request(options);
		}

		// Enviar mensagem de video
		if (resource === 'messages-api' && operation === 'sendVideo') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const remoteJid = this.getNodeParameter('remoteJid', 0);
			const media = this.getNodeParameter('media', 0);
			const mimetype = this.getNodeParameter('mimetype', 0);
			const caption = this.getNodeParameter('caption', 0);
			const fileName = this.getNodeParameter('fileName', 0);
			const mentionsEveryOne = this.getNodeParameter('mentionsEveryOne', 0);

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/message/sendMedia/${instanceName}`,
				body: {
					number: remoteJid,
					'mediatype': 'video',
					media: media,
					mimetype: mimetype,
					caption: caption,
					fileName: fileName,
					mentionsEveryOne: mentionsEveryOne,
				},
				json: true,
			};
			responseData = await this.helpers.request(options);
		}

		// Enviar mensagem de audio
		if (resource === 'messages-api' && operation === 'sendAudio') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const remoteJid = this.getNodeParameter('remoteJid', 0);
			const media = this.getNodeParameter('media', 0);
			const mentionsEveryOne = this.getNodeParameter('mentionsEveryOne', 0);

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/message/sendWhatsAppAudio/${instanceName}`,
				body: {
					number: remoteJid,
					audio: media,
					mentionsEveryOne: mentionsEveryOne,
				},
				json: true,
			};
			responseData = await this.helpers.request(options);
		}

		// Enviar mensagem de documento
		if (resource === 'messages-api' && operation === 'sendDocumento') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const remoteJid = this.getNodeParameter('remoteJid', 0);
			const media = this.getNodeParameter('media', 0);
			const caption = this.getNodeParameter('caption', 0);
			const fileName = this.getNodeParameter('fileName', 0);
			const mentionsEveryOne = this.getNodeParameter('mentionsEveryOne', 0);

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/message/sendMedia/${instanceName}`,
				body: {
					number: remoteJid,
					'mediatype': 'document',
					media: media,
					caption: caption,
					fileName: fileName,
					mentionsEveryOne: mentionsEveryOne,
				},
				json: true,
			};
			responseData = await this.helpers.request(options);
		}

		// Enviar Enquete
		if (resource === 'messages-api' && operation === 'sendPoll') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const remoteJid = this.getNodeParameter('remoteJid', 0);
			const pollTitle = this.getNodeParameter('caption', 0);
			const options = this.getNodeParameter('options_display.metadataValues', 0) as { optionValue: string }[]; // Definindo o tipo
			const mentionsEveryOne = this.getNodeParameter('mentionsEveryOne', 0);

			// Verifica se options é um array e não está vazio
			const pollOptions = Array.isArray(options) ? options.map(option => option.optionValue) : [];

			const requestOptions: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/message/sendPoll/${instanceName}`,
				body: {
					number: remoteJid,
					name: pollTitle,
					values: pollOptions,
					selectableCount: pollOptions.length, // Adicionando o campo selectableCount
					mentionsEveryOne: mentionsEveryOne,
				},
				json: true,
			};
			responseData = await this.helpers.request(requestOptions);
		}

		// Enviar Lista
		if (resource === 'messages-api' && operation === 'sendList') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const remoteJid = this.getNodeParameter('remoteJid', 0);
			const listTitle = this.getNodeParameter('title', 0);
			const listDescription = this.getNodeParameter('description', 0) || ''; // Permite que description seja vazia
			const footerText = this.getNodeParameter('footerText', 0);
			const buttonText = this.getNodeParameter('buttonText', 0);
			const options = this.getNodeParameter('options_display.metadataValues', 0) as { optionTitle: string, optionDescription: string, rowId: string }[];

			// Verifica se options é um array e não está vazio
			const listOptions = Array.isArray(options) ? options.map(option => ({
				title: option.optionTitle,
				description: option.optionDescription,
				rowId: option.rowId,
			})) : [];

			const requestOptions: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/message/sendList/${instanceName}`,
				body: {
					number: remoteJid,
					title: listTitle,
					description: listDescription,
					footerText: footerText,
					buttonText: buttonText,
					sections: [
						{
							title: listTitle,
							description: listOptions.map(option => option.description),
							rows: listOptions,
						},
					],
				},
				json: true,
			};
			responseData = await this.helpers.request(requestOptions);
		}

		// Enviar status
		if (resource === 'messages-api' && operation === 'sendStories') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0);
			const type = this.getNodeParameter('type', 0);
			const content = this.getNodeParameter('content', 0);
			const caption = this.getNodeParameter('caption', 0);
			const backgroundColor = this.getNodeParameter('backgroundColor', 0);
			const font = this.getNodeParameter('font', 0);

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/message/sendStatus/${instanceName}`,
				body: {
					type: type,
					content: content,
					caption: caption,
					backgroundColor: backgroundColor,
					font: font,
					'allContacts': true,
				},
				json: true,
			};
			responseData = await this.helpers.request(options);
		}


		// Retornar apenas o JSON
		return [this.helpers.returnJsonArray(responseData)];
	}


}
