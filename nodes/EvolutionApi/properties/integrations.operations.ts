import { INodeProperties } from 'n8n-workflow';

// Opções da integrations-api (Integração)
export const integrationsOperationsOptions: INodeProperties = {
	displayName: 'Operação',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['integrations-api'], // Value do Resource
		},
	},
	options: [
		{
			// Set/find Chatwoot
			name: 'Chatwoot',
			action: 'Chatwoot',
			description: 'Define/Busca integração com Chatwoot',
			value: 'chatwoot',
		},
		{
			// Create/find/fetch/Update/Delete/Start/Change Status/Fetch Sessions da Evolution Bot
			name: 'Evolution Bot',
			action: 'Evolution bot',
			description: 'Controla a integração com Evolution Bot',
			value: 'evolution-bot',
		},
		{
			// Create/find/fetch/Update/Delete/Start/Change Status/Fetch Sessions do Typebot
			name: 'Typebot',
			action: 'Typebot',
			description: 'Controla a integração com Typebot',
			value: 'typebot',
		},
		{
			// Create/find/fetch/Update/Delete/Start/Change Status/Fetch Sessions da Dify
			name: 'Dify',
			action: 'Dify',
			description: 'Controla a integração com Dify',
			value: 'difyBot',
		},
		{
			// Create/find/fetch/Update/Delete/Start/Change Status/Fetch Sessions da Dify
			name: 'Flowise',
			action: 'Flowise',
			description: 'Controla a integração com Flowise',
			value: 'flowiseBot',
		},
	],
	// Definindo como padrão a opção "Enviar Texto"
	default: 'chatwoot',
};
