"use client";

import {DropdownItem, DropdownItemValueType} from "@/helpers/types";

import DropdownContainer from "./dropdown-container";
import DropdownRow from "./dropdown-row";
import Image from "next/image";
import React from "react";

interface Props<T extends DropdownItemValueType> {
	big?: boolean;
	size?: "sm" | "md" | "lg";
	value: T | undefined;
	label?: string;
	options: Array<DropdownItem<T>>;
	fitHeight?: boolean;
	canCancel?: boolean;
	isDisabled?: boolean;
	placeholder?: string;

	onSelect: (value: T | undefined) => void;
	onCancel?: () => void;
	clickOutsideFunc?: () => void;
}

function Dropdown<T extends DropdownItemValueType>({
	big = false,
	size = "lg",
	value,
	label,
	options,
	canCancel = false,
	fitHeight = false,
	isDisabled = false,
	placeholder = "",

	onSelect,
	onCancel = undefined,
	clickOutsideFunc = undefined,
}: Props<T>): JSX.Element {
	return (
		<DropdownContainer
			size={size}
			label={label}
			isCancel={canCancel}
			fitHeight={fitHeight}
			isDisabled={isDisabled}
			placeholder={placeholder}
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
								"flex flex-col justify-start text-black items-start space-y-0.5 px-4 py-2 w-full " +
								`${option.value === value ? "pointer-events-none" : ""} `
							}
							data-type="dropdown"
						>
							<div className="flex flex-row justify-start items-center">
								{option.icon && (
									<div>
										<div className="flex justify-center items-center h-7 w-7 bg-blue-senary rounded-full ">
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
									className="inline text-xs justify-center text-black-tertiary break-words whitespace-pre-wrap text-left"
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
