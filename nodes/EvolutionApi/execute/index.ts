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
import { checkNumber } from './chat/checkNumber';
import { readMessages } from './chat/readMessages';
import { manageArchive } from './chat/manageArchive';
import { markChatUnread } from './chat/markChatUnread';
import { deleteMessage } from './chat/deleteMessage';
import { fetchProfilePicture } from './chat/fetchProfilePicture';
import { getMediaBase64 } from './chat/getMediaBase64';
import { updateMessage } from './chat/updateMessage';
import { sendPresence } from './chat/sendPresence';
import { blockContact } from './chat/blockContact';
import { findContacts } from './chat/findContacts';
import { findMessages } from './chat/findMessages';
import { findStatusMessages } from './chat/findStatusMessages';
import { findChats } from './chat/findChats';
import { fetchBusinessProfile } from './profile/fetchBusinessProfile';
import { fetchProfile } from './profile/fetchProfile';
import { updateProfileName } from './profile/updateProfileName';
import { updateProfileStatus } from './profile/updateProfileStatus';
import { updateProfilePicture } from './profile/updateProfilePicture';
import { removeProfilePicture } from './profile/removeProfilePicture';
import { fetchPrivacySettings } from './profile/fetchPrivacySettings';
import { updatePrivacySettings } from './profile/updatePrivacySettings';
import { joinGroup } from './groups/joinGroup';
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
		'set-presence': setPresence,
		'delete-instance': deleteInstance,
		'fetch-instances': fetchInstances,
		'instance-settings': instanceSettings,
		'set-proxy': setProxy,
	},
	'messages-api': {
		'send-text': sendText,
		'send-image': sendImage,
		'send-video': sendVideo,
		'send-audio': sendAudio,
		'send-document': sendDocument,
		'send-poll': sendPoll,
		'send-contact': sendContact,
		'send-list': sendList,
		'send-buttons': sendButtons,
		'send-stories': sendStories,
		'send-pix': sendPix,
		'send-reaction': sendReaction,
	},
	'events-api': {
		'webhook': setWebhook,
		'rabbitmq': setRabbitMQ,
	},
	'integrations-api': {
		'chatwoot': setChatwoot,
		'typebot': setTypebot,
		'evolution-bot': setEvolutionBot,
		'difyBot': setDifyBot,
		'flowise-bot': setFlowiseBot,
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
		'join-group': joinGroup,
		'leave-group': leaveGroup,
	},
	'chat-api': {
		'check-number': checkNumber,
		'read-messages': readMessages,
		'manage-archive': manageArchive,
		'mark-unread': markChatUnread,
		'delete-message': deleteMessage,
		'fetch-profile-picture': fetchProfilePicture,
		'get-media-base64': getMediaBase64,
		'update-message': updateMessage,
		'send-presence': sendPresence,
		'block-contact': blockContact,
		'find-contacts': findContacts,
		'find-messages': findMessages,
		'find-status-messages': findStatusMessages,
		'find-chats': findChats,
	},
	'profile-api': {
		'fetch-profile': fetchProfile,
		'fetch-business-profile': fetchBusinessProfile,
		'update-profile-name': updateProfileName,
		'update-profile-status': updateProfileStatus,
		'update-profile-picture': updateProfilePicture,
		'remove-profile-picture': removeProfilePicture,
		'fetch-privacy-settings': fetchPrivacySettings,
		'update-privacy-settings': updatePrivacySettings,
	},
};
