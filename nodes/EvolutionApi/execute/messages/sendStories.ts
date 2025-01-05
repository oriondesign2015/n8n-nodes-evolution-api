import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendStories(ef: IExecuteFunctions) {
	try {
		// Parâmetros obrigatórios
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const content = ef.getNodeParameter('content', 0) as string;
		const type = ef.getNodeParameter('type', 0) as 'text' | 'image' | 'video' | 'audio';
		const caption = ef.getNodeParameter('caption', 0, '') as string;
		const allContacts = ef.getNodeParameter('allContacts', 0, false) as boolean;
		const backgroundColor = ef.getNodeParameter('backgroundColor', 0, '#000000') as string;
		const font = ef.getNodeParameter('font', 0, 1) as number;

		// Validação da URL do conteúdo para tipos não texto
		if (type !== 'text' && !content.startsWith('http') && !content.startsWith('data:')) {
			const errorData = {
				success: false,
				error: {
					message: 'Formato de conteúdo inválido',
					details: 'O conteúdo deve ser uma URL válida ou um base64',
					code: 'INVALID_CONTENT_FORMAT',
					timestamp: new Date().toISOString(),
				},
			};
			return {
				json: errorData,
				error: errorData,
			};
		}

		const body: any = {
			type,
			content,
			backgroundColor,
			font,
			allContacts
		};

		// Adiciona caption apenas para imagem ou vídeo
		if ((type === 'image' || type === 'video') && caption) {
			body.caption = caption;
		}

		// Se não for para todos os contatos, pega a lista específica
		if (!allContacts) {
			const statusJidList = ef.getNodeParameter('statusJidList', 0, '') as string;
			if (statusJidList) {
				body.statusJidList = statusJidList.split(',')
					.map(num => num.trim())
					.map(num => num.includes('@s.whatsapp.net') ? num : `${num}@s.whatsapp.net`);
			}
		}

		const requestOptions: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			headers: {
				'Content-Type': 'application/json',
			},
			uri: `/message/sendStatus/${instanceName}`,
			body,
			json: true,
		};

		const response = await evolutionRequest(ef, requestOptions);

		if (!response) {
			throw new Error('Resposta vazia do servidor');
		}

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
					: 'Erro ao enviar status',
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
