import { INodeProperties } from 'n8n-workflow';

// Opções da instances-api (Instancias)
export const instancesOperationsOptions: INodeProperties = {
	displayName: 'Operação',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['instances-api'], // Value do Resource
		},
	},

	// Opções que serão vinculadas a Operação "Instancia"
	options: [
		// Opção = Criar instancia
		{
			// Create Instance Basic
			name: 'Criar Instancia',
			action: 'Criar instancia',
			description: 'Cria uma nova Instancia',
			value: 'instance-basic',
		},

		// Opção = Conectar Instância
		{
			// Instance Connect
			name: 'Conectar Instancia',
			action: 'Conectar instancia',
			description: 'Gera a conexão de uma Instancia (QR ou Base64)',
			value: 'instance-connect',
		},

		// Opção = Buscar Instancia
		{
			// Fetch Instances
			name: 'Buscar Instancia',
			action: 'Buscar instancia',
			description: 'Busca e lista as Instancias criadas',
			value: 'fetch-instances',
		},

		// Opção = Definir Comportamento da instancia
		{
			name: 'Definir Comportamento',
			action: 'Definir comportamento',
			description: 'Define o comportamento da instancia',
			value: 'instance-settings',
		},

		// Opção = Definir presença
		{
			// Set Presence
			name: 'Definir Presença',
			action: 'Definir presen a',
			description: 'Define a presença na instancia',
			value: 'set-presence',
		},

		// Opção = Definit Proxy
		{
			// Set/find Proxy
			name: 'Definir/Buscar Proxy',
			action: 'Proxy',
			description: 'Define um Proxy na instancia',
			value: 'set-proxy',
		},

		// Opção = Reiniciar instancia
		{
			// Restart Instance
			name: 'Reiniciar Instancia',
			action: 'Reiniciar instancia',
			description: 'Reinicia o socket da Instancia',
			value: 'restart-instance',
		},

		// Opção = Desconectar instancia
		{
			// Logout Instance
			name: 'Desconectar Instancia',
			action: 'Desconectar instancia',
			description: 'Desconecta o WhatsApp da Instancia',
			value: 'logout-instance',
		},

		// Opção = Deletar instancia
		{
			// Delete Instance
			name: 'Deletar Instancia',
			action: 'Deletar instancia',
			description: 'Deleta uma Instancia',
			value: 'delete-instance',
		},
	],
	// Definindo como padrão a opção "Criar Instancia"
	default: 'instance-basic',
};
