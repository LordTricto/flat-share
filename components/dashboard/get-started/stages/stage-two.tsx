"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
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

function StageTwo() {
	const dispatch = useDispatch();
	const userData = useSelector((state: IRootState) => state.getStarted.userData);
	const formikRef = useRef<FormikProps<PersonalInformationForm> | null>(null);

	const initialFormState: PersonalInformationForm = {
		age: userData.age || "",
		sex: userData.sex || null,
		bio: userData.bio || "",
		religion: userData.religion || null,
		education: userData.education || "",
		profession: userData.profession || "",
	};

	const formValidation = Yup.object().shape({
		age: Yup.string().required("Required"),
		sex: Yup.string().required("Required").nullable(),
		bio: Yup.string().required("Required"),
		religion: Yup.string().required("Required").nullable(),
		education: Yup.string().required("Required"),
		profession: Yup.string().required("Required"),
	});

	console.log(userData);
	return (
		<>
			<div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-8 md:w-[448px]">
				<div className="flex flex-col items-center justify-center gap-3">
					<div className="flex flex-col items-center justify-center gap-4">
						<span className="text-3xl leading-[100%]">👋</span>
						<h3 className="text-2xl font-bold capitalize leading-[100%] text-black">Let us get to know you.</h3>
					</div>
					<p className="text-center text-base text-black-tertiary">Tell us about yourself.</p>
				</div>
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
								<div className="flex w-full flex-col items-start justify-start gap-5">
									<FormInput type="text" label="Profession" name="profession" inputSize="md" />
									<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
										<Dropdown
											label="Religion"
											value={`${formik.values.religion}`}
											onSelect={(value: string | undefined) => formik.getFieldHelpers("religion").setValue(value)}
											placeholder="Select..."
											size="md"
											options={religionOptions}
										/>
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
											label="Age"
											value={`${formik.values.age}`}
											onSelect={(value: string | undefined) => formik.getFieldHelpers("age").setValue(value)}
											placeholder="Select..."
											size="md"
											options={ageOptions}
										/>
										<Dropdown
											label="Gender"
											value={`${formik.values.sex}`}
											onSelect={(value: string | undefined) => formik.getFieldHelpers("sex").setValue(value)}
											placeholder="Select..."
											size="md"
											options={genderOptions}
										/>
									</div>
									<FormTextArea label="Bio" name="bio" textSize="md" />
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

export default StageTwo;
