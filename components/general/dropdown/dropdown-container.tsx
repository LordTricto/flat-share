"use client";

import Image, {StaticImageData} from "next/image";
import React, {KeyboardEvent, useEffect, useRef, useState} from "react";

import SearchBar from "../search-bar";
import cancel from "@/public/images/icons/cancel.svg";
import chevronArrow from "@/public/images/icons/chevron-arrow.svg";
// import SearchBar from "../../../../modules/Dashboard/Settings/Components/Searchbar/TeamMemebers/SearchBar";
import useClickOutside from "@/helpers/useClickOutside";

let inputCounter = 0;

interface DropdownProps {
	size?: "sm" | "md" | "lg" | "fit";
	icon?: StaticImageData;
	value: number | string | null;
	label?: string;
	noArrow?: boolean;
	noBorder?: boolean;
	fitWidth?: boolean;
	children: React.ReactNode;
	hasInput?: boolean;
	placement?: "right" | "left";
	isCancel?: boolean;
	fitHeight?: boolean;
	customHead?: React.ReactNode;
	triggerLower?: boolean;
	customHeadStyle?: string;
	searchTerm?: string;
	placeholder?: string;
	isDisabled?: boolean;
	isSearchable?: boolean;
	clickAndClose?: boolean;
	inputPlaceholder?: string;
	searchPlaceholder?: string;

	onChange?: (e: string) => void;
	cancelFunc?(): void;
	clickOutsideFunc?: () => void;
	handleChangeSearchTerm?: (e: string) => void;
}

