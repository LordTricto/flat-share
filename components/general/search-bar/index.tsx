"use client";

import React, {useEffect, useRef, useState} from "react";

import Image from "next/image";
import SearchIcon from "@/public/images/icons/search.svg";
import useClickOutside from "@/helpers/useClickOutside";

interface SearchBarProps {
	value: string;
	onChange: (newValue: string) => void;
	dataType?: string;
	placeholder: string;
}

function SearchBar(props: SearchBarProps): JSX.Element {
	const [active, setActive] = useState<boolean>(false);
	const [hasSearchTerm, setHasSearchTerm] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const domNode = useClickOutside(() => {
		setActive(false);
		// , (eventTarget: HTMLElement) => eventTarget.dataset.type !== "transaction";
	});

	useEffect(() => {
		setHasSearchTerm(props.value.trim().length > 0);
	}, [props.value]);

	return (
		<>
			<div
				className={
					`flex h-10 w-full max-w-xl cursor-text items-center justify-start rounded-lg border border-solid px-4 ` +
					`relative outline-none transition-all duration-150 ease-in-out focus:outline-none  ` +
					`border-black-quin focus:border-blue  lg:hover:border-blue ` +
					`${active ? "border-blue " : ""} `
				}
				ref={domNode}
				onClick={() => {
					setActive(true);
					if (inputRef.current) {
						inputRef.current.focus();
					}
				}}
				tabIndex={0}
				onFocus={() => {
					if (inputRef.current) {
						inputRef.current.focus();
					}
					setActive(true);
				}}
				data-type={props.dataType}
			>
				<Image priority src={SearchIcon} width={15} height={15} tabIndex={-1} alt="Flat Share logo" data-type={props.dataType} />

				<input
					type="text"
					ref={inputRef}
					className="ml-2 w-full text-sm font-normal text-black-secondary antialiased placeholder-black-quat outline-none focus:outline-none"
					placeholder={props.placeholder}
					value={props.value}
					onChange={(e) => {
						props.onChange(e.target.value);
					}}
					maxLength={40}
					tabIndex={-1}
					data-type={props.dataType}
				/>

				{hasSearchTerm && (
					<span
						className="cursor-pointer pr-1 text-sm text-blue"
						onClick={(e) => {
							inputRef.current?.blur();
							props.onChange("");
							setActive(false);
							e.preventDefault();
							e.stopPropagation();
						}}
						tabIndex={-1}
						data-type={props.dataType}
					>
						Clear
					</span>
				)}
			</div>
		</>
	);
}

export default SearchBar;
