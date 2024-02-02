"use client";

import {ExcludeProps, InputPropsToExclude} from "./types";
import Image, {StaticImageData} from "next/image";
import React, {InputHTMLAttributes, ReactNode, useEffect, useRef, useState} from "react";

import arrowDownIcon from "@/public/images/dashboard/general/input-down-arrow.svg";
import arrowUpIcon from "@/public/images/dashboard/general/input-up-arrow.svg";
import passwordHideIcon from "@/public/images/icons/password-eye-hide.svg";
import passwordShowIcon from "@/public/images/icons/password-eye-show.svg";
import useClickOutside from "@/helpers/useClickOutside";
import {useField} from "formik";

// use to generate a unique id for the input
let inputCounter = 0;

interface InputProps extends ExcludeProps<InputHTMLAttributes<HTMLInputElement>, InputPropsToExclude> {
	// interface InputProps {
	name: string;
	label?: string;
	value?: string | number | undefined;
	type?: string;
	icon?: StaticImageData;
	inputSize?: "sm" | "md" | "lg";
	appendIcon?: ReactNode;
	appendOuterIcon?: ReactNode;
	iconLeft?: boolean;
	onChange?(value: string): void;
	onUpClick?: () => void;
	onDownClick?: () => void;
	isFocused?: boolean;
	isLoading?: boolean;
	alwaysActive?: boolean;
	isDisabled?: boolean;
	fullWidth?: boolean;
	readOnly?: boolean;
	helperText?: React.ReactNode;
	mobileHelperText?: boolean;
}
function FormInput({
	label,
	value,
	name,
	type,
	icon,
	appendIcon,
	appendOuterIcon,
	iconLeft = false,
	onChange,
	onUpClick,
	onDownClick,
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
	const [uniqueId, setUniqueId] = useState<string>("");
	const [showPassword, setShowPassword] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const domNode = useClickOutside(() => setActive(false));

	const [field] = useField<string>(name);

	const configInputField = {
		...field,
		...otherProps,
		className:
			`py-4 h-full w-full z-10 placeholder:text-black-quat focus:outline-none focus:border-none rounded-lg bg-white ` +
			`${alwaysActive || (field.value && String(field.value).length > 0) ? "text-black-secondary" : ""} ` +
			`${isDisabled ? "!text-black-quat bg-transparent " : ""} ` +
			`${inputSize === "lg" ? "text-lg" : ""} ` +
			`${inputSize === "md" ? "text-base" : ""} ` +
			`${inputSize === "sm" ? "text-sm" : ""} ` +
			`${!icon ? "px-4" : ""} `,
		type: type === "password" && showPassword ? "text" : type,
		// type={type ? (type === "password" ? (showPassword ? "text" : "password") : type) : "text"}
	};

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
							`${isDisabled ? "!text-black-quat " : ""} ` +
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
						`relative flex w-full items-center justify-between gap-1 whitespace-nowrap rounded-lg border border-solid bg-white text-left text-base font-normal leading-relaxed shadow-none outline-none transition-all duration-150 focus:outline-none ` +
						`text-black-tertiary hover:text-black-secondary focus:text-black-secondary ` +
						`border-black-quin focus:border-blue lg:hover:border-blue ` +
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
						{...configInputField}
						id={otherProps.id || uniqueId}
						disabled={isDisabled}
						tabIndex={readOnly || isDisabled ? -1 : 0}
						{...otherProps}
					/>
					{icon && (
						<span
							className={`flex cursor-default items-center justify-start text-black-secondary transition-all duration-75 ease-in-out `}
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
						<div className="absolute right-0 top-0 z-40 flex h-full w-12 cursor-pointer flex-col items-center justify-center gap-2">
							<Image src={arrowUpIcon} alt="arrow up icon" className="cursor-pointer" onClick={onUpClick} />
							<Image src={arrowDownIcon} alt="arrow down icon" className="cursor-pointer" onClick={onDownClick} />
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

export default FormInput;
