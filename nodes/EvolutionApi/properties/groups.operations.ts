import { INodeProperties } from 'n8n-workflow';

export const groupsOperations: INodeProperties = {
	displayName: 'Operação',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['groups-api'],
		},
	},
	options: [
		{
			name: 'Criar Grupo',
			action: 'Criar um novo grupo',
			description: 'Cria um novo grupo no WhatsApp',
			value: 'create-group',
		},
		{
			name: 'Atualizar Imagem Do Grupo',
			action: 'Atualizar imagem do grupo',
			description: 'Atualiza a imagem de perfil do grupo',
			value: 'update-group-picture',
		},
		{
			name: 'Atualizar Nome Do Grupo',
			action: 'Atualizar nome do grupo',
			description: 'Atualiza o nome/título do grupo',
			value: 'update-group-name',
		},
		{
			name: 'Atualizar Descrição Do Grupo',
			action: 'Atualizar descri o do grupo',
			description: 'Atualiza a descrição do grupo',
			value: 'update-group-description',
		},
		{
			name: 'Atualizar Configurações',
			action: 'Atualizar configura es do grupo',
			description: 'Atualiza as configurações de permissões do grupo',
			value: 'update-settings',
		},
		{
			name: 'Atualizar Membros',
			action: 'Atualizar membros do grupo',
			description: 'Adiciona, remove ou atualiza permissões de membros',
			value: 'update-participants',
		},
		{
			name: 'Buscar Link De Convite',
			action: 'Buscar link de convite',
			description: 'Obtém o link de convite do grupo',
			value: 'fetch-invite-code',
		},
		{
			name: 'Revogar Link De Convite',
			action: 'Revogar link de convite',
			description: 'Revoga o link de convite atual do grupo',
			value: 'revoke-invite-code',
		},
		{
			name: 'Enviar Link De Convite',
			action: 'Enviar link de convite',
			description: 'Envia o link de convite do grupo para contatos',
			value: 'send-invite-link',
		},
		{
			name: 'Buscar Grupos',
			action: 'Buscar grupos',
			description: 'Busca informações de grupos por diferentes métodos',
			value: 'fetch-groups',
		},
		{
			name: 'Encontrar Participantes',
			action: 'Encontrar participantes do grupo',
			description: 'Obtém a lista de participantes de um grupo',
			value: 'find-participants',
		},
		{
			name: 'Mensagens Temporárias',
			action: 'Configurar mensagens tempor rias',
			description: 'Define o tempo de expiração das mensagens no grupo',
			value: 'toggle-ephemeral',
		},
		{
			name: 'Entrar No Grupo',
			action: 'Entrar no grupo',
			description: 'Entra em um grupo usando o código de convite',
			value: 'join-group',
		},
		{
			name: 'Sair Do Grupo',
			action: 'Sair do grupo',
			description: 'Remove a instância do grupo',
			value: 'leave-group',
		},
	],
	default: 'create-group',
};
