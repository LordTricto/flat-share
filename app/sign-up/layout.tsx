import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoIcon from "@/public/images/logo.svg";
import pageDivider from "@/public/images/general/page-divider.svg";
import signUpImg from "@/public/images/sign-up/sign-up-1.png";

export default function LandingLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex max-h-screen w-full flex-col items-center justify-between lg:flex-row">
			<div className="relative hidden h-screen w-full flex-col items-center justify-start gap-6 overflow-hidden bg-sky-blue pt-10 lg:flex">
				<div className="flex w-full flex-col items-center justify-center gap-12">
					<Link href="/">
						<div className="flex w-max flex-row items-center justify-center">
							<Image width={32} height={32} priority src={logoIcon} alt="Flat Share logo" />
							<span className="ml-3 mt-0.5 text-3xl font-semibold">FlatShare</span>
						</div>
					</Link>
					<p className="max-w-lg text-center text-xl text-black-tertiary">
						Discover the perfect flatmate or roommate for your shared property with FlatShare. Say goodbye to the stress of living with a
						random person and hello to a harmonious living
					</p>
				</div>
				<div>
					<Image width={511} height={511} priority src={signUpImg} alt="web of people avatars" />
				</div>
				<Image className="absolute bottom-0 left-0 w-screen scale-[1.1]" src={pageDivider} alt="divider with colors" priority />
			</div>
			<div className="h-full max-h-screen w-full overflow-hidden overflow-y-scroll">{children}</div>
		</div>
	);
}
