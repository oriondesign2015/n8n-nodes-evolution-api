import { evolutionRequest } from '../chatwootRequest';
import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';

export async function setEvolutionBot(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const resourceForEvolutionBot = ef.getNodeParameter('resourceForEvolutionBot', 0);

	let options: IRequestOptions | undefined;

	if (resourceForEvolutionBot === 'createEvolutionBot') {
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
			uri: `/evolutionBot/create/${instanceName}`,
			body,
			json: true,
		};
	} else if (resourceForEvolutionBot === 'findEvolutionBot') {
		const evolutionBotId = ef.getNodeParameter('evolutionBotId', 0) as string;

		if (evolutionBotId) {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/evolutionBot/fetch/${evolutionBotId}/${instanceName}`,
				json: true,
			};
		} else {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/evolutionBot/find/${instanceName}`,
				json: true,
			};
		}
	} else if (resourceForEvolutionBot === 'updateEvolutionBot') {
		const evolutionBotId = ef.getNodeParameter('evolutionBotId', 0) as string;
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
			uri: `/evolutionBot/update/${evolutionBotId}/${instanceName}`,
			body,
			json: true,
		};
	} else if (resourceForEvolutionBot === 'deleteEvolutionBot') {
		const evolutionBotId = ef.getNodeParameter('evolutionBotId', 0) as string;

		options = {
			method: 'DELETE' as IHttpRequestMethods,
			uri: `/evolutionBot/delete/${evolutionBotId}/${instanceName}`,
			json: true,
		};
	} else if (resourceForEvolutionBot === 'fetchSessionsEvolutionBot') {
		const evolutionBotId = ef.getNodeParameter('evolutionBotId', 0) as string;

		options = {
			method: 'GET' as IHttpRequestMethods,
			uri: `/evolutionBot/fetchSessions/${evolutionBotId}/${instanceName}`,
			json: true,
		};
	} else if (resourceForEvolutionBot === 'changeStatusEvolutionBot') {
		const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
		const status = ef.getNodeParameter('status', 0) as string;

		options = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/evolutionBot/changeStatus/${instanceName}`,
			body: {
				remoteJid,
				status,
			},
			json: true,
		};
	} else {
		throw new NodeApiError(ef.getNode(), {
			message: 'Operação de Evolution Bot não reconhecida.',
			description: 'A operação solicitada não é válida para o recurso de Evolution Bot.',
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
