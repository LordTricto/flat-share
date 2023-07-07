import {ExcludeProps, InputPropsToExclude} from "./types";
import React, {InputHTMLAttributes, useEffect, useState} from "react";

import Input from "./input";
import formatNumber from "../../../utils/formatNumber";
import isNullOrUndefined from "../../../utils/isNullOrUndefined";
import {moneyToNumber} from "../../../helpers/useMoneyToNumber";
import nairaIcon from "@/public/images/icons/naira-sign.svg";

interface Props extends ExcludeProps<InputHTMLAttributes<HTMLInputElement>, InputPropsToExclude> {
	type?: "number" | "string";
	label?: string;
	value?: string | undefined;
	inputSize?: "sm" | "md" | "lg";
	isFocused?: boolean;
	isLoading?: boolean;
	isDisabled?: boolean;
	helperText?: React.ReactNode;
	placeholder?: string;
	alwaysActive?: boolean;
	mobileHelperText?: boolean;
	onChange(amount: string | number): void;
}

function removeNonNumericChars(string: string | number): string {
	return String(string).replace(new RegExp(`[^0-9.]`, "gi"), "");
}

function parse(newValue: string): [number, string] {
	const prepared = removeNonNumericChars(newValue);
	let num = Number(prepared);

	const decimalIndex = prepared.indexOf(".");
	let str: string;
	if (decimalIndex > -1) {
		const whole = prepared.substring(0, decimalIndex);
		const fractional = prepared.substring(decimalIndex + 1);
		str = formatNumber(Number(whole), false) + "." + fractional.replace(".", "");
	} else {
		str = formatNumber(num, false);
	}

	if (isNullOrUndefined(num)) {
		num = Number(removeNonNumericChars(str));
	}

	return [num, str];
}

function MoneyInput(props: Props): JSX.Element {
	const [valueFormatted, setValueFormatted] = useState<string>("");

	useEffect(() => {
		if (!props.value) return setValueFormatted("");
		const values = parse(props.value);
		setValueFormatted(values[1]);
	}, [props.value]);

	return (
		<Input
			{...props}
			type="text"
			value={moneyToNumber(valueFormatted) ? valueFormatted : ""}
			icon={nairaIcon}
			onChange={(newValue) => {
				const values = parse(newValue);
				setValueFormatted(values[1]);
				if (props.type === "number") {
					return props.onChange(values[0]);
				}
				props.onChange(values[1]);
			}}
			iconLeft
			helperText={props.helperText}
			mobileHelperText={props.mobileHelperText}
		/>
	);
}

export default MoneyInput;
