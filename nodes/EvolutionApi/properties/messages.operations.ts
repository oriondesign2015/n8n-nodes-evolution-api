import { INodeProperties } from 'n8n-workflow';

// Opções da messages-api (Mensagens)
export const messagesOperationsOptions: INodeProperties = {
	displayName: 'Operation',
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
			action: 'Enviar Texto',
			description: 'Envia mensagem de Texto',
			value: 'sendText',
		},

		// Opção = Enviar Imagem
		{
			// Send Media
			name: 'Enviar Imagem',
			action: 'Enviar Imagem',
			description: 'Envia mensagem de Imagem',
			value: 'sendImage',
		},

		// Opção = Enviar Video
		{
			// Send Media
			name: 'Enviar Video',
			action: 'Enviar Video',
			description: 'Enviar mensagem de Video',
			value: 'sendVideo',
		},

		// Opção = Enviar Audio
		{
			// Send Narrated Audio
			name: 'Enviar Audio',
			action: 'Enviar Audio',
			description: 'Enviar mensagem de Audio',
			value: 'sendAudio',
		},

		// Opção = Enviar Documento
		{
			// Send Media
			name: 'Enviar Documento',
			action: 'Enviar Documento',
			description: 'Enviar mensagem de Video',
			value: 'sendDocumento',
		},

		// Opção = Enviar Enquete
		{
			// Send Poll
			name: 'Enviar Enquete',
			action: 'Enviar Enquete',
			description: 'Envia uma Enquete de até 12 opções',
			value: 'sendPoll',
		},

		// Opção = Enviar Contato
		{
			name: 'Enviar Contato',
			action: 'Enviar Contato',
			description: 'Envia um contato no whatsapp',
			value: 'sendContact',
		},

		// Opção = Enviar Lista
		{
			name: 'Enviar Lista',
			action: 'Enviar Lista',
			description: 'Envia uma lista de opções interativa',
			value: 'sendList',
		},

		// Opção = Enviar Botões
		{
			name: 'Enviar Botões',
			action: 'Enviar Botões',
			description: 'Envia mensagem com botões interativos',
			value: 'sendButtons',
		},

		// Opção = Enviar PIX
		{
			name: 'Enviar PIX',
			action: 'Enviar PIX',
			description: 'Envia botão de pagamento PIX',
			value: 'sendPix',
		},

		// Opção = Enviar Status
		{
			name: 'Enviar Status',
			action: 'Enviar Status',
			description: 'Publicar um Status/Stories',
			value: 'sendStories',
		},

		// Opção = Reagir Mensagem
		{
			name: 'Reagir Mensagem',
			action: 'Reagir Mensagem',
			description: 'Adiciona uma reação em uma mensagem',
			value: 'sendReaction',
		},
	],
	// Definindo como padrão a opção "Enviar Texto"
	default: 'sendText',
};
