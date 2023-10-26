"use client";

import React, {ReactNode, useCallback} from "react";

import Image from "next/image";
import Info from "@/public/images/general/info.svg";
import {Tooltip as ReactTooltip} from "react-tooltip";
import useDimension from "@/helpers/useDimension";

// use to generate a unique id for the input
let tooltipCounter = 0;

interface Props {
	icon?: ReactNode;
	children?: ReactNode;
	message: string;
	placement: "top" | "bottom" | "left" | "right";
	size?: "small";
	bgHover?: boolean;
	dataType?: string;
	openOnClick?: boolean;
	onClick?: () => void;
}

function Tooltip({
	onClick,
	icon,
	message,
	bgHover = false,
	placement = "top",
	children,
	openOnClick,
	size = undefined,
	dataType = "",
}: Props): JSX.Element {
	const {width} = useDimension();

	const handleOnClick = useCallback(
		(e: React.MouseEvent) => {
			if (onClick) {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			}
		},
		[onClick]
	);

	return (
		<>
			<div data-type={dataType + `${++tooltipCounter}`}>
				<a data-tooltip-id={`tip-${message}`} data-tooltip-content={message} data-tooltip-variant="dark">
					{children && children}
					{!children && (
						<div
							className={
								`relative flex cursor-pointer items-center justify-center rounded-lg outline-none ` +
								`${size === "small" ? "h-6 w-6" : "h-8 w-8"} ` +
								`${bgHover ? "hover:bg-grey-backdrop" : ""} `
							}
							onClick={handleOnClick}
							data-type={dataType}
						>
							{icon || <Image src={Info} alt="info" />}
						</div>
					)}
				</a>
				<ReactTooltip
					id={`tip-${message}`}
					place={width > 420 ? placement : "top"}
					openOnClick={openOnClick}
					className="z-20 w-full max-w-[15rem] whitespace-normal 2xs:max-w-xs"
				/>
				{/* <span data-tip data-for={message}></span>
				<ReactTooltip id={message} place={placement} variant="dark">
					<span>{message}</span>
				</ReactTooltip> */}
			</div>
		</>
	);
}

export default Tooltip;
