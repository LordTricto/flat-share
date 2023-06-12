"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import React, {useRef, useState} from "react";

import Button from "@/components/general/button/button";
import {ContactUsForm} from "@/hooks/contact-us/contact-us.constants";
import FormInput from "@/components/general/inputs/form-input";
import FormTextArea from "@/components/general/text-area/form-text-area";
import Input from "@/components/general/inputs/input";
import Link from "next/link";
import TextArea from "@/components/general/text-area/text-area";
import formikHasError from "@/helpers/formikHasError";
import useContactUs from "@/hooks/contact-us/use-contact-us";

function ContactUs() {
	const formikRef = useRef<FormikProps<ContactUsForm> | null>(null);

	const initialFormState: ContactUsForm = {
		email: "",
		message: "",
		subject: "",
		fullname: "",
	};

	const formValidation = Yup.object().shape({
		email: Yup.string().email().required("Required"),
		message: Yup.string().required("Required"),
		subject: Yup.string().required("Required"),
		fullname: Yup.string().required("Required"),
	});

	const handleContactUs = useContactUs();

	return (
		<>
			<main className="relative flex min-h-screen w-full flex-col items-center justify-between">
				<section className="bg-contact-us min-h-screen w-full">
					<div className="mx-auto w-full max-w-7xl px-4 py-36 2xs:px-8 lg:px-16">
						<div className="z-10 flex w-full max-w-xl flex-col items-start justify-start gap-10 rounded-[10px] bg-white p-8 sm:p-12">
							<div className="flex w-full flex-col items-start justify-start gap-4">
								<h1 className="text-left text-4xl font-semibold text-black xs:text-5xl lg:text-6xl">Contact Us</h1>
								<p className="text-left text-base text-black-tertiary xs:text-lg lg:text-xl">We would to hear from you</p>
							</div>

							<Formik
								initialValues={initialFormState}
								innerRef={formikRef}
								validationSchema={formValidation}
								onSubmit={(value) => handleContactUs.mutate(value)}
								enableReinitialize={true}
								validateOnChange
								validateOnMount
							>
								{(formik) => {
									return (
										<Form className="flex w-full flex-col items-start justify-start gap-10">
											<div className="flex w-full flex-col items-start justify-start gap-5">
												<FormInput type="text" label="Full Name" name="fullname" />
												<FormInput type="text" label="Email Address" name="email" />
												<FormInput type="text" label="Subject" name="subject" />
												<FormTextArea label="Message" name="message" />
											</div>
											<Button
												type="submit"
												buttonType="primary"
												color="blue"
												isLoading={handleContactUs.isLoading}
												isDisabled={formikHasError(formik.errors)}
												borderFull
												fullWidth
											>
												<span>Send Message</span>
											</Button>
										</Form>
									);
								}}
							</Formik>
						</div>
					</div>
				</section>
				<section className="z-10 w-full bg-white py-16">
					<div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 px-4 2xs:px-8 md:flex-row md:justify-between lg:px-16">
						<div className="flex flex-col items-start justify-start gap-4">
							<h3 className="text-left text-lg font-semibold text-black xs:text-xl lg:text-2xl">Find us</h3>
							<p className="text-left text-xs text-black-tertiary xs:text-sm lg:text-base">Our address for your convenience.</p>
							<Link
								href="https://www.google.com/maps/place/13+Abayomi+St,+Akoka+102216,+Lagos/@6.5309944,3.3839377,17z/data=!3m1!4b1!4m6!3m5!1s0x103b8d04c82c83ab:0xf3802cdaa31eeaf2!8m2!3d6.5309944!4d3.3888086!16s%2Fg%2F11sk8n97fm"
								passHref={true}
								target="_blank"
							>
								<span className="text-xl font-medium text-blue">13 Abayomi St, Akoka, Lagos</span>
							</Link>
						</div>
						<div className="flex flex-col items-start justify-start gap-4">
							<h3 className="text-left text-lg font-semibold text-black xs:text-xl lg:text-2xl">Shoot an email</h3>
							<p className="text-left text-xs text-black-tertiary xs:text-sm lg:text-base">We respond in about 2 business days.</p>
							<Link href="mailto:olanrewaju.olukanni@gmail.com" passHref={true}>
								<span className="text-xl font-medium text-blue">support@flatshare.ng</span>
							</Link>
						</div>
						<div className="flex flex-col items-start justify-start gap-4">
							<h3 className="text-left text-lg font-semibold text-black xs:text-xl lg:text-2xl">Give us a call</h3>
							<p className="text-left text-xs text-black-tertiary xs:text-sm lg:text-base">Monday - Friday from 8AM to 5PM.</p>
							<Link href="tel:+2348122072106" passHref={true}>
								<span className="text-xl font-medium text-blue">+2348122072106</span>
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default ContactUs;
