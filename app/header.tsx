"use client";

import React, {useState} from "react";

import Button from "@/components/general/button/button";
import CtaButton from "@/components/landing/cta-button";
import HamburgerClose from "@/components/jsx-icons/hamburger-close";
import HamburgerOpen from "@/components/jsx-icons/hamburger-open";
import Image from "next/image";
import Link from "next/link";
// import hamburgerCloseIcon from "@/public/images/icons/hamburger-close.svg";
// import hamburgerOpenIcon from "@/public/images/icons/hamburger-open.svg";
import logoIcon from "@/public/images/logo.svg";
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";

function Header(): JSX.Element {
	const router = useRouter();
	const pathname = usePathname();
	const [isNavOpen, setIsNavOpen] = useState(false);

	const handleSignIn = () => {
		router.push("/sign-in");
	};
	const handleOpenNav = () => {
		setIsNavOpen(true);
	};
	const handleCloseNav = () => {
		setIsNavOpen(false);
	};

	return (
		<>
			{(pathname === "/" || pathname === "/find-a-home" || pathname === "/contact-us") && (
				<nav
					className={
						"absolute top-0 left-0 h-min w-full z-30  backdrop-blur-md overflow-hidden " +
						`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "bg-black-nav-bg" : "bg-white-nav-bg"}`
					}
				>
					<div className="flex justify-between items-center py-8 h-fit w-full max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16">
						<div className="flex justify-start items-center gap-16 w-full">
							<Link href="/">
								<div className="flex flex-row justify-center items-center w-max">
									<Image priority src={logoIcon} alt="Flat Share logo" />
									{/* <Image
								className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
								src="/next.svg"
								alt="Next.js Logo"
								width={180}
								height={37}
								priority
							/> */}
									<span
										className={
											"ml-3 mt-0.5" +
											` ${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`
										}
									>
										FlatShare
									</span>
								</div>
							</Link>

							<div className="hidden lg:flex justify-start items-center gap-8 w-full">
								<Link href="sign-up/find-flatmate">
									<Button type="button" buttonType="tertiary" color="grey" size="md">
										<span
											className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}
										>
											Find Flatmate
										</span>
									</Button>
								</Link>
								<Link href="sign-up">
									<Button type="button" buttonType="tertiary" color="grey" size="md">
										<span
											className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}
										>
											Become a Host
										</span>
									</Button>
								</Link>
								<Link href="find-a-home">
									<Button type="button" buttonType="tertiary" color="grey" size="md">
										<span
											className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}
										>
											Find a Home
										</span>
									</Button>
								</Link>
							</div>
						</div>
						<div className="hidden lg:flex justify-center items-center gap-6">
							<Button type="button" buttonType="tertiary" color="grey" size="md" func={handleSignIn}>
								<span className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}>
									Sign In
								</span>
							</Button>
							<CtaButton />
						</div>
						<div
							className={
								"flex lg:hidden cursor-pointer" +
								` ${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : "text-black"}`
							}
						>
							{isNavOpen && (
								<div onClick={handleCloseNav}>
									<HamburgerClose />
								</div>
							)}
							{!isNavOpen && (
								<div onClick={handleOpenNav}>
									<HamburgerOpen />
								</div>
							)}
						</div>
					</div>
					<div
						className={
							"lg:hidden flex flex-col justify-center items-center gap-4 w-full px-4 2xs:px-8 pb-8 " +
							`${isNavOpen ? "" : "pointer-events-none hidden -translate-x-full"}`
						}
					>
						<div className="flex flex-col justify-start items-center gap-8 w-full">
							<Link href="sign-up/find-flatmate">
								<Button type="button" buttonType="tertiary" color="grey" size="md">
									<span className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}>
										Find Flatmate
									</span>
								</Button>
							</Link>
							<Link href="sign-up/be-a-host">
								<Button type="button" buttonType="tertiary" color="grey" size="md">
									<span className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}>
										Become a Host
									</span>
								</Button>
							</Link>
							<Link href="find-a-home">
								<Button type="button" buttonType="tertiary" color="grey" size="md">
									<span className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}>
										Find a Home
									</span>
								</Button>
							</Link>
							<Button type="button" buttonType="tertiary" color="grey" size="md" func={handleSignIn}>
								<span className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}>
									Sign In
								</span>
							</Button>
							<div className="w-full 2xs:w-max">
								<CtaButton />
							</div>
						</div>
					</div>
				</nav>
			)}
		</>
	);
}

export default Header;
