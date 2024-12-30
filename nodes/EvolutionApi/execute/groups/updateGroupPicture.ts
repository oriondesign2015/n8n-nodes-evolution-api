import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function updateGroupPicture(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const groupJid = ef.getNodeParameter('groupJid', 0) as string;
		const image = ef.getNodeParameter('image', 0) as string;

		const body = {
			image,
		};

		const requestOptions: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			uri: `/group/updateGroupPicture/${instanceName}?groupJid=${groupJid}`,
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
				details: 'Erro ao atualizar imagem do grupo',
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
