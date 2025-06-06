"use client";

import {ExcludeProps, InputPropsToExclude} from "./types";
import Image, {StaticImageData} from "next/image";
import React, {InputHTMLAttributes, ReactNode, useEffect, useRef, useState} from "react";

import arrowDownIcon from "@/public/images/dashboard/general/input-down-arrow.svg";
import arrowUpIcon from "@/public/images/dashboard/general/input-up-arrow.svg";
import passwordHideIcon from "@/public/images/icons/password-eye-hide.svg";
import passwordShowIcon from "@/public/images/icons/password-eye-show.svg";
import useClickOutside from "@/helpers/useClickOutside";

// use to generate a unique id for the input
let inputCounter = 0;

interface InputProps extends ExcludeProps<InputHTMLAttributes<HTMLInputElement>, InputPropsToExclude> {
	// interface InputProps {
	type?: string;
	icon?: StaticImageData;
	label?: string;
	value?: string | number | undefined;
	isMoney?: boolean;
	isGreyBG?: boolean;
	isNumber?: boolean;
	iconLeft?: boolean;
	readOnly?: boolean;
	isLoading?: boolean;
	isFocused?: boolean;
	fullWidth?: boolean;
	inputSize?: "sm" | "md" | "lg" | "xl";
	isDisabled?: boolean;
	customIcon?: React.ReactNode;
	helperText?: React.ReactNode;
	appendIcon?: ReactNode;
	alwaysActive?: boolean;
	appendOuterIcon?: ReactNode;
	mobileHelperText?: boolean;

	onChange?(value: string): void;
	onUpClick?: () => void;
	onDownClick?: () => void;
}
function Input({
	type,
	icon,
	label,
	value,
	isMoney = false,
	isGreyBG = false,
	iconLeft = false,
	isNumber = false,
	readOnly = false,
	inputSize = "lg",
	fullWidth = false,
	isFocused,
	isLoading,
	appendIcon,
	customIcon,
	helperText = "",
	isDisabled = false,
	alwaysActive = false,
	appendOuterIcon,
	mobileHelperText = false,
	onChange,
	onUpClick,
	onDownClick,
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
		<div className={"relative flex w-full flex-col items-center " + (fullWidth ? "w-full" : "")}>
			<div
				className={
					`relative flex h-full w-full flex-col items-start justify-start gap-3 ` +
					`${isDisabled ? "pointer-events-none" : ""} ` +
					`${readOnly ? "pointer-events-none" : ""} ` +
					`${!(readOnly && isDisabled) ? "cursor-text" : ""}`
				}
				ref={domNode}
			>
				{label && (
					<label
						htmlFor={otherProps.id || uniqueId}
						className={
							`font-medium leading-[100%] text-black-secondary  ` +
							`${isDisabled ? "text-black-quat " : ""} ` +
							`${inputSize === "xl" ? "text-lg" : ""} ` +
							`${inputSize === "lg" ? "text-lg" : ""} ` +
							`${inputSize === "md" ? "text-base" : ""} ` +
							`${inputSize === "sm" ? "text-sm" : ""} `
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
						`relative flex w-full items-center justify-between gap-1 whitespace-nowrap rounded-lg border border-solid text-left text-base font-normal leading-relaxed shadow-none outline-none transition-all duration-150 focus:outline-none ` +
						`text-black-tertiary hover:text-black-secondary focus:text-black-secondary ` +
						`border-black-quin focus:border-blue  lg:hover:border-blue ` +
						`${active ? "border-blue " : ""} ` +
						`${isGreyBG ? "bg-grey-backdrop " : "bg-white"} ` +
						`${inputSize === "xl" ? "h-16" : ""} ` +
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
						inputMode={isNumber ? "numeric" : undefined}
						// pattern={isNumber ? "[0-9]+" : undefined}
						value={value || ""}
						onChange={(e) => onChange && onChange(e.target.value)}
						className={
							`z-10 h-full w-full rounded-lg py-4 placeholder:text-black-quat focus:border-none focus:outline-none ` +
							`${alwaysActive || hasValue ? "text-black-secondary" : ""} ` +
							`${isDisabled ? "bg-transparent text-black-quat " : ""} ` +
							`${isGreyBG ? "bg-grey-backdrop " : "bg-white"} ` +
							`${inputSize === "xl" ? "text-base" : ""} ` +
							`${inputSize === "lg" ? "text-base" : ""} ` +
							`${inputSize === "md" ? "text-sm" : ""} ` +
							`${inputSize === "sm" ? "text-xs" : ""} ` +
							`${!icon ? "px-4" : ""}`
						}
						name={label}
						id={otherProps.id || uniqueId}
						disabled={isDisabled}
						tabIndex={readOnly || isDisabled ? -1 : 0}
						{...otherProps}
					/>
					{customIcon && (
						<div
							className={
								"flex w-max items-center justify-center " +
								`${inputSize === "xl" ? "h-16" : ""} ` +
								`${inputSize === "lg" ? "h-12" : ""} ` +
								`${inputSize === "md" ? "h-10" : ""} ` +
								`${inputSize === "sm" ? "h-8" : ""} `
							}
							// onMouseEnter={(e) => e.stopPropagation()}
						>
							{customIcon}
						</div>
					)}
					{icon && (
						<span
							className={
								`flex cursor-default items-center justify-start text-black-secondary transition-all duration-75 ease-in-out ` +
								`${isMoney ? "" : ""}`
							}
						>
							<Image src={icon} alt="input icon" />
						</span>
					)}
					{type === "password" && (
						<span
							className="absolute right-0 top-0 z-40 flex h-full w-12 cursor-pointer items-center justify-center"
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ? (
								<Image src={passwordHideIcon} alt="password hide icon" />
							) : (
								<Image src={passwordShowIcon} alt="password show icon" />
							)}
						</span>
					)}
					{type === "number" && (
						<div className="absolute right-0 top-0 z-20 flex h-full w-12 cursor-pointer flex-col items-center justify-center gap-2 px-2">
							<div className="flex w-full items-center justify-center" onClick={onUpClick}>
								<Image src={arrowUpIcon} alt="arrow up icon" className="cursor-pointer" />
							</div>
							<div className="flex w-full items-center justify-center" onClick={onDownClick}>
								<Image src={arrowDownIcon} alt="arrow down icon" className="cursor-pointer" />
							</div>
						</div>
					)}
				</div>
			</div>
			{helperText && (
				<span
					className={
						`pt-2 text-xs leading-4 text-black-tertiary ` +
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
