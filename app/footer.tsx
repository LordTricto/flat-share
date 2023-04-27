"use client";

import Button from "@/components/general/button/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import emailIcon from "@/public/images/icons/email.svg";
import facebookIcon from "@/public/images/icons/facebook.svg";
import instagramIcon from "@/public/images/icons/instagram.svg";
import linkedInIcon from "@/public/images/icons/linkedIn.svg";
import locationIcon from "@/public/images/icons/location.svg";
import logoIcon from "@/public/images/logo-white.svg";
import phoneIcon from "@/public/images/icons/phone.svg";
import twitterIcon from "@/public/images/icons/twitter.svg";
import {usePathname} from "next/navigation";

function Footer(): JSX.Element {
	const pathname = usePathname();

	return (
		<>
			{(pathname === "/" || pathname === "/find-a-home" || pathname === "/contact-us") && (
				<div className="flex flex-col py-16 gap-16 bg-black w-full">
					<div className="flex flex-col xs:flex-row justify-between items-start gap-16 w-full max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16">
						<div className="flex flex-col gap-6 text-white">
							<Link href="/">
								<div className="flex flex-row justify-start items-center">
									<Image priority src={logoIcon} alt="Flat Share logo" />
									<span className="ml-3 text-xl sm:text-2xl">FlatShare</span>
								</div>
							</Link>
							<p className="text-sm sm:text-base w-full max-w-md">
								Discover the perfect flatmate or roommate for your shared property with FlatShare. Say goodbye to the stress of living
								with a random person and hello to a harmonious living
							</p>
							<div className="flex flex-row gap-4">
								<Link href="https://facebook.com/" passHref={true} target="_blank">
									<Image width={26} height={26} priority src={facebookIcon} alt="facebook logo" />
								</Link>
								<Link href="https://instagram.com/" passHref={true} target="_blank">
									<Image width={26} height={26} priority src={instagramIcon} alt="instagram logo" />
								</Link>
								<Link href="https://linkedIn.com/" passHref={true} target="_blank">
									<Image width={26} height={26} priority src={linkedInIcon} alt="linkedIn logo" />
								</Link>
								<Link href="https://twitter.com/" passHref={true} target="_blank">
									<Image width={26} height={26} priority src={twitterIcon} alt="twitter logo" />
								</Link>
							</div>
						</div>
						<div className="flex flex-col gap-6 text-white">
							<h6 className="font-medium text-sm sm:text-base h-[33px]">Navigation</h6>
							<div className="flex flex-col gap-3">
								<Link href="sign-up">
									<Button type="button" buttonType="tertiary" color="grey" size="md">
										<span className="text-xs sm:text-sm text-white">Find Flatmate</span>
									</Button>
								</Link>
								<Link href="sign-up">
									<Button type="button" buttonType="tertiary" color="grey" size="md">
										<span className="text-xs sm:text-sm text-white">Become a Host</span>
									</Button>
								</Link>
								<Link href="find-a-home">
									<Button type="button" buttonType="tertiary" color="grey" size="md">
										<span className="text-xs sm:text-sm text-white">Find a Home</span>
									</Button>
								</Link>
								<Link href="contact-us">
									<Button type="button" buttonType="tertiary" color="grey" size="md">
										<span className="text-xs sm:text-sm text-white">Message Us</span>
									</Button>
								</Link>
							</div>
						</div>
						<div className="flex flex-col gap-6 text-white">
							<h6 className="text-sm sm:text-base font-medium h-[33px]">Contact Us</h6>
							<div className="flex flex-col gap-3">
								<Link
									href="https://www.google.com/maps/place/13+Abayomi+St,+Akoka+102216,+Lagos/@6.5309944,3.3839377,17z/data=!3m1!4b1!4m6!3m5!1s0x103b8d04c82c83ab:0xf3802cdaa31eeaf2!8m2!3d6.5309944!4d3.3888086!16s%2Fg%2F11sk8n97fm"
									passHref={true}
									target="_blank"
								>
									<div className="flex flex-row justify-start items-center gap-4">
										<Image width={16} height={16} priority src={locationIcon} alt="location icon" />
										<span className="break-words text-sm sm:text-base">13 Abayomi St, Akoka, Lagos</span>
									</div>
								</Link>
								<Link href="tel:+2348122072106" passHref={true}>
									<div className="flex flex-row justify-start items-center gap-4 w-max">
										<Image width={16} height={16} priority src={phoneIcon} alt="phone icon" />
										<span className="text-sm sm:text-base">+2348122072106</span>
									</div>{" "}
								</Link>
								<Link href="mailto:olanrewaju.olukanni@gmail.com" passHref={true}>
									<div className="flex flex-row justify-start items-center gap-4 w-max">
										<Image width={16} height={16} priority src={emailIcon} alt="email icon" />
										<span className="text-sm sm:text-base">support@flatshare.ng</span>
									</div>
								</Link>
							</div>
						</div>
					</div>
					<div className="flex flex-row justify-center items-center w-full max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16">
						<div className="flex justify-center items-end xs:h-14 w-full border-t border-white text-white pt-10 xs:pt-0 text-center xs:text-left text-sm sm:text-base">
							<span>© All Rights Reserved. Powered by SmartTech Academy</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Footer;
