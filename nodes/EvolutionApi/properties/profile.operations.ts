import { INodeProperties } from 'n8n-workflow';

export const profileOperationsOptions: INodeProperties = {
    displayName: 'Operação',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
        show: {
            resource: ['profile-api'],
        },
    },
    options: [
        {
            name: 'Buscar Perfil',
            value: 'fetch-profile',
            description: 'Busca informações do perfil',
            action: 'Buscar perfil',
        },
        {
            name: 'Buscar Perfil Profissional',
            value: 'fetch-business-profile',
            description: 'Busca informações do perfil profissional',
            action: 'Buscar perfil profissional',
        },
        {
					name: 'Atualizar Nome Do Perfil',
					value: 'update-profile-name',
					description: 'Atualiza o nome do perfil',
					action: 'Atualizar nome do perfil',
        },
        {
					name: 'Atualizar Status',
            value: 'update-profile-status',
            description: 'Atualiza o status do perfil',
            action: 'Atualizar status do perfil',
					},
        {
					name: 'Atualizar Foto Do Perfil',
            value: 'update-profile-picture',
            description: 'Atualiza a foto do perfil',
            action: 'Atualizar foto do perfil',
					},
        {
					name: 'Remover Foto Do Perfil',
					value: 'remove-profile-picture',
					description: 'Remove a foto do perfil',
					action: 'Remover foto do perfil',
        },
				{
						name: 'Buscar Configurações De Privacidade',
						value: 'fetch-privacy-settings',
						description: 'Busca as configurações de privacidade da instância',
						action: 'Buscar configura es de privacidade',
				},
        {
            name: 'Atualizar Configurações De Privacidade',
            value: 'update-privacy-settings',
            description: 'Atualiza as configurações de privacidade da instância',
            action: 'Atualizar configura es de privacidade',
        },
    ],
    default: 'fetch-profile',
};
