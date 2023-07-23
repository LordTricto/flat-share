"use client";

import Button from "../general/button/button";
import Image from "next/image";
import React from "react";
import rightArrowIcon from "@/public/images/icons/right-arrow.svg";
import {useRouter} from "next/navigation";
interface Props {
	text?: string;
	color?: "blue" | "black";
}

function CtaButton(props: Props) {
	const router = useRouter();
	const handleCreateAccount = () => {
		router.push("/sign-up");
	};

	return (
		<>
			<Button type="button" buttonType="primary" color={props.color || "blue"} onClick={handleCreateAccount} fullWidth borderFull>
				<div className="flex w-max flex-row items-center gap-1 pl-0.5">
					<span className="text-sm 2xs:text-base">{props.text || "Create Account"}</span>
					<Image src={rightArrowIcon} alt="right arrow" priority />
				</div>
			</Button>
		</>
	);
}

export default CtaButton;
