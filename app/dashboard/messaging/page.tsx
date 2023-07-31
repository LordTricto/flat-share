"use client";

import {ChatList, chatOptions} from "@/hooks/dashboard/messaging/messaging.constants";
import {useEffect, useRef, useState} from "react";

import Chat from "@/models/chat";
import ChatAction from "@/models/chatAction";
import ChatTime from "@/models/chatTime";
import {ChatType} from "@/models/chatAction.constant";
import HostTag from "@/components/dashboard/home/tags/host-tag";
import Image from "next/image";
import Input from "@/components/general/inputs/input";
import LineDropdown from "@/components/general/dropdown/line-dropdown";
import MessageItem from "@/components/dashboard/message/cards/message-item";
import SearchBar from "@/components/general/search-bar";
import chevronArrow from "@/public/images/icons/chevron-arrow.svg";
import {formatDateAndTime} from "@/utils/formatDate";
import galleryIcon from "@/public/images/dashboard/messaging/gallery.svg";
import moment from "moment";
import requestAvatarOne from "@/public/images/dashboard/home/request-1.png";
import requestAvatarTwo from "@/public/images/dashboard/home/request-2.png";
import sendIcon from "@/public/images/dashboard/messaging/send.svg";
import smileyIcon from "@/public/images/dashboard/messaging/smiley.svg";
import useDimension from "@/helpers/useDimension";

