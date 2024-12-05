import { evolutionRequest } from '../chatwootRequest';
import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';

export async function setFlowiseBot(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const resourceForFlowiseBot = ef.getNodeParameter('resourceForFlowiseBot', 0);

	let options: IRequestOptions | undefined;

	if (resourceForFlowiseBot === 'createFlowise') {
		const apiUrl = ef.getNodeParameter('apiUrl', 0) as string;
		const apiKeyBot = ef.getNodeParameter('apiKeyBot', 0) as string;
		const triggerType = ef.getNodeParameter('triggerType', 0) as string;

		const body: any = {
			enabled: true,
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
			uri: `/flowise/create/${instanceName}`,
			body,
			json: true,
		};
	} else if (resourceForFlowiseBot === 'findFlowise') {
		const flowiseBotId = ef.getNodeParameter('flowiseBotId', 0) as string;

		if (flowiseBotId) {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/flowise/fetch/${flowiseBotId}/${instanceName}`,
				json: true,
			};
		} else {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/flowise/find/${instanceName}`,
				json: true,
			};
		}
	} else if (resourceForFlowiseBot === 'updateFlowise') {
		const flowiseBotId = ef.getNodeParameter('flowiseBotId', 0) as string;
		const apiUrl = ef.getNodeParameter('apiUrl', 0) as string;
		const apiKeyBot = ef.getNodeParameter('apiKeyBot', 0) as string;
		const triggerType = ef.getNodeParameter('triggerType', 0) as string;

		const body: any = {
			enabled: true,
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
			uri: `/flowise/update/${flowiseBotId}/${instanceName}`,
			body,
			json: true,
		};
	} else if (resourceForFlowiseBot === 'deleteFlowise') {
		const flowiseBotId = ef.getNodeParameter('flowiseBotId', 0) as string;

		options = {
			method: 'DELETE' as IHttpRequestMethods,
			uri: `/flowise/delete/${flowiseBotId}/${instanceName}`,
			json: true,
		};
	} else if (resourceForFlowiseBot === 'fetchSessionsFlowise') {
		const flowiseBotId = ef.getNodeParameter('flowiseBotId', 0) as string;

		options = {
			method: 'GET' as IHttpRequestMethods,
			uri: `/flowise/fetchSessions/${flowiseBotId}/${instanceName}`,
			json: true,
		};
	} else if (resourceForFlowiseBot === 'changeStatusFlowise') {
		const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
		const status = ef.getNodeParameter('status', 0) as string;

		options = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/flowise/changeStatus/${instanceName}`,
			body: {
				remoteJid,
				status,
			},
			json: true,
		};
	} else {
		throw new NodeApiError(ef.getNode(), {
			message: 'Operação de Flowise não reconhecida.',
			description: 'A operação solicitada não é válida para o recurso de Flowise.',
		});
	}

	if (options) {
		return await evolutionRequest(ef, options);
	} else {
		throw new NodeApiError(ef.getNode(), {
			message: 'Nenhuma opção de requisição foi definida.',
			description: 'Verifique a operação solicitada.',
		});
	}
}
