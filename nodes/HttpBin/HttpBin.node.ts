import { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData, IRequestOptions, IHttpRequestMethods, IDataObject } from 'n8n-workflow';
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

		// Criar instancia basica
		if (resource === 'instances-api' && operation === 'instance-basic') {
			const credentials = await this.getCredentials('httpbinApi');
			const serverUrl = credentials['server-url'];
			const apiKey = credentials.apikey;
			const instanceName = this.getNodeParameter('instanceName', 0) as string;
			const token = this.getNodeParameter('token', 0, '') as string;
			const number = this.getNodeParameter('number', 0, '') as string;

			const requestBody: IDataObject = {
				instanceName,
				'integration': 'whatsapp-baileys',
			};

			if (token) {
				requestBody.token = token;
			}

			if (number) {
				requestBody.number = number;
			}

			const optionsCreateInstance = this.getNodeParameter('options_Create_instance', 0) as IDataObject;

			if (optionsCreateInstance.instanceSettings) {
				const settings = (optionsCreateInstance.instanceSettings as IDataObject).settings as IDataObject;
				if (settings) {
					const rejectCall = settings.rejectCall as boolean;
					const groupsIgnore = settings.groupsIgnore as boolean;
					const alwaysOnline = settings.alwaysOnline as boolean;
					const readMessages = settings.readMessages as boolean;
					const readStatus = settings.readStatus as boolean;
					const syncFullHistory = settings.syncFullHistory as boolean;

					requestBody.settings = {
						rejectCall,
						groupsIgnore,
						alwaysOnline,
						readMessages,
						readStatus,
						syncFullHistory,
					};

					if ('msgCall' in settings) {
						(requestBody.settings as IDataObject).msgCall = settings.msgCall as string;
					}
				}
			}

			if (optionsCreateInstance.proxy) {
				const proxySettings = (optionsCreateInstance.proxy as IDataObject).proxySettings as IDataObject;
				if (proxySettings) {
					const proxyHost = proxySettings.proxyHost as string;
					const proxyPort = proxySettings.proxyPort as number;
					const proxyProtocol = proxySettings.proxyProtocol as string;
					const proxyUsername = proxySettings.proxyUsername as string;
					const proxyPassword = proxySettings.proxyPassword as string;

					requestBody.proxy = {
						host: proxyHost,
						port: proxyPort,
						protocol: proxyProtocol,
						username: proxyUsername,
						password: proxyPassword,
					};
				}
			}

			if (optionsCreateInstance.chatwoot) {
				const chatwootSettings = (optionsCreateInstance.chatwoot as IDataObject).chatwootSettings as IDataObject;
				if (chatwootSettings) {
					const chatwootAccountId = chatwootSettings.chatwootAccountId as number;
					const chatwootToken = chatwootSettings.chatwootToken as string;
					const chatwootUrl = chatwootSettings.chatwootUrl as string;
					const chatwootSignMsg = chatwootSettings.chatwootSignMsg as boolean;
					const chatwootReopenConversation = chatwootSettings.chatwootReopenConversation as boolean;
					const chatwootConversationPending = chatwootSettings.chatwootConversationPending as boolean;
					const chatwootImportContacts = chatwootSettings.chatwootImportContacts as boolean;
					const chatwootNameInbox = chatwootSettings.chatwootNameInbox as string;
					const chatwootMergeBrazilContacts = chatwootSettings.chatwootMergeBrazilContacts as boolean;
					const chatwootImportMessages = chatwootSettings.chatwootImportMessages as boolean;
					const chatwootDaysLimitImportMessages = chatwootSettings.chatwootDaysLimitImportMessages as number;
					const chatwootOrganization = chatwootSettings.chatwootOrganization as string;
					const chatwootLogo = chatwootSettings.chatwootLogo as string;

					requestBody.chatwoot = {
						accountId: chatwootAccountId,
						token: chatwootToken,
						url: chatwootUrl,
						signMsg: chatwootSignMsg,
						reopenConversation: chatwootReopenConversation,
						conversationPending: chatwootConversationPending,
						importContacts: chatwootImportContacts,
						nameInbox: chatwootNameInbox,
						mergeBrazilContacts: chatwootMergeBrazilContacts,
						importMessages: chatwootImportMessages,
						daysLimitImportMessages: chatwootDaysLimitImportMessages,
						organization: chatwootOrganization,
						logo: chatwootLogo,
					};
				}
			}

			if (optionsCreateInstance.typebot) {
				const typebotSettings = (optionsCreateInstance.typebot as IDataObject).typebotSettings as IDataObject;
				if (typebotSettings) {
					const typebotUrl = typebotSettings.typebotUrl as string;
					const typebot = typebotSettings.typebot as string;
					const typebotExpire = typebotSettings.typebotExpire as number;
					const typebotKeywordFinish = typebotSettings.typebotKeywordFinish as string;
					const typebotDelayMessage = typebotSettings.typebotDelayMessage as number;
					const typebotUnknownMessage = typebotSettings.typebotUnknownMessage as string;
					const typebotListeningFromMe = typebotSettings.typebotListeningFromMe as boolean;

					requestBody.typebot = {
						url: typebotUrl,
						typebot,
						expire: typebotExpire,
						keywordFinish: typebotKeywordFinish,
						delayMessage: typebotDelayMessage,
						unknownMessage: typebotUnknownMessage,
						listeningFromMe: typebotListeningFromMe,
					};
				}
			}

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
					proxy: {
						host: proxyHost,
						port: proxyPort,
						protocol: proxyProtocol,
						username: proxyUsername,
						password: proxyPassword,
					},
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
