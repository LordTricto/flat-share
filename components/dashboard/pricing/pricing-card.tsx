"use client";

import React, {useCallback, useState} from "react";

import Button from "@/components/general/button/button";
import Image from "next/image";
import {PaystackButton} from "react-paystack";
import mainSectionPattern from "@/public/images/dashboard/home/main-section-pattern.png";
import useUpdatePlan from "@/hooks/dashboard/plan/use-update-plan";

interface Props {
	name: string;
	email: string;
	send: number | undefined;
	price: string | undefined;
	receive: number | undefined;
	priceRaw: number | undefined;
	isCurrentPlan?: boolean;
}
function PricingCard(props: Props) {
	const [isVerifying, setIsVerifying] = useState(false);

	const handlePaystackSuccessAction = useCallback(
		(reference: any) => {
			setIsVerifying(true);
			mutate({amount: props.priceRaw || 0, transaction_reference: reference.reference as string, plan: props.name.toLowerCase()});
		},
		[props.priceRaw]
	);

	// you can call this function anything
	const handlePaystackCloseAction = () => {};

	const componentProps = {
		text: "Buy Now",
		email: props.email || "",
		amount: (props.priceRaw || 0) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
		onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
	};

	const {mutate, isLoading} = useUpdatePlan({
		onComplete: () => {
			setIsVerifying(false);
		},
	});

	return (
		<div className="relative flex h-full max-h-[320px] min-h-[320px] w-[250px] flex-col overflow-hidden rounded-[10px] bg-blue p-6">
			<Image className="absolute left-0 top-0 z-0 h-full w-full " src={mainSectionPattern} alt="main background" fill tabIndex={-1} />
			<div className="z-10 flex w-full flex-1 flex-col justify-between">
				<h3 className="text-2xl font-bold text-white">{props.name} Plan</h3>
				<div className="w-full">
					<div className="flex w-full items-center justify-between gap-4">
						<span className="text-xs text-white">Receive Request:</span>
						<span className="text-lg font-semibold text-white">{props.receive}</span>
					</div>
					<div className="flex w-full items-center justify-between gap-4">
						<span className="text-xs text-white">Send Request:</span>
						<span className="text-lg font-semibold text-white">{props.send}</span>
					</div>
					<div className="flex w-full items-center justify-between gap-4">
						<span className="text-xs text-white">Price:</span>
						<span className="text-lg font-semibold text-white">{props.price}</span>
					</div>
				</div>

				{props.isCurrentPlan ? null : isVerifying ? (
					<Button color="translucent" buttonType="secondary" isLoading={isLoading} fullWidth borderFull>
						<span className="text-sm leading-none">Buy Now</span>
					</Button>
				) : (
					<PaystackButton
						className="translucent-backdrop h-12 w-full rounded-full border border-white bg-white px-8 font-medium text-white"
						{...componentProps}
					/>
				)}
			</div>
		</div>
	);
}

export default PricingCard;
