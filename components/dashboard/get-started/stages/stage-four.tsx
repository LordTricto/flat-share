"use client";

import Button from "@/components/general/button/button";
import Image from "next/image";
import cameraIcon from "@/public/images/dashboard/get-started/upload-camera.svg";
import {useRef} from "react";

interface Props {
	croppedImg: string;
	isImageCropModalOpen: boolean;
	handleOpenCropModal: (_img: string) => void;
}

function StageFour(props: Props) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const onFileChange = (file: File) => {
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const imagePath = e.target?.result;
				props.handleOpenCropModal((imagePath as string) || "");
			};
			reader.readAsDataURL(file);
		}
	};

	const onTargetClick = () => {
		fileInputRef.current && fileInputRef.current.click();
	};

	return (
		<>
			<div className="mx-auto flex h-full w-[448px] flex-col items-center justify-center gap-8">
				<div className="flex flex-col items-center justify-center gap-3">
					<div className="flex flex-col items-center justify-center gap-4">
						<span className="text-4xl leading-[100%]">📸</span>
						<h3 className="text-3xl font-bold capitalize leading-[100%] text-black">Upload Image!</h3>
					</div>
					<p className="text-center text-lg text-black-tertiary">Add a profile picture so people can see you.</p>
				</div>

				<div className="mx-auto flex w-full max-w-[215px] flex-col items-center justify-start gap-8 pt-8">
					{!props.croppedImg && <Image src={cameraIcon} alt="camera" width={120} height={120} tabIndex={-1} />}
					{props.croppedImg && (
						<div>
							<div className="h-[120px] w-[120px] overflow-hidden rounded-full border border-grey-quat">
								<Image src={props.croppedImg} alt="avatar" width={120} height={120} tabIndex={-1} />
							</div>
						</div>
					)}
					<div className="flex w-full flex-col items-center justify-center gap-8">
						<Button type="button" buttonType="secondary" color="grey" fullWidth onClick={onTargetClick}>
							<span>{props.croppedImg ? "Replace Image" : "Select File"}</span>
						</Button>

						{!props.isImageCropModalOpen && (
							<input
								type="file"
								ref={fileInputRef}
								className="hidden"
								onChange={(event) => event.target.files && onFileChange(event.target.files[0])}
								accept="image/*"
							/>
						)}
						<p className="text-black-tertiary">Only .JPG & .PNG supported</p>
						<p className="text-black-tertiary">Max file size is 3MB</p>
					</div>
				</div>

				<Button type="button" buttonType="primary" color="blue" isDisabled={!props.croppedImg} borderFull fullWidth>
					<span>Start Connecting!</span>
				</Button>
			</div>
		</>
	);
}

export default StageFour;