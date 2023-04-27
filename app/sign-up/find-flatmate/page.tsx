"use client";

import React, {useState} from "react";

import {FindFlatmateStage} from "./find-flatmate.constant";
import FindFlatmateStageOne from "./stage-one";
import FindFlatmateStageTwo from "./stage-two";

function FindFlatMate() {
	const [findFlatmateStage, setFindFlatmateStageDetails] = useState<FindFlatmateStage>(FindFlatmateStage.stageOne);

	const handleGoToStageOne = () => {
		setFindFlatmateStageDetails(FindFlatmateStage.stageOne);
	};

	const handleGoToStageTwo = () => {
		setFindFlatmateStageDetails(FindFlatmateStage.stageTwo);
	};

	return (
		<>
			<main className="flex min-h-screen w-full flex-col justify-start items-center">
				<section className="flex flex-col justify-start items-center min-h-screen w-full max-w-7xl mx-auto gap-12 lg:gap-0 px-4 2xs:px-8 lg:px-16 py-10">
					{findFlatmateStage === FindFlatmateStage.stageOne && <FindFlatmateStageOne handleGoToStageTwo={handleGoToStageTwo} />}
					{findFlatmateStage === FindFlatmateStage.stageTwo && <FindFlatmateStageTwo handleGoToStageOne={handleGoToStageOne} />}
				</section>
			</main>
		</>
	);
}

export default FindFlatMate;
