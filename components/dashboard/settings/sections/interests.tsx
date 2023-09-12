"use client";

import * as Yup from "yup";

import {
	AccountPreferenceForm,
	FilmInterests,
	FoodInterests,
	InterestsForm,
	MusicInterests,
	OtherInterests,
	SportsInterests,
	locationOptions,
	userTypeOptions,
} from "@/hooks/dashboard/settings/settings.constants";
import {Form, Formik, FormikProps} from "formik";
import {educationOptions, genderOptions} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";

import Button from "@/components/general/button/button";
import Dropdown from "@/components/general/dropdown/dropdown";
import FormInput from "@/components/general/inputs/form-input";
// import {IRootState} from "@/redux/rootReducer";
import Input from "@/components/general/inputs/input";
import MoneyInput from "@/components/general/inputs/money-input";
import Tag from "../../create-ad/tags/tag";
import formikHasError from "@/helpers/formikHasError";
// import locationIcon from "@/public/images/dashboard/general/location.svg";
import {moneyToNumber} from "@/helpers/useMoneyToNumber";
// import {useDispatch} from "react-redux";
import {useRef} from "react";

function Interests() {
	// const dispatch = useDispatch();
	const formikRef = useRef<FormikProps<InterestsForm> | null>(null);

	const initialFormState: InterestsForm = {
		film: [],
		food: [],
		music: [],
		other: [],
		sports: [],
	};

	const formValidation = Yup.object().shape({
		film: Yup.array().of(Yup.string().required("Required")).required("Required"),
		food: Yup.array().of(Yup.string().required("Required")).required("Required"),
		music: Yup.array().of(Yup.string().required("Required")).required("Required"),
		other: Yup.array().of(Yup.string().required("Required")).required("Required"),
		sports: Yup.array().of(Yup.string().required("Required")).required("Required"),
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
										<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Interests</h3>
										<p className="pt-4 text-sm text-black-tertiary">
											Select up to 5 to match flat finders with shared interests{" "}
										</p>
										<div className="mt-6 flex w-full flex-col items-start justify-start gap-6">
											<div className="flex w-full flex-col items-start justify-start gap-3">
												<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Sports</h3>
												<div className="flex flex-wrap gap-3">
													{SportsInterests.map((_interest, _index) => (
														<Tag
															key={_index}
															isActive={formik.values.sports.some((_el) => _el === _interest)}
															text={_interest}
															onClick={() =>
																formik
																	.getFieldHelpers("sports")
																	.setValue(
																		formik.values.sports.some((_el) => _el === _interest)
																			? formik.values.sports.filter((_el) => _el !== _interest)
																			: [...formik.values.sports, _interest]
																	)
															}
															isDisabled={
																!formik.values.sports.some((_el) => _el === _interest) &&
																!!(formik.values.sports.length > 4)
															}
														/>
													))}
												</div>
											</div>
											<div className="flex w-full flex-col items-start justify-start gap-3">
												<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Food & Drink</h3>
												<div className="flex flex-wrap gap-3">
													{FoodInterests.map((_interest, _index) => (
														<Tag
															key={_index}
															isActive={formik.values.food.some((_el) => _el === _interest)}
															text={_interest}
															onClick={() =>
																formik
																	.getFieldHelpers("food")
																	.setValue(
																		formik.values.food.some((_el) => _el === _interest)
																			? formik.values.food.filter((_el) => _el !== _interest)
																			: [...formik.values.food, _interest]
																	)
															}
															isDisabled={
																!formik.values.food.some((_el) => _el === _interest) &&
																!!(formik.values.food.length > 4)
															}
														/>
													))}
												</div>
											</div>
											<div className="flex w-full flex-col items-start justify-start gap-3">
												<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Music</h3>
												<div className="flex flex-wrap gap-3">
													{MusicInterests.map((_interest, _index) => (
														<Tag
															key={_index}
															isActive={formik.values.music.some((_el) => _el === _interest)}
															text={_interest}
															onClick={() =>
																formik
																	.getFieldHelpers("music")
																	.setValue(
																		formik.values.music.some((_el) => _el === _interest)
																			? formik.values.music.filter((_el) => _el !== _interest)
																			: [...formik.values.music, _interest]
																	)
															}
															isDisabled={
																!formik.values.music.some((_el) => _el === _interest) &&
																!!(formik.values.music.length > 4)
															}
														/>
													))}
												</div>
											</div>
											<div className="flex w-full flex-col items-start justify-start gap-3">
												<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Film & TV</h3>
												<div className="flex flex-wrap gap-3">
													{FilmInterests.map((_interest, _index) => (
														<Tag
															key={_index}
															isActive={formik.values.film.some((_el) => _el === _interest)}
															text={_interest}
															onClick={() =>
																formik
																	.getFieldHelpers("film")
																	.setValue(
																		formik.values.film.some((_el) => _el === _interest)
																			? formik.values.film.filter((_el) => _el !== _interest)
																			: [...formik.values.film, _interest]
																	)
															}
															isDisabled={
																!formik.values.film.some((_el) => _el === _interest) &&
																!!(formik.values.film.length > 4)
															}
														/>
													))}
												</div>
											</div>
											<div className="flex w-full flex-col items-start justify-start gap-3">
												<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">
													Other Interests
												</h3>
												<div className="flex flex-wrap gap-3">
													{OtherInterests.map((_interest, _index) => (
														<Tag
															key={_index}
															isActive={formik.values.other.some((_el) => _el === _interest)}
															text={_interest}
															onClick={() =>
																formik
																	.getFieldHelpers("other")
																	.setValue(
																		formik.values.other.some((_el) => _el === _interest)
																			? formik.values.other.filter((_el) => _el !== _interest)
																			: [...formik.values.other, _interest]
																	)
															}
															isDisabled={
																!formik.values.other.some((_el) => _el === _interest) &&
																!!(formik.values.other.length > 4)
															}
														/>
													))}
												</div>
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

export default Interests;
