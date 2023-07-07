import React, {useEffect} from "react";

import CancelBig from "@/components/jsx-icons/cancel-big";
// import CloseIcon from "@/public/images/dashboard/general/cancel-close.svg";
import Image from "next/image";
import useDimension from "@/helpers/useDimension";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "fit" | "fill";

interface Props {
	size: ModalSize;
	active: boolean;
	children: React.ReactNode;
	dataType?: string | null;
	imgSection?: React.ReactNode;

	toggler: () => void;
}

const getClass = (props: Props, _width: number): string => {
	const classes: string[] = [
		_width > 768 && props.imgSection ? "flex justify-center" : "",
		"transform opacity-100 translate-y-0 transition-all duration-150",
		"my-6 mx-auto w-full",
	];

	if (props.active) {
		classes.push("opacity-100 translate-y-0");
	} else {
		classes.push("opacity-0 -translate-y-10");
	}
	return classes.join(" ");
};

const getContentClass = (props: Props, _width: number): string => {
	const classes: string[] = [
		_width > 768 && props.imgSection ? "rounded-l-lg" : "rounded-lg mx-auto",
		"outline-none focus:outline-none flex w-full flex-col border-0 bg-white shadow-lg",
	];
	if (props.size === "xs") {
		classes.push("max-w-sm");
	} else if (props.size === "sm") {
		classes.push("max-w-md");
	} else if (props.size === "md") {
		classes.push("max-w-lg");
	} else if (props.size === "lg") {
		classes.push("max-w-2xl");
	} else if (props.size === "fill") {
		classes.push("w-full");
	} else {
		classes.push("w-fit max-w-full");
	}
	return classes.join(" ");
};

function Modal(props: Props): JSX.Element {
	const {width} = useDimension();
	useEffect(() => {
		const close = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				props.toggler();
			}
		};
		window.addEventListener("keydown", close);
		return () => window.removeEventListener("keydown", close);
	}, [props]);

	return (
		<>
			<div
				className={
					`fixed inset-0 z-[70] grid place-items-center overflow-y-auto overflow-x-hidden px-2 outline-none transition-all duration-150 focus:outline-none ` +
					`${props.active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `
				}
				onClick={props.toggler}
				data-type={props.dataType && props.dataType}
			>
				{/* <div className="mx-auto flex w-full items-center justify-center"> */}
				<div className={getClass(props, width)} data-type={props.dataType && props.dataType}>
					<div
						className={getContentClass(props, width)}
						onClick={function onClick(e) {
							return e.stopPropagation();
						}}
						data-type={props.dataType && props.dataType}
					>
						{" "}
						{props.children}
					</div>
					{width > 768 && props.imgSection && (
						<div
							className="items-stretch rounded-r-lg bg-blue-senary px-8 py-8 md:relative"
							onClick={function onClick(e) {
								return e.stopPropagation();
							}}
							data-type={props.dataType && props.dataType}
						>
							<button
								className="absolute right-[22px] top-7 flex h-8 w-8 items-center justify-center rounded-full bg-opacity-0 outline-none transition-all hover:bg-blue-senary hover:bg-opacity-100 focus:outline-none"
								onClick={props.toggler}
								data-type={props.dataType && props.dataType}
							>
								<CancelBig className="h-3.5 w-3.5 stroke-current text-black-tertiary" data-type={props.dataType && props.dataType} />
								{/* <CloseIcon className="h-3.5 w-3.5 stroke-current text-black-tertiary" /> */}
							</button>
							<div className="w-max" data-type={props.dataType && props.dataType}>
								{props.imgSection}
							</div>
						</div>
					)}
				</div>
				{/* </div> */}
			</div>

			<div
				className={
					`fixed inset-0 z-[60] bg-black transition-all duration-150 ` +
					`${props.active ? "pointer-events-auto opacity-25" : "pointer-events-none opacity-0"} `
				}
				data-type={props.dataType && props.dataType}
			></div>
		</>
	);
}

export default Modal;
