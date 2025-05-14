"use client";

import {useEffect, useState} from "react";

import Button from "@/components/general/button/button";
import {CreateAdStage} from "@/hooks/dashboard/create-ad/create-ad.constants";
import CreateAdStageOne from "@/components/dashboard/create-ad/stages/create-ad-stage-one";
import CreateAdStageTwo from "@/components/dashboard/create-ad/stages/create-ad-stage-two";
import {HostSignals} from "@/redux/init/slice/initSlice.types";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import Modal from "@/components/general/modals/modal";
import ModalBody from "@/components/general/modals/modal-body";
import {PaystackButton} from "react-paystack";
// import NotificationBar from "@/components/dashboard/general/notification-bar/notification-bar";
import WelcomeCard from "@/components/dashboard/general/cards/welcome-card/welcome-card";
import becomeHost from "@/public/images/dashboard/create-ad/become-a-host.svg";
import mark from "@/public/images/dashboard/create-ad/mark.svg";
import {useSelector} from "react-redux";

function CreateAd() {
	const user = useSelector((state: IRootState) => state.init.user);
	const hostFee = useSelector((state: IRootState) => state.init.hostFee);
	const hostSignal = useSelector((state: IRootState) => state.init.hostSignal);

	const [isWelcomeNoteOpen, setIsWelcomeNoteOpen] = useState(true);
	const [createAdStage, setCreateAdStage] = useState(CreateAdStage.STAGE_ONE);
	const [hasPaid, setHasPaid] = useState(hostSignal !== HostSignals.UNPAID_PROPERTY_ADS_FEE);

	useEffect(() => {
		setHasPaid(hostSignal !== HostSignals.UNPAID_PROPERTY_ADS_FEE);
	}, [hostSignal]);

	const handlePaystackSuccessAction = (reference: any) => {
		// Implementation for whatever you want to do with reference and after success call.
		console.log(reference);
	};

	// you can call this function anything
	const handlePaystackCloseAction = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log("closed");
	};

	const config = {
		// reference: new Date().getTime().toString(),
		email: user?.email || "",
		amount: (hostFee || 0) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
		// amount: 7677777, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
	};

	const componentProps = {
		...config,
		text: "Pay & Continue",
		onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
	};

	return (
		<>
			{!hasPaid && (
				<Modal active={true} toggler={() => setHasPaid(false)} size="md">
					<ModalBody>
						<div className="flex w-full flex-col items-center justify-center gap-6 pt-8">
							<Image priority src={becomeHost} width={66} height={66} alt="crown" />

							<div className="flex w-full flex-col items-center justify-center">
								<h3 className="text-2xl font-semibold text-black">Become a Host</h3>
								<p className="text-sm text-black-tertiary">Get verified to become a host.</p>
							</div>
							<div className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl border p-6">
								<p className="text-sm text-black-tertiary">
									To post an apartment ad, please complete a one-time listing payment. This ensures visibility and verification on
									our platform.{" "}
								</p>
								<div className="flex w-full flex-col items-center justify-start gap-4 border-b border-[#E8E8E8] pb-6">
									<div className="flex w-full flex-row items-center justify-start gap-2.5">
										<Image priority src={mark} width={20} height={20} alt="mark" />
										<p className="text-sm font-semibold text-black">Increased Exposure to Flatmates</p>
									</div>
									<div className="flex w-full flex-row items-center justify-start gap-2.5">
										<Image priority src={mark} width={20} height={20} alt="mark" />
										<p className="text-sm font-semibold text-black">Secure & Verified Listing</p>
									</div>
									<div className="flex w-full flex-row items-center justify-start gap-2.5">
										<Image priority src={mark} width={20} height={20} alt="mark" />
										<p className="text-sm font-semibold text-black">Appear on Local Search</p>
									</div>
								</div>
								<div className="w-full">
									<p className="text-sm font-medium text-black-secondary">Listing fee:</p>
									<p className="text-4xl font-bold text-black">
										{hostFee}
										<span className="text-base font-medium text-black-secondary">/One-time</span>
									</p>
								</div>
							</div>
							{/* <Button color="blue" buttonType="primary" fullWidth borderFull>
								Pay & Continue
							</Button> */}
							<PaystackButton
								className="h-12 w-full rounded-full bg-blue px-8 font-medium text-white hover:bg-blue-hover"
								{...componentProps}
							/>
						</div>
					</ModalBody>
				</Modal>
			)}
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

				{/* <NotificationBar /> */}
			</div>
		</>
	);
}

export default CreateAd;
