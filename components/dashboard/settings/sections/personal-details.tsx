"use client";

import "yup-phone";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import {OtherPersonalDetailsForm, PersonalDetailsForm} from "@/hooks/dashboard/settings/settings.constants";
import {
	PersonalInformationForm,
	ageOptions,
	educationOptions,
	genderOptions,
	religionOptions,
} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";
import {setPersonalInformation, setToStageThree} from "@/redux/get-started/get-started";
import {useDispatch, useSelector} from "react-redux";

import Button from "@/components/general/button/button";
import Dropdown from "@/components/general/dropdown/dropdown";
import FormInput from "@/components/general/inputs/form-input";
import FormTextArea from "@/components/general/text-area/form-text-area";
import {IRootState} from "@/redux/rootReducer";
import formikHasError from "@/helpers/formikHasError";
import {useRef} from "react";

function PersonalDetails() {
	const dispatch = useDispatch();
	const userData = useSelector((state: IRootState) => state.getStarted.userData);
	const user = useSelector((state: IRootState) => state.init.user);
	const formikRef = useRef<FormikProps<PersonalInformationForm> | null>(null);

	const initialFormState: PersonalDetailsForm & OtherPersonalDetailsForm = {
		email: user?.email || "",
		fname: user?.fname || "",
		lname: user?.lname || "",
		phone: user?.phone || "",
		age: userData.age || "",
		sex: userData.sex || null,
		bio: userData.bio || "",
		religion: userData.religion || null,
		education: userData.education || "",
		profession: userData.profession || "",
	};

	const formValidation = Yup.object().shape({
		email: Yup.string().email().required(),
		fname: Yup.string().required(),
		lname: Yup.string().required(),
		phone: Yup.string().phone().required(),
		age: Yup.string().required(),
		sex: Yup.string().required().nullable(),
		bio: Yup.string().required(),
		religion: Yup.string().required().nullable(),
		education: Yup.string().required(),
		profession: Yup.string().required(),
	});

	// console.log(userData);
	return (
		<>
			<div className="flex h-full w-full flex-col">
				<Formik
					initialValues={initialFormState}
					innerRef={formikRef}
					validationSchema={formValidation}
					onSubmit={(values) => {
						dispatch(setPersonalInformation(values));
						dispatch(setToStageThree());
						formikRef.current?.resetForm();
					}}
					enableReinitialize={true}
					validateOnChange
					validateOnMount
				>
					{(formik) => {
						return (
							<Form className="flex w-full flex-col items-start justify-start gap-8">
								<div className="w-full divide-y md:max-w-3xl">
									<div className="pb-8">
										<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Personal Details</h3>
										<div className="mt-6 flex w-full flex-col items-start justify-start gap-5">
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<FormInput type="text" label="First Name" name="fname" inputSize="md" />
												<FormInput type="text" label="Last Name" name="lname" inputSize="md" />
											</div>
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<FormInput type="text" label="Phone Number" name="phone" inputSize="md" />
												<FormInput type="text" label="Email Address" name="email" inputSize="md" />
											</div>
										</div>
									</div>
									<div className="pt-8">
										<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Other Details</h3>
										<div className="mt-6 flex w-full flex-col items-start justify-start gap-5">
											<FormTextArea label="Bio" name="bio" textSize="md" />
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<FormInput type="text" label="Profession" name="profession" inputSize="md" />
												<Dropdown
													label="Education"
													value={`${formik.values.education}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("education").setValue(value)}
													placeholder="Select..."
													size="md"
													options={educationOptions}
												/>
											</div>
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<Dropdown
													label="Gender"
													value={`${formik.values.sex}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("sex").setValue(value)}
													placeholder="Select..."
													size="md"
													options={genderOptions}
												/>
												<Dropdown
													label="Age"
													value={`${formik.values.age}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("age").setValue(value)}
													placeholder="Select..."
													size="md"
													options={ageOptions}
												/>
											</div>
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<Dropdown
													label="Religion"
													value={`${formik.values.religion}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("religion").setValue(value)}
													placeholder="Select..."
													size="md"
													options={religionOptions}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="flex w-full justify-end">
									<Button type="submit" buttonType="primary" color="blue" isDisabled={formikHasError(formik.errors)} borderFull>
										<span>Save & Continue</span>
									</Button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</>
	);
}

export default PersonalDetails;
