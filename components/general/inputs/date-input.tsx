"use client";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import React, {useEffect, useState} from "react";

import {Calendar} from "react-date-range";
import Input from "./input";
import calendarIcon from "@/public/images/icons/calendar.svg";
import moment from "moment";
import useClickOutside from "../../../helpers/useClickOutside";

interface DateInputProps {
	date: Date | null;
	label: string;
	inputSize?: "sm" | "md" | "lg";
	handleSetDate: (_date: Date) => void;
	placeholder: string;
}
function DateInput(props: DateInputProps): JSX.Element {
	const {date, label, placeholder, handleSetDate} = props;
	const [active, setActive] = useState<boolean>(false);
	const [positionTop, setPositionTop] = useState<boolean>(false);
	const [y, setY] = useState<number | null>(null);
	// const [innerHeight, setInnerHeight] = useState<number>(0);
	// const innerHeight = window.innerHeight;
	const [innerHeight, setInnerHeight] = useState<number>(0);

	const domNode = useClickOutside(() => {
		setActive(false);
	});

	useEffect(() => {
		setInnerHeight(window.innerHeight);
	}, []);
	useEffect(() => {
		if (domNode.current) {
			setY(domNode.current.getBoundingClientRect().top);
		}
	}, [domNode]);

	// useEffect(() => {
	// 	// ✅ Use window in useEffect hook
	// 	const handleScroll = () => {
	// 		setInnerHeight(window.innerHeight);
	// 	};

	// 	window.addEventListener("scroll", handleScroll);

	// 	return () => {
	// 		window.removeEventListener("scroll", handleScroll);
	// 	};
	// }, []);

	useEffect(() => {
		if (y) {
			const shouldSetPositionTop = y > innerHeight / 1.65;
			setPositionTop(shouldSetPositionTop);
		}
	}, [innerHeight, y]);

	return (
		<>
			<div className="relative w-full cursor-pointer" ref={domNode} onClick={() => setActive(true)}>
				<Input
					label={label}
					type="text"
					placeholder={placeholder}
					name="date"
					value={date ? moment(date).format("YYYY-MM-DD") : undefined}
					icon={calendarIcon}
					inputSize={props.inputSize}
					readOnly
				/>
				<div
					className={
						`absolute z-20 w-full max-w-sm rounded-lg border bg-white px-4 2xs:w-max ` +
						`${active ? "block" : "hidden"} ` +
						`${positionTop ? "bottom-full left-0 -mb-9 origin-bottom" : "left-0 top-full mt-1 origin-top"} `
					}
				>
					<Calendar date={date || undefined} onChange={(item) => handleSetDate(item)} />
				</div>
			</div>
		</>
	);
}

export default DateInput;
