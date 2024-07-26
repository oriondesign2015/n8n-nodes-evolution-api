import { INodeType, INodeTypeDescription, IExecuteFunctions } from 'n8n-workflow';
import { httpVerbFields, httpVerbOperations } from './HttpVerbDescription';
import axios from 'axios';

export class HttpBin implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Evolution API',
		name: 'httpBin',
		icon: 'file:evolutionapi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Evolution API',
		defaults: {
			name: 'Evolution API',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'httpbinApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://doc.evolution-api.com/api-reference',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		/**
		 * In the properties array we have two mandatory options objects required
		 *
		 * [Resource & Operation]
		 *
		 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
		 *
		 * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
		 * to keep this class easy to read.
		 *
		 */
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Criar Instancias',
						value: 'create-instance',
					},
					{
						name: 'Buscar Instancias',
						value: 'fetch-instances',
					},
				],
				default: 'create-instance',
			},

			...httpVerbOperations,
			...httpVerbFields,
		],
	};

	async execute(this: IExecuteFunctions) {
		const credentials = this.getCredentials('httpbinApi');
		const instanceName = this.getNodeParameter('instanceName', 0) as string;
		const token = this.getNodeParameter('token', 0) as string;
		const integration = this.getNodeParameter('integration', 0) as string;

		const url = `https://${credentials["server-url"]}/instance/create`;
		const headers = {
			apikey: credentials.apikey,
		};

		const body = {
			instanceName,
			token,
			integration,
		};

		const response = await axios.post(url, body, { headers });
		return response.data;
	}
}
