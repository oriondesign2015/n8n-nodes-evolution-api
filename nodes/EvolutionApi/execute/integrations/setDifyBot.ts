import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function setDifyBot(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const resourceForDifyBot = ef.getNodeParameter('resourceForDifyBot', 0);

		let options: IRequestOptions;

		if (resourceForDifyBot === 'createDify') {
			const apiUrl = ef.getNodeParameter('apiUrl', 0) as string;
			const apiKey = ef.getNodeParameter('apiKey', 0) as string;
			const botType = ef.getNodeParameter('botType', 0) as string;
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
			const ignoreJids = ef.getNodeParameter('ignoreJids', 0) as string[];

			const body = {
				enabled: true,
				apiUrl,
				apiKey,
				botType,
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
				debounceTime,
				ignoreJids: ignoreJids || []
			};

			options = {
				method: 'POST' as IHttpRequestMethods,
				uri: `/dify/create/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForDifyBot === 'findDify') {
			const difyBotId = ef.getNodeParameter('difyBotId', 0) as string;

			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: difyBotId
					? `/dify/fetch/${difyBotId}/${instanceName}`
					: `/dify/find/${instanceName}`,
				json: true,
			};
		} else if (resourceForDifyBot === 'deleteDify') {
			const difyBotId = ef.getNodeParameter('difyBotId', 0) as string;

			options = {
				method: 'DELETE' as IHttpRequestMethods,
				uri: `/dify/delete/${difyBotId}/${instanceName}`,
				json: true,
			};
		} else if (resourceForDifyBot === 'updateDify') {
			const difyBotId = ef.getNodeParameter('difyBotId', 0) as string;
			const apiUrl = ef.getNodeParameter('apiUrl', 0) as string;
			const apiKey = ef.getNodeParameter('apiKeyBot', 0) as string;
			const botType = ef.getNodeParameter('botType', 0) as string;
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
			const ignoreJids = ef.getNodeParameter('ignoreJids', 0) as string[];

			const body = {
				enabled: true,
				botType,
				apiUrl,
				apiKey,
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
				debounceTime,
				ignoreJids: ignoreJids || []
			};

			options = {
				method: 'PUT' as IHttpRequestMethods,
				uri: `/dify/update/${difyBotId}/${instanceName}`,
				body,
				json: true,
			};
		} else if (resourceForDifyBot === 'fetchSessionsDify') {
			const difyBotId = ef.getNodeParameter('difyBotId', 0) as string;

			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/dify/fetchSessions/${difyBotId}/${instanceName}`,
				json: true,
			};
		} else {
			const errorData = {
				success: false,
				error: {
					message: 'Operação do Dify não reconhecida',
						details: 'A operação solicitada não é válida para o recurso do Dify',
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
					: 'Erro ao configurar Dify',
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
