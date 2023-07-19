import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoIcon from "@/public/images/logo.svg";
import pageDivider from "@/public/images/general/page-divider.svg";
import signUpImg from "@/public/images/sign-up/sign-up-1.png";

export default function GetStartedLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="-moz-h-fit-available -webkit-h-fit-available -ms-h-fit-available relative flex w-full flex-shrink flex-grow basis-auto flex-col items-center justify-start overflow-y-auto">
			{children}
		</div>
	);
}
