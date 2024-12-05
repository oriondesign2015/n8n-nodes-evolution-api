import { chatwootRequest } from '../chatwootRequest';
import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';

export async function setDifyBot(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const resourceForDifyBot = ef.getNodeParameter('resourceForDifyBot', 0);

	let options: IRequestOptions | undefined;

	if (resourceForDifyBot === 'createDify') {
		const botType = ef.getNodeParameter('botType', 0) as string;
		const apiUrl = ef.getNodeParameter('apiUrl', 0) as string;
		const apiKeyBot = ef.getNodeParameter('apiKeyBot', 0) as string;
		const triggerType = ef.getNodeParameter('triggerType', 0) as string;

		const body: any = {
			enabled: true,
			botType,
			apiUrl,
			apiKey: apiKeyBot,
			triggerType,
		};

		if (triggerType === 'keyword') {
			const triggerOperator = ef.getNodeParameter('triggerOperator', 0) as string;
			const triggerValue = ef.getNodeParameter('triggerValue', 0) as string;
			body.triggerOperator = triggerOperator;
			body.triggerValue = triggerValue;
		}

		// Campos adicionais
		body.keywordFinish = ef.getNodeParameter('keywordFinish', 0) || '';
		body.delayMessage = ef.getNodeParameter('delayMessage', 0) || 1000;
		body.unknownMessage = ef.getNodeParameter('unknownMessage', 0) || 'Mensagem não reconhecida';
		body.listeningFromMe = ef.getNodeParameter('listeningFromMe', 0) || false;
		body.stopBotFromMe = ef.getNodeParameter('stopBotFromMe', 0) || false;
		body.keepOpen = ef.getNodeParameter('keepOpen', 0) || false;
		body.debounceTime = ef.getNodeParameter('debounceTime', 0) || 0;

		options = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/dify/create/${instanceName}`,
			body,
			json: true,
		};
	} else if (resourceForDifyBot === 'findDify') {
		const difyBotId = ef.getNodeParameter('difyBotId', 0) as string;

		if (difyBotId) {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/dify/fetch/${difyBotId}/${instanceName}`,
				json: true,
			};
		} else {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/dify/find/${instanceName}`,
				json: true,
			};
		}
	} else if (resourceForDifyBot === 'updateDify') {
		const difyBotId = ef.getNodeParameter('difyBotId', 0) as string;
		const botType = ef.getNodeParameter('botType', 0) as string;
		const apiUrl = ef.getNodeParameter('apiUrl', 0) as string;
		const apiKeyBot = ef.getNodeParameter('apiKeyBot', 0) as string;
		const triggerType = ef.getNodeParameter('triggerType', 0) as string;

		const body: any = {
			enabled: true,
			botType,
			apiUrl,
			apiKey: apiKeyBot,
			triggerType,
		};

		if (triggerType === 'keyword') {
			const triggerOperator = ef.getNodeParameter('triggerOperator', 0) as string;
			const triggerValue = ef.getNodeParameter('triggerValue', 0) as string;
			body.triggerOperator = triggerOperator;
			body.triggerValue = triggerValue;
		}

		// Campos adicionais
		body.keywordFinish = ef.getNodeParameter('keywordFinish', 0) || '';
		body.delayMessage = ef.getNodeParameter('delayMessage', 0) || 1000;
		body.unknownMessage = ef.getNodeParameter('unknownMessage', 0) || 'Mensagem não reconhecida';
		body.listeningFromMe = ef.getNodeParameter('listeningFromMe', 0) || false;
		body.stopBotFromMe = ef.getNodeParameter('stopBotFromMe', 0) || false;
		body.keepOpen = ef.getNodeParameter('keepOpen', 0) || false;
		body.debounceTime = ef.getNodeParameter('debounceTime', 0) || 0;

		options = {
			method: 'PUT' as IHttpRequestMethods,
			uri: `/dify/update/${difyBotId}/${instanceName}`,
			body,
			json: true,
		};
	} else if (resourceForDifyBot === 'deleteDify') {
		const difyBotId = ef.getNodeParameter('difyBotId', 0) as string;

		options = {
			method: 'DELETE' as IHttpRequestMethods,
			uri: `/dify/delete/${difyBotId}/${instanceName}`,
			json: true,
		};
	} else if (resourceForDifyBot === 'fetchSessionsDify') {
		const difyBotId = ef.getNodeParameter('difyBotId', 0) as string;

		options = {
			method: 'GET' as IHttpRequestMethods,
			uri: `/dify/fetchSessions/${difyBotId}/${instanceName}`,
			json: true,
		};
	} else if (resourceForDifyBot === 'changeStatusDify') {
		const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
		const status = ef.getNodeParameter('status', 0) as string;

		options = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/dify/changeStatus/${instanceName}`,
			body: {
				remoteJid,
				status,
			},
			json: true,
		};
	} else {
		throw new NodeApiError(ef.getNode(), {
			message: 'Operação de Dify não reconhecida.',
			description: 'A operação solicitada não é válida para o recurso de Dify.',
		});
	}

	if (options) {
		return await chatwootRequest(ef, options);
	} else {
		throw new NodeApiError(ef.getNode(), {
			message: 'Nenhuma opção de requisição foi definida.',
			description: 'Verifique a operação solicitada.',
		});
	}
}