function Messages() {
	const {width} = useDimension();

	const ref = useRef<HTMLDivElement | null>(null);
	const [isActive, setIsActive] = useState<number>(0);
	const [chatList, setChatList] = useState<Array<Chat | ChatTime>>(ChatList);
	const [senderMessage, setSenderMessage] = useState<string>("");
	const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

	useEffect(() => {
		const lastChildElement = ref.current?.lastElementChild;
		lastChildElement?.scrollIntoView();
	}, [chatList]);

	return (
		<>
			<div className="flex h-full w-full">
				{(width > 899 || (!isChatOpen && width < 900)) && (
					<div className="relative flex h-full w-full flex-col gap-2 border-r bg-white py-7 [@media(min-width:900px)]:max-w-sm">
						<div className="flex w-full flex-col gap-6 px-5">
							<h3 className="text-blacks text-2xl font-semibold leading-[100%]">Messages</h3>
							<SearchBar placeholder="Search" />
						</div>
						<div className="relative flex h-full w-full flex-col gap-2 overflow-y-auto">
							<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 pb-6">
								<div className="flex flex-col">
									<MessageItem
										date="10 mins ago"
										message="Hello Ruth, please do you have any kanyin is a fine girl but she likes looking for trouble"
										name="Jocelyn Curtis"
										profile={requestAvatarOne}
										isActive={isActive === 1}
										onClick={() => {
											setIsChatOpen(true);
											setIsActive(1);
										}}
									/>
									<MessageItem
										date="Yesterday, 09:10pm"
										message="I think this is a lot better."
										name="Nolan Press"
										profile={requestAvatarTwo}
										isActive={isActive === 2}
										onClick={() => {
											setIsChatOpen(true);
											setIsActive(2);
										}}
									/>
									<MessageItem
										date="10 mins ago"
										message="Hello Ruth, please do you have any kanyin is a fine girl but she likes looking for trouble"
										name="Jocelyn Curtis"
										profile={requestAvatarOne}
										isActive={isActive === 3}
										onClick={() => {
											setIsChatOpen(true);
											setIsActive(3);
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				)}
				{(width > 899 || (isChatOpen && width < 900)) && (
					<div className="relative h-full w-full overflow-y-auto">
						<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 px-4 py-6 xs:px-5">
							<div className="flex flex-grow">
								<div className="flex flex-grow flex-col overflow-hidden rounded-lg border">
									<div className="flex w-full items-center justify-between gap-4 border-b bg-white p-3 2xs:p-5">
										<div className="flex items-center justify-start 2xs:gap-5">
											{width < 900 && (
												<div className="flex w-6 min-w-[24px] items-start justify-start">
													<Image
														src={chevronArrow}
														onClick={() => setIsChatOpen(false)}
														className="-ml-[7px] w-full rotate-90 cursor-pointer"
														width={24}
														height={24}
														alt="back icon"
														tabIndex={-1}
													/>
												</div>
											)}
											<div className="flex items-center justify-start gap-3 2xs:gap-5">
												<div className="w-9 min-w-max xs:w-16">
													<Image
														src={requestAvatarOne}
														className="w-full rounded-md"
														width={width > 475 ? 64 : 36}
														height={width > 475 ? 64 : 36}
														alt="user avatar"
														tabIndex={-1}
													/>
												</div>
												<div className="flex w-full flex-col gap-2">
													<div className="flex w-full flex-col overflow-hidden overflow-ellipsis whitespace-nowrap xs:flex-row xs:gap-4">
														<h3 className="max-w-[8rem] overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-semibold text-black xs:max-w-[20rem] xs:text-lg sm:text-xl [@media(min-width:360px)]:max-w-[10rem]">
															Nolan Press sdadfasdsdadfsdadsfdsf
														</h3>
														<HostTag isHost={true} />
													</div>
													<div className="hidden divide-x divide-grey-secondary xs:flex [&>*:not(:first-child)]:pl-2 [&>*:not(:last-child)]:pr-2">
														<span className="text-sm text-black-tertiary">ruthbabel@gmail.com</span>
														<span className="text-sm text-black-tertiary">08056789473</span>
													</div>
												</div>
											</div>
										</div>

										<div className="min-w-max">
											<LineDropdown isHorizontal options={chatOptions} />
										</div>
									</div>
									<div className="relative flex w-full flex-grow flex-col overflow-y-auto">
										<div className="absolute left-0 top-0 flex w-full flex-grow flex-col gap-6 p-3 2xs:p-5">
											<div className="flex w-full flex-col gap-4">
												<div className="w-[60%] rounded-b-lg rounded-tr-lg bg-white p-4 shadow-xl">
													<p className="text-base">
														Sounds perfect! Let&apos;s schedule a video call for later this week. I&apos;ll send you a
														message to finalize the date and time. Looking forward to chatting more and getting to know
														you better!
													</p>
												</div>
												<p className="text-sm text-black-tertiary">Yesterday, 09:10pm</p>
											</div>
											<div className="flex w-full flex-col items-end justify-end gap-4">
												<div className="w-[60%] rounded-b-lg rounded-tl-lg bg-black p-4 shadow-xl">
													<p className="text-base text-white">
														Excellent! 😮‍💨 I&apos;ll keep an eye out for your message. Excited to chat with you too and see
														if we can make this roommate arrangement work. Talk to you soon
													</p>
												</div>
												<p className="text-sm text-black-tertiary">Yesterday, 09:10pm</p>
											</div>
											<div className="flex w-full flex-grow flex-col gap-4 overflow-y-auto">
												{chatList.map((_chat: Chat | ChatAction | ChatTime, index) => (
													<div className="flex w-full flex-col gap-4" ref={ref} key={index}>
														{_chat instanceof Chat && (
															<div
																className={
																	"flex w-full flex-col gap-2 " +
																	`${_chat.isSender ? "items-end justify-end" : "justify-start"}`
																}
															>
																{_chat.chats.map((_message, index) => (
																	<p
																		key={index}
																		className={
																			"bg-border w-max max-w-[80%] whitespace-pre-line break-words rounded-b-lg p-4 text-base shadow-chat 2xs:max-w-[60%] " +
																			`${
																				_chat.isSender
																					? "rounded-tl-lg bg-black text-white"
																					: "rounded-tr-lg bg-white text-black"
																			}`
																		}
																	>
																		{_message}
																	</p>
																))}
																<p className="pt-2 text-sm font-normal text-black-secondary">
																	{_chat.dateTime && formatDateAndTime(_chat.dateTime)}
																</p>
															</div>
														)}
														{_chat instanceof ChatTime && (
															<div className="flex w-full items-center justify-center gap-6 pb-4">
																<div className="h-[1px] w-full bg-grey-quat"></div>
																<span className="text-border-darker whitespace-nowrap text-sm text-black-tertiary">
																	{_chat.dateTime && formatDateAndTime(_chat.dateTime)}
																</span>
																<div className="h-[1px] w-full bg-grey-quat"></div>
															</div>
														)}
													</div>
												))}
											</div>
										</div>
									</div>
									<div className="bg-white p-5">
										<Input
											type="string"
											inputSize="xl"
											placeholder="Type a message"
											value={senderMessage}
											onChange={(_value: string) => setSenderMessage(_value)}
											customIcon={
												<div className="flex h-full w-max cursor-default items-center justify-center px-4">
													<div className="flex divide-x divide-grey [&>*:not(:first-child)]:pl-4 [&>*:not(:last-child)]:pr-4">
														<div className="flex items-center justify-center gap-4">
															<Image
																src={smileyIcon}
																className="cursor-pointer"
																width={20}
																height={20}
																alt="smiley"
																tabIndex={-1}
															/>
															<Image
																src={galleryIcon}
																className="cursor-pointer"
																width={20}
																height={20}
																alt="gallery"
																tabIndex={-1}
															/>
														</div>
														<div>
															<Image
																src={sendIcon}
																className="cursor-pointer"
																onClick={() => {
																	const newChat = Chat.create({
																		id: "#180463456",
																		isSender: true,
																		name: "Jaydon",
																		dateTime: moment().toDate(),
																		chats: [senderMessage],
																		chatType: ChatType.CHAT,
																	});
																	setChatList((prev) => [...prev, newChat]);
																	setSenderMessage("");
																}}
																width={24}
																height={24}
																alt="send"
																tabIndex={-1}
															/>
														</div>
													</div>
												</div>
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Messages;
