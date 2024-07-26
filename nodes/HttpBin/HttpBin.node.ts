import { INodeType, INodeTypeDescription, IExecuteFunctions, ICredentialDataDecryptedObject } from 'n8n-workflow';
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
		const credentials = await this.getCredentials('httpbinApi') as ICredentialDataDecryptedObject;
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
