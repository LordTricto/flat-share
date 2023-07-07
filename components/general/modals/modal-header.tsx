import CancelBig from "@/components/jsx-icons/cancel-big";
// import Close from "@/public/images/dashboard/general/cancel-close.svg";
import Error from "@/public/images/dashboard/general/toast/error/icon.svg";
import Image from "next/image";
import Info from "@/public/images/dashboard/general/toast/info/icon.svg";
import {ModalMessageType} from "./modals.constants";
import React from "react";
import Success from "@/public/images/dashboard/general/toast/success/icon.svg";
import Warning from "@/public/images/dashboard/general/toast/Warning/icon.svg";

interface Props {
	children: React.ReactNode;
	subTitle?: string;
	dataType?: string | null;
	headingType?: ModalMessageType;
	withImgSection?: boolean;

	onClose: () => void;
}

function ModalHeader(props: Props): JSX.Element {
	return (
		<>
			<div className="relative flex w-full items-start justify-between space-x-2 p-8 font-medium" data-type={props.dataType && props.dataType}>
				<div className="pt-0.25 max-w-full" data-type={props.dataType && props.dataType}>
					<div
						className="flex flex-row items-start justify-start space-x-2 text-lg text-black"
						data-type={props.dataType && props.dataType}
					>
						{props.headingType && (
							<p data-type={props.dataType && props.dataType}>
								{props.headingType === ModalMessageType.ERROR && (
									<Image
										src={Error}
										alt="error icon"
										// className={`absolute left-0 top-0 `}
										width={14}
										height={14}
										tabIndex={-1}
										data-type={props.dataType && props.dataType}
									/>
								)}
								{props.headingType === ModalMessageType.INFORMATION && (
									<Image
										src={Info}
										alt="info icon"
										// className={`absolute left-0 top-0 `}
										width={14}
										height={14}
										tabIndex={-1}
										data-type={props.dataType && props.dataType}
									/>
								)}
								{props.headingType === ModalMessageType.WARNING && (
									<Image
										src={Warning}
										alt="warning icon"
										// className={`absolute left-0 top-0 `}
										width={14}
										height={14}
										tabIndex={-1}
										data-type={props.dataType && props.dataType}
									/>
								)}
								{props.headingType === ModalMessageType.SUCCESS && (
									<Image
										src={Success}
										alt="success icon"
										// className={`absolute left-0 top-0 `}
										width={14}
										height={14}
										tabIndex={-1}
										data-type={props.dataType && props.dataType}
									/>
								)}
							</p>
						)}

						<div className="leading-none" data-type={props.dataType && props.dataType}>
							{props.children}
						</div>
					</div>
					{props.subTitle && (
						<p
							className="break-words pt-2 text-left text-sm font-normal text-black-tertiary"
							data-type={props.dataType && props.dataType}
						>
							{props.subTitle}
						</p>
					)}
				</div>
				<button
					className={
						"relative flex cursor-pointer items-center justify-center pt-[2.75px] " +
						"outline-none focus:outline-none " +
						"transition-all duration-300 ease-in-out "
					}
					onClick={props.onClose}
					data-type={props.dataType && props.dataType}
				>
					<CancelBig
						className="pointer-events-none z-20 h-3.5 w-3.5 stroke-current text-black-tertiary"
						data-type={props.dataType && props.dataType}
					/>

					{!props.withImgSection && (
						<div className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-blue-senary" />
					)}
				</button>
			</div>
		</>
	);
}

export default ModalHeader;
