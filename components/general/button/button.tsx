import {PuffLoader} from "react-spinners";
import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	ripple?: "light" | "dark";
	size?: "sm" | "md" | "lg" | "xl";
	type?: "button" | "submit" | "reset";
	isDisabled?: boolean;
	buttonType?: "primary" | "secondary" | "tertiary";
	color: "blue" | "grey" | "red" | "transparent" | "translucent";
	fullWidth?: boolean;
	fullHeight?: boolean;
	onClick?: (e: React.MouseEvent) => void;
	borderSmall?: boolean;
	borderFull?: boolean;
	href?: string;
	isLoading?: boolean | null;
	className?: string;
	noTabIndex?: boolean;
	dataType?: string | null;
	autoFocus?: boolean;
}

export type ButtonColor = "blue" | "grey" | "red" | "transparent";

const primaryColors = {
	blue: "text-white bg-blue hover:bg-blue-hover focus:bg-blue-focused active:bg-blue-hover",
	transparent: "text-black-secondary hover:text-black focus:outline-none",
	red: "text-white bg-error hover:bg-error ",
	grey: "",
	translucent: "",
};

const primaryDisabledColors = {
	blue: "text-white bg-grey-quat",
	transparent: "",
	grey: "",
	red: "",
	translucent: "",
};

const secondaryColors = {
	blue: "text-blue border-blue hover:border-blue-hover hover:bg-blue-senary hover:text-blue focus:border-blue-focused focus:bg-blue-senary focus:text-blue-focused",
	grey: "text-black-tertiary border-black-quat hover:border-blue-hover hover:text-blue focus:border-blue-focused focus:text-blue-focused",
	red: "text-error bg-white border-error",
	translucent: "text-white translucent-backdrop border-white",
	transparent: "",
};
const secondaryDisabledColors = {
	blue: "text-blue-quat border-blue-quat",
	grey: "text-black-quat border-black-quin",
	red: "",
	transparent: "",
	translucent: "",
};
const tertiaryColors = {
	blue: "text-blue hover:text-blue focus:text-blue-focused",
	grey: "text-black-tertiary hover:text-black-secondary focus:text-black-secondary",
	red: "text-error",
	transparent: "",
	translucent: "",
};

const tertiaryDisabledColors = {
	blue: "text-blue-quin",
	grey: "text-black-quat",
	transparent: "",
	translucent: "",
	red: "",
};

const getLoaderColor = (props: ButtonProps): string => {
	const colors: string[] = [];

	if (props.buttonType === "primary") {
		colors.push("#ffffff");
	}

	if (props.buttonType === "secondary") {
		if (props.color === "blue") {
			colors.push("#5466F9");
		} else if (props.color === "grey") {
			colors.push("#B8BAC6");
		} else if (props.color === "red") {
			colors.push("#D20832");
		} else if (props.color === "transparent") {
			colors.push("#D5D5DD");
		}
	}
	if (props.buttonType === "tertiary") {
		colors.push("#5466F9");
	}
	// if (props.buttonType === "quaternary") {
	// colors.push("#B8BAC6");
	// }

	return colors.join(" ");
};

const getLoaderHeight = (props: ButtonProps): string => {
	const height: number[] = [];

	if (props.size === "sm") {
		height.push(20);
	} else if (props.size === "lg") {
		height.push(30);
	} else if (props.size === "xl") {
		height.push(40);
	} else {
		height.push(20);
	}

	return height.join(" ");
};

const getLoaderWidth = (props: ButtonProps): string => {
	const width: string[] = [];

	if (props.size === "sm") {
		width.push("20px");
	} else if (props.size === "lg") {
		width.push("30px");
	} else if (props.size === "xl") {
		width.push("40px");
	} else {
		width.push("30px");
	}

	return width.join(" ");
};

