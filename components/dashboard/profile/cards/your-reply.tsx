import Image from "next/image";
import React from "react";
import likesIcon from "@/public/images/dashboard/profile/likes.svg";

interface Props {
	date: string;
	message: string;
	likes: number;
}

function YourReply(props: Props) {
	return (
		<>
			<div className="flex flex-col items-start justify-start gap-6 border-l-2 border-black-quin py-2  pl-5">
				<div className="flex items-center justify-start gap-3">
					<h6 className="text-base font-semibold">Your Reply</h6>
					<p className="text-sm text-black-secondary">{props.date}</p>
				</div>
				<p className="text-base text-black-tertiary">{props.message}</p>
				<div className="flex items-center justify-start gap-6">
					<div className="flex items-center justify-start gap-1.5">
						<Image src={likesIcon} alt="camera" width={20} height={20} />
						<span className="select-none text-base text-black-tertiary">{props.likes}</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default YourReply;
