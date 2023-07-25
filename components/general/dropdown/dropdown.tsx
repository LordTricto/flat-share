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
	noBorder?: boolean;
	options: Array<DropdownItem<T>>;
	fitHeight?: boolean;
	placement?: "right" | "left";
	fitWidth?: boolean;
	canCancel?: boolean;
	isDisabled?: boolean;
	customHead?: React.ReactNode;
	placeholder?: string;
	customHeadStyle?: string;
	withIconBackdrop?: boolean;

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
	noBorder = false,
	canCancel = false,
	fitHeight = false,
	placement = "left",
	fitWidth = false,
	isDisabled = false,
	customHead,
	placeholder = "",
	customHeadStyle = "",
	withIconBackdrop = false,
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
			noBorder={noBorder}
			isCancel={canCancel}
			fitWidth={fitWidth}
			fitHeight={fitHeight}
			placement={placement}
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
										<div className="w-8">
											{withIconBackdrop && (
												<div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-senary ">
													<Image src={option.icon} alt="icon" priority />
												</div>
											)}
											<div className="h-5 w-5">
												<Image src={option.icon} className="h-full w-full" alt="icon" priority />
											</div>
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
