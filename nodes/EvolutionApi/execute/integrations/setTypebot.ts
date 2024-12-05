import { evolutionRequest } from '../chatwootRequest';
import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';

export async function setTypebot(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0);
	const resourceForTypebot = ef.getNodeParameter('resourceForTypebot', 0);

	let options: IRequestOptions;

	if (resourceForTypebot === 'createTypebot') {
		const url = ef.getNodeParameter('url', 0) as string;
		const typebot = ef.getNodeParameter('typebot', 0) as string;
		const triggerType = ef.getNodeParameter('triggerType', 0) as string;

		const body: any = {
			enabled: true,
			url,
			typebot,
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
			uri: `/typebot/create/${instanceName}`,
			body,
			json: true,
		};
	} else if (resourceForTypebot === 'findTypebot') {
		const typebotId = ef.getNodeParameter('typebotId', 0) as string;

		if (typebotId) {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/typebot/fetch/${typebotId}/${instanceName}`,
				json: true,
			};
		} else {
			options = {
				method: 'GET' as IHttpRequestMethods,
				uri: `/typebot/find/${instanceName}`,
				json: true,
			};
		}
	} else if (resourceForTypebot === 'updateTypebot') {
		const typebotId = ef.getNodeParameter('typebotId', 0) as string;
		const url = ef.getNodeParameter('url', 0) as string;
		const typebot = ef.getNodeParameter('typebot', 0) as string;
		const triggerType = ef.getNodeParameter('triggerType', 0) as string;

		const body: any = {
			enabled: true,
			url,
			typebot,
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
	} else if (resourceForTypebot === 'startTypebot') {
		const url = ef.getNodeParameter('url', 0) as string;
		const typebot = ef.getNodeParameter('typebot', 0) as string;
		const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
		const startSession = ef.getNodeParameter('startSession', 0) as boolean;

		const body: any = {
			url,
			typebot,
			remoteJid,
			startSession,
		};

		const variablesDisplay = ef.getNodeParameter('variables_display', 0) as {
			metadataValues: { name: string; value: string }[];
		};
		if (variablesDisplay.metadataValues.length > 0) {
			body.variables = variablesDisplay.metadataValues.map((variable) => ({
				name: variable.name,
				value: variable.value,
			}));
		}

		options = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/typebot/start/${instanceName}`,
			body,
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
	} else {
		// console.error('Operação de Typebot não reconhecida:', resourceForTypebot); // Adiciona log no console
		throw new NodeApiError(ef.getNode(), {
			message: 'Erro na requisição.',
			description: `Verifique se você preencheu todos os campos... Segue o erro: ${resourceForTypebot}.`,
		});
	}

	return await evolutionRequest(ef, options);
}
