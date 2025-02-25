import { INodeProperties } from 'n8n-workflow';

// Opções da messages-api (Mensagens)
export const messagesOperationsOptions: INodeProperties = {
	displayName: 'Operação',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['messages-api'], // Value do Resource
		},
	},
	options: [
		// Opção = Enviar mensagem de Texto
		{
			// Send Text
			name: 'Enviar Texto',
			action: 'Enviar texto',
			description: 'Envia mensagem de Texto',
			value: 'send-text',
		},

		// Opção = Enviar Imagem
		{
			// Send Media
			name: 'Enviar Imagem',
			action: 'Enviar imagem',
			description: 'Envia mensagem de Imagem',
			value: 'send-image',
		},

		// Opção = Enviar Video
		{
			// Send Media
			name: 'Enviar Video',
			action: 'Enviar video',
			description: 'Enviar mensagem de Video',
			value: 'send-video',
		},

		// Opção = Enviar Audio
		{
			// Send Narrated Audio
			name: 'Enviar Audio',
			action: 'Enviar audio',
			description: 'Enviar mensagem de Audio',
			value: 'send-audio',
		},

		// Opção = Enviar Documento
		{
			// Send Media
			name: 'Enviar Documento',
			action: 'Enviar documento',
			description: 'Enviar mensagem com Documento',
			value: 'send-document',
		},

		// Opção = Enviar Enquete
		{
			// Send Poll
			name: 'Enviar Enquete',
			action: 'Enviar enquete',
			description: 'Envia uma Enquete de até 12 opções',
			value: 'send-poll',
		},

		// Opção = Enviar Contato
		{
			name: 'Enviar Contato',
			action: 'Enviar contato',
			description: 'Envia um contato no whatsapp',
			value: 'send-contact',
		},

		// Opção = Enviar Lista
		{
			name: 'Enviar Lista',
			action: 'Enviar lista',
			description: 'Envia uma lista de opções interativa',
			value: 'send-list',
		},

		// Opção = Enviar Botões
		{
			name: 'Enviar Botões',
			action: 'Enviar bot es',
			description: 'Envia mensagem com botões interativos',
			value: 'send-buttons',
		},

		// Opção = Enviar PIX
		{
			name: 'Enviar PIX',
			action: 'Enviar PIX',
			description: 'Envia botão de pagamento PIX',
			value: 'send-pix',
		},

		// Opção = Enviar Status
		{
			name: 'Enviar Status',
			action: 'Enviar status',
			description: 'Publicar um Status/Stories',
			value: 'send-stories',
		},

		// Opção = Reagir Mensagem
		{
			name: 'Reagir Mensagem',
			action: 'Reagir mensagem',
			description: 'Adiciona uma reação em uma mensagem',
			value: 'send-reaction',
		},
	],
	// Definindo como padrão a opção "Enviar Texto"
	default: 'send-text',
};
