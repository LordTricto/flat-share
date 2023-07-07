"use client";

import {DropdownItem, DropdownItemValueType} from "@/helpers/types";
import Image, {StaticImageData} from "next/image";

import DropdownContainer from "./dropdown-container";
import DropdownRow from "./dropdown-row";
import React from "react";

interface Props<T extends DropdownItemValueType> {
	big?: boolean;
	size?: "sm" | "md" | "lg" | "fit";
	icon?: StaticImageData;
	value: T | undefined;
	label?: string;
	noArrow?: boolean;
	options: Array<DropdownItem<T>>;
	fitHeight?: boolean;
	canCancel?: boolean;
	isDisabled?: boolean;
	customHead?: React.ReactNode;
	placeholder?: string;
	customHeadStyle?: string;

	onSelect: (value: T | undefined) => void;
	onCancel?: () => void;
	clickOutsideFunc?: () => void;
}

function Dropdown<T extends DropdownItemValueType>({
	big = false,
	icon = undefined,
	size = "lg",
	value,
	label,
	options,
	noArrow = false,
	canCancel = false,
	fitHeight = false,
	isDisabled = false,
	customHead,
	placeholder = "",
	customHeadStyle = "",
	onSelect,
	onCancel = undefined,
	clickOutsideFunc = undefined,
}: Props<T>): JSX.Element {
	return (
		<DropdownContainer
			size={size}
			label={label}
			icon={icon}
			noArrow={noArrow}
			isCancel={canCancel}
			fitHeight={fitHeight}
			customHead={customHead}
			isDisabled={isDisabled}
			placeholder={placeholder}
			customHeadStyle={customHeadStyle}
			clickOutsideFunc={clickOutsideFunc}
			value={options.find((item) => item.value === value)?.text || ""}
			cancelFunc={() => {
				if (onCancel) {
					onCancel();
				}
			}}
			clickAndClose
		>
			{options &&
				options.map((option, index) => (
					<DropdownRow key={index} onClick={() => onSelect(option.value)} big={big} fitHeight={fitHeight}>
						<div
							className={
								"flex w-full flex-col items-start justify-start space-y-0.5 px-4 py-2 text-black " +
								`${option.value === value ? "pointer-events-none" : ""} `
							}
							data-type="dropdown"
						>
							<div className="flex flex-row items-center justify-start">
								{option.icon && (
									<div>
										<div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-senary ">
											<Image src={option.icon} alt="icon" priority />
										</div>
									</div>
								)}
								<span className={"text-sm capitalize text-black-secondary " + `${option.icon ? "ml-2" : ""}`} data-type="dropdown">
									{option.text}
								</span>
							</div>
							{option.subtext && (
								<p
									className="inline justify-center whitespace-pre-wrap break-words text-left text-xs text-black-tertiary"
									data-type="dropdown"
								>
									{option.subtext}
								</p>
							)}
						</div>
					</DropdownRow>
				))}
		</DropdownContainer>
	);
}

export default Dropdown;
