"use client";

import * as Yup from "yup";

import {FilmInterests, FoodInterests, MusicInterests, OtherInterests, SportsInterests} from "@/hooks/dashboard/settings/settings.constants";
import {Form, Formik, FormikProps} from "formik";

import Button from "@/components/general/button/button";
import {IRootState} from "@/redux/rootReducer";
import Tag from "../../create-ad/tags/tag";
import {UpdateInterestsForm} from "@/hooks/dashboard/settings/update-interests/update-interests.constants";
import formikHasError from "@/helpers/formikHasError";
import {useRef} from "react";
import {useSelector} from "react-redux";
import useUpdateInterests from "@/hooks/dashboard/settings/update-interests/use-update-interests";

interface Props {
	handleNext: () => void;
}

function Interests(props: Props) {
	const {mutate, isLoading} = useUpdateInterests(props.handleNext);

	const interests = useSelector((state: IRootState) => state.init.interests);
	const formikRef = useRef<FormikProps<UpdateInterestsForm> | null>(null);

	const initialFormState: UpdateInterestsForm = {
		film_and_tv: interests.film_and_tv || [],
		food_and_drink: interests.food || [],
		music: interests.music || [],
		other_interests: interests.others || [],
		sports: interests.sports || [],
	};

	const formValidation = Yup.object().shape({
		film_and_tv: Yup.array().of(Yup.string().required("Required")).required("Required"),
		food_and_drink: Yup.array().of(Yup.string().required("Required")).required("Required"),
		music: Yup.array().of(Yup.string().required("Required")).required("Required"),
		other_interests: Yup.array().of(Yup.string().required("Required")).required("Required"),
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
															isActive={formik.values.food_and_drink.some((_el) => _el === _interest)}
															text={_interest}
															onClick={() =>
																formik
																	.getFieldHelpers("food_and_drink")
																	.setValue(
																		formik.values.food_and_drink.some((_el) => _el === _interest)
																			? formik.values.food_and_drink.filter((_el) => _el !== _interest)
																			: [...formik.values.food_and_drink, _interest]
																	)
															}
															isDisabled={
																!formik.values.food_and_drink.some((_el) => _el === _interest) &&
																!!(formik.values.food_and_drink.length > 4)
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
															isActive={formik.values.film_and_tv.some((_el) => _el === _interest)}
															text={_interest}
															onClick={() =>
																formik
																	.getFieldHelpers("film_and_tv")
																	.setValue(
																		formik.values.film_and_tv.some((_el) => _el === _interest)
																			? formik.values.film_and_tv.filter((_el) => _el !== _interest)
																			: [...formik.values.film_and_tv, _interest]
																	)
															}
															isDisabled={
																!formik.values.film_and_tv.some((_el) => _el === _interest) &&
																!!(formik.values.film_and_tv.length > 4)
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
															isActive={formik.values.other_interests.some((_el) => _el === _interest)}
															text={_interest}
															onClick={() =>
																formik
																	.getFieldHelpers("other_interests")
																	.setValue(
																		formik.values.other_interests.some((_el) => _el === _interest)
																			? formik.values.other_interests.filter((_el) => _el !== _interest)
																			: [...formik.values.other_interests, _interest]
																	)
															}
															isDisabled={
																!formik.values.other_interests.some((_el) => _el === _interest) &&
																!!(formik.values.other_interests.length > 4)
															}
														/>
													))}
												</div>
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

export default Interests;
