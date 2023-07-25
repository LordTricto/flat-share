import Image, {StaticImageData} from "next/image";

import React from "react";

interface Props {
	name: string;
	time: string;
	message: string;
	messageNo: string;
	profileImage: StaticImageData;
}

function UserMessage(props: Props) {
	return (
		<>
			<div className="flex gap-4">
				<Image src={props.profileImage} className="h-10 w-10 rounded-md shadow-md" width={40} height={40} alt="user profile" tabIndex={-1} />
				<div className="flex w-full flex-col justify-start gap-2">
					<p className="text-xs text-black">
						<span className="font-semibold">{props.name}</span>
					</p>
					<p className="two-lines-max text-xs text-black-secondary">{`${props.message}`}</p>
					<p className="text-xs text-black-quat">{props.time} ago</p>
				</div>
				<div>
					<div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
						<span className="text-xs text-white">{props.messageNo}</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default UserMessage;
