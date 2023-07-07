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
		<div className="flex h-fit w-full items-center justify-center">
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
			<div className="flex h-full w-full items-center justify-center py-20">
				<div className="mx-auto flex max-w-[824px] gap-8 rounded-2xl border border-grey-quat px-8">
					<ApplicationStage />
					<div className="w-[1px] flex-grow bg-grey"></div>
					<div className="flex w-max flex-col items-start justify-start py-10">
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
