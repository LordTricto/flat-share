"use client";

import React, {useRef} from "react";

import Image from "next/image";
import cameraIcon from "@/public/images/dashboard/general/camera.svg";
import reloadIcon from "@/public/images/dashboard/general/reload.svg";

interface Props {
	image: string;
	handleSelectImage: (_image: string) => void;
}

function ImageUpload(props: Props) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const onFileChange = (file: File) => {
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const imagePath = e.target?.result;
				props.handleSelectImage(imagePath as string);
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
				className="relative flex h-44 w-full cursor-pointer items-center justify-center overflow-hidden rounded-[10px] border border-black-quin sm:h-28 sm:w-28"
				onClick={onTargetClick}
			>
				{props.image && (
					<>
						<Image className="absolute left-0 top-0 z-0 h-full w-full " src={props.image} alt="img" fill tabIndex={-1} />
						<div className="absolute left-0 top-0 z-0 h-full w-full bg-black bg-opacity-30"></div>
					</>
				)}

				<input
					type="file"
					ref={fileInputRef}
					className="hidden"
					onChange={(event) => event.target.files && onFileChange(event.target.files[0])}
					accept="image/*"
				/>
				{props.image ? (
					<Image className="z-10" src={reloadIcon} alt="reload" width={24} height={24} tabIndex={-1} />
				) : (
					<Image src={cameraIcon} alt="camera" width={40} height={40} tabIndex={-1} />
				)}
			</div>
		</div>
	);
}

export default ImageUpload;
