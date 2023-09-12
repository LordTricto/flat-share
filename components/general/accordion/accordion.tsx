"use client";

import React, {useState} from "react";

import Image from "next/image";
import chevronArrow from "@/public/images/icons/chevron-arrow.svg";

interface Props {
	isOpen: boolean;
	header: string;
	subText?: string;
	paragraph?: string;
	children?: React.ReactNode;
	onToggle: () => void;
}

function Accordion(props: Props) {
	return (
		<>
			<div className="w-full border-b">
				<div
					className={`group ${props.isOpen ? "is-active" : ""} flex w-full cursor-pointer items-center justify-between transition-all `}
					onClick={props.onToggle}
				>
					<h5 className="select-none font-medium text-black-secondary">{props.header}</h5>

					<div
						className={`h-full w-max transition duration-150 group-[.is-active]:rotate-180 `}
						//  + `${isOpen ? "-rotate-180" : "rotate-0"} `}
					>
						<Image src={chevronArrow} alt="right arrow" priority />
					</div>
				</div>
				{props.subText && <p className="w-full truncate pt-3 text-sm">{props.subText}</p>}
				<div
					className={`w-full duration-150 ${
						props.isOpen ? "max-h-fit py-6 opacity-100" : `pointer-events-none max-h-0 overflow-hidden pb-6 opacity-0`
					} `}
				>
					{/* <div className={`w-full overflow-hidden duration-150 ${props.isOpen ? "my-3 max-h-[100px]" : "mt-3 max-h-0"} `}> */}
					{props.paragraph || props.children}
				</div>
			</div>
		</>
	);
}

export default Accordion;
