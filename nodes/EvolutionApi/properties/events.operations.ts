import { INodeProperties } from 'n8n-workflow';

// Opções da events-api (Eventos)
export const eventsOperationsOptions: INodeProperties = {
	displayName: 'Operação',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['events-api'], // Value do Resource
		},
	},
	options: [
		// Opção = Enviar mensagem de Texto
		{
			// Set/find Webhook
			name: 'Webhook',
			action: 'Webhook',
			description: 'Define/Busca integração com Webhook',
			value: 'webhook',
		},
		{
			// Set/find Rabbitmq
			name: 'RabbitMQ',
			action: 'Rabbitmq',
			description: 'Define/Busca integração com RabbitMQ',
			value: 'rabbitmq',
		},
	],
	// Definindo como padrão a opção "Enviar Texto"
	default: 'webhook',
};
