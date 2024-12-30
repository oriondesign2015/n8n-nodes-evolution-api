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
import { sendContact } from './messages/sendContact';
import { sendStories } from './messages/sendStories';
import { sendText } from './messages/sendText';
import { sendVideo } from './messages/sendVideo';
import { setRabbitMQ } from './events/setRabbitMQ';
import { setWebhook } from './events/setWebhook';
import { setDifyBot } from './integrations/setDifyBot';
import { setFlowiseBot } from './integrations/setFlowiseBot';
import { sendList } from './messages/sendList';
import { sendButtons } from './messages/sendButtons';
import { sendPix } from './messages/sendPix';
import { sendReaction } from './messages/sendReaction';
import { createGroup } from './groups/createGroup';
import { updateGroupPicture } from './groups/updateGroupPicture';
import { updateGroupName } from './groups/updateGroupName';
import { updateGroupDescription } from './groups/updateGroupDescription';
import { fetchInviteCode } from './groups/fetchInviteCode';
import { revokeInviteCode } from './groups/revokeInviteCode';
import { sendInviteLink } from './groups/sendInviteLink';
import { fetchGroups } from './groups/fetchGroups';
import { findParticipants } from './groups/findParticipants';
import { updateParticipants } from './groups/updateParticipants';
import { updateSettings } from './groups/updateSettings';
import { toggleEphemeral } from './groups/toggleEphemeral';
import { leaveGroup } from './groups/leaveGroup';
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
		sendContact: sendContact,
		sendList: sendList,
		sendButtons: sendButtons,
		sendStories: sendStories,
		sendPix: sendPix,
		sendReaction: sendReaction,
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
	'groups-api': {
		'create-group': createGroup,
		'update-group-picture': updateGroupPicture,
		'update-group-name': updateGroupName,
		'update-group-description': updateGroupDescription,
		'fetch-invite-code': fetchInviteCode,
		'revoke-invite-code': revokeInviteCode,
		'send-invite-link': sendInviteLink,
		'fetch-groups': fetchGroups,
		'find-participants': findParticipants,
		'update-participants': updateParticipants,
		'update-settings': updateSettings,
		'toggle-ephemeral': toggleEphemeral,
		'leave-group': leaveGroup,
	},
};
