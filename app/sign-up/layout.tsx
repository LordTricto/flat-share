import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoIcon from "@/public/images/logo.svg";
import pageDivider from "@/public/images/general/page-divider.svg";
import signUpImg from "@/public/images/sign-up/sign-up-1.png";

export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col lg:flex-row items-center justify-between max-h-screen w-full">
			<div className="relative hidden lg:flex flex-col justify-start items-center gap-6 h-screen w-full bg-sky-blue pt-10">
				<div className="flex flex-col justify-center items-center gap-12 w-full">
					<Link href="/">
						<div className="flex flex-row justify-center items-center w-max">
							<Image width={32} height={32} priority src={logoIcon} alt="Flat Share logo" />
							<span className="ml-3 mt-0.5 font-semibold text-3xl">FlatShare</span>
						</div>
					</Link>
					<p className="text-center text-black-tertiary text-xl max-w-lg">
						Discover the perfect flatmate or roommate for your shared property with FlatShare. Say goodbye to the stress of living with a
						random person and hello to a harmonious living
					</p>
				</div>
				<div>
					<Image width={511} height={511} priority src={signUpImg} alt="web of people avatars" />
				</div>
				<Image className="absolute bottom-0 left-0 w-screen" src={pageDivider} alt="divider with colors" priority />
			</div>
			<div className="max-h-screen h-full w-full overflow-hidden overflow-y-scroll">{children}</div>
		</div>
	);
}
