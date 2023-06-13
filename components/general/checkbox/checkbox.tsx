"use client";

import React, {useEffect, useState} from "react";

import Image from "next/image";
import check from "@/public/images/icons/checkbox-check.svg";
import isNullOrUndefined from "../../../utils/isNullOrUndefined";

interface Props {
	text?: React.ReactNode;
	id: string;
	truncate?: boolean;
	readOnly?: boolean;
	checked?: boolean;
	onClick?: () => void;
	size?: "sm" | "md";
}

function Checkbox(props: Props): JSX.Element {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const {truncate = false} = props;

	useEffect(() => {
		if (isNullOrUndefined(props.checked)) return;
		setIsChecked(props.checked);
	}, [props.checked]);

	const handleClick = () => {
		setIsChecked((prev) => !prev);
		props.onClick && props.onClick();
	};

	return (
		<>
			<div
				className={`flex flex-row items-start justify-start ` + `${props.readOnly ? "pointer-events-none" : "cursor-pointer"} `}
				onClick={handleClick}
				data-type="transaction"
			>
				<div data-type="transaction">
					<div
						className={
							`relative flex items-center justify-center rounded-[4px] border border-solid border-black-tertiary transition-all duration-150 ` +
							`${props.size === "sm" ? "h-4 w-4" : "h-5 w-5"} ` +
							`${isChecked ? "border-blue bg-blue" : ""} ` +
							`${props.readOnly ? "border-black-quin" : ""} `
						}
						data-type="transaction"
					>
						<input
							className="absolute left-0 top-0 hidden h-full w-full placeholder-transparent outline-none focus:outline-none"
							checked={isChecked}
							type={"checkbox"}
							id={props.id}
							readOnly
							data-type="transaction"
						/>
						<Image
							className={`fill-current ` + `${isChecked ? "opacity-100" : "opacity-0"} ` + `${props.size === "sm" ? "w-2.5" : "w-3"} `}
							src={check}
							alt="check mark icon"
							data-type="transaction"
						/>
					</div>
				</div>

				<div
					className={
						`pointer-events-none w-fit max-w-full pl-2 ` +
						`${truncate ? "overflow-hidden overflow-ellipsis whitespace-nowrap leading-none" : "leading-4"} ` +
						`${props.readOnly ? "text-black-tertiary" : " text-black-secondary"} ` +
						`${props.size === "sm" ? "text-sm" : "text-base"} `
					}
					data-type="transaction"
				>
					{props.text || ""}
				</div>
			</div>
		</>
	);
}

export default Checkbox;
