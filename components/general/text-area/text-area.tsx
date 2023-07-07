import React, {useEffect, useRef, useState} from "react";

import useClickOutside from "../../../helpers/useClickOutside";

// use to generate a unique id for the input
let inputCounter = 0;

interface TextAreaProps {
	sm?: boolean;
	label: string;
	value?: string | null;
	readOnly?: boolean;
	isLoading?: boolean;
	fullWidth?: boolean;
	isFocused?: boolean;
	isDisabled?: boolean;
	placeholder?: string;
	onChange?(newValue: string): void;
}

function TextArea({
	sm = false,
	value = "",
	label,
	readOnly = false,
	fullWidth = false,
	isLoading = false,
	isFocused = false,
	isDisabled = false,
	placeholder,
	onChange,
}: TextAreaProps): JSX.Element {
	const [active, setActive] = useState(false);
	const [hasValue, setHasValue] = useState(false);
	const [uniqueId, setUniqueId] = useState<string>("");

	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const domNode = useClickOutside(() => {
		setActive(false);
	});

	useEffect(() => {
		setHasValue(!!value && value.trim().length > 0);
	}, [value]);

	useEffect(() => {
		setUniqueId(`input-${++inputCounter}`);
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
						className={`text-lg font-medium leading-[100%] text-black-secondary ` + `${isDisabled ? "text-black-quat " : ""} `}
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
						`relative w-full resize-none rounded-lg bg-white shadow-none outline-none focus:outline-none ` +
						`text-left text-base font-normal leading-relaxed text-black-tertiary hover:text-black-secondary focus:text-black-secondary ` +
						`border border-solid border-black-quin focus:border-black-quat lg:hover:border-black-quat ` +
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
						className={
							`z-10 h-full w-full resize-none rounded-lg bg-white px-4 py-3 placeholder:text-black-quat focus:border-none focus:outline-none ` +
							`${hasValue ? "text-black-secondary" : ""} ` +
							`${sm ? "h-12" : "h-12"} ` +
							`${isDisabled ? "bg-transparent text-black-quat " : ""} `
						}
						ref={textAreaRef}
						value={value || ""}
						placeholder={placeholder}
						cols={30}
						rows={10}
						onClick={() => setActive(true)}
						onChange={(e) => {
							if (onChange) {
								onChange(e.target.value.trim().length > 0 ? e.target.value : "");
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default TextArea;
