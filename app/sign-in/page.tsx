"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import {useEffect, useRef} from "react";

import Button from "@/components/general/button/button";
// import Checkbox from "@/components/general/checkbox/checkbox";
import FormInput from "@/components/general/inputs/form-input";
import Image from "next/image";
import {SignInForm} from "../../hooks/sign-in/sign-in.constants";
import {SignInSignal} from "@/hooks/sign-in/sign-in-api";
import {abortRequest} from "@/helpers/request/abortControllers";
// import Input from "@/components/general/inputs/input";
import formikHasError from "@/helpers/formikHasError";
import rightArrowIcon from "@/public/images/icons/right-arrow.svg";
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
		<>
			<section className="mx-auto flex w-full max-w-7xl flex-grow flex-col items-center justify-start gap-12 px-4 py-10 2xs:px-8 lg:gap-0 lg:px-16">
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
													<Button type="button" buttonType="tertiary" color="blue" size="md" onClick={handleForgotPassword}>
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
		</>
	);
}

export default SignIn;
