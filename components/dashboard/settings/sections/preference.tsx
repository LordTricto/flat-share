"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import {educationOptions, genderOptions} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";
import {locationOptions, religionOptions, userTypeOptions} from "@/hooks/dashboard/settings/settings.constants";

import Button from "@/components/general/button/button";
import Dropdown from "@/components/general/dropdown/dropdown";
import {IRootState} from "@/redux/rootReducer";
// import FormInput from "@/components/general/inputs/form-input";
import Input from "@/components/general/inputs/input";
import MoneyInput from "@/components/general/inputs/money-input";
import {UpdatePreferenceForm} from "@/hooks/dashboard/settings/update-preference/update-preference.constants";
import formikHasError from "@/helpers/formikHasError";
import {moneyToNumber} from "@/helpers/useMoneyToNumber";
import {useRef} from "react";
import {useSelector} from "react-redux";
import useUpdatePreference from "@/hooks/dashboard/settings/update-preference/use-update-preference";

interface Props {
	handleNext: () => void;
}

function Preference(props: Props) {
	const {mutate, isLoading} = useUpdatePreference(props.handleNext);

	const filter = useSelector((state: IRootState) => state.init.filter);
	const formikRef = useRef<FormikProps<UpdatePreferenceForm> | null>(null);

	const initialFormState: UpdatePreferenceForm = {
		filter_preferred_user_type: filter?.preferred_user_type || null,
		filter_age_range_1: filter?.preferred_first_age_range || undefined,
		filter_age_range_2: filter?.preferred_second_age_range || undefined,
		filter_education: filter?.preferred_education || "",
		filter_gender: filter?.preferred_sex || "",
		filter_location_1: filter?.preferred_location_1 || "",
		filter_location_2: filter?.preferred_location_2 || "",
		filter_state: filter?.state_of_interest || "",
		filter_max_budget: filter?.max_budget ? String(filter?.max_budget) : "",
		filter_min_budget: filter?.min_budget ? String(filter?.min_budget) : "",
		filter_religion: filter?.preferred_religion || null,
	};

	const formValidation = Yup.object().shape({
		filter_preferred_user_type: Yup.string().required("Required").nullable(),
		filter_age_range_1: Yup.number().min(18).required("Required"),
		filter_age_range_2: Yup.number().max(56).required("Required"),
		filter_education: Yup.string().required("Required"),
		filter_gender: Yup.string().required("Required"),
		filter_location_1: Yup.string().required("Required"),
		filter_location_2: Yup.string().required("Required"),
		filter_state: Yup.string().required("Required"),
		filter_max_budget: Yup.string().required("Required"),
		filter_min_budget: Yup.string().required("Required"),
		filter_religion: Yup.string().required("Required").nullable(),
	});

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
						// formikRef.current?.resetForm();
						mutate(values);
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
													name="filter_min_budget"
													inputSize="md"
													value={String(formik.values.filter_min_budget)}
													onChange={(_value) =>
														formik.getFieldHelpers("filter_min_budget").setValue(moneyToNumber(String(_value)))
													}
												/>
												<div className="flex h-10 items-center justify-center">
													<div className="h-[2px] w-4 bg-black-quin 2xs:w-6"></div>
												</div>
												<MoneyInput
													label="Max Budget"
													name="filter_max_budget"
													inputSize="md"
													value={String(formik.values.filter_max_budget)}
													onChange={(_value) =>
														formik.getFieldHelpers("filter_max_budget").setValue(moneyToNumber(String(_value)))
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
													value={`${formik.values.filter_location_1}`}
													onSelect={(value: string | undefined) =>
														formik.getFieldHelpers("filter_location_1").setValue(value)
													}
													placeholder="Select..."
													options={locationOptions.filter((_loc) => _loc.value !== formik.values.filter_location_2)}
													size="md"
												/>
												<Dropdown
													label="Location 2"
													value={`${formik.values.filter_location_2}`}
													onSelect={(value: string | undefined) =>
														formik.getFieldHelpers("filter_location_2").setValue(value)
													}
													placeholder="Select..."
													options={locationOptions.filter((_loc) => _loc.value !== formik.values.filter_location_1)}
													size="md"
												/>
											</div>
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<Dropdown
													label="State"
													value={`${formik.values.filter_state}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("filter_state").setValue(value)}
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
													value={`${formik.values.filter_preferred_user_type}`}
													onSelect={(value: string | undefined) =>
														formik.getFieldHelpers("filter_preferred_user_type").setValue(value)
													}
													placeholder="Select..."
													size="md"
													options={userTypeOptions}
												/>
												<Dropdown
													label="Gender"
													value={`${formik.values.filter_gender}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("filter_gender").setValue(value)}
													placeholder="Select..."
													size="md"
													options={genderOptions}
												/>
											</div>
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<Dropdown
													label="Education"
													value={`${formik.values.filter_education}`}
													onSelect={(value: string | undefined) =>
														formik.getFieldHelpers("filter_education").setValue(value)
													}
													placeholder="Select..."
													size="md"
													options={educationOptions}
												/>
												{/* <FormInput type="text" label="Profession" name="profession" inputSize="md" /> */}
												<Dropdown
													label="Religion"
													value={`${formik.values.filter_religion}`}
													onSelect={(value: string | undefined) =>
														formik.getFieldHelpers("filter_religion").setValue(value)
													}
													placeholder="Select..."
													size="md"
													options={religionOptions}
												/>
											</div>
											<div className="flex w-full items-end gap-2 2xs:gap-3">
												<Input
													label="Min Age"
													type="number"
													name="filter_age_range_1"
													inputSize="md"
													value={formik.values.filter_age_range_1}
													onChange={(value: string) => formik.getFieldHelpers("filter_age_range_1").setValue(Number(value))}
													onUpClick={() => {
														if (formik.values.filter_age_range_1 === 40) {
															return;
														}
														formik
															.getFieldHelpers("filter_age_range_1")
															.setValue(Number(formik.values.filter_age_range_1) + 1);
													}}
													onDownClick={() => {
														if (formik.values.filter_age_range_1 === 0) {
															return;
														}
														formik
															.getFieldHelpers("filter_age_range_1")
															.setValue(Number(formik.values.filter_age_range_1) - 1);
													}}
													isNumber
												/>
												<div className="flex h-10 items-center justify-center">
													<div className="h-[2px] w-4 bg-black-quin 2xs:w-6"></div>
												</div>
												<Input
													label="Max Age"
													type="number"
													name="filter_age_range_2"
													inputSize="md"
													value={formik.values.filter_age_range_2}
													onChange={(value: string) => formik.getFieldHelpers("filter_age_range_2").setValue(Number(value))}
													onUpClick={() => {
														if (formik.values.filter_age_range_2 === 40) {
															return;
														}
														formik
															.getFieldHelpers("filter_age_range_2")
															.setValue(Number(formik.values.filter_age_range_2) + 1);
													}}
													onDownClick={() => {
														if (formik.values.filter_age_range_2 === 0) {
															return;
														}
														formik
															.getFieldHelpers("filter_age_range_2")
															.setValue(Number(formik.values.filter_age_range_2) - 1);
													}}
													isNumber
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="flex w-full justify-end">
									<Button
										type="submit"
										buttonType="primary"
										color="blue"
										isDisabled={formikHasError(formik.errors) || !formik.dirty}
										isLoading={isLoading}
										borderFull
									>
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
