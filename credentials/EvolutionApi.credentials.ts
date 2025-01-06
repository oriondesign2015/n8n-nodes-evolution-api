import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EvolutionApi implements ICredentialType {
	name = 'evolutionApi';
	displayName = 'Evolution API';
	documentationUrl = 'https://doc.evolution-api.com/pt';
	properties: INodeProperties[] = [
		{
			displayName: 'Server Url',
			name: 'server-url',
			type: 'string',
			default: '',
			placeholder: 'https://exemplo.com',
			description: 'Digite a URL completa da sua Evolution API (ex: https://api.exemplo.com)',
		},
		{
			displayName: 'ApiKey',
			name: 'apikey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			description: 'Digite a ApiKey da Instancia ou Global da sua Evolution API',
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
			baseURL: '={{$credentials["server-url"]}}',
			url: '={{$credentials["server-url"].endsWith("/") ? "/erro" : "/instance/fetchInstances"}}',
			method: 'GET',
			headers: {
				apikey: '={{$credentials.apikey}}',
			},
		},
	};
}
