"use client";

import {ExcludeProps, InputPropsToExclude} from "./types";
import Image, {StaticImageData} from "next/image";
import React, {InputHTMLAttributes, ReactNode, useEffect, useRef, useState} from "react";

import passwordHideIcon from "@/public/images/icons/password-eye-hide.svg";
import passwordShowIcon from "@/public/images/icons/password-eye-show.svg";
import useClickOutside from "@/helpers/useClickOutside";

// use to generate a unique id for the input
let inputCounter = 0;

interface InputProps extends ExcludeProps<InputHTMLAttributes<HTMLInputElement>, InputPropsToExclude> {
	// interface InputProps {
	label?: string;
	value?: string | number | undefined;
	type?: string;
	icon?: StaticImageData;
	inputSize?: "sm" | "md" | "lg";
	appendIcon?: ReactNode;
	appendOuterIcon?: ReactNode;
	iconLeft?: boolean;
	onChange?(value: string): void;
	isFocused?: boolean;
	isLoading?: boolean;
	alwaysActive?: boolean;
	isDisabled?: boolean;
	fullWidth?: boolean;
	readOnly?: boolean;
	helperText?: React.ReactNode;
	mobileHelperText?: boolean;
}
function Input({
	label,
	value,
	type,
	icon,
	appendIcon,
	appendOuterIcon,
	iconLeft = false,
	onChange,
	isFocused,
	isLoading,
	inputSize = "lg",
	alwaysActive = false,
	isDisabled = false,
	fullWidth = false,
	readOnly = false,
	helperText = "",
	mobileHelperText = false,
	...otherProps
}: InputProps): JSX.Element {
	const [active, setActive] = useState(false);
	const [hasValue, setHasValue] = useState(false);
	const [uniqueId, setUniqueId] = useState<string>("");
	const [showPassword, setShowPassword] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const domNode = useClickOutside(() => setActive(false));

	useEffect(() => {
		setUniqueId(`input-${++inputCounter}`);
	}, []);

	useEffect(() => {
		if (isFocused) {
			if (inputRef.current) {
				inputRef.current.focus();
			}
			setActive(true);
		}
	}, [isFocused]);

	useEffect(() => {
		setHasValue(!!value && String(value).length > 0);
	}, [value]);

	return (
		<div className={"flex flex-col items-center relative w-full " + (fullWidth ? "w-full" : "")}>
			<div
				className={
					`relative flex flex-col justify-start items-start h-full w-full gap-3 ` +
					`${isDisabled ? "pointer-events-none" : ""} ` +
					`${readOnly ? "pointer-events-none" : ""} ` +
					`${!(readOnly && isDisabled) ? "cursor-text" : ""}`
				}
				ref={domNode}
			>
				{label && (
					<label
						htmlFor={otherProps.id || uniqueId}
						className={`text-lg text-black-secondary font-medium  ` + `${isDisabled ? "text-black-quat " : ""} `}
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
					onFocus={() => {
						if (inputRef.current) {
							inputRef.current.focus();
						}
						setActive(true);
					}}
					onBlur={() => {
						setActive(false);
					}}
					className={
						`relative w-full bg-white rounded-lg flex gap-1 items-center justify-between font-normal outline-none focus:outline-none transition-all duration-150 whitespace-nowrap text-base leading-relaxed border border-solid shadow-none text-left ` +
						`text-black-tertiary hover:text-black-secondary focus:text-black-secondary ` +
						`border-black-quin lg:hover:border-blue  focus:border-blue ` +
						`${active ? "border-blue " : ""} ` +
						`${inputSize === "lg" ? "h-12" : ""} ` +
						`${inputSize === "md" ? "h-10" : ""} ` +
						`${inputSize === "sm" ? "h-8" : ""} ` +
						`${isLoading ? "pointer-events-none" : ""} ` +
						`${iconLeft ? "flex-row-reverse" : ""} ` +
						`${icon ? "px-4" : ""}`
					}
					onClick={() => {
						if (inputRef.current) {
							inputRef.current.focus();
						}
						setActive(true);
					}}
					// onMouseEnter={() => !isDisabled && setIsHover(true)}
					// onMouseLeave={() => !isDisabled && setIsHover(false)}
					ref={domNode}
				>
					<input
						ref={inputRef}
						type={type ? (type === "password" ? (showPassword ? "text" : "password") : type) : "text"}
						value={value || ""}
						onChange={(e) => onChange && onChange(e.target.value)}
						className={
							`py-3 pt-4 h-full w-full z-10 placeholder:text-black-quat focus:outline-none focus:border-none rounded-lg bg-white ` +
							`${alwaysActive || hasValue ? "text-black-secondary" : ""} ` +
							`${isDisabled ? "text-black-quat bg-transparent " : ""} ` +
							`${!icon ? "px-4" : ""}`
						}
						name={label}
						id={otherProps.id || uniqueId}
						disabled={isDisabled}
						tabIndex={readOnly || isDisabled ? -1 : 0}
						{...otherProps}
					/>
					{icon && (
						<span
							className={`cursor-default flex justify-start items-center transition-all ease-in-out duration-75 text-black-secondary `}
						>
							<Image src={icon} alt="input icon" />
						</span>
					)}
					{type === "password" && (
						<span
							className="h-full w-12 absolute top-0 right-0 flex justify-center items-center cursor-pointer z-40"
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ? (
								<Image src={passwordHideIcon} alt="password hide icon" />
							) : (
								<Image src={passwordShowIcon} alt="password show icon" />
							)}
						</span>
					)}
				</div>
			</div>
			{helperText && (
				<span
					className={
						`text-xs text-black-tertiary leading-4 pt-2 ` +
						`${mobileHelperText ? "lg:hidden" : ""} ` +
						`${!mobileHelperText ? "" : ""} ` +
						`${isDisabled ? "text-black-quat " : ""} `
					}
					// data-type={dataType}
				>
					{helperText}
				</span>
			)}
		</div>
	);
}

export default Input;
