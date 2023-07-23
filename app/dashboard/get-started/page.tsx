"use client";

import React, {useState} from "react";

import ApplicationStage from "@/components/dashboard/get-started/elements/application-stage";
import {GetStartedStage} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";
import {IRootState} from "@/redux/rootReducer";
import ImageCropModal from "@/components/dashboard/get-started/modals/image-crop-modal";
import StageFour from "@/components/dashboard/get-started/stages/stage-four";
import StageOne from "@/components/dashboard/get-started/stages/stage-one";
import StageThree from "@/components/dashboard/get-started/stages/stage-three";
import StageTwo from "@/components/dashboard/get-started/stages/stage-two";
import {useSelector} from "react-redux";

function GetStarted() {
	const stage = useSelector((state: IRootState) => state.getStarted.stage);
	// const userData = useSelector((state: IRootState) => state.getStarted.userData);
	const [isImageCropModalOpen, setIsImageCropModalOpen] = useState<boolean>(false);
	const [imageToCrop, setImageToCrop] = useState<string>("");
	const [croppedImg, setCroppedImg] = useState<string>("");

	return (
		<div className="flex h-full w-full justify-center bg-white px-4 md:h-fit md:items-center md:bg-none lg:px-8 ">
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
						{stage === GetStartedStage.STAGE_TWO && <StageTwo />}
						{stage === GetStartedStage.STAGE_THREE && <StageThree />}
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
						{/* {stage === GetStartedStage.STAGE_ONE && <StageOne />}
				{stage === GetStartedStage.STAGE_ONE && <StageOne />}
				{stage === GetStartedStage.STAGE_ONE && <StageOne />} */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default GetStarted;
