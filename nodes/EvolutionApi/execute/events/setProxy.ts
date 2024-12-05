import { IExecuteFunctions, IHttpRequestMethods } from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

// if (resource === 'instances-api' && operation === 'restart-instance') {
export async function restartInstance(ef: IExecuteFunctions) {
	// Reiniciar Instancia
	const instanceName = ef.getNodeParameter('instanceName', 0);

	return await evolutionRequest(ef, {
		method: 'POST' as IHttpRequestMethods,
		uri: `/instance/restart/${instanceName}`,
		json: true,
	});
}
