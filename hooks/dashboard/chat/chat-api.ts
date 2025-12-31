// import {GetStartedForm, GetStartedFormResponse} from "./create-ad.constants";

import {ChatListResponse, ChatsResponse, SendChatForm, SendChatResponse} from "./chat-api.constants";
import {makeGetRequestWithSignal, makeRequest, makeRequestWithSignal} from "@/helpers/request/makeRequest";

import ChatList from "@/models/chat/chat-list";
import ChatMessageMin from "@/models/chat/chat-message-min";
import ChatUser from "@/models/chat/chat-user";
import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import store from "@/redux/store";

export enum ChatSignal {
	CHATS = "user.chats",
	CHAT_LIST = "user.chats",
}

export const chatsApi = async (): Promise<ChatsResponse> => {
	const signal = getAbortControllerSignal(ChatSignal.CHATS);
	const res = await makeGetRequestWithSignal(`user/chats/chat-users`, signal, true);
	if (res instanceof Error) {
		throw res;
	}
	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		chatUsers: Parsers.classObjectArray(res.chatUsers, ChatUser),
	};
};

export const chatListApi = async (): Promise<ChatListResponse> => {
	const signal = getAbortControllerSignal(ChatSignal.CHAT_LIST);
	const res = await makeGetRequestWithSignal(`user/fetch/potentials/partners/1${store.getState().init?.user?.id || ""}`, signal, true);
	if (res instanceof Error) {
		throw res;
	}
	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		chat: Parsers.classObjectArray((res.data as GenericObject).chat, ChatList),
	};
};

export const sendChatApi = async (_data: SendChatForm): Promise<SendChatResponse> => {
	const signal = getAbortControllerSignal(ChatSignal.CHAT_LIST);
	const res = await makeRequestWithSignal(`user/chats/send-chat/${_data.id || ""}`, _data, signal, true);
	if (res instanceof Error) {
		throw res;
	}
	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		data: Parsers.classObjectNonNullable(res.data as GenericObject, ChatMessageMin),
	};
};
