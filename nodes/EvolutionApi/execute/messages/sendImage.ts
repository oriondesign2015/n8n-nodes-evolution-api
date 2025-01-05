import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendImage(ef: IExecuteFunctions) {
	const items = ef.getInputData();
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			// Parâmetros obrigatórios
			const instanceName = ef.getNodeParameter('instanceName', i) as string;
			const remoteJid = ef.getNodeParameter('remoteJid', i) as string;
			const media = ef.getNodeParameter('media', i) as string;

			// Parâmetros opcionais com valores padrão
			const mimetype = (ef.getNodeParameter('mimetype', i, 'image/jpeg') as string) || 'image/jpeg';
			const caption = ef.getNodeParameter('caption', i, '') as string;
			const fileName = (ef.getNodeParameter('fileName', i, 'image.jpg') as string) || 'image.jpg';

			// Opções adicionais
			const options = ef.getNodeParameter('options_message', i, {}) as {
				delay?: number;
				quoted?: {
					messageQuoted: {
						messageId: string;
					};
				};
				mentions?: {
					mentionsSettings: {
						mentionsEveryOne: boolean;
						mentioned?: string;
					};
				};
			};

			const body: any = {
				number: remoteJid,
				mediatype: 'image',
				media: media,
				mimetype: mimetype,
				caption: caption || '',
				fileName: fileName,
			};

			if (options.delay) {
				body.delay = options.delay;
			}

			if (options.quoted?.messageQuoted?.messageId) {
				body.quoted = {
					key: {
						id: options.quoted.messageQuoted.messageId,
					},
				};
			}

			if (options.mentions?.mentionsSettings) {
				const { mentionsEveryOne, mentioned } = options.mentions.mentionsSettings;

				if (mentionsEveryOne) {
					body.mentionsEveryOne = true;
				} else if (mentioned) {
					const mentionedNumbers = mentioned.split(',')
						.map(num => num.trim())
						.map(num => num.includes('@s.whatsapp.net') ? num : `${num}@s.whatsapp.net`);

					body.mentioned = mentionedNumbers;
				}
			}

			const requestOptions: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
				},
				uri: `/message/sendMedia/${instanceName}`,
				body,
				json: true,
			};

			const response = await evolutionRequest(ef, requestOptions);
			returnData.push({
				json: {
					success: true,
					data: response,
				},
			});
		} catch (error) {
			const errorMessage = error.message.includes('Could not get parameter')
				? 'Parâmetros inválidos ou ausentes'
				: 'Erro ao enviar imagem';

			const errorDetails = error.message.includes('Could not get parameter')
				? 'Verifique se todos os campos obrigatórios foram preenchidos corretamente'
				: error.message;

			if (!ef.continueOnFail()) {
				throw new NodeOperationError(ef.getNode(), errorMessage, {
					message: errorMessage,
					description: errorDetails,
				});
			}

			returnData.push({
				json: {
					success: false,
					error: {
						message: errorMessage,
						details: errorDetails,
						code: error.code || 'UNKNOWN_ERROR',
						timestamp: new Date().toISOString(),
					},
				},
				error: new NodeOperationError(ef.getNode(), errorMessage, {
					message: errorMessage,
					description: errorDetails,
				}),
			});
		}
	}

	return returnData;
}
