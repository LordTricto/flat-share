"use client";

import Button from "../general/button/button";
import Image from "next/image";
import React from "react";
import rightArrowIcon from "@/public/images/icons/right-arrow.svg";
import {useRouter} from "next/navigation";

function CtaButton() {
	const router = useRouter();
	const handleCreateAccount = () => {
		router.push("/sign-up");
	};

	return (
		<>
			<Button type="button" buttonType="primary" color="blue" size="md" onClick={handleCreateAccount} fullWidth borderFull>
				<div className="flex flex-row items-center w-max gap-1 pl-0.5">
					<span>Create Account</span>
					<Image src={rightArrowIcon} alt="right arrow" priority />
				</div>
			</Button>
		</>
	);
}

export default CtaButton;
