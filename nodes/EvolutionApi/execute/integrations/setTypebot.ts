import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function setTypebot(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const resourceForTypebot = ef.getNodeParameter('resourceForTypebot', 0);

		let options: IRequestOptions;

		if (resourceForTypebot === 'createTypebot') {
			const url = ef.getNodeParameter('url', 0) as string;
			const typebot = ef.getNodeParameter('typebot', 0) as string;
			const triggerType = ef.getNodeParameter('triggerType', 0) as string;
			const triggerOperator = ef.getNodeParameter('triggerOperator', 0) as string;
			const triggerValue = ef.getNodeParameter('triggerValue', 0) as string;
			const expire = ef.getNodeParameter('expire', 0) as number;
			const keywordFinish = ef.getNodeParameter('keywordFinish', 0) as string;
			const delayMessage = ef.getNodeParameter('delayMessage', 0) as number;
			const unknownMessage = ef.getNodeParameter('unknownMessage', 0) as string;
			const listeningFromMe = ef.getNodeParameter('listeningFromMe', 0) as boolean;
			const stopBotFromMe = ef.getNodeParameter('stopBotFromMe', 0) as boolean;
			const keepOpen = ef.getNodeParameter('keepOpen', 0) as boolean;
			const debounceTime = ef.getNodeParameter('debounceTime', 0) as number;

			const body = {
				enabled: true,
				url,
				typebot,
				triggerType,
				triggerOperator,
				triggerValue,
				expire,
				keywordFinish,
				delayMessage,
				unknownMessage,
				listeningFromMe,
				stopBotFromMe,
				keepOpen,
				debounceTime
			};

			options = {
				method: 'POST' as IHttpRequestMethods,
				uri: `/typebot/create/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForTypebot === 'findTypebot') {
			const typebotId = ef.getNodeParameter('typebotId', 0) as string;

			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: typebotId
					? `/typebot/fetch/${typebotId}/${instanceName}`
					: `/typebot/find/${instanceName}`,
				json: true,
			};
		} else if (resourceForTypebot === 'updateTypebot') {
			const typebotId = ef.getNodeParameter('typebotId', 0) as string;
			const url = ef.getNodeParameter('url', 0) as string;
			const typebot = ef.getNodeParameter('typebot', 0) as string;
			const expire = ef.getNodeParameter('expire', 0) as number;
			const keywordFinish = ef.getNodeParameter('keywordFinish', 0) as string;
			const delayMessage = ef.getNodeParameter('delayMessage', 0) as number;
			const unknownMessage = ef.getNodeParameter('unknownMessage', 0) as string;
			const listeningFromMe = ef.getNodeParameter('listeningFromMe', 0) as boolean;
			const stopBotFromMe = ef.getNodeParameter('stopBotFromMe', 0) as boolean;
			const keepOpen = ef.getNodeParameter('keepOpen', 0) as boolean;
			const debounceTime = ef.getNodeParameter('debounceTime', 0) as number;
			const triggerType = ef.getNodeParameter('triggerType', 0) as string;
			const triggerOperator = ef.getNodeParameter('triggerOperator', 0) as string;
			const triggerValue = ef.getNodeParameter('triggerValue', 0) as string;

			const body = {
				enabled: true,
				url,
				typebot,
				expire,
				keywordFinish,
				delayMessage,
				unknownMessage,
				listeningFromMe,
				stopBotFromMe,
				keepOpen,
				debounceTime,
				triggerType,
				triggerOperator,
				triggerValue
			};

			options = {
				method: 'PUT' as IHttpRequestMethods,
				uri: `/typebot/update/${typebotId}/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForTypebot === 'deleteTypebot') {
			const typebotId = ef.getNodeParameter('typebotId', 0) as string;

			options = {
				method: 'DELETE' as IHttpRequestMethods,
				uri: `/typebot/delete/${typebotId}/${instanceName}`,
				json: true,
			};
		} else if (resourceForTypebot === 'fetchSessionsTypebot') {
			const typebotId = ef.getNodeParameter('typebotId', 0) as string;

			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/typebot/fetchSessions/${typebotId}/${instanceName}`,
				json: true,
			};
		} else if (resourceForTypebot === 'changeStatusTypebot') {
			const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
			const status = ef.getNodeParameter('status', 0) as string;

			options = {
				method: 'POST' as IHttpRequestMethods,
				uri: `/typebot/changeStatus/${instanceName}`,
				body: {
					remoteJid,
					status,
				},
				json: true,
			};
		} else if (resourceForTypebot === 'startTypebot') {
			const url = ef.getNodeParameter('url', 0) as string;
			const typebot = ef.getNodeParameter('typebot', 0) as string;
			const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
			const startSession = ef.getNodeParameter('startSession', 0) as boolean;
			const variables = ef.getNodeParameter('variables', 0) as Array<{ name: string; value: string }>;

			const body = {
				url,
				typebot,
				remoteJid,
				startSession,
				...(variables?.length && { variables }),
			};

			options = {
				method: 'POST' as IHttpRequestMethods,
				uri: `/typebot/start/${instanceName}`,
				body,
				json: true,
			};
		} else {
			const errorData = {
				success: false,
				error: {
					message: 'Operação do Typebot não reconhecida',
					details: 'A operação solicitada não é válida para o recurso do Typebot',
					code: 'INVALID_OPERATION',
					timestamp: new Date().toISOString(),
				},
			};
			throw new NodeOperationError(ef.getNode(), errorData.error.message, {
				message: errorData.error.message,
				description: errorData.error.details,
			});
		}

		const response = await evolutionRequest(ef, options);
		return {
			json: {
				success: true,
				data: response,
			},
		};
	} catch (error) {
		const errorData = {
			success: false,
			error: {
				message: error.message.includes('Could not get parameter')
					? 'Parâmetros inválidos ou ausentes'
					: 'Erro ao configurar Typebot',
				details: error.message.includes('Could not get parameter')
					? 'Verifique se todos os campos obrigatórios foram preenchidos corretamente'
					: error.message,
				code: error.code || 'UNKNOWN_ERROR',
				timestamp: new Date().toISOString(),
			},
		};

		if (!ef.continueOnFail()) {
			throw new NodeOperationError(ef.getNode(), error.message, {
				message: errorData.error.message,
				description: errorData.error.details,
			});
		}

		return {
			json: errorData,
			error: errorData,
		};
	}
}
