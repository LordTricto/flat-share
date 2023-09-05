"use client";

import {CreateAdStage} from "@/hooks/dashboard/create-ad/create-ad.constants";
import CreateAdStageOne from "@/components/dashboard/create-ad/stages/create-ad-stage-one";
import CreateAdStageTwo from "@/components/dashboard/create-ad/stages/create-ad-stage-two";
import NotificationBar from "@/components/dashboard/general/notification-bar/notification-bar";
import WelcomeCard from "@/components/dashboard/general/cards/welcome-card/welcome-card";
import {useState} from "react";

function CreateAd() {
	const [isWelcomeNoteOpen, setIsWelcomeNoteOpen] = useState(true);
	const [createAdStage, setCreateAdStage] = useState(CreateAdStage.STAGE_ONE);

	return (
		<>
			<div className="flex h-full w-full">
				<div className="relative h-full w-full overflow-y-auto">
					<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 px-4 py-6 xs:px-5">
						{isWelcomeNoteOpen && (
							<WelcomeCard
								subTitle="Create your apartment ad and complete your account setup."
								ctaText="Okay, I understand"
								toggle={() => setIsWelcomeNoteOpen(false)}
							/>
						)}

						<div className="h-fit w-full pb-6">
							<div className="flex h-fit w-full flex-col gap-8 rounded-[10px] bg-white px-5 pb-8 pt-8 2xs:px-8">
								<div className="flex flex-col items-center justify-center gap-4">
									<div className="flex flex-col items-center justify-center gap-5">
										<span className="text-3xl">🏠</span>
										<h3 className="text-2xl font-bold capitalize leading-[100%] text-black">Create Ad</h3>
									</div>
									<p className="text-center text-base text-black-tertiary">Complete your account by creating an apartment ad.</p>
								</div>
								{createAdStage === CreateAdStage.STAGE_ONE && (
									<CreateAdStageOne handleNextStage={() => setCreateAdStage(CreateAdStage.STAGE_TWO)} />
								)}
								{createAdStage === CreateAdStage.STAGE_TWO && <CreateAdStageTwo />}
							</div>
						</div>
					</div>
				</div>

				<NotificationBar />
			</div>
		</>
	);
}

export default CreateAd;
