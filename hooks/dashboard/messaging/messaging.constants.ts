import Chat from "@/models/chat";
import ChatAction from "@/models/chatAction";
import ChatTime from "@/models/chatTime";
import {ChatType} from "@/models/chatAction.constant";
import {DropdownItem} from "@/helpers/types";
import ProfileOne from "@/public/images/dashboard/home/request-1.png";
import ProfileTwo from "@/public/images/dashboard/home/request-2.png";
import {StaticImageData} from "next/image";
import moment from "moment";

export type ChatItem = {
	id: string;
	sender: string;
	recipient: string;
	imageOne: StaticImageData;
	imageTwo: StaticImageData;
};

export const chatOptions: DropdownItem<number>[] = [
	{
		text: "View Profile",
		value: 1,
	},
	{
		text: "Block User",
		value: 2,
	},
	{
		text: "Report User",
		value: 2,
	},
	{
		text: "Delete Conversation",
		value: 2,
		redHover: true,
	},
];

export const ChatItems: ChatItem[] = [
	{
		id: "#180380280",
		sender: "Bimbo Ademoye",
		recipient: "Jaydon",
		imageOne: ProfileOne,
		imageTwo: ProfileTwo,
	},
	{
		id: "#180463456",
		sender: "Bimbo Ademoye",
		recipient: "Jaydon",
		imageOne: ProfileOne,
		imageTwo: ProfileTwo,
	},
	{
		id: "#180383333",
		sender: "Bimbo Ademoye",
		recipient: "Jaydon",
		imageOne: ProfileOne,
		imageTwo: ProfileTwo,
	},
	{
		id: "#542380280",
		sender: "Bimbo Ademoye",
		recipient: "Jaydon",
		imageOne: ProfileOne,
		imageTwo: ProfileTwo,
	},
	{
		id: "#182222280",
		sender: "Bimbo Ademoye",
		recipient: "Jaydon",
		imageOne: ProfileOne,
		imageTwo: ProfileTwo,
	},
];

const currentDate = moment(); // Get the current date and time

const modifiedDate = moment(currentDate).subtract(1, "days").toDate();
const modifiedDate1 = moment(currentDate).subtract(3, "hours").toDate();
const modifiedDate2 = moment(currentDate).subtract(2, "hours").toDate();
const modifiedDate3 = moment(currentDate).subtract(1, "hours").toDate();

const customDateTime = moment({hour: 23, minute: 45, second: 0});
const modifiedDateTime = moment(customDateTime).toDate();

const customTime = new Date();
customTime.setHours(10);
customTime.setMinutes(30);
customTime.setSeconds(0);
customTime.setMilliseconds(0);

export const ChatList: Array<Chat | ChatTime> = [
	ChatTime.create({
		// dateTime: new Date("27-05-2023T21:41:00"),
		dateTime: modifiedDateTime,
		chatType: ChatType.TIME,
	}),
	Chat.create({
		id: "#180463456",
		isSender: false,
		name: "Jaydon",
		dateTime: modifiedDate,
		chats: ["Hello Bimbo, i'm a big fan, i'd like to say thank you for being an amazing and inspiring personality to everyone.\nI love you"],
		chatType: ChatType.CHAT,
	}),
	Chat.create({
		id: "#180463456",
		isSender: true,
		name: "Bimbo Ademoye",
		dateTime: modifiedDate1,
		chats: ["Thank you Jaydon for your kind words ❤️", "How are you doing today?"],
		chatType: ChatType.CHAT,
	}),
	Chat.create({
		id: "#180463456",
		isSender: false,
		name: "Jaydon",
		dateTime: modifiedDate2,
		chats: ["I'm fine thank you.", "You've been an inspiration to me over the years, thank you", "I'd like to be a mentee, if you allow it 🤲🏽"],
		chatType: ChatType.CHAT,
	}),
	Chat.create({
		id: "#180463456",
		isSender: true,
		name: "Bimbo Ademoye",
		dateTime: modifiedDate3,
		chats: [
			"I'm glad i've been able to inspire you from afar. It gladdens my heart.",
			"I'm sorry I cannot be your mentor. I don't think I have time for that.",
		],
		chatType: ChatType.CHAT,
	}),
];
