"use client";

import "yup-phone";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import React, {useRef, useState} from "react";

import Button from "@/components/general/button/button";
import Checkbox from "@/components/general/checkbox/checkbox";
import FormInput from "@/components/general/inputs/form-input";
import Image from "next/image";
import PasswordHints from "./password-hints";
import {SignUpForm} from "@/hooks/sign-up/sign-up.constants";
import YupPassword from "yup-password";
import formikHasError from "@/helpers/formikHasError";
import resetPasswordSuccessImg from "@/public/images/reset-password/Medal and trophy awarded for success.png";
import {useRouter} from "next/navigation";
import useSignUp from "@/hooks/sign-up/use-sign-up";

YupPassword(Yup);

function SignUp() {
	const router = useRouter();
	const handleSignUp = useSignUp();
	const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

	const formikRef = useRef<FormikProps<SignUpForm> | null>(null);

	const initialFormState: SignUpForm = {
		firstname: "",
		lastname: "",
		phone: "",
		email: "",
		password: "",
	};

	const formValidation = Yup.object().shape({
		firstname: Yup.string().required("Required"),
		lastname: Yup.string().required("Required"),
		phone: Yup.string().phone().required(),
		email: Yup.string().email("Invalid email").required("Required"),
		password: Yup.string()
			.password()
			.matches(/[-_]/, "The password may only contain letters, numbers, dashes and underscores.")
			.required("Required"),
	});

	const handleSignIn = () => {
		router.push("/sign-in");
	};

	const handleDashboard = () => {
		router.push("/dashboard");
	};
	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-between">
			<section
				className={
					"mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-start gap-12 px-4  2xs:px-8 lg:gap-0 lg:px-16 " +
					`${!handleSignUp.isSuccess ? "pt-10" : ""}`
				}
			>
				<div
					// className="flex w-full flex-col items-start justify-start"
					className={
						`flex h-full w-full flex-grow flex-col items-start ` +
						`${handleSignUp.isSuccess ? "justify-center gap-16" : "justify-start gap-9"}`
					}
				>
					{handleSignUp.isSuccess && (
						<div className="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center gap-10">
							<Image src={resetPasswordSuccessImg} alt="trophy and arrow bullseye" width={200} height={200} priority />
							<div className="flex w-full flex-col items-center justify-start gap-4">
								<h2 className="text-2xl font-semibold text-black">Awesome 🚀</h2>
								<p className="max-w-screen-4xs text-center text-black-tertiary">
									Welcome aboard! Your account creation is complete. Get ready to embark on an exciting journey with us!
								</p>
							</div>
							<Button type="submit" buttonType="primary" color="blue" onClick={handleDashboard} fullWidth borderFull>
								<span>Proceed to Dashboard</span>
							</Button>
						</div>
					)}
					{!handleSignUp.isSuccess && (
						<>
							<div className="flex w-full flex-col items-start justify-start gap-3">
								<h2 className="text-2xl font-semibold text-black">Welcome to FlatShare</h2>
								<p className="text-black-tertiary">Please enter your details to sign in.</p>
							</div>
							<Formik
								initialValues={initialFormState}
								innerRef={formikRef}
								validationSchema={formValidation}
								onSubmit={(value) => handleSignUp.mutate(value)}
								enableReinitialize={true}
								validateOnChange
								validateOnMount
							>
								{(formik) => {
									console.log(formik);
									return (
										<Form className="flex w-full flex-col items-start justify-start gap-10">
											<div className="flex w-full flex-col items-start justify-start gap-5">
												<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
													<FormInput type="text" label="First Name" name="firstname" />
													<FormInput type="text" label="Last Name" name="lastname" />
												</div>
												<FormInput type="text" label="Phone Number" name="phone" />
												<FormInput type="text" label="Email" name="email" />
												<FormInput type="password" name="password" label="Password" placeholder="Password" />
												<PasswordHints
													password={formik.values.password}
													className=" flex items-center space-x-2 pb-1 text-xs"
													show={formik.values.password.length > 0}
												/>
												<Checkbox
													text={
														<>
															I agree to all <span className="font-medium text-black">Terms and Privacy Policy</span>
														</>
													}
													id="terms-and-conditions"
													checked={hasAgreedToTerms}
													size="sm"
													onClick={() => setHasAgreedToTerms((prev) => !prev)}
												/>
											</div>
											<Button
												type="submit"
												buttonType="primary"
												color="blue"
												isLoading={handleSignUp.isLoading}
												isDisabled={formikHasError(formik.errors) || !hasAgreedToTerms}
												fullWidth
												borderFull
											>
												<span>Sign Up</span>
											</Button>
										</Form>
									);
								}}
							</Formik>

							<div className="mb-10 flex flex-row items-center justify-start gap-2">
								<span className="text-sm 2xs:text-base lg:text-lg">Already have an account?</span>
								<Button type="button" buttonType="tertiary" color="blue" size="md" onClick={handleSignIn}>
									<span className="text-sm font-medium 2xs:text-base lg:text-lg">Sign in</span>
								</Button>
							</div>
						</>
					)}
				</div>
			</section>
		</main>
	);
}

export default SignUp;

{
	/* <div className="flex flex-col justify-start items-start gap-16">
	<h2 className="text-2xl text-black font-semibold">Welcome to FlatShare</h2>
	<div className="flex flex-col justify-start items-start gap-14">
		<div className="flex flex-col justify-start items-start gap-3">
			<h4 className="text-xl text-black font-semibold">How do you intend to use FlatShare?</h4>
			<p className="text-sm text-black-tertiary">Personalized experience to meet your requirements. Feel free to modify at any time.</p>
		</div>
		<div className="flex flex-col justify-start items-start gap-10 w-full">
			<div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
				<div
					className="flex flex-col justify-center items-center gap-10 py-6 w-full max-w-[215px] rounded-lg border border-grey-tertiary hover:border-blue hover:bg-blue-senary cursor-pointer"
					onClick={handleGoToFindFlatmate}
				>
					<Image width={32} height={32} priority src={findFlatmateImg} alt="Find a flatmate icon" />
					<span className="font-medium text-lg">Find Flatmate</span>
				</div>
				<div
					className="flex flex-col justify-center items-center gap-10 py-6 w-full max-w-[215px] rounded-lg border border-grey-tertiary hover:border-blue hover:bg-blue-senary cursor-pointer"
					onClick={handleGoToBeAHost}
				>
					<Image width={32} height={32} priority src={beAHostImg} alt="Be a host" />
					<span className="font-medium text-lg">Be a host</span>
				</div>
			</div>
			<div className="w-full">
				<Button type="button" buttonType="primary" color="blue" size="md" onClick={handleCreateAccount} fullWidth borderFull>
					<span>Continue</span>
				</Button>
			</div>
			<div className="flex flex-row justify-start items-center gap-2">
				<span className="text-lg">Already have an account?</span>
				<Button type="button" buttonType="tertiary" color="blue" size="md" onClick={handleCreateAccount}>
					<span className="font-medium text-lg">Sign in</span>
				</Button>
			</div>
		</div>
	</div>
</div>; */
}
