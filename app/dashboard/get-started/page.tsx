"use client";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import ApplicationStage from "@/components/dashboard/get-started/elements/application-stage";
import {GetStartedStage} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";
import {IRootState} from "@/redux/rootReducer";
import ImageCropModal from "@/components/dashboard/get-started/modals/image-crop-modal";
import StageFour from "@/components/dashboard/get-started/stages/stage-four";
import StageOne from "@/components/dashboard/get-started/stages/stage-one";
import {applicationReset} from "@/redux/get-started/get-started";

function GetStarted() {
	const dispatch = useDispatch();
	const stage = useSelector((state: IRootState) => state.getStarted.stage);

	const [croppedImg, setCroppedImg] = useState<string>("");
	const [imageToCrop, setImageToCrop] = useState<string>("");
	const [isImageCropModalOpen, setIsImageCropModalOpen] = useState<boolean>(false);

	useEffect(() => {
		return () => {
			dispatch(applicationReset());
		};
	}, [dispatch]);

	return (
		<div className="flex h-full w-full justify-center bg-white px-4 md:h-fit md:items-center md:bg-[unset] lg:px-8 ">
			<ImageCropModal
				active={isImageCropModalOpen}
				img={imageToCrop}
				toggler={() => {
					setIsImageCropModalOpen(false);
				}}
				handleSubmitCroppedImage={(img: string) => {
					setCroppedImg(img);
				}}
			/>
			<div className="flex h-full w-full py-6 md:items-center md:justify-center md:py-20">
				<div className="mx-auto flex w-full max-w-md flex-col border-grey-quat bg-white md:max-w-[824px] md:flex-row md:gap-8 md:rounded-2xl md:border md:px-8">
					<ApplicationStage />
					<div className="hidden w-[1px] max-w-[1px] flex-grow bg-grey md:block"></div>
					<div className="flex w-full flex-col items-start justify-start py-10 md:w-max">
						{stage === GetStartedStage.STAGE_ONE && <StageOne />}
						{stage === GetStartedStage.STAGE_FOUR && (
							<StageFour
								croppedImg={croppedImg}
								isImageCropModalOpen={isImageCropModalOpen}
								handleOpenCropModal={(_img) => {
									setImageToCrop(_img);
									setIsImageCropModalOpen(true);
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default GetStarted;
