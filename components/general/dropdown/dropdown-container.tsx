"use client";

import React, {KeyboardEvent, useEffect, useRef, useState} from "react";

import Image from "next/image";
import cancel from "@/public/images/icons/cancel.svg";
import chevronArrow from "@/public/images/icons/chevron-arrow.svg";
// import SearchBar from "../../../../modules/Dashboard/Settings/Components/Searchbar/TeamMemebers/SearchBar";
import useClickOutside from "@/helpers/useClickOutside";

let inputCounter = 0;

interface DropdownProps {
	size?: "sm" | "md" | "lg";
	label?: string;
	noArrow?: boolean;
	children: React.ReactNode;
	hasInput?: boolean;
	isCancel?: boolean;
	fitHeight?: boolean;
	value: number | string | null;
	searchTerm?: string;
	placeholder: string;
	isDisabled?: boolean;
	isSearchable?: boolean;
	clickAndClose?: boolean;
	searchPlaceholder?: string;

	onChange?: (e: string) => void;
	cancelFunc?(): void;
	clickOutsideFunc?: () => void;
	handleChangeSearchTerm?: (e: string) => void;
}

function DropdownContainer({
	size = "lg",
	label,
	noArrow = false,
	children,
	hasInput = false,
	isCancel = false,
	fitHeight = false,
	isDisabled = false,
	// searchTerm = "",
	value,
	placeholder,
	isSearchable = false,
	clickAndClose = false,
	// searchPlaceholder = "Search",
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

	const domNode = useClickOutside(() => {
		setActive(false);
		clickOutsideFunc && clickOutsideFunc();
		handleChangeSearchTerm && handleChangeSearchTerm("");
	});

	useEffect(() => {
		if (domNode.current) {
			setY(domNode.current.getBoundingClientRect().top);
		}
		setUniqueId(`input-${++inputCounter}`);
	}, [domNode]);

	useEffect(() => {
		// ✅ Use window in useEffect hook
		const handleScroll = () => {
			setInnerHeight(window.innerHeight);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (y) {
			const shouldSetPositionTop = y > innerHeight / 1.65;
			setPositionTop(shouldSetPositionTop);
		}
	}, [innerHeight, y]);

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
			className={`relative flex flex-col justify-start items-start h-full w-full gap-3 ` + `${isDisabled ? "pointer-events-none" : ""}`}
			id="dropdown-div"
			ref={domNode}
		>
			{label && (
				<label
					htmlFor={uniqueId}
					className={`text-lg text-black-secondary font-medium ` + `${isDisabled ? "text-black-quat " : ""} `}
					onClick={() => {
						if (inputRef.current) {
							inputRef.current.focus();
						}
					}}
				>
					<span className="h-fit overflow-ellipsis overflow-hidden whitespace-nowrap max-w-full">{label}</span>
				</label>
			)}

			<div
				onMouseEnter={() => !isDisabled && setIsHover(true)}
				onMouseLeave={() => !isDisabled && setIsHover(false)}
				className={
					`relative flex space-x-4 items-center py-3 px-4 w-full bg-white cursor-pointer rounded-lg outline-none focus:outline-none shadow-none transition-all duration-75 ` +
					`text-left text-base font-normal capitalize leading-relaxed text-black-tertiary hover:text-black-secondary focus:text-black-secondary ` +
					`border border-solid border-black-quin lg:hover:border-black-quat focus:border-black-quat ` +
					`${active ? "border-black-quat" : ""} ` +
					`${size === "lg" ? "h-12" : ""} ` +
					`${size === "md" ? "h-10" : ""} ` +
					`${size === "sm" ? "h-8" : ""} ` +
					`${hasValue ? "justify-between" : "justify-between"} `
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
				{!value && (
					<span className={`text-base text-black-quat overflow-ellipsis overflow-hidden whitespace-nowrap max-w-full pointer-events-none `}>
						{placeholder}
					</span>
				)}
				{!hasInput && value && (
					<span
						className={
							`text-base text-black-secondary overflow-ellipsis overflow-hidden whitespace-nowrap max-w-full ` +
							`${isDisabled ? "text-black-quat bg-transparent pointer-events-none " : ""} `
						}
					>
						{value}
					</span>
				)}

				{!noArrow && (
					<span
						className={
							`flex justify-end items-center transition-transform duration-150 transform ` +
							`${active ? "-rotate-180" : "rotate-0"} ` +
							`${isDisabled ? "text-black-quat " : ""} `
						}
					>
						<Image src={chevronArrow} alt="right arrow" priority />
						{/* <chevron className="stroke-current h-3.5 w-3.5" /> */}
					</span>
				)}

				{isCancel && hasValue && (
					<div
						className={
							`flex justify-end items-center ` +
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
						onChange={(e) => onChange && onChange(e.target.value)}
						className={
							`py-3 h-full w-full z-10 placeholder:text-black-quat focus:outline-none focus:border-none rounded-lg bg-white ` +
							`${hasValue ? "text-black-secondary" : ""} ` +
							`${isDisabled ? "text-black-quat bg-transparent " : ""} `
						}
						id={uniqueId}
						disabled={isDisabled}
						tabIndex={isDisabled ? -1 : 0}
					/>
				)}
			</div>

			<div
				className={
					`bg-white shadow rounded overflow-hidden overflow-y-auto h-fit cursor-pointer absolute z-40 transform w-full ` +
					`${positionTop ? "origin-bottom bottom-full left-0 mb-2" : "origin-top top-full left-0 mt-1"} ` +
					`${!active ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100"} ` +
					`${!fitHeight ? "max-h-56 " : ""} `
				}
			>
				{isSearchable && handleChangeSearchTerm && (
					<div className="h-14 px-4 flex justify-start items-center w-full">
						{/* <SearchBar placeholder={searchPlaceholder} value={searchTerm} onChange={handleChangeSearchTerm} /> */}
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
