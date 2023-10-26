"use client";

import {Area, Point} from "react-easy-crop/types";
import {useCallback, useState} from "react";

import Button from "@/components/general/button/button";
import Cropper from "react-easy-crop";
import Modal from "@/components/general/modals/modal";
import ModalBody from "@/components/general/modals/modal-body";
import ModalFooter from "@/components/general/modals/modal-footer";
import ModalHeader from "@/components/general/modals/modal-header";
import ReactSlider from "react-slider";
import {generateCroppedImageToBase64} from "@/helpers/cropImage";
import useUploadProfileImage from "@/hooks/dashboard/get-started/upload-profile-image/use-upload-profile-image";

interface Props {
	img: string;
	active: boolean;
	isSubmitSelf?: boolean;
	toggler: () => void;
	handleSubmitCroppedImage: (image: string) => void;
}

function ImageCropModal(props: Props) {
	const [crop, setCrop] = useState<Point>({x: 0, y: 0});
	const [zoom, setZoom] = useState(1);
	const [croppedImg, setCroppedImg] = useState<string>("");

	const onCropComplete = useCallback(
		(croppedArea: Area, croppedAreaPixels: Area) => {
			generateCroppedImageToBase64(props.img, croppedAreaPixels)
				.then((base64Image) => {
					setCroppedImg(base64Image as string);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		},
		[props.img]
	);

	const handleSetImage = (_image: string) => {
		props.handleSubmitCroppedImage(_image);
		props.toggler();
	};
	const handleGetStarted = useUploadProfileImage(handleSetImage);

	return (
		<>
			<Modal size="lg" active={props.active} toggler={props.toggler}>
				<ModalHeader onClose={props.toggler}>Drag the image to adjust</ModalHeader>
				<ModalBody>
					<div className="flex w-full flex-col">
						<div className="relative h-80 w-full">
							<Cropper
								image={props.img}
								crop={crop}
								zoom={zoom}
								aspect={1 / 1}
								cropShape="round"
								onCropChange={setCrop}
								onCropComplete={onCropComplete}
								onZoomChange={setZoom}
							/>
						</div>
						<div className="w-full pt-8">
							<ReactSlider
								value={zoom}
								min={1}
								max={3}
								step={0.1}
								className="h-9"
								thumbClassName="h-full"
								trackClassName="h-1 bg-black-quin my-4"
								onChange={(e) => {
									setZoom(e);
								}}
								renderThumb={(props) => (
									<div {...props} key={"index"}>
										<div className="flex h-full items-center justify-center">
											<div className="cursor-pointer rounded-full bg-blue p-2"></div>
										</div>
									</div>
								)}
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<div className="flex w-full flex-row flex-wrap items-end justify-end ">
						<Button
							type="submit"
							color="blue"
							ripple="light"
							buttonType="primary"
							onClick={() => {
								if (props.isSubmitSelf) {
									handleGetStarted.mutate({profile_photo: croppedImg});
								} else {
									handleSetImage(croppedImg);
								}
							}}
							isLoading={props.isSubmitSelf ? handleGetStarted.isLoading : undefined}
						>
							<span>{props.isSubmitSelf ? "Upload" : "Use Image"}</span>
						</Button>
					</div>
				</ModalFooter>
			</Modal>
		</>
	);
}

export default ImageCropModal;
