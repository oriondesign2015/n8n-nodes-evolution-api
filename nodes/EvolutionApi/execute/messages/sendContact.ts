import {
    IExecuteFunctions,
    IRequestOptions,
    IHttpRequestMethods,
    NodeApiError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendContact(ef: IExecuteFunctions) {
    try {
        // Parâmetros obrigatórios
        const instanceName = ef.getNodeParameter('instanceName', 0);
        const remoteJid = ef.getNodeParameter('remoteJid', 0);
        const contacts = ef.getNodeParameter('contacts.contactValues', 0) as {
            fullName: string;
            wuid: string;
            phoneNumber: string;
            organization?: string;
            email?: string;
            url?: string;
        }[];

        const body: any = {
            number: remoteJid,
            contact: contacts.map(contact => ({
                fullName: contact.fullName,
                wuid: contact.wuid,
                phoneNumber: contact.phoneNumber,
                ...(contact.organization && { organization: contact.organization }),
                ...(contact.email && { email: contact.email }),
                ...(contact.url && { url: contact.url }),
            })),
        };

        const requestOptions: IRequestOptions = {
            method: 'POST' as IHttpRequestMethods,
            headers: {
                'Content-Type': 'application/json',
            },
            uri: `/message/sendContact/${instanceName}`,
            body,
            json: true,
        };

        return await evolutionRequest(ef, requestOptions);
    } catch (error) {
        if (error.message.includes('Could not get parameter')) {
            throw new NodeApiError(ef.getNode(), {
                message: 'Parâmetros inválidos ou ausentes',
                description: 'Verifique se todos os campos obrigatórios foram preenchidos corretamente',
            });
        }
        throw new NodeApiError(ef.getNode(), error);
    }
}
