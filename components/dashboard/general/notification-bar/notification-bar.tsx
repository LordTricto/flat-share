import {MainInitFormResponse} from "@/hooks/dashboard/main-init/main-init.constants";
import UpgradeAccountCard from "../cards/upgrade-account/upgrade-account";
import Views from "./components/views";

interface Props {
	data: MainInitFormResponse;
	onViewAllViews: () => void;
}

function NotificationBar(props: Props) {
	return (
		<>
			<div className="hidden h-full min-w-[280px] overflow-y-auto lg:relative lg:block">
				<div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between gap-[42px] overflow-y-auto border-l border-grey-quat bg-white px-5 py-6">
					<Views onViewAllViews={props.onViewAllViews} />
					{/* <div className={"flex flex-grow flex-col gap-[42px] " + `${isActivityEmpty ? "h-80" : "h-fit"}`}>
						<div className="flex w-full items-center justify-between">
							<h4 className="text-base font-semibold leading-[100%] text-black">Recent Messages</h4>
							{!isActivityEmpty && (
								<Button type="button" buttonType="tertiary" color="blue" size="xs">
									<span className="uppercase">view all</span>
								</Button>
							)}
						</div>
						<div className="h-full w-full border-b border-grey-secondary">
							{isActivityEmpty ? (
								<div className="flex w-full flex-col items-center justify-center gap-1 pt-8">
									<Image priority src={emptyProfileIcon} alt="Empty state" />
									<p className="text-xs text-grey-quin">No conversation to display</p>
								</div>
							) : (
								<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-3 [&>*]:pb-3">
									<UserMessage
										name="Jocelyn Curtis"
										profileImage={requestAvatarOne}
										time="5 mins"
										message="Hello Ruth, please do you have any idea where the water is placed in the school"
										messageNo="2"
									/>
									<UserMessage
										name="Justin Passaquindici"
										profileImage={requestAvatarOne}
										time="10 mins"
										message="Thanks for the feedback. 🙏"
										messageNo="3"
									/>
									<UserMessage
										name="Nolan Press"
										profileImage={requestAvatarOne}
										time="2 hrs"
										message="I think this is a lot better."
										messageNo="1"
									/>
								</div>
							)}
						</div>
					</div> */}
					<UpgradeAccountCard />
				</div>
			</div>
		</>
	);
}

export default NotificationBar;
