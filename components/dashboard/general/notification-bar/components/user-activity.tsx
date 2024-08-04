import Image, {StaticImageData} from "next/image";

import React from "react";

interface Props {
	name: string;
	time: string;
	isLike?: boolean;
	isView?: boolean;
	isSmall?: boolean;
	comment?: string;
	isComment?: boolean;
	profileImage: StaticImageData | string;
}

function UserActivity(props: Props) {
	const {isSmall = true} = props;
	return (
		<>
			<div className="flex gap-4">
				<Image src={props.profileImage} className="h-10 w-10 rounded-md shadow-md" width={40} height={40} alt="user profile" tabIndex={-1} />

				<div
					className={
						"flex w-full gap-2 " + `${isSmall ? "flex-col justify-start" : "flex-col lg:flex-row lg:items-center lg:justify-between"}`
					}
				>
					<p className="text-xs text-black">
						<span className="font-semibold">{props.name}</span> {props.isLike ? "liked your new post." : ""}
						{props.isComment ? "left a comment." : ""}
						{props.isView ? "viewed your profile." : ""}
					</p>
					{props.comment && <p className="two-lines-max text-xs text-black-secondary">{`"${props.comment}"`}</p>}
					<p className="text-xs text-black-quat">{props.time}</p>
				</div>
			</div>
		</>
	);
}

export default UserActivity;
