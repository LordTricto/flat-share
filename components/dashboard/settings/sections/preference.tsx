"use client";

import * as Yup from "yup";

import {AccountPreferenceForm, locationOptions, userTypeOptions} from "@/hooks/dashboard/settings/settings.constants";
import {Form, Formik, FormikProps} from "formik";
import {educationOptions, genderOptions} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";

import Button from "@/components/general/button/button";
import Dropdown from "@/components/general/dropdown/dropdown";
import FormInput from "@/components/general/inputs/form-input";
// import {IRootState} from "@/redux/rootReducer";
import Input from "@/components/general/inputs/input";
import MoneyInput from "@/components/general/inputs/money-input";
import formikHasError from "@/helpers/formikHasError";
// import locationIcon from "@/public/images/dashboard/general/location.svg";
import {moneyToNumber} from "@/helpers/useMoneyToNumber";
// import {useDispatch} from "react-redux";
import {useRef} from "react";

function Preference() {
	// const dispatch = useDispatch();
	const formikRef = useRef<FormikProps<AccountPreferenceForm> | null>(null);

	const initialFormState: AccountPreferenceForm = {
		first_age_range: 0,
		second_age_range: 0,
		sex: "",
		user_type: null,
		education: "",
		profession: "",
		location_1: "",
		location_2: "",
		state: "",
		min_budget: "",
		max_budget: "",
	};

	const formValidation = Yup.object().shape({
		first_age_range: Yup.number().required("Required"),
		second_age_range: Yup.number().required("Required"),
		sex: Yup.string().required("Required").nullable(),
		user_type: Yup.string().required("Required").nullable(),
		education: Yup.string().required("Required"),
		profession: Yup.string().required("Required"),
		location_1: Yup.string().required("Required"),
		location_2: Yup.string().required("Required"),
		state: Yup.string().required("Required"),
		min_budget: Yup.string().required("Required"),
		max_budget: Yup.string().required("Required"),
		bio: Yup.string().required("Required"),
		religion: Yup.string().required("Required").nullable(),
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
						// dispatch(setPersonalInformation(values));
						// dispatch(setToStageThree());
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
										<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">What is your budget?</h3>
										<div className="mt-6 flex w-full flex-col items-start justify-start gap-5">
											<div className="flex w-full items-end gap-2 2xs:gap-3">
												<MoneyInput
													label="Min Budget"
													name="min_budget"
													inputSize="md"
													value={String(formik.values.min_budget)}
													onChange={(_value) =>
														formik.getFieldHelpers("min_budget").setValue(moneyToNumber(String(_value)))
													}
												/>
												<div className="flex h-10 items-center justify-center">
													<div className="h-[2px] w-4 bg-black-quin 2xs:w-6"></div>
												</div>
												<MoneyInput
													label="Max Budget"
													name="max_budget"
													inputSize="md"
													value={String(formik.values.max_budget)}
													onChange={(_value) =>
														formik.getFieldHelpers("max_budget").setValue(moneyToNumber(String(_value)))
													}
												/>
											</div>
										</div>
									</div>
									<div className="py-8">
										<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">
											What is your preferred location?
										</h3>
										<div className="mt-6 flex w-full flex-col items-start justify-start gap-5">
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<Dropdown
													label="Location 1"
													value={`${formik.values.location_1}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("location_1").setValue(value)}
													placeholder="Select..."
													options={locationOptions.filter((_loc) => _loc.value !== formik.values.location_2)}
													// icon={locationIcon}
													size="md"
													// noArrow
												/>
												<Dropdown
													label="Location 2"
													value={`${formik.values.location_2}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("location_2").setValue(value)}
													placeholder="Select..."
													options={locationOptions.filter((_loc) => _loc.value !== formik.values.location_1)}
													// icon={locationIcon}
													size="md"
													// noArrow
												/>
											</div>
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<Dropdown
													label="State"
													value={`${formik.values.state}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("education").setValue(value)}
													placeholder="Select..."
													size="md"
													options={locationOptions}
												/>
											</div>
										</div>
									</div>
									<div className="pt-8">
										<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">
											Who are you looking for?
										</h3>
										<div className="mt-6 flex w-full flex-col items-start justify-start gap-5">
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<Dropdown
													label="I’m Looking For"
													value={`${formik.values.user_type}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("user_type").setValue(value)}
													placeholder="Select..."
													size="md"
													options={userTypeOptions}
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
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<Dropdown
													label="Education"
													value={`${formik.values.education}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("education").setValue(value)}
													placeholder="Select..."
													size="md"
													options={educationOptions}
												/>
												<FormInput type="text" label="Profession" name="profession" inputSize="md" />
											</div>
											<div className="flex w-full items-end gap-2 2xs:gap-3">
												<Input
													label="Min Age"
													type="number"
													name="first_age_range"
													inputSize="md"
													value={formik.values.first_age_range}
													onChange={(value: string) => formik.getFieldHelpers("first_age_range").setValue(Number(value))}
													onUpClick={() => {
														if (formik.values.first_age_range === 40) {
															return;
														}
														formik.getFieldHelpers("first_age_range").setValue(Number(formik.values.first_age_range) + 1);
													}}
													onDownClick={() => {
														if (formik.values.first_age_range === 0) {
															return;
														}
														formik.getFieldHelpers("first_age_range").setValue(Number(formik.values.first_age_range) - 1);
													}}
													isNumber
												/>
												<div className="flex h-10 items-center justify-center">
													<div className="h-[2px] w-4 bg-black-quin 2xs:w-6"></div>
												</div>
												<Input
													label="Max Age"
													type="number"
													name="second_age_range"
													inputSize="md"
													value={formik.values.second_age_range}
													onChange={(value: string) => formik.getFieldHelpers("second_age_range").setValue(Number(value))}
													onUpClick={() => {
														if (formik.values.second_age_range === 40) {
															return;
														}
														formik
															.getFieldHelpers("second_age_range")
															.setValue(Number(formik.values.second_age_range) + 1);
													}}
													onDownClick={() => {
														if (formik.values.second_age_range === 0) {
															return;
														}
														formik
															.getFieldHelpers("second_age_range")
															.setValue(Number(formik.values.second_age_range) - 1);
													}}
													isNumber
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

export default Preference;
