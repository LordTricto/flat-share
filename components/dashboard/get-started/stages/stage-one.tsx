"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import React, {useRef} from "react";
import {setIsHostFalse, setIsHostTrue, setToStageTwo} from "@/redux/get-started/get-started";

import {AccountTypeForm} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";
import Button from "@/components/general/button/button";
import FlatHost from "@/components/jsx-icons/dashboard/application/flat-host";
import Flatmate from "@/components/jsx-icons/dashboard/application/flatmate";
import {UserType} from "@/models/user.constant";
import formikHasError from "@/helpers/formikHasError";
import {useDispatch} from "react-redux";

function StageOne() {
	const dispatch = useDispatch();
	const formikRef = useRef<FormikProps<AccountTypeForm> | null>(null);

	const initialFormState: AccountTypeForm = {
		user_type: null,
	};

	const formValidation = Yup.object().shape({
		user_type: Yup.string().required("Required").nullable(),
	});

	return (
		<>
			<div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-14 md:w-[448px]">
				<div className="flex flex-col items-center justify-center gap-3">
					<div className="flex flex-col items-center justify-center gap-4">
						<span className="text-3xl leading-[100%]">👋</span>
						<h3 className="text-2xl font-bold capitalize leading-[100%] text-black">Welcome Roger!</h3>
					</div>
					<p className="text-center text-base text-black-tertiary">
						It&apos;s greet to have you with us. To help us optimize your experience, tell us how you intend to use FlatShare.
					</p>
				</div>
				<Formik
					initialValues={initialFormState}
					innerRef={formikRef}
					validationSchema={formValidation}
					onSubmit={(values) => {
						if (values.user_type === UserType.HOST) {
							dispatch(setIsHostTrue());
						} else if (values.user_type === UserType.HOST_HUNTERS) {
							dispatch(setIsHostFalse());
						}

						dispatch(setToStageTwo());
					}}
					enableReinitialize={true}
					validateOnChange
					validateOnMount
				>
					{(formik) => {
						return (
							<Form className="flex w-full flex-col items-start justify-start gap-10">
								<div className="flex w-full flex-col items-start justify-between gap-4 2xs:flex-row">
									<div
										className={
											"group flex w-full cursor-pointer flex-col items-center justify-center gap-4 2xs:max-w-[215px] " +
											"rounded-lg border py-6 duration-150 hover:border-blue hover:bg-blue-senary " +
											`${formik.values.user_type === UserType.HOST_HUNTERS ? "border-blue" : "border-grey-quat"}`
										}
										onClick={() => formik.getFieldHelpers("user_type").setValue(UserType.HOST_HUNTERS)}
									>
										<Flatmate />
										<div className="flex flex-col items-center justify-center">
											<p className="text-base font-medium">Find Flatmate</p>
											<p className="text-center text-xs text-black-tertiary">Show me flat hosts</p>
										</div>
									</div>
									<div
										className={
											"group flex w-full cursor-pointer flex-col items-center justify-center gap-4 2xs:max-w-[215px] " +
											"rounded-lg border py-6 duration-150 hover:border-blue hover:bg-blue-senary " +
											`${formik.values.user_type === UserType.HOST ? "border-blue" : "border-grey-quat"}`
										}
										onClick={() => formik.getFieldHelpers("user_type").setValue(UserType.HOST)}
									>
										<FlatHost />
										<div className="flex flex-col items-center justify-center">
											<p className="text-base font-medium">Be a host</p>
											<p className="text-center text-xs text-black-tertiary">Show me flat finders</p>
										</div>
									</div>
								</div>
								<Button
									type="submit"
									buttonType="primary"
									color="blue"
									isDisabled={formikHasError(formik.errors)}
									borderFull
									fullWidth
								>
									<span>Continue</span>
								</Button>
							</Form>
						);
					}}
				</Formik>
			</div>
		</>
	);
}

export default StageOne;
