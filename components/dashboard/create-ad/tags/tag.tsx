"use client";

import React, {useState} from "react";

interface Props {
	text: string;
	isActive: boolean;
	isDisabled?: boolean;
	onClick: () => void;
}

function Tag(props: Props) {
	// const [isTagActive, setIsTagActive] = useState(true);

	return (
		<>
			<div>
				<div
					className={
						"flex h-10 w-max items-center justify-center rounded-full border border-transparent px-4 outline-none duration-150 " +
						`${props.isActive ? "!border-blue bg-blue-quin-light text-black-secondary" : "!border-grey text-grey-quin"} ` +
						`${props.isDisabled ? "cursor-default" : "cursor-pointer"} `
					}
					onClick={() => {
						if (props.isDisabled) return;
						props.onClick();
						// setIsTagActive((prev) => !prev);
					}}
				>
					<span className="select-none text-sm font-medium duration-150">{props.text}</span>
				</div>
			</div>
		</>
	);
}

export default Tag;
