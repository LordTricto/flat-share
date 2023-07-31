import Image, {StaticImageData} from "next/image";

import React from "react";

interface Props {
	profile: string | StaticImageData;
	name: string;
	date: string;
	message: string;
	isActive?: boolean;
	onClick: () => void;
}

function MessageItem(props: Props) {
	return (
		<>
			<div
				className={"flex w-full cursor-pointer items-center gap-3 p-5 " + `${props.isActive ? "bg-white" : "bg-grey-backdrop"}`}
				onClick={() => props.onClick()}
			>
				<div className="min-w-[40px] rounded-md">
					<div>
						<Image src={props.profile} className="w-full" width={40} height={40} alt="user avatar" tabIndex={-1} />
					</div>
				</div>
				<div className="flex w-full flex-col gap-2 overflow-hidden overflow-ellipsis whitespace-nowrap ">
					<div className="flex w-full items-center justify-between">
						<h6 className="text-base font-medium text-black">{props.name}</h6>
						<p className="text-xs text-black-tertiary">{props.date}</p>
					</div>
					<p className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-black-tertiary">{props.message}</p>
				</div>
			</div>
		</>
	);
}

export default MessageItem;
