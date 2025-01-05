import { INodeProperties } from 'n8n-workflow';

export const chatOperations: INodeProperties = {
	displayName: 'Operação',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['chat-api'],
		},
	},
	options: [
		{
			name: 'Verificar Número',
			action: 'Verificar n mero no whats app',
			description: 'Verifica se um número está registrado no WhatsApp',
			value: 'check-number',
		},
		{
			name: 'Ler Mensagens',
			action: 'Marcar mensagens como lidas',
			description: 'Marca mensagens específicas como lidas',
			value: 'read-messages',
		},
		{
			name: 'Gerenciar Arquivo',
			action: 'Gerenciar arquivo de conversa',
			description: 'Arquiva ou desarquiva uma conversa',
			value: 'manage-archive',
		},
		{
			name: 'Marcar Como Não Lido',
			action: 'Marcar conversa como n o lida',
			description: 'Marca uma conversa específica como não lida',
			value: 'mark-unread',
		},
		{
			name: 'Deletar Mensagem',
			action: 'Deletar mensagem',
			description: 'Deleta uma mensagem específica para todos',
			value: 'delete-message',
		},
		{
			name: 'Buscar Foto Do Perfil',
			action: 'Buscar foto do perfil',
			description: 'Obtém a URL da foto do perfil de um contato',
			value: 'fetch-profile-picture',
		},
		{
			name: 'Obter Mídia Em Base64',
			action: 'Obter m dia em base64',
			description: 'Obtém o conteúdo de uma mídia em formato Base64',
			value: 'get-media-base64',
		},
		{
			name: 'Editar Mensagem',
			action: 'Editar mensagem',
			description: 'Edita uma mensagem enviada anteriormente',
			value: 'update-message',
		},
		{
			name: 'Enviar Presença',
			action: 'Enviar presen a',
			description: 'Envia o status de presença (digitando/gravando) para um contato',
			value: 'send-presence',
		},
		{
			name: 'Bloquear Contato',
			action: 'Bloquear contato',
			description: 'Bloqueia ou desbloqueia um contato',
			value: 'block-contact',
		},
		{
			name: 'Listar Contatos',
			action: 'Listar contatos',
			description: 'Lista todos os contatos ou busca um contato específico',
			value: 'find-contacts',
		},
		{
			name: 'Procurar Mensagens',
			action: 'Procurar mensagens de um contato',
			description: 'Busca mensagens de um contato específico',
			value: 'find-messages',
		},
		{
			name: 'Procurar Status',
			action: 'Procurar status de mensagens',
			description: 'Busca status de mensagens de um contato específico',
			value: 'find-status-messages',
		},
		{
			name: 'Procurar Chats',
			action: 'Procurar chats',
			description: 'Busca chats de um contato específico',
			value: 'find-chats',
		},
	],
	default: 'check-number',
};
