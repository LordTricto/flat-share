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
	handleSetDate: (_date: Date) => void;
	placeholder: string;
}
function DateInput(props: DateInputProps): JSX.Element {
	const {date, label, placeholder, handleSetDate} = props;
	const [active, setActive] = useState<boolean>(false);
	const [positionTop, setPositionTop] = useState<boolean>(false);
	const [y, setY] = useState<number | null>(null);
	const [innerHeight, setInnerHeight] = useState<number>(0);

	const domNode = useClickOutside(() => {
		setActive(false);
	});

	useEffect(() => {
		if (domNode.current) {
			setY(domNode.current.getBoundingClientRect().top);
		}
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
					readOnly
				/>
				<div
					className={
						`absolute bg-white px-4 border rounded-lg w-full 2xs:w-max max-w-sm z-20 ` +
						`${active ? "block" : "hidden"} ` +
						`${positionTop ? "origin-bottom bottom-full left-0 mb-2" : "origin-top top-full left-0 mt-1"} `
					}
				>
					<Calendar date={date || undefined} onChange={(item) => handleSetDate(item)} />
				</div>
			</div>
		</>
	);
}

export default DateInput;
