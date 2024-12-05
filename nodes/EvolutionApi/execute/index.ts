import { IExecuteFunctions } from 'n8n-workflow';
import { createInstanceBasic } from './instance/createInstanceBasic';
import { deleteInstance } from './instance/deleteInstance';
import { fetchInstances } from './instance/fetchInstances';
import { instanceConnect } from './instance/instanceConnect';
import { instanceSettings } from './instance/instanceSettings';
import { logoutInstance } from './instance/logoutInstance';
import { restartInstance } from './instance/restartInstance';
import { setPresence } from './instance/setPresence';
import { setProxy } from './instance/setProxy';
import { setChatwoot } from './integrations/setChatwoot';
import { setEvolutionBot } from './integrations/setEvolutionBot';
import { setTypebot } from './integrations/setTypebot';
import { sendAudio } from './messages/sendAudio';
import { sendDocument } from './messages/sendDocument';
import { sendImage } from './messages/sendImage';
import { sendPoll } from './messages/sendPoll';
import { sendStories } from './messages/sendStories';
import { sendText } from './messages/sendText';
import { sendVideo } from './messages/sendVideo';
import { setRabbitMQ } from './events/setRabbitMQ';
import { setWebhook } from './events/setWebhook';
import { setDifyBot } from './integrations/setDifyBot';
import { setFlowiseBot } from './integrations/setFlowiseBot';

type ResourceOperationFunctions = {
	[resource: string]: {
		[operation: string]: (ef: IExecuteFunctions) => Promise<any>;
	};
};

// este dicionario é utilizado para mapear as operações disponíveis para cada recurso e operação para cada função
export const resourceOperationsFunctions: ResourceOperationFunctions = {
	'instances-api': {
		'instance-basic': createInstanceBasic,
		'instance-connect': instanceConnect,
		'restart-instance': restartInstance,
		'logout-instance': logoutInstance,
		setPresence: setPresence,
		'delete-instance': deleteInstance,
		'fetch-instances': fetchInstances,
		instanceSettings: instanceSettings,
		proxy: setProxy,
	},
	'messages-api': {
		sendText: sendText,
		sendImage: sendImage,
		sendVideo: sendVideo,
		sendAudio: sendAudio,
		sendDocumento: sendDocument,
		sendPoll: sendPoll,
		sendStories: sendStories,
	},
	'events-api': {
		webhook: setWebhook,
		rabbitMQ: setRabbitMQ,
	},
	'integrations-api': {
		chatwoot: setChatwoot,
		typebot: setTypebot,
		evolutionBot: setEvolutionBot,
		difyBot: setDifyBot,
		flowiseBot: setFlowiseBot,
	},
};
