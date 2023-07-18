"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import {useEffect, useRef} from "react";

import Button from "@/components/general/button/button";
// import Checkbox from "@/components/general/checkbox/checkbox";
import FormInput from "@/components/general/inputs/form-input";
import Image from "next/image";
import Link from "next/link";
import {SignInForm} from "../../hooks/sign-in/sign-in.constants";
import {SignInSignal} from "@/hooks/sign-in/sign-in-api";
import {abortRequest} from "@/helpers/request/abortControllers";
// import Input from "@/components/general/inputs/input";
import formikHasError from "@/helpers/formikHasError";
import logoIcon from "@/public/images/logo.svg";
import pageDivider from "@/public/images/general/page-divider.svg";
import rightArrowIcon from "@/public/images/icons/right-arrow.svg";
import signUpImg from "@/public/images/sign-up/sign-up-1.png";
import {useRouter} from "next/navigation";
import useSignIn from "@/hooks/sign-in/use-sign-in";

function SignIn() {
	const router = useRouter();

	const formikRef = useRef<FormikProps<SignInForm> | null>(null);

	const initialFormState: SignInForm = {
		username: "",
		password: "",
	};

	const formValidation = Yup.object().shape({
		username: Yup.string().required("Required"),
		password: Yup.string().required("Required"),
	});

	const handleSignIn = useSignIn();

	useEffect(() => {
		return () => {
			abortRequest(SignInSignal.SIGN_IN);
		};
	}, []);

	const handleCreateAccount = () => {
		router.push("/sign-up");
		// abortRequest(SignInSignal.SIGN_IN);
	};

	const handleForgotPassword = () => {
		router.push("/forgot-password");
	};

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
			<div className="h-full max-h-screen w-full overflow-hidden overflow-y-scroll">
				<main className="flex min-h-screen w-full flex-col items-center justify-start">
					<section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-start gap-12 px-4 py-10 2xs:px-8 lg:gap-0 lg:px-16">
						<div className="flex w-full flex-col items-start justify-start gap-16">
							<div className="flex w-full flex-col items-start justify-start gap-9">
								<div className="flex w-full flex-col items-start justify-start gap-3">
									<h2 className="text-2xl font-semibold text-black">Welcome to FlatShare</h2>
									<p className="text-black-tertiary">Please enter your details to sign in.</p>
								</div>
								<Formik
									initialValues={initialFormState}
									innerRef={formikRef}
									validationSchema={formValidation}
									onSubmit={(value) => handleSignIn.mutate(value)}
									enableReinitialize={true}
									validateOnChange
									validateOnMount
								>
									{(formik) => {
										return (
											<Form className="flex w-full flex-col items-start justify-start gap-10">
												<div className="flex w-full flex-col items-start justify-start gap-5">
													<FormInput type="text" label="Username" name="username" />

													<div className="flex w-full flex-col items-start justify-start gap-5">
														<FormInput type="password" name="password" label="Password" />
														<div className="flex w-full flex-row items-start justify-between gap-5">
															<Button
																type="button"
																buttonType="tertiary"
																color="blue"
																size="md"
																onClick={handleForgotPassword}
															>
																<span className="text-sm font-medium 2xs:text-sm">Forgot your password?</span>
															</Button>
														</div>
													</div>
												</div>
												<Button
													type="submit"
													buttonType="primary"
													color="blue"
													isLoading={handleSignIn.isLoading}
													isDisabled={formikHasError(formik.errors)}
													fullWidth
													borderFull
												>
													<div className="flex w-max flex-row items-center gap-1 pl-0.5">
														<span>Continue</span>
														<Image src={rightArrowIcon} alt="right arrow" priority />
													</div>
												</Button>
											</Form>
										);
									}}
								</Formik>

								<div className="flex flex-row items-center justify-start gap-2">
									<span className="text-sm 2xs:text-base lg:text-lg">Don&apos;t have an account?</span>
									<Button type="button" buttonType="tertiary" color="blue" size="md" onClick={handleCreateAccount}>
										<span className="text-sm font-medium 2xs:text-base lg:text-lg">Sign up</span>
									</Button>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}

export default SignIn;
