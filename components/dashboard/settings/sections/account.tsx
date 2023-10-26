"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import {useRef, useState} from "react";

import Button from "@/components/general/button/button";
import {ChangePasswordForm} from "@/hooks/dashboard/settings/change-password /change-password.constants";
import FormInput from "@/components/general/inputs/form-input";
import PasswordHints from "@/app/sign-up/password-hints";
import ToggleSwitch from "@/components/general/toggle-switch";
import YupPassword from "yup-password";
import formikHasError from "@/helpers/formikHasError";
import useChangePassword from "@/hooks/dashboard/settings/change-password /use-change-password";

YupPassword(Yup);

function Account() {
	const [isShowProfile, setIsShowProfile] = useState(false);

	const formikRef = useRef<FormikProps<ChangePasswordForm> | null>(null);

	const initialFormState: ChangePasswordForm = {
		current_password: "",
		new_password: "",
	};

	const formValidation = Yup.object().shape({
		current_password: Yup.string()
			.password()
			.matches(/^(?=.*[-_])[A-Za-z0-9_-]+$/, "The password may only contain letters, numbers, dashes and underscores.")
			.required("Required"),
		new_password: Yup.string()
			.password()
			.matches(/^(?=.*[-_])[A-Za-z0-9_-]+$/, "The password may only contain letters, numbers, dashes and underscores.")
			.required("Required"),
	});

	const {mutate, isLoading} = useChangePassword(() => formikRef.current?.resetForm());

	return (
		<>
			<div className="flex h-full w-full flex-col">
				<div className="flex w-full flex-col items-start justify-start gap-8">
					<div className="w-full divide-y md:max-w-3xl">
						<div className="pb-8">
							<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Online Status</h3>
							<p className="pt-4 text-sm text-black-tertiary">Decide when you&apos;re visible by others</p>
							<div className="mt-6 flex w-full items-center justify-between gap-6">
								<p className="select-none text-sm text-black-tertiary">Show my profile</p>
								<ToggleSwitch isActive={isShowProfile} onToggle={(_value) => setIsShowProfile(_value)} />
							</div>
						</div>
						<Formik
							initialValues={initialFormState}
							innerRef={formikRef}
							validationSchema={formValidation}
							onSubmit={(values) => {
								mutate(values);
							}}
							enableReinitialize={true}
							validateOnChange
							validateOnMount
						>
							{(formik) => {
								return (
									<Form className="py-8">
										<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Change Password</h3>
										<p className="pt-4 text-sm text-black-tertiary">Update password associated with your account</p>
										<div className="mt-6 flex w-full flex-col items-start justify-between gap-6">
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<FormInput type="password" label="Current Password" name="current_password" inputSize="md" />
												<FormInput type="password" label="New Password" name="new_password" inputSize="md" />
											</div>
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<div></div>
												<PasswordHints
													password={formik.values.new_password}
													className=" flex items-center space-x-2 pb-1 text-xs"
													show={formik.values.new_password.length > 0}
												/>
											</div>
										</div>
										<Button
											type="submit"
											buttonType="primary"
											color="blue"
											isDisabled={formikHasError(formik.errors)}
											isLoading={isLoading}
											borderFull
										>
											<span>Change Password</span>
										</Button>
									</Form>
								);
							}}
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
}

export default Account;
