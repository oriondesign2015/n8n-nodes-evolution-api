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
			baseURL: '={{$credentials["server-url"].startsWith("http") ? $credentials["server-url"] : "https://" + $credentials["server-url"]}}',
			url: '/instance/fetchInstances',
			method: 'GET',
			headers: {
				apikey: '={{$credentials.apikey}}',
			},
		},
	};
}