const getClass = (props: ButtonProps): string => {
	const classes: string[] = [
		"flex items-center justify-center relative ",
		"uppercase whitespace-nowrap capitalize font-medium outline-none tracking-wider focus:outline-none focus:shadow-none ",
		"transition-all duration-300 overflow-hidden ",
	];

	if (props.isDisabled) {
		if (props.buttonType === "primary") {
			classes.push(primaryDisabledColors[props.color]);
		} else if (props.buttonType === "secondary") {
			classes.push("bg-transparent border border-solid shadow-none");
			classes.push(secondaryDisabledColors[props.color]);
		} else if (props.buttonType === "tertiary") {
			classes.push(tertiaryDisabledColors[props.color]);
		}
	} else {
		if (props.buttonType === "primary") {
			classes.push(primaryColors[props.color]);
		} else if (props.buttonType === "secondary") {
			classes.push("bg-transparent border border-solid shadow-none");
			classes.push(secondaryColors[props.color]);
		} else if (props.buttonType === "tertiary") {
			classes.push(tertiaryColors[props.color]);
		}
	}

	if (props.buttonType !== "tertiary") {
		if (props.size === "sm") {
			classes.push("h-8 px-4 text-sm");
		} else if (props.size === "md") {
			classes.push("h-10 px-6 text-sm");
		} else if (props.size === "xl") {
			classes.push("h-14 px-10 text-md");
		} else {
			classes.push("h-12 px-8 text-md");
		}
	} else {
		if (props.size === "sm") {
			classes.push("text-sm");
		} else if (props.size === "md") {
			classes.push("text-sm");
		} else if (props.size === "xl") {
			classes.push("text-md");
		} else {
			classes.push("text-md");
		}

		if (props.isLoading) {
			if (props.size === "sm") {
				classes.push("h-4 w-4");
			} else if (props.size === "lg") {
				classes.push("h-8 w-8");
			} else {
				classes.push("h-6 w-6");
			}
		}
	}

	if (props.fullHeight) {
		classes.push("!h-full px-10 text-md");
	}

	if (props.buttonType !== "tertiary") {
		if (props.fullWidth) {
			classes.push("w-full");
		}
	}

	if (props.borderSmall) {
		classes.push("rounded-md");
	} else if (props.borderFull) {
		classes.push("rounded-full");
	} else if (props.buttonType === "tertiary") {
		classes.push("");
	} else {
		classes.push("rounded-lg");
	}

	if (props.className) {
		classes.push(props.className);
	}

	return classes.join(" ");
};

function Button(props: ButtonProps & React.HTMLAttributes<HTMLButtonElement>): JSX.Element {
	const {
		children,
		fullWidth = false,
		fullHeight = false,
		type = "button",
		isDisabled = false,
		buttonType,
		onClick = undefined,
		isLoading = false,
	} = props;

	return (
		<div
			className={
				`relative ` +
				`${isDisabled ? "pointer-events-none" : ""} ` +
				`${fullWidth ? "w-full" : ""} ` +
				`${fullHeight ? "h-full" : ""} ` +
				`${isLoading ? "pointer-events-none" : ""} ` +
				`${buttonType !== "tertiary" ? "overflow-hidden" : ""} `
			}
			data-type={props.dataType && props.dataType}
		>
			<button
				className={getClass(props)}
				type={type}
				onClick={props.isDisabled ? undefined : onClick}
				tabIndex={props.noTabIndex || props.isDisabled ? -1 : 0}
				data-type={props.dataType && props.dataType}
				autoFocus={props.autoFocus}
			>
				<div
					className={`absolute left-0 top-0 h-full w-full items-center justify-center ` + `${isLoading ? "flex" : "hidden"} `}
					data-type={props.dataType && props.dataType}
				>
					<PuffLoader
						color={getLoaderColor(props)}
						// height={getLoaderHeight(props)}

						size={getLoaderWidth(props)}
						data-type={props.dataType && props.dataType}
					/>
				</div>
				<div
					className={`button flex w-full items-center justify-center tracking-normal ` + `${!isLoading ? "opacity-100" : "opacity-0"} `}
					data-type={props.dataType && props.dataType}
				>
					{children}
				</div>
			</button>
		</div>
	);
}

export default Button;
