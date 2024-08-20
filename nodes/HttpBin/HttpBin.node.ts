import { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData, IRequestOptions, IHttpRequestMethods, NodeApiError } from 'n8n-workflow';
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

			const instanceName = this.getNodeParameter('instanceName', 0);
			const token = this.getNodeParameter('token', 0) || '';
			const number = this.getNodeParameter('number', 0) || '';

			// Inicializa o corpo básico da requisição
			const body: any = {
				instanceName,
				integration: 'WHATSAPP-BAILEYS',
			};

			if (token) {
				body.token = token;
			}
			if (number) {
				body.number = number;
			}

			// Verifica e adiciona configurações da instância se existirem
			const instanceSettings = this.getNodeParameter('options_Create_instance.instanceSettings.settings', 0, {}) as {
				rejectCall?: boolean;
				msgCall?: string;
				groupsIgnore?: boolean;
				alwaysOnline?: boolean;
				readMessages?: boolean;
				readStatus?: boolean;
				syncFullHistory?: boolean;
			};
			if (instanceSettings && Object.keys(instanceSettings).length > 0) {
				Object.assign(body, instanceSettings);
			}

			// Verifica e adiciona configurações de proxy se existirem
			const proxySettings = this.getNodeParameter('options_Create_instance.proxy.proxySettings', 0, {}) as {
				proxyHost?: string;
				proxyPort?: number;
				proxyProtocol?: string;
				proxyUsername?: string;
				proxyPassword?: string;
			};
			if (proxySettings && Object.keys(proxySettings).length > 0) {
				Object.assign(body, {
					proxyHost: proxySettings.proxyHost || "",
					proxyPort: proxySettings.proxyPort ? String(proxySettings.proxyPort) : "1234", // Converte para string
					proxyProtocol: proxySettings.proxyProtocol || "",
					proxyUsername: proxySettings.proxyUsername || "",
					proxyPassword: proxySettings.proxyPassword || "",
				});
			}

			// Verifica e adiciona configurações do Chatwoot se existirem
			const chatwootSettings = this.getNodeParameter('options_Create_instance.chatwoot.chatwootSettings', 0, {}) as {
				chatwootAccountId?: string;
				chatwootToken?: string;
				chatwootUrl?: string;
				chatwootSignMsg?: boolean;
				chatwootReopenConversation?: boolean;
				chatwootConversationPending?: boolean;
				chatwootImportContacts?: boolean;
				chatwootNameInbox?: string;
				chatwootMergeBrazilContacts?: boolean;
				chatwootImportMessages?: boolean;
				chatwootDaysLimitImportMessages?: number;
				chatwootOrganization?: string;
				chatwootLogo?: string;
			};

			// Adiciona todos os campos do Chatwoot
			body.chatwootAccountId = chatwootSettings.chatwootAccountId || '';
			body.chatwootToken = chatwootSettings.chatwootToken || '';
			body.chatwootUrl = chatwootSettings.chatwootUrl || '';
			body.chatwootSignMsg = chatwootSettings.chatwootSignMsg !== undefined ? chatwootSettings.chatwootSignMsg : false;
			body.chatwootReopenConversation = chatwootSettings.chatwootReopenConversation || false;
			body.chatwootConversationPending = chatwootSettings.chatwootConversationPending || false;
			body.chatwootImportContacts = chatwootSettings.chatwootImportContacts || false;
			body.chatwootNameInbox = chatwootSettings.chatwootNameInbox || '';
			body.chatwootMergeBrazilContacts = chatwootSettings.chatwootMergeBrazilContacts || false;
			body.chatwootImportMessages = chatwootSettings.chatwootImportMessages || false;
			body.chatwootDaysLimitImportMessages = chatwootSettings.chatwootDaysLimitImportMessages || 0;
			body.chatwootOrganization = chatwootSettings.chatwootOrganization || '';
			body.chatwootLogo = chatwootSettings.chatwootLogo || '';

			const options: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
					apikey: apiKey,
				},
				uri: `${serverUrl}/instance/create`,
				body,
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
			// const mimetype = this.getNodeParameter('mimetype', 0);
			const caption = this.getNodeParameter('caption', 0);
			// const fileName = this.getNodeParameter('fileName', 0);
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
					'mimetype': '',
					caption: caption,
					'fileName': '',
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
			// const mimetype = this.getNodeParameter('mimetype', 0);
			const caption = this.getNodeParameter('caption', 0);
			// const fileName = this.getNodeParameter('fileName', 0);
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
					'mimetype': '',
					caption: caption,
					'fileName': '',
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
			// const fileName = this.getNodeParameter('fileName', 0);
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
					'fileName': '',
					mentionsEveryOne: mentionsEveryOne,
				},
				json: true,
			};
			responseData = await this.helpers.request(options);
		}

		// Enviar Enquete
		if (resource === 'messages-api' && operation === 'sendPoll') {
			try {
					console.log('Iniciando o envio da enquete...');

					const credentials = await this.getCredentials('httpbinApi');
					console.log('Credenciais obtidas:', credentials);

					const serverUrl = credentials['server-url'];
					const apiKey = credentials.apikey;
					console.log('URL do servidor:', serverUrl);
					console.log('API Key:', apiKey);

					const instanceName = this.getNodeParameter('instanceName', 0);
					const remoteJid = this.getNodeParameter('remoteJid', 0);
					const pollTitle = this.getNodeParameter('caption', 0);
					const options = this.getNodeParameter('options_display.metadataValues', 0) as { optionValue: string }[];
					const mentionsEveryOne = this.getNodeParameter('mentionsEveryOne', 0);

					// Log para verificar os valores
					console.log('Valores recebidos:', { instanceName, remoteJid, pollTitle, options, mentionsEveryOne });

					// Verifica se options é um array e não está vazio
					const pollOptions = Array.isArray(options) ? options.map(option => option.optionValue) : [];
					console.log('Opções da enquete:', pollOptions);

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
									selectableCount: 1,
									mentionsEveryOne: mentionsEveryOne,
									values: pollOptions,
							},
							json: true,
					};

					console.log('Opções da requisição:', requestOptions);

					responseData = await this.helpers.request(requestOptions);
					console.log('Resposta da API:', responseData);
			} catch (error) {
					console.error('Erro ao enviar a enquete:', error);
					throw new NodeApiError(this.getNode(), error); // Substitua aqui
			}
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
