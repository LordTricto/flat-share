import Image, {StaticImageData} from "next/image";
import React, {useState} from "react";
import {setFilterUserRequestReceived, setFilterUserRequestSent} from "@/redux/init/slice/initSlice";

import Button from "@/components/general/button/button";
import HostTag from "../tags/host-tag";
import useAcceptRequest from "@/hooks/dashboard/requests/accept-request/use-accept-request";
import useDeclineRequest from "@/hooks/dashboard/requests/decline-request/use-decline-request";
import useDeleteSentRequest from "@/hooks/dashboard/requests/delete-sent-request/use-delete-sent-request";
import useDimension from "@/helpers/useDimension";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

interface Props {
	name: string;
	id?: string;
	isFull?: boolean;
	isHost?: boolean;
	isPending?: boolean;
	isSentRequest?: boolean;
	profileImage: string | StaticImageData;
}

function UserRequest(props: Props) {
	const dispatch = useDispatch();
	const router = useRouter();
	const {width} = useDimension();
	const [isAccepted, setIsAccepted] = useState(false);
	const [isDeclined, setIsDeclined] = useState(false);

	const {mutate: acceptRequestMutate, isLoading: isAcceptRequestLoading} = useAcceptRequest({
		onComplete: () => {
			console.log("this ran 1");
			dispatch(setFilterUserRequestSent(props.id || ""));
			setIsAccepted(true);
		},
	});

	const {mutate: declineRequestMutate, isLoading: isDeclineRequestLoading} = useDeclineRequest({
		onComplete: () => {
			console.log("this ran 2");
			dispatch(setFilterUserRequestReceived(props.id || ""));
			setIsDeclined(true);
		},
	});

	const {mutate: deleteSentRequestMutate, isLoading: isDeleteSentRequestLoading} = useDeleteSentRequest({
		onComplete: () => {
			console.log("this ran 3");
			dispatch(setFilterUserRequestSent(props.id || ""));
			setIsAccepted(false);
		},
	});
	console.log(props.isSentRequest);
	return (
		<>
			<div className="flex w-full flex-col items-start justify-between gap-4 xs:flex-row xs:items-center xs:gap-0">
				<div className="flex w-full items-center justify-center gap-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
					<Image
						src={props.profileImage}
						alt="main background"
						width={width < 540 ? 64 : 28}
						height={width < 540 ? 64 : 28}
						tabIndex={-1}
						className="cursor-pointer"
						onClick={() =>
							props.id &&
							router.push(
								`/dashboard/explore/${props.id
									.split("")
									.filter((_) => _ !== "=")
									.join("")}`
							)
						}
					/>
					<div className="flex w-full flex-col gap-4">
						<div
							className="flex cursor-pointer items-center justify-start gap-3"
							onClick={() =>
								props.id &&
								router.push(
									`/dashboard/explore/${props.id
										.split("")
										.filter((_) => _ !== "=")
										.join("")}`
								)
							}
						>
							<p className="max-w-[7.5rem] truncate text-sm text-black-secondary md:max-w-[10rem]">{props.name}</p>
							{props.isFull && <HostTag isHost={props.isHost || false} />}
						</div>
						{!props.isPending ? (
							props.isSentRequest ? (
								<div className="flex xs:hidden">
									<Button
										type="button"
										buttonType="secondary"
										color="red"
										size="xs"
										isLoading={isDeleteSentRequestLoading}
										onClick={() => props.id && deleteSentRequestMutate({id: props.id})}
										borderSmall
									>
										<span>Delete Request</span>
									</Button>
								</div>
							) : isAccepted ? (
								<div className="flex h-7 w-max items-center justify-center rounded-md bg-green-100 px-3 xs:ml-2 xs:hidden">
									<span className="text-xs font-medium text-green-500">Accepted</span>
								</div>
							) : isDeclined ? (
								<div className="flex h-7 w-max items-center justify-center rounded-md bg-red-100 px-3 xs:ml-2 xs:hidden">
									<span className="text-xs font-medium text-red-500">Declined</span>
								</div>
							) : (
								<div className="flex gap-3 xs:ml-2 xs:hidden">
									<Button
										type="button"
										buttonType="secondary"
										color="red"
										size="xs"
										isLoading={isDeclineRequestLoading}
										onClick={() => props.id && declineRequestMutate({id: props.id})}
										borderSmall
									>
										<span>Decline</span>
									</Button>
									<Button
										type="button"
										buttonType="primary"
										color="black"
										size="xs"
										isLoading={isAcceptRequestLoading}
										onClick={() => props.id && acceptRequestMutate({id: props.id})}
										borderSmall
									>
										<span>Accept</span>
									</Button>
								</div>
							)
						) : (
							<div className="flex h-7 w-max items-center justify-center rounded-md bg-orange-100 px-3 xs:ml-2 xs:hidden">
								<span className="text-xs font-medium text-orange-500">Pending</span>
							</div>
						)}
					</div>
				</div>
				{!props.isPending ? (
					props.isSentRequest ? (
						<div className="hidden xs:flex">
							<Button
								type="button"
								buttonType="secondary"
								color="red"
								size="xs"
								isLoading={isDeleteSentRequestLoading}
								onClick={() => props.id && deleteSentRequestMutate({id: props.id})}
								borderSmall
							>
								<span>Delete</span>
							</Button>
						</div>
					) : isAccepted ? (
						<div className="flex h-7 w-max items-center justify-center rounded-md bg-green-100 px-3 xs:ml-2 xs:hidden">
							<span className="text-xs font-medium text-green-500">Accepted</span>
						</div>
					) : isDeclined ? (
						<div className="flex h-7 w-max items-center justify-center rounded-md bg-red-100 px-3 xs:ml-2 xs:hidden">
							<span className="text-xs font-medium text-red-500">Declined</span>
						</div>
					) : (
						<div className="ml-11 hidden gap-3 xs:ml-2 xs:flex">
							<Button
								type="button"
								buttonType="secondary"
								color="red"
								size="xs"
								isLoading={isDeclineRequestLoading}
								onClick={() => props.id && declineRequestMutate({id: props.id})}
								borderSmall
							>
								<span>Decline</span>
							</Button>
							<Button
								type="button"
								buttonType="primary"
								color="black"
								size="xs"
								isLoading={isAcceptRequestLoading}
								onClick={() => props.id && acceptRequestMutate({id: props.id})}
								borderSmall
							>
								<span>Accept</span>
							</Button>
						</div>
					)
				) : (
					<div className="ml-11 hidden h-7 items-center justify-center rounded-md bg-orange-100 px-3 xs:ml-2 xs:flex">
						<span className="text-xs font-medium text-orange-500">Pending</span>
					</div>
				)}
			</div>
		</>
	);
}

export default UserRequest;