function DropdownContainer({
	size = "lg",
	icon = undefined,
	label,
	noArrow = false,
	noBorder = false,
	children,
	placement = "left",
	hasInput = false,
	isCancel = false,
	fitHeight = false,
	fitWidth = false,
	isDisabled = false,
	customHead,
	triggerLower = false,
	customHeadStyle = "",
	searchTerm = "",
	value,
	placeholder = undefined,
	isSearchable = false,
	clickAndClose = false,
	inputPlaceholder = undefined,

	searchPlaceholder = "Search",
	cancelFunc = undefined,
	onChange = undefined,
	clickOutsideFunc = undefined,
	handleChangeSearchTerm = undefined,
}: DropdownProps): JSX.Element {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [y, setY] = useState<number | null>(null);
	const [active, setActive] = useState<boolean>(false);
	const [isHover, setIsHover] = useState<boolean>(false);
	const [hasValue, setHasValue] = useState<boolean>(false);
	const [positionTop, setPositionTop] = useState<boolean>(false);
	const [uniqueId, setUniqueId] = useState<string>("");
	const [innerHeight, setInnerHeight] = useState<number>(0);

	// const innerHeight = window.innerHeight;

	const domNode = useClickOutside(() => {
		setActive(false);
		clickOutsideFunc && clickOutsideFunc();
		handleChangeSearchTerm && handleChangeSearchTerm("");
	});

	useEffect(() => {
		setInnerHeight(window.innerHeight);
	}, []);

	useEffect(() => {
		if (domNode.current) {
			setY(domNode.current.getBoundingClientRect().top);
		}
		setUniqueId(`input-${++inputCounter}`);
	}, [domNode]);

	// useEffect(() => {
	// 	// ✅ Use window in useEffect hook
	// 	const handleScroll = (e: Event) => {
	// 		setInnerHeight(e.target.);
	// 	};

	// 	window.addEventListener("scroll", handleScroll);

	// 	return () => {
	// 		window.removeEventListener("scroll", handleScroll);
	// 	};
	// }, []);

	useEffect(() => {
		if (domNode.current) {
			setY(domNode.current.getBoundingClientRect().top);
		}
	}, [domNode]);

	useEffect(() => {
		if (y) {
			let shouldSetPositionTop;
			if (triggerLower) {
				shouldSetPositionTop = y > innerHeight / 1.25;
			} else {
				shouldSetPositionTop = y > innerHeight / 1.65;
			}
			setPositionTop(shouldSetPositionTop);
		}
	}, [innerHeight, y, triggerLower]);

	useEffect(() => {
		setHasValue(!!value && ((typeof value === "string" && value.length > 0) || (typeof value === "number" && value > 0)));
	}, [value]);

	const handleKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
		//it triggers by pressing the enter key
		if (event.key === "Enter") {
			setActive((prev) => !prev);
		}
	};

	return (
		<div
			className={`relative flex h-full w-full flex-col items-start justify-start gap-3 ` + `${isDisabled ? "pointer-events-none" : ""}`}
			id="dropdown-div"
			ref={domNode}
		>
			{label && (
				<label
					htmlFor={uniqueId}
					className={
						`font-medium leading-[100%] ` +
						`${isDisabled ? "text-black-quat " : "text-black-secondary"} ` +
						`${size === "lg" ? "text-lg" : ""} ` +
						`${size === "md" ? "text-base" : ""} ` +
						`${size === "sm" ? "text-sm" : ""} `
					}
					onClick={() => {
						if (inputRef.current) {
							inputRef.current.focus();
						}
					}}
				>
					<span className="h-fit max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{label}</span>
				</label>
			)}

			<div
				onMouseEnter={() => !isDisabled && setIsHover(true)}
				onMouseLeave={() => !isDisabled && setIsHover(false)}
				className={
					`relative flex w-full cursor-pointer items-center  rounded-lg bg-white px-4 py-3 shadow-none outline-none transition-all duration-75 focus:outline-none ` +
					`text-left text-base font-normal capitalize leading-relaxed text-black-tertiary hover:text-black-secondary focus:text-black-secondary ` +
					`border border-solid ` +
					`${active ? "border-black-quat" : ""} ` +
					`${isDisabled ? "border-black-quin" : "border-black-quin focus:border-black-quat lg:hover:border-black-quat"} ` +
					`${noBorder ? "border-none !border-transparent" : ""} ` +
					`${size === "lg" ? "h-12" : ""} ` +
					`${size === "md" ? "h-10" : ""} ` +
					`${size === "sm" ? "h-8" : ""} ` +
					`${!customHead ? "space-x-4" : ""} ` +
					`${customHeadStyle} ` +
					`${hasValue ? "justify-between" : "justify-end"} `
				}
				tabIndex={isDisabled ? -1 : 0}
				onClick={() => {
					if (hasInput) {
						inputRef?.current?.focus();
					}
					if (isCancel && hasValue) {
						setActive((prev) => prev);
					} else {
						setActive((prev) => !prev);
					}
				}}
				onKeyDown={handleKeypress}
			>
				{customHead && <div className="w-full">{customHead}</div>}
				{!value && placeholder && (
					<span
						className={
							`pointer-events-none max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-base text-black-quat ` +
							`${size === "lg" ? "text-lg" : ""} ` +
							`${size === "md" ? "text-base" : ""} ` +
							`${size === "sm" ? "text-sm" : ""} `
						}
					>
						{placeholder}
					</span>
				)}
				{!hasInput && value && (
					<span
						className={
							`sel max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap ` +
							`${isDisabled ? "pointer-events-none bg-transparent text-black-quat" : "text-black-secondary"} ` +
							`${size === "lg" ? "text-lg" : ""} ` +
							`${size === "md" ? "text-base" : ""} ` +
							`${size === "sm" ? "text-sm" : ""} `
						}
					>
						{value}
					</span>
				)}
				{!noArrow && (
					<div
						className={
							`w-max transform items-center justify-end self-end transition-transform duration-150 ` +
							`${active ? "-rotate-180" : "rotate-0"} ` +
							`${isDisabled ? "text-black-quat " : ""} `
						}
					>
						<Image src={chevronArrow} alt="right arrow" priority />
						{/* <chevron className="stroke-current h-3.5 w-3.5" /> */}
					</div>
				)}
				{icon && (
					<span className={`flex cursor-default items-center justify-start text-black-secondary transition-all duration-75 ease-in-out `}>
						<Image src={icon} alt="input icon" />
					</span>
				)}
				{isCancel && hasValue && (
					<div
						className={
							`flex items-center justify-end ` +
							`${active ? "text-blue" : ""} ` +
							`${!active && hasValue ? "text-black-secondary" : ""} ` +
							`${isHover ? "text-blue" : ""} `
						}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							if (cancelFunc) {
								cancelFunc();
							}
						}}
					>
						<Image src={cancel} alt="right arrow" priority />
						{/* <Cancel className="stroke-current h-3.5 w-3.5" /> */}
					</div>
				)}
				{hasInput && (
					<input
						ref={inputRef}
						type="text"
						value={value || ""}
						onChange={(e) => {
							onChange && onChange(e.target.value);
							// setActive(true);
						}}
						// onClick={(e) => e.stopPropagation()}
						className={
							`z-10 !ml-2 w-full placeholder:text-sm placeholder:text-black-quat focus:border-none focus:outline-none ` +
							`${hasValue ? "text-black-secondary" : ""} ` +
							`${isDisabled ? "bg-transparent !text-black-quat " : ""} `
						}
						name={`${uniqueId}-${inputPlaceholder || ""}`}
						placeholder={inputPlaceholder}
						id={uniqueId}
						disabled={isDisabled}
						tabIndex={isDisabled ? -1 : 0}
					/>
				)}
			</div>

			<div
				className={
					`absolute z-40 h-fit transform cursor-pointer overflow-hidden overflow-y-auto rounded bg-white shadow ` +
					`${
						positionTop ? (label ? "bottom-full -mb-[26px] origin-bottom" : "bottom-full mb-1 origin-bottom") : "top-full mt-1 origin-top"
					} ` +
					`${placement === "left" ? "left-0 " : "right-0"} ` +
					`${!active ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100"} ` +
					`${!fitWidth ? "w-full" : "w-max"} ` +
					`${!fitHeight ? "max-h-56 " : ""} `
				}
			>
				{isSearchable && handleChangeSearchTerm && (
					<div className="flex h-14 w-full items-center justify-start px-4">
						<SearchBar placeholder={searchPlaceholder} value={searchTerm} onChange={handleChangeSearchTerm} />
					</div>
				)}
				<div
					className={`w-full`}
					onClick={() => {
						if (clickAndClose) {
							setActive((prev) => !prev);
						}
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

export default DropdownContainer;
