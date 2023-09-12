import isNullOrUndefined from "./isNullOrUndefined";

export function truncateNumber(value: string | number | undefined | null): string {
	let valueToEdit: number;

	if (isNullOrUndefined(value)) {
		return "";
	}

	if (typeof value === "string") {
		const newValue = String(value).replace(new RegExp(`[^0-9.]`, "gi"), "");
		valueToEdit = Number(newValue);
	} else {
		valueToEdit = value;
	}
	let numStr = Number(valueToEdit).toFixed(0);

	if (numStr.length > 3 && numStr.length < 7) {
		return `${numStr.slice(0, -3)}k`;
	} else if (numStr.length > 6 && numStr.length < 10) {
		if (numStr.length === 7 || numStr.length === 8)
			return `${numStr.slice(0, -6)}${numStr.charAt(numStr.length - 6) === "0" ? "" : `.${numStr.charAt(numStr.length - 6)}`}M`;

		return `${numStr.slice(0, -6)}M`;
	}

	return numStr;
}

export function repeatString(str: string, times = 1): string {
	let res = "";
	while (times-- > 0) {
		res += str;
	}
	return res;
}

function formatNumber(value: string | number | undefined | null, alwaysShowDecimals = true, decimals = 2): string {
	let valueToEdit: number;

	if (isNullOrUndefined(value)) {
		return "";
	}

	if (typeof value === "string") {
		const newValue = String(value).replace(new RegExp(`[^0-9.]`, "gi"), "");
		valueToEdit = Number(newValue);
	} else {
		valueToEdit = value;
	}

	let numStr = Number(valueToEdit)
		.toFixed(decimals)
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	if (!alwaysShowDecimals) {
		numStr = numStr.replace(`.${repeatString("0", decimals)}`, "");
	}

	return numStr;
}

export default formatNumber;
