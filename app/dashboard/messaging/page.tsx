"use client";

import {Fragment, useEffect, useLayoutEffect, useRef, useState} from "react";

import Chat from "@/models/chat/chat";
import ChatUser from "@/models/chat/chat-user";
import {ClipLoader} from "react-spinners";
import HostTag from "@/components/dashboard/home/tags/host-tag";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import Input from "@/components/general/inputs/input";
import MessageItem from "@/components/dashboard/message/cards/message-item";
import SearchBar from "@/components/general/search-bar";
import chevronArrow from "@/public/images/icons/chevron-arrow.svg";
import moment from "moment";
import sendIcon from "@/public/images/dashboard/messaging/send.svg";
import useChat from "@/hooks/dashboard/chat/use-chat";
import useDimension from "@/helpers/useDimension";
import {useSelector} from "react-redux";
import useSendChat from "@/hooks/dashboard/chat/use-send-chat";

function Messages() {
	const {width} = useDimension();

	const user = useSelector((state: IRootState) => state.init.user);

	const {refetch, data} = useChat();

	const ref = useRef<HTMLDivElement | null>(null);

	const [chatList, setChatList] = useState<Array<Chat | string>>();
	const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
	const [currentUserChattingTo, setCurrentUserChattingTo] = useState<number | null>(null);
	const [senderMessage, setSenderMessage] = useState<string>("");
	const [activeChatIndex, setActiveChatIndex] = useState<number>(0);

	const {isLoading, mutate} = useSendChat({
		onComplete: () => {
			// setChatList();
		},
	});

	useLayoutEffect(() => {
		if (user) refetch();
	}, [user]);

	useLayoutEffect(() => {
		if (!data) return;
		setChatList(data?.chatUsers[activeChatIndex].chats || []);
		setCurrentUserChattingTo(data?.chatUsers[activeChatIndex].id);
	}, [data]);

	useEffect(() => {
		const lastChildElement = ref.current?.lastElementChild;
		lastChildElement?.scrollIntoView();
	}, [chatList]);

	// console.log(currentUserChattingTo, chatList);

	return (
		<>
			<div className="flex h-full w-full">
				{(width > 899 || (!isChatOpen && width < 900)) && (
					<div className="relative flex h-full w-full flex-col gap-2 border-r bg-white py-7 [@media(min-width:900px)]:max-w-sm">
						<div className="flex w-full flex-col gap-6 px-5">
							<h3 className="text-blacks text-2xl font-semibold leading-[100%]">Messages</h3>
							<SearchBar placeholder="Search" value="" onChange={() => console.log("first")} />
						</div>
						<div className="relative flex h-full w-full flex-col gap-2 overflow-y-auto">
							<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 pb-6">
								<div className="flex flex-col">
									{data?.chatUsers.map((item, index) => (
										<MessageItem
											key={index}
											date={moment(item.updated_at).fromNow()}
											message={item.chats[0].messages[0].content}
											name={item.fullName}
											profile={item.profile_photo_path}
											isActive={activeChatIndex === index}
											onClick={() => {
												setIsChatOpen(true);
												setActiveChatIndex(index);
												setChatList(item.chats || []);
												setCurrentUserChattingTo(item.id);
											}}
										/>
									))}
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
													{data?.chatUsers[activeChatIndex].profile_photo_path && (
														<Image
															src={data?.chatUsers[activeChatIndex].profile_photo_path || ""}
															className="w-full rounded-md"
															width={width > 475 ? 64 : 36}
															height={width > 475 ? 64 : 36}
															alt="user avatar"
															tabIndex={-1}
														/>
													)}
												</div>
												<div className="flex w-full flex-col gap-2">
													<div className="flex w-full flex-col overflow-hidden overflow-ellipsis whitespace-nowrap xs:flex-row xs:gap-4">
														<h3 className="max-w-[8rem] overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-semibold text-black xs:max-w-[20rem] xs:text-lg sm:text-xl [@media(min-width:360px)]:max-w-[10rem]">
															{data?.chatUsers[activeChatIndex].fullName}
														</h3>
														<HostTag isHost={data?.chatUsers[activeChatIndex].isHost || false} />
													</div>
													<div className="hidden divide-x divide-grey-secondary xs:flex [&>*:not(:first-child)]:pl-2 [&>*:not(:last-child)]:pr-2">
														<span className="text-sm text-black-tertiary">{data?.chatUsers[activeChatIndex].email}</span>
														<span className="text-sm text-black-tertiary">{data?.chatUsers[activeChatIndex].phone}</span>
													</div>
												</div>
											</div>
										</div>
										<div className="min-w-max">
											{/* <LineDropdown
												isHorizontal
												id={data?.chatUsers[activeChatIndex].id.toString() || ""}
												options={chatOptions}
											/> */}
										</div>
									</div>
									<div className="relative flex w-full flex-grow flex-col overflow-y-auto">
										<div className="absolute left-0 top-0 flex w-full flex-grow flex-col gap-6 p-3 2xs:p-5">
											<div className="flex w-full flex-grow flex-col gap-4 overflow-y-auto">
												{(chatList || []).map((_chatItem, index) => (
													<Fragment key={index}>
														{typeof _chatItem === "string" ? (
															<div className="flex w-full flex-col items-end justify-end gap-4">
																<div className="flex max-w-[60%] items-center justify-center gap-4 rounded-b-lg rounded-tl-lg bg-black p-4 shadow-xl">
																	<p className="text-base text-white">{_chatItem}</p>
																	{isLoading && <ClipLoader color="#ffff" speedMultiplier={1} size={16} loading />}
																</div>
																<p className="text-sm text-black-tertiary">now</p>
															</div>
														) : _chatItem instanceof Chat ? (
															<>
																{_chatItem.messages[0].user_id === currentUserChattingTo ? (
																	<div className="flex w-full flex-col gap-4">
																		<div className="w-max max-w-[60%] rounded-b-lg rounded-tr-lg bg-white p-4 shadow-xl">
																			<p className="text-base">{_chatItem.messages[0].content}</p>
																		</div>
																		<p className="text-sm text-black-tertiary">
																			{moment(_chatItem.messages[0].updated_at).calendar()}
																		</p>
																	</div>
																) : (
																	<div className="flex w-full flex-col items-end justify-end gap-4">
																		<div className="max-w-[60%] rounded-b-lg rounded-tl-lg bg-black p-4 shadow-xl">
																			<p className="text-base text-white">{_chatItem.messages[0].content}</p>
																		</div>
																		<p className="text-sm text-black-tertiary">
																			{moment(_chatItem.messages[0].updated_at).calendar()}
																		</p>
																	</div>
																)}
															</>
														) : null}
													</Fragment>
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
													<Image
														src={sendIcon}
														className="cursor-pointer"
														onClick={() => {
															setChatList((prev) => (prev ? [...prev, senderMessage] : []));
															setSenderMessage("");
															mutate({
																id: data?.chatUsers[activeChatIndex].id.toString() || "",
																message: senderMessage,
															});
														}}
														width={24}
														height={24}
														alt="send"
														tabIndex={-1}
													/>
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

{
	/* {moment(chatItem.messages[0].updated_at).calendar(null, {
																				sameDay: "[Today]",
																				lastDay: "[Yesterday]",
																				lastWeek: "dddd", // "Monday", "Tuesday", etc.
																				sameElse: "DD/MM/YYYY", // For dates more than 7 days ago
																			})} */
}
