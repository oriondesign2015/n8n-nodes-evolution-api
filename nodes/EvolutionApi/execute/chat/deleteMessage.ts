import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

interface DeleteMessageBody {
	id: string;
	fromMe: boolean;
	remoteJid: string;
	participant?: string;
}

export async function deleteMessage(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
		const messageId = ef.getNodeParameter('messageId', 0) as string;
		const fromMe = ef.getNodeParameter('fromMe', 0) as boolean;

		const formattedRemoteJid = remoteJid.includes('@g.us') || remoteJid.includes('@s.whatsapp.net') 
			? remoteJid 
			: `${remoteJid}@s.whatsapp.net`;

		const body: DeleteMessageBody = {
			id: messageId,
			fromMe,
			remoteJid: formattedRemoteJid,
		};

		if (!fromMe) {
			const participant = ef.getNodeParameter('participant', 0) as string;
			body.participant = participant.includes('@s.whatsapp.net') 
				? participant 
				: `${participant}@s.whatsapp.net`;
		}

		const requestOptions: IRequestOptions = {
			method: 'DELETE' as IHttpRequestMethods,
			uri: `/chat/deleteMessageForEveryone/${instanceName}`,
			body,
			json: true,
		};

		const response = await evolutionRequest(ef, requestOptions);
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
				message: error.message,
				details: 'Erro ao deletar mensagem',
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
