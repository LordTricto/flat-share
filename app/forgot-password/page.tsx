"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import React, {useRef} from "react";

import Arrow from "@/components/jsx-icons/arrow";
import Button from "@/components/general/button/button";
import {ForgotPasswordForm} from "@/hooks/forgot-password/forgot-password.constants";
// import Checkbox from "@/components/general/checkbox/checkbox";
import FormInput from "@/components/general/inputs/form-input";
import Image from "next/image";
import Link from "next/link";
import formikHasError from "@/helpers/formikHasError";
import logoIcon from "@/public/images/logo.svg";
import pageDivider from "@/public/images/general/page-divider.svg";
import signUpImg from "@/public/images/sign-up/sign-up-1.png";
import useForgotPassword from "@/hooks/forgot-password/use-forgot-password";
import {useRouter} from "next/navigation";

function ForgotPassword() {
	const router = useRouter();

	const formikRef = useRef<FormikProps<ForgotPasswordForm> | null>(null);

	const initialFormState: ForgotPasswordForm = {
		email: "",
	};

	const formValidation = Yup.object().shape({
		email: Yup.string().email().required("Required"),
	});

	const handleForgotPassword = useForgotPassword();

	// get query
	// const {data}= useQuery({
	// 	queryFn: async () =>{
	// 		const {data} = await axios.get("https://flatshare.ribiax.com/api/v1/user/auth/is-authenticated");
	// 		return data as any;
	// 	}
	// })

	const handleCreateAccount = () => {
		router.push("/sign-up");
	};

	const handleSignIn = () => {
		router.push("/sign-in");
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
									<h2 className="text-2xl font-semibold text-black">Forgot password?</h2>
									<p className="text-black-tertiary">Be calm. A reset instruction will be sent to you shortly.</p>
								</div>
								<Formik
									initialValues={initialFormState}
									innerRef={formikRef}
									validationSchema={formValidation}
									onSubmit={(value) => handleForgotPassword.mutate(value)}
									enableReinitialize={true}
									validateOnChange
									validateOnMount
								>
									{(formik) => {
										return (
											<Form className="flex w-full flex-col items-start justify-start gap-10">
												<FormInput type="text" label="Email" name="email" />

												<div className="flex w-full flex-col items-start justify-start gap-4">
													<Button
														type="submit"
														buttonType="primary"
														color="blue"
														isLoading={handleForgotPassword.isLoading}
														isDisabled={formikHasError(formik.errors)}
														fullWidth
														borderFull
													>
														<div className="flex w-max flex-row items-center justify-center gap-1.5 pl-0.5">
															<span className="leading-none">Reset Password</span>
															<Arrow />
														</div>
													</Button>
													<Button
														type="button"
														buttonType="secondary"
														color="grey"
														onClick={handleSignIn}
														fullWidth
														borderFull
													>
														<div className="flex h-1 w-max flex-row items-center gap-1.5 pl-0.5">
															<div className="rotate-180">
																<Arrow />
															</div>
															<span>Back to Sign in</span>
														</div>
													</Button>
												</div>
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

export default ForgotPassword;