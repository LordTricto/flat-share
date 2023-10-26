import {ExcludeProps, TextAreaPropsToExclude} from "./types";
import React, {TextareaHTMLAttributes, useEffect, useRef, useState} from "react";

import Button from "../button/button";
import useClickOutside from "../../../helpers/useClickOutside";
import {useField} from "formik";

// use to generate a unique id for the textarea
let textareaCounter = 0;

interface TextAreaProps extends ExcludeProps<TextareaHTMLAttributes<HTMLTextAreaElement>, TextAreaPropsToExclude> {
	sm?: boolean;
	textSize?: "sm" | "md" | "lg";
	name: string;
	label?: string | undefined;
	isReply?: boolean;
	readOnly?: boolean;
	isLoading?: boolean;
	fullWidth?: boolean;
	isFocused?: boolean;
	isDisabled?: boolean;
	placeholder?: string;
	isReplyDisabled?: boolean;
	onChange?(newValue: string): void;
	handleResetReply?: () => void;
}

function FormTextArea({
	sm = false,
	textSize = "lg",
	name,
	label,
	isReply = false,
	readOnly = false,
	fullWidth = false,
	isLoading = false,
	isFocused = false,
	isDisabled = false,
	placeholder,
	isReplyDisabled = false,
	onChange,
	handleResetReply,
	...otherProps
}: TextAreaProps & TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element {
	const [active, setActive] = useState(false);
	const [uniqueId, setUniqueId] = useState<string>("");

	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const [field] = useField<string>(name);

	const configTextareaField = {
		...field,
		...otherProps,
		className:
			`px-4 py-3 w-full z-10 placeholder:text-black-quat resize-none focus:outline-none focus:border-none rounded-lg bg-white ` +
			`${!!field.value && String(field.value).trim().length > 0 ? "text-black-secondary" : ""} ` +
			`${!isReply ? (sm ? "h-12" : "h-12") : "h-32"} ` +
			`${textSize === "lg" ? "text-lg" : ""} ` +
			`${textSize === "md" ? "text-base" : ""} ` +
			`${textSize === "sm" ? "text-sm" : ""} ` +
			`${isDisabled ? "text-black-quat bg-transparent " : ""} `,
	};

	const domNode = useClickOutside(() => {
		setActive(false);
	});

	useEffect(() => {
		setUniqueId(`textarea-${++textareaCounter}`);
	}, []);

	useEffect(() => {
		if (isFocused) {
			if (textAreaRef.current) {
				textAreaRef.current.focus();
			}
			setActive(true);
		}
	}, [isFocused]);

	return (
		<div className={`w-full ${fullWidth ? "" : ""}`}>
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
						htmlFor={uniqueId}
						className={
							`font-medium leading-[100%] text-black-secondary ` +
							`${textSize === "lg" ? "text-lg" : ""} ` +
							`${textSize === "md" ? "text-base" : ""} ` +
							`${textSize === "sm" ? "text-sm" : ""} `
						}
						onClick={() => {
							if (textAreaRef.current) {
								textAreaRef.current.focus();
							}
						}}
					>
						<span className="h-fit max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{label}</span>
					</label>
				)}
				<div
					className={
						`relative w-full resize-none overflow-hidden rounded-lg bg-white shadow-none outline-none focus:outline-none ` +
						`text-left font-normal leading-relaxed text-black-tertiary hover:text-black-secondary focus:text-black-secondary ` +
						`border border-solid border-black-quin focus:border-black-quat lg:hover:border-black-quat ` +
						`${active ? "border-black-quat" : ""} ` +
						`${isLoading ? "pointer-events-none" : ""} ` +
						`${!isReply ? (sm ? "h-12" : "h-24") : ""} `
					}
					onFocus={() => {
						if (textAreaRef.current) {
							textAreaRef.current.focus();
						}
						setActive(true);
					}}
					onBlur={() => {
						setActive(false);
					}}
					onClick={() => {
						if (textAreaRef.current) {
							textAreaRef.current.focus();
							setActive(true);
						}
					}}
					ref={domNode}
				>
					{isReply && (
						<div className="flex w-full items-center justify-between bg-[#F3F3F6] px-4 py-3">
							<p className="text-sm font-medium text-black-secondary">Replying to George Iwar</p>
							<div className="flex gap-3">
								<Button type="button" buttonType="secondary" color="white" size="xs" borderSmall onClick={handleResetReply}>
									<span>Cancel</span>
									{/* <span className="text-xs">Cancel</span> */}
								</Button>
								<Button type={isReplyDisabled ? undefined : "submit"} buttonType="primary" color="black" borderSmall size="xs">
									<span>Reply</span>
									{/* <span className="text-xs">Cancel</span> */}
								</Button>
							</div>
						</div>
					)}
					<textarea
						{...configTextareaField}
						ref={textAreaRef}
						placeholder={placeholder}
						cols={30}
						rows={10}
						onClick={() => setActive(true)}
					/>
				</div>
			</div>
		</div>
	);
}

export default FormTextArea;
