"use client";

import React, {useEffect, useRef, useState} from "react";

import Button from "@/components/general/button/button";
import CtaButton from "@/components/landing/cta-button";
import HamburgerClose from "@/components/jsx-icons/hamburger-close";
import HamburgerOpen from "@/components/jsx-icons/hamburger-open";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import logoIcon from "@/public/images/logo.svg";
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";

const myFont = localFont({
	src: [
		{
			path: "./AvenirLTStd-Book.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./AvenirLTStd-Roman.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./AvenirLTStd-Black.otf",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
});

function Header(): JSX.Element {
	const router = useRouter();
	const navDiv = useRef<HTMLElement | null>(null);
	const pathname = usePathname();
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [isAtTop, setIsAtTop] = useState(true);

	useEffect(() => {
		const navAppear = () => {
			setIsAtTop(window.scrollY < window.innerHeight);
		};
		window.addEventListener("scroll", navAppear);
		return () => window.removeEventListener("keydown", navAppear);
	}, []);

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
			{!pathname.includes("dashboard") && (
				<nav
					className={
						"z-30 h-min w-full transition-all " +
						`${
							!isAtTop ? "fixed backdrop-blur-md" : "absolute left-0 top-0 overflow-hidden backdrop-blur-md lg:backdrop-blur-[unset]"
						} ` +
						`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "bg-black-nav-bg" : "bg-white-nav-bg"} ` +
						`${!(pathname === "/" || pathname === "/find-a-home" || pathname === "/contact-us") ? "lg:hidden" : ""}`
					}
					ref={navDiv}
				>
					<div className="mx-auto flex h-fit w-full max-w-7xl items-center justify-between px-4 py-8 2xs:px-8 lg:px-16">
						<div className="flex w-full items-center justify-start gap-16">
							<Link href="/">
								<div className="flex w-max flex-row items-center justify-center">
									<Image priority src={logoIcon} width={30} alt="Flat Share logo" />
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
											"ml-3 mt-0.5 text-2xl font-bold " +
											`${myFont.className} ` +
											` ${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`
										}
									>
										FlatShare
									</span>
								</div>
							</Link>

							{(pathname === "/" || pathname === "/find-a-home" || pathname === "/contact-us") && (
								<div className="hidden w-full items-center justify-start gap-8 lg:flex">
									<Link href="sign-up/find-flatmate">
										<Button type="button" buttonType="tertiary" color="grey">
											<span
												className={`${
													pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""
												}`}
											>
												Find Flatmate
											</span>
										</Button>
									</Link>
									<Link href="sign-up">
										<Button type="button" buttonType="tertiary" color="grey">
											<span
												className={`${
													pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""
												}`}
											>
												Become a Host
											</span>
										</Button>
									</Link>
									<Link href="find-a-home">
										<Button type="button" buttonType="tertiary" color="grey">
											<span
												className={`${
													pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""
												}`}
											>
												Find a Home
											</span>
										</Button>
									</Link>
								</div>
							)}
						</div>
						{(pathname === "/" || pathname === "/find-a-home" || pathname === "/contact-us") && (
							<>
								<div className="hidden items-center justify-center gap-6 lg:flex">
									<Button type="button" buttonType="tertiary" color="grey" onClick={handleSignIn}>
										<span
											className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}
										>
											Sign In
										</span>
									</Button>
									<CtaButton />
								</div>
								<div
									className={
										"flex cursor-pointer lg:hidden" +
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
							</>
						)}
					</div>

					{(pathname === "/" || pathname === "/find-a-home" || pathname === "/contact-us") && (
						<div
							className={
								"flex w-full flex-col items-center justify-center gap-4 px-4 pb-8 2xs:px-8 lg:hidden " +
								`${isNavOpen ? "" : "pointer-events-none hidden -translate-x-full"}`
							}
						>
							<div className="flex w-full flex-col items-center justify-start gap-8">
								<Link href="sign-up/find-flatmate">
									<Button type="button" buttonType="tertiary" color="grey">
										<span
											className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}
										>
											Find Flatmate
										</span>
									</Button>
								</Link>
								<Link href="sign-up/be-a-host">
									<Button type="button" buttonType="tertiary" color="grey">
										<span
											className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}
										>
											Become a Host
										</span>
									</Button>
								</Link>
								<Link href="find-a-home">
									<Button type="button" buttonType="tertiary" color="grey">
										<span
											className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}
										>
											Find a Home
										</span>
									</Button>
								</Link>
								<Button type="button" buttonType="tertiary" color="grey" onClick={handleSignIn}>
									<span className={`${pathname.includes("/contact-us") || pathname.includes("/find-a-home") ? "text-white" : ""}`}>
										Sign In
									</span>
								</Button>
								<div className="w-full 2xs:w-max">
									<CtaButton />
								</div>
							</div>
						</div>
					)}
				</nav>
			)}
		</>
	);
}

export default Header;
