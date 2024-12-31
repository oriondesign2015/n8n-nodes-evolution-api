import { INodeProperties } from 'n8n-workflow';

export const resources: INodeProperties = {
	displayName: 'Recurso',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Instâncias',
			value: 'instances-api',
		},
		{
			name: 'Mensagens',
			value: 'messages-api',
		},
		{
			name: 'Chat',
			value: 'chat-api',
		},
		{
			name: 'Grupos',
			value: 'groups-api',
		},
		{
			name: 'Eventos',
			value: 'events-api',
		},
		{
			name: 'Integrações',
			value: 'integrations-api',
		},
		{
			name: 'Perfil',
			value: 'profile-api',
		},
	],
	default: 'instances-api',
};
