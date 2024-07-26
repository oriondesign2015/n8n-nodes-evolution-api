import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HttpBinApi implements ICredentialType {
	name = 'httpbinApi';
	displayName = 'Evolution API';
	documentationUrl = 'https://doc.evolution-api.com/pt';
	properties: INodeProperties[] = [
		{
			displayName: 'Server Url',
			name: 'server-url',
			type: 'string',
			default: '',
		},
		{
			displayName: 'ApiKey',
			name: 'apikey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			}
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				apikey: '={{$credentials.apikey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ constructBaseUrl($credentials["server-url"]) }}',
			url: '/instance/fetchInstances',
			method: 'GET',
			headers: {
				apikey: '={{$credentials.apikey}}',
			},
		},
	};
}

// Função para construir a URL base com HTTPS se necessário
function constructBaseUrl(url: string): string {
	if (!/^https?:\/\//i.test(url)) {
		url = 'https://' + url;
	}
	return url;
}
