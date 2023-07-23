import React from "react";

interface Props {
	colorClass: string;
	text: string;
}

function UserTag(props: Props) {
	return (
		<>
			<div className={"flex h-7 w-max items-center justify-center rounded-md px-3 " + `${props.colorClass}`}>
				<span className="text-green text-xs font-semibold">{props.text}</span>
			</div>
		</>
	);
}

export default UserTag;
