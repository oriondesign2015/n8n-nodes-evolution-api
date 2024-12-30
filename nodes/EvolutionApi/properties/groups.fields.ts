import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const groupsFields: INodeProperties[] = [
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai criar o grupo',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['create-group'],
			},
		},
	},
	{
		displayName: 'Nome do Grupo',
		name: 'subject',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome do grupo que será criado',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['create-group'],
			},
		},
	},
	{
		displayName: 'Descrição',
		name: 'description',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: false,
		description: 'Digite a descrição do grupo (opcional)',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['create-group'],
			},
		},
	},
	{
		displayName: 'Participantes',
		name: 'participants',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite os números dos participantes separados por vírgula (ex: 5511999999999,5511888888888)',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['create-group'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai atualizar a imagem',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-group-picture'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo que terá a imagem atualizada',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-group-picture'],
			},
		},
	},
	{
		displayName: 'URL da Imagem',
		name: 'image',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'URL da imagem que será definida como foto do grupo',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-group-picture'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai atualizar o nome do grupo',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-group-name'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo que terá o nome atualizado',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-group-name'],
			},
		},
	},
	{
		displayName: 'Novo Nome do Grupo',
		name: 'subject',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Novo nome que será definido para o grupo',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-group-name'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai atualizar a descrição',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-group-description'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo que terá a descrição atualizada',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-group-description'],
			},
		},
	},
	{
		displayName: 'Nova Descrição',
		name: 'description',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Nova descrição que será definida para o grupo',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-group-description'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai buscar o código',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['fetch-invite-code'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo para obter o código de convite',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['fetch-invite-code'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai revogar o código',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['revoke-invite-code'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo para revogar o código de convite',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['revoke-invite-code'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai enviar o convite',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['send-invite-link'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo para enviar o convite',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['send-invite-link'],
			},
		},
	},
	{
		displayName: 'Mensagem do Convite',
		name: 'description',
		type: 'string' as NodePropertyTypes,
		default: 'Segue o link do grupo',
		required: true,
		description: 'Mensagem que será enviada junto com o link do convite',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['send-invite-link'],
			},
		},
	},
	{
		displayName: 'Destinatários',
		name: 'numbers',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite os números dos destinatários separados por vírgula (ex: 5511999999999,5511888888888)',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['send-invite-link'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância que vai buscar o grupo',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['fetch-group-by-code'],
			},
		},
	},
	{
		displayName: 'Código do Convite',
		name: 'inviteCode',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Código do convite do grupo (ex: JZNHJLvnNd04UvGefiEZAA)',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['fetch-group-by-code'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['fetch-groups'],
			},
		},
	},
	{
		displayName: 'Método de Busca',
		name: 'searchMethod',
		type: 'options' as NodePropertyTypes,
		options: [
			{
				name: 'Por Código de Convite',
				value: 'inviteCode',
			},
			{
				name: 'Por ID do Grupo',
				value: 'groupJid',
			},
			{
				name: 'Buscar Todos os Grupos',
				value: 'fetchAll',
			},
		],
		default: 'inviteCode',
		required: true,
		description: 'Escolha o método para buscar os grupos',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['fetch-groups'],
			},
		},
	},
	{
		displayName: 'Código do Convite',
		name: 'inviteCode',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Código do convite do grupo (ex: JZNHJLvnNd04UvGefiEZAA)',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['fetch-groups'],
				searchMethod: ['inviteCode'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo para buscar informações',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['fetch-groups'],
				searchMethod: ['groupJid'],
			},
		},
	},
	{
		displayName: 'Obter Participantes',
		name: 'getParticipants',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		required: false,
		description: 'Se deve obter a lista de participantes dos grupos',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['fetch-groups'],
				searchMethod: ['fetchAll'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['find-participants'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo para buscar os participantes',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['find-participants'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-participants'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo para atualizar os membros',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-participants'],
			},
		},
	},
	{
		displayName: 'Ação',
		name: 'action',
		type: 'options' as NodePropertyTypes,
		options: [
			{
				name: 'Adicionar Membro',
				value: 'add',
			},
			{
				name: 'Remover Membro',
				value: 'remove',
			},
			{
				name: 'Promover a Administrador',
				value: 'promote',
			},
			{
				name: 'Rebaixar para Membro',
				value: 'demote',
			},
		],
		default: 'add',
		required: true,
		description: 'Ação a ser executada com os membros',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-participants'],
			},
		},
	},
	{
		displayName: 'Membros',
		name: 'participants',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Lista de números dos membros separados por vírgula (ex: 5511999999999,5511888888888)',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-participants'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-settings'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo para atualizar as configurações',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-settings'],
			},
		},
	},
	{
		displayName: 'Ação',
		name: 'action',
		type: 'options' as NodePropertyTypes,
		options: [
			{
				name: 'Somente Admins Enviam Mensagens',
				value: 'announcement',
			},
			{
				name: 'Todos Enviam Mensagens',
				value: 'not_announcement',
			},
			{
				name: 'Somente Admins Editam Configurações',
				value: 'locked',
			},
			{
				name: 'Todos Editam Configurações',
				value: 'unlocked',
			},
		],
		default: 'not_announcement',
		required: true,
		description: 'Configuração a ser aplicada no grupo',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['update-settings'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['toggle-ephemeral'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo para configurar mensagens temporárias',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['toggle-ephemeral'],
			},
		},
	},
	{
		displayName: 'Expiração',
		name: 'expiration',
		type: 'options' as NodePropertyTypes,
		options: [
			{
				name: 'Desativado',
				value: 0,
			},
			{
				name: '24 Horas',
				value: 86400,
			},
			{
				name: '7 Dias',
				value: 604800,
			},
			{
				name: '90 Dias',
				value: 7776000,
			},
		],
		default: 0,
		required: true,
		description: 'Tempo de expiração das mensagens',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['toggle-ephemeral'],
			},
		},
	},
	{
		displayName: 'Nome da Instância',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Digite o nome da instância',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['leave-group'],
			},
		},
	},
	{
		displayName: 'ID do Grupo',
		name: 'groupJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID do grupo que deseja sair',
		displayOptions: {
			show: {
				resource: ['groups-api'],
				operation: ['leave-group'],
			},
		},
	},
];
