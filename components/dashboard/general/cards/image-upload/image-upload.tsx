"use client";

import Image, {StaticImageData} from "next/image";
import React, {useRef} from "react";

import cameraBgIcon from "@/public/images/dashboard/general/empty-apartment.png";
import cameraIcon from "@/public/images/dashboard/general/camera.svg";
import reloadIcon from "@/public/images/dashboard/general/reload.svg";

interface Props {
	image: string | StaticImageData;
	isImageOnly?: boolean;
	handleSelectImage?: (_image: string, file: File) => void;
}

function ImageUpload(props: Props) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const onFileChange = (file: File) => {
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const imagePath = e.target?.result;
				props.handleSelectImage && props.handleSelectImage(imagePath as string, file);
			};
			reader.readAsDataURL(file);
		}
	};

	const onTargetClick = () => {
		fileInputRef.current && fileInputRef.current.click();
	};

	return (
		<div className="w-full sm:w-[unset]">
			<div
				className={
					"relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden " +
					`${!(!props.isImageOnly && !props.image) ? "rounded-2xl border border-black-quin " : ""} `
				}
				onClick={onTargetClick}
			>
				{props.isImageOnly && props.image && <Image className="w-full" width={135} height={135} src={props.image} alt="img" tabIndex={-1} />}

				{!props.isImageOnly && props.image && (
					<>
						<Image className="w-full" width={135} height={135} src={props.image} alt="img" tabIndex={-1} priority />
						<div className="absolute left-0 top-0 z-0 h-full w-full bg-black bg-opacity-30"></div>
					</>
				)}

				{!props.isImageOnly && (
					<input
						type="file"
						ref={fileInputRef}
						className="hidden"
						onChange={(event) => event.target.files && onFileChange(event.target.files[0])}
						accept="image/*"
					/>
				)}
				{!props.isImageOnly && props.image && (
					<div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
						<Image className="z-10" src={reloadIcon} alt="reload" width={24} height={24} tabIndex={-1} priority />
					</div>
				)}
				{!props.isImageOnly && !props.image && (
					<div className="relative w-full">
						<Image className="w-full" src={cameraBgIcon} alt="camera-bg" width={135} height={135} tabIndex={-1} priority />

						<div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
							<Image src={cameraIcon} alt="camera" width={28} height={28} tabIndex={-1} priority />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ImageUpload;
