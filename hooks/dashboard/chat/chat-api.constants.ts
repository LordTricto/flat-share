import ChatList from "@/models/chat/chat-list";
import ChatMessageMin from "@/models/chat/chat-message-min";
import ChatUser from "@/models/chat/chat-user";

export type UpdatePlanForm = {
	transaction_reference: string;
	amount: number;
	plan: string;
};

export type ChatsResponse = {
	status: string;
	message: string;
	chatUsers: ChatUser[];
};
export type ChatListResponse = {
	status: string;
	message: string;
	chat: ChatList[];
};

export type SendChatForm = {
	id: string;
	message: string;
};

export type SendChatResponse = {
	status: string;
	message: string;
	data: ChatMessageMin;
};
