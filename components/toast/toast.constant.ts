export enum ToastMessageType {
	ERROR = "error_message",
	// WARNING = "warning_message",
	SUCCESS = "success_message",
	INFORMATION = "information_message",
}

export type ToastItemType = {
	index: number;
	message: string | null;
	messageType: ToastMessageType;
};
