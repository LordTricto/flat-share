"use client";

import React, {useEffect, useState} from "react";
import {ToastItemType, ToastMessageType} from "./toast.constant";

import Cancel from "../jsx-icons/cancel";
import Image from "next/image";
import toastErrorIcon from "@/public/images/icons/toast-icons/toast-error.svg";
import toastInformationIcon from "@/public/images/icons/toast-icons/toast-information.svg";
import toastSuccessIcon from "@/public/images/icons/toast-icons/toast-success.svg";
import {useDispatch} from "react-redux";

interface ToastProps {
	data: ToastItemType;
	index: number;
}
// ToastMessageType
// ToastItemType
function Toast(props: ToastProps): JSX.Element {
	const [displayToast, setDisplayToast] = useState(false);
	const [remove, setRemove] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setDisplayToast(true);
		}, 100);
	}, []);

	// Remove error in a second and a half
	useEffect(() => {
		if (!displayToast) return;
		const timeOut = setTimeout(() => {
			setDisplayToast(false);
		}, 5000);
		return () => {
			clearTimeout(timeOut);
		};
	}, [displayToast]);

	useEffect(() => {
		if (remove) return;
		const timeOut = setTimeout(() => {
			setRemove(true);
		}, 5500);
		return () => {
			clearTimeout(timeOut);
		};
	}, [remove]);

	return (
		<div
			className={
				`flex overflow-hidden rounded-md bg-black-deep transition-all duration-700 2xs:max-w-md ` +
				`${displayToast ? "pointer-events-auto translate-x-0 opacity-100" : " pointer-events-none translate-x-12 opacity-0 "} ` +
				`${remove ? "hidden" : ""} `
			}
		>
			<div
				className={
					"w-1.5 flex-grow " +
					`${props.data.messageType === ToastMessageType.ERROR ? "bg-error-deep" : ""} ` +
					`${props.data.messageType === ToastMessageType.SUCCESS ? "bg-success-deep" : ""} ` +
					`${props.data.messageType === ToastMessageType.INFORMATION ? "bg-info-deep" : ""} `
				}
			></div>
			<div className="flex w-full">
				<div className="flex w-full items-center justify-start gap-6 py-4 pl-6">
					<div>
						{props.data.messageType === ToastMessageType.ERROR && (
							<Image width={24} height={24} priority src={toastErrorIcon} alt="error icon" />
						)}
						{props.data.messageType === ToastMessageType.SUCCESS && (
							<Image width={24} height={24} priority src={toastSuccessIcon} alt="success icon" />
						)}
						{props.data.messageType === ToastMessageType.INFORMATION && (
							<Image width={24} height={24} priority src={toastInformationIcon} alt="information icon" />
						)}
					</div>
					<div className="flex w-full flex-col gap-0.5">
						<h6 className="text-lg font-semibold text-white">
							{props.data.messageType === ToastMessageType.ERROR && "Something went wrong!"}
							{props.data.messageType === ToastMessageType.SUCCESS && "Success!"}
							{props.data.messageType === ToastMessageType.INFORMATION && "Did you know?"}
						</h6>
						<p className="text-white-grey">{props.data.message}</p>
					</div>
				</div>
				<div
					className="flex items-center justify-center px-6 py-4 "
					onClick={(e) => {
						setDisplayToast(false);
						e.stopPropagation();
					}}
				>
					<Cancel className="cursor-pointer text-white" />
				</div>
			</div>
		</div>
	);
}

export default Toast;
