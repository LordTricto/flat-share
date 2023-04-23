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

function Footer(): JSX.Element {
	return (
		<>
			<div className="flex flex-col py-16 gap-16 bg-black w-full">
				<div className="flex flex-row justify-between items-start gap-16 w-full max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16">
					<div className="flex flex-col gap-6 text-white">
						<Link href="/">
							<div className="flex flex-row justify-start items-center">
								<Image priority src={logoIcon} alt="Flat Share logo" />
								<span className="ml-3 text-2xl">FlatShare</span>
							</div>
						</Link>
						<p className="w-full max-w-md">
							Discover the perfect flatmate or roommate for your shared property with FlatShare. Say goodbye to the stress of living
							with a random person and hello to a harmonious living
						</p>
						<div className="flex flex-row gap-4">
							<Link href="https://facebook.com/" passHref={true}>
								<Image width={38} height={38} priority src={facebookIcon} alt="facebook logo" />
							</Link>
							<Link href="https://instagram.com/" passHref={true}>
								<Image width={38} height={38} priority src={instagramIcon} alt="instagram logo" />
							</Link>
							<Link href="https://linkedIn.com/" passHref={true}>
								<Image width={38} height={38} priority src={linkedInIcon} alt="linkedIn logo" />
							</Link>
							<Link href="https://twitter.com/" passHref={true}>
								<Image width={38} height={38} priority src={twitterIcon} alt="twitter logo" />
							</Link>
						</div>
					</div>
					<div className="flex flex-col gap-6 text-white">
						<h6 className="font-medium">Navigation</h6>
						<div className="flex flex-col gap-3">
							<Link href="sign-up">
								<Button type="button" buttonType="tertiary" color="grey" size="md">
									<span className="text-white">Find Flatmate</span>
								</Button>
							</Link>
							<Link href="sign-up">
								<Button type="button" buttonType="tertiary" color="grey" size="md">
									<span className="text-white">Become a Host</span>
								</Button>
							</Link>
							<Link href="find-a-home">
								<Button type="button" buttonType="tertiary" color="grey" size="md">
									<span className="text-white">Find a Home</span>
								</Button>
							</Link>
							<Link href="message-us">
								<Button type="button" buttonType="tertiary" color="grey" size="md">
									<span className="text-white">Message Us</span>
								</Button>
							</Link>
						</div>
					</div>
					<div className="flex flex-col gap-6 text-white">
						<h6>Contact Us</h6>
						<div className="flex flex-col gap-3">
							<div className="flex flex-row justify-start items-center gap-4">
								<Image width={16} height={16} priority src={locationIcon} alt="location icon" />
								<span>13 Abayomi St, Akoka, Lagos</span>
							</div>
							<div className="flex flex-row justify-start items-center gap-4">
								<Image width={16} height={16} priority src={phoneIcon} alt="phone icon" />
								<span>+2348122072106</span>
							</div>{" "}
							<div className="flex flex-row justify-start items-center gap-4">
								<Image width={16} height={16} priority src={emailIcon} alt="email icon" />
								<span>support@flatshare.ng</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-row justify-center items-center w-full max-w-7xl mx-auto">
					<div className="flex justify-center items-end h-14 w-full border-t border-white text-white ">
						<span>© All Rights Reserved. Powered by SmartTech Academy</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default Footer;
