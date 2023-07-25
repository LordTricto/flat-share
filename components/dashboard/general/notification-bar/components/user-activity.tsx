import Image, {StaticImageData} from "next/image";

import React from "react";

interface Props {
	name: string;
	time: string;
	isLike: boolean;
	comment?: string;
	profileImage: StaticImageData;
}

function UserActivity(props: Props) {
	return (
		<>
			<div className="flex gap-4">
				<Image src={props.profileImage} className="h-10 w-10 rounded-md shadow-md" width={40} height={40} alt="user profile" tabIndex={-1} />

				<div className="flex w-full flex-col justify-start gap-2">
					<p className="text-xs text-black">
						<span className="font-semibold">{props.name}</span> {props.isLike ? "liked your new post." : "left a comment."}
					</p>
					{props.comment && <p className="two-lines-max text-xs text-black-secondary">{`"${props.comment}"`}</p>}
					<p className="text-xs text-black-quat">{props.time} ago</p>
				</div>
			</div>
		</>
	);
}

export default UserActivity;
