"use client";

import React, {useState} from "react";

import Button from "@/components/general/button/button";
import Input from "@/components/general/inputs/input";
import Link from "next/link";
import TextArea from "@/components/general/text-area/text-area";

type ContactDetails = {
	fullName: string;
	emailAddress: string;
	subject: string;
	message: string;
};

function ContactUs() {
	const [contactDetails, setContactDetails] = useState<ContactDetails>({
		fullName: "",
		emailAddress: "",
		subject: "",
		message: "",
	});

	const handleSetContactDetails = (_key: string, _value: string) => {
		setContactDetails((prev) => ({
			...prev,
			[_key]: _value,
		}));
	};

	const handleSubmit = () => {
		alert("done");
	};

	return (
		<>
			<main className="flex min-h-screen w-full flex-col items-center justify-between relative">
				<section className="min-h-screen w-full bg-contact-us">
					<div className="w-full max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16 py-36">
						<div className="flex flex-col justify-start items-start gap-10 w-full max-w-xl rounded-[10px] bg-white p-8 sm:p-12 z-10">
							<div className="flex flex-col justify-start items-start gap-4 w-full">
								<h1 className="font-semibold text-left text-4xl xs:text-5xl lg:text-6xl text-black">Contact Us</h1>
								<p className="text-left text-base xs:text-lg lg:text-xl text-black-tertiary">We would to hear from you</p>
							</div>
							<div className="flex flex-col justify-start items-start gap-5 w-full">
								<Input
									label="Full Name"
									type="text"
									name="fullName"
									value={contactDetails.fullName}
									onChange={(value: string) => handleSetContactDetails("fullName", value)}
								/>
								<Input
									label="Email Address"
									type="text"
									name="email"
									value={contactDetails.emailAddress}
									onChange={(value: string) => handleSetContactDetails("emailAddress", value)}
								/>
								<Input
									label="Subject"
									type="text"
									name="subject"
									value={contactDetails.subject}
									onChange={(value: string) => handleSetContactDetails("subject", value)}
								/>
								<TextArea
									label="Message"
									value={contactDetails.message}
									onChange={(value: string) => handleSetContactDetails("message", value)}
								/>
							</div>
							<Button type="button" buttonType="primary" color="blue" size="md" func={handleSubmit} borderFull fullWidth>
								<span>Send Message</span>
							</Button>
						</div>
					</div>
				</section>
				<section className="w-full py-16 bg-white z-10">
					<div className="flex flex-col md:flex-row justify-start md:justify-between items-start gap-10 w-full max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16">
						<div className="flex flex-col justify-start items-start gap-4">
							<h3 className="text-lg xs:text-xl lg:text-2xl text-left text-black font-semibold">Find us</h3>
							<p className="text-left text-xs xs:text-sm lg:text-base text-black-tertiary">Our address for your convenience.</p>
							<Link
								href="https://www.google.com/maps/place/13+Abayomi+St,+Akoka+102216,+Lagos/@6.5309944,3.3839377,17z/data=!3m1!4b1!4m6!3m5!1s0x103b8d04c82c83ab:0xf3802cdaa31eeaf2!8m2!3d6.5309944!4d3.3888086!16s%2Fg%2F11sk8n97fm"
								passHref={true}
								target="_blank"
							>
								<span className="text-blue text-xl font-medium">13 Abayomi St, Akoka, Lagos</span>
							</Link>
						</div>
						<div className="flex flex-col justify-start items-start gap-4">
							<h3 className="text-lg xs:text-xl lg:text-2xl text-left text-black font-semibold">Shoot an email</h3>
							<p className="text-left text-xs xs:text-sm lg:text-base text-black-tertiary">We respond in about 2 business days.</p>
							<Link href="mailto:olanrewaju.olukanni@gmail.com" passHref={true}>
								<span className="text-blue text-xl font-medium">support@flatshare.ng</span>
							</Link>
						</div>
						<div className="flex flex-col justify-start items-start gap-4">
							<h3 className="text-lg xs:text-xl lg:text-2xl text-left text-black font-semibold">Give us a call</h3>
							<p className="text-left text-xs xs:text-sm lg:text-base text-black-tertiary">Monday - Friday from 8AM to 5PM.</p>
							<Link href="tel:+2348122072106" passHref={true}>
								<span className="text-blue text-xl font-medium">+2348122072106</span>
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default ContactUs;
