"use client";

import {DropdownItem, DropdownItemValueType} from "@/helpers/types";
import React, {useEffect, useState} from "react";

import DropdownContainer from "./dropdown-container";
import DropdownRow from "./dropdown-row";
import Image from "next/image";
import searchIcon from "@/public/images/icons/search.svg";

interface Props<T extends DropdownItemValueType> {
	big?: boolean;
	size?: "sm" | "md" | "lg" | "fit";
	value: string;
	label?: string;
	noBorder?: boolean;
	options: Array<DropdownItem<T>>;
	fitHeight?: boolean;
	placement?: "right" | "left";
	fitWidth?: boolean;
	isDisabled?: boolean;
	customHead?: React.ReactNode;
	customHeadStyle?: string;
	withIconBackdrop?: boolean;
	inputPlaceholder?: string;

	onSelect: (value: T | undefined) => void;
	onCancel?: () => void;
	onChange: (e: string) => void;
	clickOutsideFunc?: () => void;
}

function SearchDropdown<T extends DropdownItemValueType>({
	big = false,
	size = "lg",
	value,
	label,
	options,
	fitHeight = false,
	placement = "left",
	fitWidth = false,
	isDisabled = false,
	customHead,
	customHeadStyle = "",
	withIconBackdrop = false,
	inputPlaceholder = undefined,

	onSelect,
	onCancel = undefined,
	onChange,
	clickOutsideFunc = undefined,
}: Props<T>): JSX.Element {
	const [filteredOptions, setFilteredOptions] = useState<DropdownItem<T>[]>([]);

	useEffect(() => {
		const filteredAccounts = (options || []).filter((item: DropdownItem<T>) => {
			// if (!item || !item.name) {
			// 	return false;
			// }
			if (!value || value.trim().length === 0) {
				return true;
			}
			return item.text.toLowerCase().includes(value.toLowerCase());
		});
		setFilteredOptions(filteredAccounts);
	}, [value, options]);

	return (
		<DropdownContainer
			size={size}
			label={label}
			icon={searchIcon}
			noArrow={true}
			hasInput={true}
			// isCancel={canCancel}
			fitWidth={fitWidth}
			fitHeight={fitHeight}
			placement={placement}
			customHead={customHead}
			isDisabled={isDisabled}
			customHeadStyle={customHeadStyle}
			inputPlaceholder={inputPlaceholder}
			clickOutsideFunc={clickOutsideFunc}
			// value={options.find((item) => item.value === value)?.text || ""}
			value={value}
			cancelFunc={() => {
				if (onCancel) {
					onCancel();
				}
			}}
			onChange={(_value) => onChange(_value)}
			clickAndClose
		>
			{filteredOptions &&
				filteredOptions.map((option, index) => (
					<DropdownRow
						key={index}
						onClick={() => onSelect(option.value)}
						big={option.big || big}
						fitHeight={option.fitHeight || fitHeight}
						isLink={option.isLink}
						redHover={option.redHover}
						noHover={option.noHover}
					>
						<div
							className={
								"flex w-full flex-col items-start justify-start space-y-0.5 px-4 py-2 " +
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
								<span className={"text-sm capitalize" + `${option.icon ? "ml-2" : ""}`} data-type="dropdown">
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

export default SearchDropdown;
