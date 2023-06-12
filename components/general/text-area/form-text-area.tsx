import {ExcludeProps, TextAreaPropsToExclude} from "./types";
import React, {TextareaHTMLAttributes, useEffect, useRef, useState} from "react";

import useClickOutside from "../../../helpers/useClickOutside";
import {useField} from "formik";

// use to generate a unique id for the textarea
let textareaCounter = 0;

interface TextAreaProps extends ExcludeProps<TextareaHTMLAttributes<HTMLTextAreaElement>, TextAreaPropsToExclude> {
	sm?: boolean;
	name: string;
	label: string;
	readOnly?: boolean;
	isLoading?: boolean;
	fullWidth?: boolean;
	isFocused?: boolean;
	isDisabled?: boolean;
	placeholder?: string;
	onChange?(newValue: string): void;
}

function FormTextArea({
	sm = false,
	name,
	label,
	readOnly = false,
	fullWidth = false,
	isLoading = false,
	isFocused = false,
	isDisabled = false,
	placeholder,
	onChange,
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
			`px-4 py-3 h-full w-full z-10 placeholder:text-black-quat resize-none focus:outline-none focus:border-none rounded-lg bg-white ` +
			`${!!field.value && String(field.value).trim().length > 0 ? "text-black-secondary" : ""} ` +
			`${sm ? "h-12" : "h-12"} ` +
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
					`relative flex flex-col justify-start items-start gap-3 h-full w-full ` +
					`${isDisabled ? "pointer-events-none" : ""} ` +
					`${readOnly ? "pointer-events-none" : ""} ` +
					`${!(readOnly && isDisabled) ? "cursor-text" : ""}`
				}
				ref={domNode}
			>
				{label && (
					<label
						htmlFor={uniqueId}
						className={`text-lg text-black-secondary font-medium ` + `${isDisabled ? "text-black-quat " : ""} `}
						onClick={() => {
							if (textAreaRef.current) {
								textAreaRef.current.focus();
							}
						}}
					>
						<span className="h-fit overflow-ellipsis overflow-hidden whitespace-nowrap max-w-full">{label}</span>
					</label>
				)}
				<div
					className={
						`relative w-full rounded-lg bg-white resize-none outline-none focus:outline-none shadow-none ` +
						`text-left text-base font-normal leading-relaxed text-black-tertiary hover:text-black-secondary focus:text-black-secondary ` +
						`border border-solid border-black-quin lg:hover:border-black-quat focus:border-black-quat ` +
						`${active ? "border-black-quat" : ""} ` +
						`${isLoading ? "pointer-events-none" : ""} ` +
						`${sm ? "h-12" : "h-24"} `
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
