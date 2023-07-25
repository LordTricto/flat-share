import React from "react";

interface Props {
	colorClass: string;
	text: string;
}

function UserTag(props: Props) {
	return (
		<>
			<div className={"flex h-7 w-max items-center justify-center gap-1 rounded-md px-1.5 3xs:gap-2 3xs:px-3 " + `${props.colorClass}`}>
				<span className=" text-xs font-semibold capitalize">{props.text}</span>
			</div>
		</>
	);
}

export default UserTag;
