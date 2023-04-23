"use client";

import Button from "@/components/general/button/button";
import CtaButton from "@/components/landing/cta-button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoIcon from "@/public/images/logo.svg";
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";

function Header(): JSX.Element {
	const router = useRouter();
	const pathname = usePathname();

	const handleCreateAccount = () => {
		router.push("/sign-up");
	};
	console.log(router);
	return (
		<>
			{(pathname === "/" || pathname === "/find-a-home") && (
				<nav className="fixed w-full z-30">
					<div className="flex justify-between items-center py-8 h-fit w-full max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16 bg-transparent">
						<div className="flex justify-start items-center gap-16 w-full">
							<Link href="/">
								<div className="flex flex-row justify-center items-center">
									<Image priority src={logoIcon} alt="Flat Share logo" />
									{/* <Image
								className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
								src="/next.svg"
								alt="Next.js Logo"
								width={180}
								height={37}
								priority
							/> */}
									<span className="ml-3 mt-0.5">FlatShare</span>
								</div>
							</Link>
							<div className="flex justify-start items-center gap-8 w-full">
								<Link href="sign-up">
									<Button type="button" buttonType="tertiary" color="grey" size="md">
										<span>Find Flatmate</span>
									</Button>
								</Link>
								<Link href="sign-up">
									<Button type="button" buttonType="tertiary" color="grey" size="md">
										<span>Become a Host</span>
									</Button>
								</Link>
								<Link href="find-a-home">
									<Button type="button" buttonType="tertiary" color="grey" size="md">
										<span>Find a Home</span>
									</Button>
								</Link>
							</div>
						</div>
						<div className="flex justify-center items-center gap-6">
							<Button type="button" buttonType="tertiary" color="grey" size="md" func={handleCreateAccount}>
								<span>Sign In</span>
							</Button>
							<CtaButton />
						</div>
					</div>
				</nav>
			)}
		</>
	);
}

export default Header;
