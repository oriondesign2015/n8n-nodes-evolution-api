import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const profileFields: INodeProperties[] = [
    {
        displayName: 'Nome Da Instância',
        name: 'instanceName',
        type: 'string' as NodePropertyTypes,
        default: '',
        required: true,
        description: 'Digite o nome da instância',
        displayOptions: {
            show: {
                resource: ['profile-api'],
            },
        },
    },
    {
        displayName: 'Nome',
        name: 'name',
        type: 'string' as NodePropertyTypes,
        default: '',
        required: true,
        description: 'Novo nome do perfil',
        displayOptions: {
            show: {
                resource: ['profile-api'],
                operation: ['update-profile-name'],
            },
        },
    },
    {
        displayName: 'Contato',
        name: 'remoteJid',
        type: 'string' as NodePropertyTypes,
        default: '',
        required: true,
        description: 'Número do contato',
        displayOptions: {
            show: {
                resource: ['profile-api'],
                operation: [
                    'fetch-profile',
                    'fetch-business-profile',
                    'fetch-professional-profile'
                ],
            },
        },
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'string' as NodePropertyTypes,
        default: '',
        required: true,
        description: 'Novo status do perfil (máximo 139 caracteres)',
        typeOptions: {
            maxLength: 139,
        },
        displayOptions: {
            show: {
                resource: ['profile-api'],
                operation: ['update-profile-status'],
            },
        },
    },
    {
        displayName: 'URL Da Imagem',
        name: 'picture',
        type: 'string' as NodePropertyTypes,
        default: '',
        required: true,
        description: 'URL da imagem que será definida como foto do perfil',
        displayOptions: {
            show: {
                resource: ['profile-api'],
                operation: ['update-profile-picture'],
            },
        },
    },
    {
        displayName: 'Confirmação De Leitura',
        name: 'readreceipts',
        type: 'options' as NodePropertyTypes,
        options: [
            {
                name: 'Todos',
                value: 'all',
            },
            {
                name: 'Ninguém',
                value: 'none',
            },
        ],
        default: 'all',
        required: true,
        description: 'Quem pode ver quando você leu as mensagens',
        displayOptions: {
            show: {
                resource: ['profile-api'],
                operation: ['update-privacy-settings'],
            },
        },
    },
    {
        displayName: 'Foto Do Perfil',
        name: 'profile',
        type: 'options' as NodePropertyTypes,
        options: [
            {
                name: 'Todos',
                value: 'all',
            },
            {
                name: 'Meus Contatos',
                value: 'contacts',
            },
            {
                name: 'Exceto Contatos Específicos',
                value: 'contact_blacklist',
            },
            {
                name: 'Ninguém',
                value: 'none',
            },
        ],
        default: 'all',
        required: true,
        description: 'Quem pode ver sua foto de perfil',
        displayOptions: {
            show: {
                resource: ['profile-api'],
                operation: ['update-privacy-settings'],
            },
        },
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'options' as NodePropertyTypes,
        options: [
            {
                name: 'Todos',
                value: 'all',
            },
            {
                name: 'Meus Contatos',
                value: 'contacts',
            },
            {
                name: 'Exceto Contatos Específicos',
                value: 'contact_blacklist',
            },
            {
                name: 'Ninguém',
                value: 'none',
            },
        ],
        default: 'contacts',
        required: true,
        description: 'Quem pode ver seu status',
        displayOptions: {
            show: {
                resource: ['profile-api'],
                operation: ['update-privacy-settings'],
            },
        },
    },
    {
        displayName: 'Online',
        name: 'online',
        type: 'options' as NodePropertyTypes,
        options: [
            {
                name: 'Todos',
                value: 'all',
            },
            {
                name: 'Igual Ao Visto Por Último',
                value: 'match_last_seen',
            },
        ],
        default: 'all',
        required: true,
        description: 'Quem pode ver quando você está online',
        displayOptions: {
            show: {
                resource: ['profile-api'],
                operation: ['update-privacy-settings'],
            },
        },
    },
    {
        displayName: 'Visto Por Último',
        name: 'last',
        type: 'options' as NodePropertyTypes,
        options: [
            {
                name: 'Todos',
                value: 'all',
            },
            {
                name: 'Meus Contatos',
                value: 'contacts',
            },
            {
                name: 'Exceto Contatos Específicos',
                value: 'contact_blacklist',
            },
            {
                name: 'Ninguém',
                value: 'none',
            },
        ],
        default: 'contacts',
        required: true,
        description: 'Quem pode ver seu último acesso',
        displayOptions: {
            show: {
                resource: ['profile-api'],
                operation: ['update-privacy-settings'],
            },
        },
    },
    {
        displayName: 'Grupos',
        name: 'groupadd',
        type: 'options' as NodePropertyTypes,
        options: [
            {
                name: 'Todos',
                value: 'all',
            },
            {
                name: 'Meus Contatos',
                value: 'contacts',
            },
            {
                name: 'Exceto Contatos Específicos',
                value: 'contact_blacklist',
            },
        ],
        default: 'all',
        required: true,
        description: 'Quem pode te adicionar em grupos',
        displayOptions: {
            show: {
                resource: ['profile-api'],
                operation: ['update-privacy-settings'],
            },
        },
    },
];
