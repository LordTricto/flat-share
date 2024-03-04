"use client";

import {DropdownItem, DropdownItemValueType} from "@/helpers/types";
import Image, {StaticImageData} from "next/image";
import React, {CSSProperties, useEffect, useState} from "react";

import DropdownContainer from "./dropdown-container";
import DropdownRow from "./dropdown-row";
import {FixedSizeList as List} from "react-window";
import SearchBar from "../search-bar";

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
	const [searchTerm, setSearchTerm] = useState<string>("");

	const [data, setData] = useState<Array<DropdownItem<T>>>([]);

	useEffect(() => {
		const filteredData: DropdownItem<T>[] = (options || []).filter((item: DropdownItem<T>): boolean => {
			if (!searchTerm || searchTerm.trim().length === 0 || !item.value) {
				return true;
			}
			return typeof item.value === "string" ? item.value.toLowerCase().includes(searchTerm.toLowerCase()) : true;
		});
		setData(filteredData);
	}, [options, searchTerm]);

	const handleChangeSearchTerm = (e: string) => {
		setSearchTerm(e);
	};

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
			clickAndClose={options.length < 7}
		>
			{options.length > 7 && (
				<div className="relative mx-auto my-2 h-10 w-full px-4" tabIndex={-1} data-type="transaction">
					<SearchBar placeholder="Search" value={searchTerm} onChange={handleChangeSearchTerm} data-type="transaction" />
				</div>
			)}
			<List
				className="List"
				height={data.length * 40 > 160 ? 160 : data.length * 40}
				itemCount={data && data.length}
				itemSize={40}
				width={"100%"}
			>
				{({index, style}: {index: number; style: CSSProperties | undefined}) => (
					<>
						<div className="flex w-full flex-col" style={style} key={index}>
							<DropdownRow
								key={index}
								onClick={() => onSelect(data[index].value)}
								big={data[index].big || big}
								fitHeight={data[index].fitHeight || fitHeight}
								isLink={data[index].isLink}
								redHover={data[index].redHover}
								noHover={data[index].noHover}
							>
								<div
									className={
										"flex w-full flex-col items-start justify-start space-y-0.5 px-4 py-2 " +
										`${data[index].value === value ? "pointer-events-none" : ""} `
									}
									data-type="dropdown"
								>
									<div className="flex flex-row items-center justify-start">
										{data[index].icon && (
											<div>
												<div className="w-8">
													{withIconBackdrop && (
														<div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-senary ">
															<Image src={data[index].icon || ""} alt="icon" priority />
														</div>
													)}
													<div className="h-5 w-5">
														<Image src={data[index].icon || ""} className="h-full w-full" alt="icon" priority />
													</div>
												</div>
											</div>
										)}
										<span className={"text-sm capitalize" + `${data[index].icon ? "ml-2" : ""}`} data-type="dropdown">
											{data[index].text}
										</span>
									</div>
									{data[index].subtext && (
										<p
											className="inline justify-center whitespace-pre-wrap break-words text-left text-xs text-black-tertiary"
											data-type="dropdown"
										>
											{data[index].subtext}
										</p>
									)}
								</div>
							</DropdownRow>
						</div>
					</>
				)}
			</List>
		</DropdownContainer>
	);
}

export default Dropdown;
