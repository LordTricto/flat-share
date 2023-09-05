"use client";

import * as Yup from "yup";

import {Form, Formik} from "formik";
import {apartmentTypeOptions, paymentFrequencyOptions} from "@/hooks/dashboard/create-ad/create-ad.constants";
import {useEffect, useRef} from "react";

import Button from "@/components/general/button/button";
import CircularProgress from "@/components/dashboard/general/circular-progressbar";
import {CreateAdForm} from "@/hooks/dashboard/create-ad/create-ad.constants";
import Dropdown from "@/components/general/dropdown/dropdown";
import {FormikProps} from "formik";
import Input from "@/components/general/inputs/input";
import MoneyInput from "@/components/general/inputs/money-input";
import Tag from "../tags/tag";
import formikHasError from "@/helpers/formikHasError";
import {moneyToNumber} from "@/helpers/useMoneyToNumber";
import useCreateAd from "@/hooks/dashboard/create-ad/use-create-ad";

interface Props {
	handleNextStage: () => void;
}
function CreateAdStageOne(props: Props) {
	const {data, isSuccess, mutate} = useCreateAd();
	const formikRef = useRef<FormikProps<CreateAdForm> | null>(null);

	const initialFormState: CreateAdForm = {
		apartment_type: "",
		rooms_no: 0,
		bathrooms_no: 0,
		toilets_no: 0,
		rent_cost: 0,
		payment_frequency: "",
		rent_contribution: 0,
		// preferred_gender: "",
		house_rules: [],
		interests: [],
		features: [],
		description: "",
		house_city: "",
		house_state: "",
		house_street_address: "",
		monthly_rent_charge: "",
	};

	const formValidation = Yup.object().shape({
		apartment_type: Yup.string().required("Required"),
		rooms_no: Yup.number().required("Required"),
		bathrooms_no: Yup.number().required("Required"),
		toilets_no: Yup.number().required("Required"),
		rent_cost: Yup.number().required("Required"),
		payment_frequency: Yup.string().required("Required"),
		rent_contribution: Yup.number().required("Required"),
		preferred_gender: Yup.string().required("Required"),
		house_rules: Yup.array().of(Yup.string().required("Required")).min(3).required("Required"),
		interests: Yup.array().of(Yup.string().required("Required")).min(1).max(5).required("Required"),
		features: Yup.array().of(Yup.string().required("Required")).min(1).max(3).required("Required"),
	});

	useEffect(() => {
		if (isSuccess) {
			props.handleNextStage();
		}
	}, [isSuccess, props]);

	return (
		<>
			<Formik
				initialValues={initialFormState}
				innerRef={formikRef}
				validationSchema={formValidation}
				onSubmit={(value) => {
					// handleForgotPassword.mutate(value)
					mutate(value);
				}}
				enableReinitialize={true}
				validateOnChange
				validateOnMount
			>
				{(formik) => {
					return (
						<Form className="flex h-fit w-full flex-col items-start justify-start gap-8">
							<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
								<div className="flex w-full flex-col gap-5">
									<div className="grid w-full grid-cols-1 gap-5 2xs:gap-8 lg:!grid-cols-1 [@media(min-width:1200px)]:!grid-cols-2 [@media(min-width:700px)]:grid-cols-2">
										<div>
											<Dropdown
												label="Apartment Type"
												value={formik.values.apartment_type}
												onSelect={(value: string | undefined) => formik.getFieldHelpers("apartment_type").setValue(value)}
												size="md"
												options={apartmentTypeOptions}
											/>
										</div>
										<div className="flex flex-col gap-5 2xs:flex-row">
											<Input
												label="Bedrooms"
												type="number"
												name="rooms_no"
												inputSize="md"
												value={formik.values.rooms_no}
												onChange={(value: string) => formik.getFieldHelpers("rooms_no").setValue(Number(value))}
												onUpClick={() => {
													if (formik.values.rooms_no === 5) {
														return;
													}
													formik.getFieldHelpers("rooms_no").setValue(Number(formik.values.rooms_no) + 1);
												}}
												onDownClick={() => {
													if (formik.values.rooms_no === 0) {
														return;
													}
													formik.getFieldHelpers("rooms_no").setValue(Number(formik.values.rooms_no) - 1);
												}}
												isNumber
											/>
											<Input
												label="Toilets"
												type="number"
												name="bathrooms_no"
												inputSize="md"
												value={formik.values.bathrooms_no}
												onChange={(value: string) => formik.getFieldHelpers("bathrooms_no").setValue(Number(value))}
												onUpClick={() => {
													if (formik.values.bathrooms_no === 5) {
														return;
													}
													formik.getFieldHelpers("bathrooms_no").setValue(Number(formik.values.bathrooms_no) + 1);
												}}
												onDownClick={() => {
													if (formik.values.bathrooms_no === 0) {
														return;
													}
													formik.getFieldHelpers("bathrooms_no").setValue(Number(formik.values.bathrooms_no) - 1);
												}}
												isNumber
											/>
											<Input
												label="Bathrooms"
												type="number"
												name="toilets_no"
												inputSize="md"
												value={formik.values.toilets_no}
												onChange={(value: string) => formik.getFieldHelpers("toilets_no").setValue(Number(value))}
												onUpClick={() => {
													if (formik.values.toilets_no === 5) {
														return;
													}
													formik.getFieldHelpers("toilets_no").setValue(Number(formik.values.toilets_no) + 1);
												}}
												onDownClick={() => {
													if (formik.values.toilets_no === 0) {
														return;
													}
													formik.getFieldHelpers("toilets_no").setValue(Number(formik.values.toilets_no) - 1);
												}}
												isNumber
											/>
										</div>
									</div>
									<div className="grid w-full grid-cols-1 gap-5 2xs:grid-cols-2 2xs:gap-8">
										<MoneyInput
											label="Rental Cost"
											name="rental_cost"
											inputSize="md"
											value={String(formik.values.rent_cost)}
											onChange={(_value) => formik.getFieldHelpers("rent_cost").setValue(moneyToNumber(String(_value)))}
										/>
										<div>
											<Dropdown
												label="Payment Frequency"
												value={`${formik.values.payment_frequency}`}
												onSelect={(value: string | undefined) => formik.getFieldHelpers("payment_frequency").setValue(value)}
												size="md"
												options={paymentFrequencyOptions}
											/>
										</div>
									</div>
									<div className="grid w-full grid-cols-1 gap-5 2xs:grid-cols-2 2xs:gap-8">
										<div className="flex flex-col gap-3">
											<div className="flex gap-5">
												<MoneyInput
													label="Split Payment"
													name="rental_cost"
													value={String(formik.values.rent_contribution)}
													inputSize="md"
													onChange={
														(_value) =>
															formik.getFieldHelpers("rent_contribution").setValue(moneyToNumber(String(_value)))
														// .setValue(
														// 	moneyToNumber(String(_value)) >= formik.values.rent_cost
														// 		? formik.values.rent_contribution
														// 		: moneyToNumber(String(_value))
														// )
													}
												/>
												<div className="mt-7">
													<CircularProgress
														sizeClassName="h-10 w-10"
														progress={
															formik.values.rent_cost && formik.values.rent_contribution < formik.values.rent_cost
																? ((formik.values.rent_contribution / formik.values.rent_cost) * 100).toFixed()
																: "0"
														}
													/>
												</div>
											</div>
											{formik.values.rent_cost !== 0 && formik.values.rent_contribution >= formik.values.rent_cost && (
												<p className="text-xs text-error">Split payment can not be greater or equal to rental cost</p>
											)}
											{(formik.values.rent_cost === 0 || formik.values.rent_contribution < formik.values.rent_cost) && (
												<p className="text-xs text-grey-quin">Enter the amount you wish to contribute.</p>
											)}
										</div>
										{/* <div>
											<Dropdown
												label="Preferred Gender"
												value={`${formik.values.preferred_gender}`}
												onSelect={(value: string | undefined) => formik.getFieldHelpers("preferred_gender").setValue(value)}
												size="md"
												options={genderOptions}
											/>
										</div> */}
									</div>
								</div>
								<div className="flex flex-col gap-5">
									<div className="flex flex-col gap-3">
										<h3 className="text-base font-medium leading-[100%] text-black-secondary">House Rules</h3>
										<p className="text-sm font-medium text-black-tertiary">
											Select at least 3 rules that align with your apartment.{" "}
										</p>
									</div>
									<div className="flex flex-wrap gap-3">
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "No pets")}
											text="No pets"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "No pets")
															? formik.values.house_rules.filter((_el) => _el !== "No pets")
															: [...formik.values.house_rules, "No pets"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "No pets")
											// }
										/>
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "Non-smoker")}
											text="Non-smoker"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "Non-smoker")
															? formik.values.house_rules.filter((_el) => _el !== "Non-smoker")
															: [...formik.values.house_rules, "Non-smoker"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "Non-smoker")
											// }
										/>
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "No drugs")}
											text="No drugs"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "No drugs")
															? formik.values.house_rules.filter((_el) => _el !== "No drugs")
															: [...formik.values.house_rules, "No drugs"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "No drugs")
											// }
										/>
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "Respectful noise")}
											text="Respectful noise"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "Respectful noise")
															? formik.values.house_rules.filter((_el) => _el !== "Respectful noise")
															: [...formik.values.house_rules, "Respectful noise"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "Respectful noise")
											// }
										/>
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "No drama")}
											text="No drama"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "No drama")
															? formik.values.house_rules.filter((_el) => _el !== "No drama")
															: [...formik.values.house_rules, "No drama"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "No drama")
											// }
										/>
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "No parties")}
											text="No parties"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "No parties")
															? formik.values.house_rules.filter((_el) => _el !== "No parties")
															: [...formik.values.house_rules, "No parties"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "No parties")
											// }
										/>
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "No kids")}
											text="No kids"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "No kids")
															? formik.values.house_rules.filter((_el) => _el !== "No kids")
															: [...formik.values.house_rules, "No kids"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "No kids")
											// }
										/>
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "Cleanliness")}
											text="Cleanliness"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "Cleanliness")
															? formik.values.house_rules.filter((_el) => _el !== "Cleanliness")
															: [...formik.values.house_rules, "Cleanliness"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "Cleanliness")
											// }
										/>
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "No illegal activities")}
											text="No illegal activities"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "No illegal activities")
															? formik.values.house_rules.filter((_el) => _el !== "No illegal activities")
															: [...formik.values.house_rules, "No illegal activities"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "No illegal activities")
											// }
										/>
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "Respect privacy")}
											text="Respect privacy"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "Respect privacy")
															? formik.values.house_rules.filter((_el) => _el !== "Respect privacy")
															: [...formik.values.house_rules, "Respect privacy"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "Quiet neighborhood")
											// }
										/>
										<Tag
											isActive={formik.values.house_rules.some((_el) => _el === "No overnight guests")}
											text="No overnight guests"
											onClick={() =>
												formik
													.getFieldHelpers("house_rules")
													.setValue(
														formik.values.house_rules.some((_el) => _el === "No overnight guests")
															? formik.values.house_rules.filter((_el) => _el !== "No overnight guests")
															: [...formik.values.house_rules, "No overnight guests"]
													)
											}
											// isDisabled={
											// formik.values.features.length === 3 &&
											// formik.values.features.some((_el) => _el !== "Quiet neighborhood")
											// }
										/>
									</div>
								</div>
								<div className="flex flex-col gap-5">
									<div className="flex flex-col gap-3">
										<h3 className="text-base font-medium leading-[100%] text-black-secondary">Interests</h3>
										<p className="text-sm font-medium text-black-tertiary">
											Select up to 5 to match flat finders with shared interests.{" "}
										</p>
									</div>
									<div className="flex flex-wrap gap-3">
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Cooking")}
											text="Cooking"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Cooking")
															? formik.values.interests.filter((_el) => _el !== "Cooking")
															: [...formik.values.interests, "Cooking"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 && !formik.values.interests.some((_el) => _el === "Cooking")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Sport")}
											text="Sport"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Sport")
															? formik.values.interests.filter((_el) => _el !== "Sport")
															: [...formik.values.interests, "Sport"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 && !formik.values.interests.some((_el) => _el === "Sport")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Music")}
											text="Music"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Music")
															? formik.values.interests.filter((_el) => _el !== "Music")
															: [...formik.values.interests, "Music"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 && !formik.values.interests.some((_el) => _el === "Music")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Photography")}
											text="Photography"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Photography")
															? formik.values.interests.filter((_el) => _el !== "Photography")
															: [...formik.values.interests, "Photography"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 && !formik.values.interests.some((_el) => _el === "Photography")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Gaming")}
											text="Gaming"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Gaming")
															? formik.values.interests.filter((_el) => _el !== "Gaming")
															: [...formik.values.interests, "Gaming"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 && !formik.values.interests.some((_el) => _el === "Gaming")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Drinks & Wine")}
											text="Drinks & Wine"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Drinks & Wine")
															? formik.values.interests.filter((_el) => _el !== "Drinks & Wine")
															: [...formik.values.interests, "Drinks & Wine"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 &&
												!formik.values.interests.some((_el) => _el === "Drinks & Wine")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Movies")}
											text="Movies"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Movies")
															? formik.values.interests.filter((_el) => _el !== "Movies")
															: [...formik.values.interests, "Movies"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 && !formik.values.interests.some((_el) => _el === "Movies")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Fashion & style")}
											text="Fashion & style"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Fashion & style")
															? formik.values.interests.filter((_el) => _el !== "Fashion & style")
															: [...formik.values.interests, "Fashion & style"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 &&
												!formik.values.interests.some((_el) => _el === "Fashion & style")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Books")}
											text="Books"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Books")
															? formik.values.interests.filter((_el) => _el !== "Books")
															: [...formik.values.interests, "Books"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 && !formik.values.interests.some((_el) => _el === "Books")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Health")}
											text="Health"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Health")
															? formik.values.interests.filter((_el) => _el !== "Health")
															: [...formik.values.interests, "Health"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 && !formik.values.interests.some((_el) => _el === "Health")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Gym & fitness")}
											text="Gym & fitness"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Gym & fitness")
															? formik.values.interests.filter((_el) => _el !== "Gym & fitness")
															: [...formik.values.interests, "Gym & fitness"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 &&
												!formik.values.interests.some((_el) => _el === "Gym & fitness")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Technology")}
											text="Technology"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Technology")
															? formik.values.interests.filter((_el) => _el !== "Technology")
															: [...formik.values.interests, "Technology"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 && !formik.values.interests.some((_el) => _el === "Technology")
											}
										/>
										<Tag
											isActive={formik.values.interests.some((_el) => _el === "Anime")}
											text="Anime"
											onClick={() =>
												formik
													.getFieldHelpers("interests")
													.setValue(
														formik.values.interests.some((_el) => _el === "Anime")
															? formik.values.interests.filter((_el) => _el !== "Anime")
															: [...formik.values.interests, "Anime"]
													)
											}
											isDisabled={
												formik.values.interests.length === 5 && !formik.values.interests.some((_el) => _el === "Anime")
											}
										/>
									</div>
								</div>
								<div className="flex flex-col gap-5">
									<div className="flex flex-col gap-3">
										<h3 className="text-base font-medium leading-[100%] text-black-secondary">Other Features</h3>
										<p className="text-sm font-medium text-black-tertiary">Select up to 3 features.</p>
									</div>
									<div className="flex flex-wrap gap-3">
										<Tag
											isActive={formik.values.features.some((_el) => _el === "Parking space")}
											text="Parking space"
											onClick={() =>
												formik
													.getFieldHelpers("features")
													.setValue(
														formik.values.features.some((_el) => _el === "Parking space")
															? formik.values.features.filter((_el) => _el !== "Parking space")
															: [...formik.values.features, "Parking space"]
													)
											}
											isDisabled={
												formik.values.features.length === 3 && !formik.values.features.some((_el) => _el === "Parking space")
											}
										/>
										<Tag
											isActive={formik.values.features.some((_el) => _el === "Internet included")}
											text="Internet included"
											onClick={() =>
												formik
													.getFieldHelpers("features")
													.setValue(
														formik.values.features.some((_el) => _el === "Internet included")
															? formik.values.features.filter((_el) => _el !== "Internet included")
															: [...formik.values.features, "Internet included"]
													)
											}
											isDisabled={
												formik.values.features.length === 3 &&
												!formik.values.features.some((_el) => _el === "Internet included")
											}
										/>
										<Tag
											isActive={formik.values.features.some((_el) => _el === "Furnished room")}
											text="Furnished room"
											onClick={() =>
												formik
													.getFieldHelpers("features")
													.setValue(
														formik.values.features.some((_el) => _el === "Furnished room")
															? formik.values.features.filter((_el) => _el !== "Furnished room")
															: [...formik.values.features, "Furnished room"]
													)
											}
											isDisabled={
												formik.values.features.length === 3 && !formik.values.features.some((_el) => _el === "Furnished room")
											}
										/>
										<Tag
											isActive={formik.values.features.some((_el) => _el === "Gated community")}
											text="Gated community"
											onClick={() =>
												formik
													.getFieldHelpers("features")
													.setValue(
														formik.values.features.some((_el) => _el === "Gated community")
															? formik.values.features.filter((_el) => _el !== "Gated community")
															: [...formik.values.features, "Gated community"]
													)
											}
											isDisabled={
												formik.values.features.length === 3 &&
												!formik.values.features.some((_el) => _el === "Gated community")
											}
										/>
										<Tag
											isActive={formik.values.features.some((_el) => _el === "Security cameras")}
											text="Security cameras"
											onClick={() =>
												formik
													.getFieldHelpers("features")
													.setValue(
														formik.values.features.some((_el) => _el === "Security cameras")
															? formik.values.features.filter((_el) => _el !== "Security cameras")
															: [...formik.values.features, "Security cameras"]
													)
											}
											isDisabled={
												formik.values.features.length === 3 &&
												!formik.values.features.some((_el) => _el === "Gated community")
											}
										/>
										<Tag
											isActive={formik.values.features.some((_el) => _el === "Swimming pool")}
											text="Swimming pool"
											onClick={() =>
												formik
													.getFieldHelpers("features")
													.setValue(
														formik.values.features.some((_el) => _el === "Swimming pool")
															? formik.values.features.filter((_el) => _el !== "Swimming pool")
															: [...formik.values.features, "Swimming pool"]
													)
											}
											isDisabled={
												formik.values.features.length === 3 && !formik.values.features.some((_el) => _el === "Swimming pool")
											}
										/>
										<Tag
											isActive={formik.values.features.some((_el) => _el === "Balcony")}
											text="Balcony"
											onClick={() =>
												formik
													.getFieldHelpers("features")
													.setValue(
														formik.values.features.some((_el) => _el === "Balcony")
															? formik.values.features.filter((_el) => _el !== "Balcony")
															: [...formik.values.features, "Balcony"]
													)
											}
											isDisabled={
												formik.values.features.length === 3 && !formik.values.features.some((_el) => _el === "Balcony")
											}
										/>
										<Tag
											isActive={formik.values.features.some((_el) => _el === "Rooftop terrace")}
											text="Rooftop terrace"
											onClick={() =>
												formik
													.getFieldHelpers("features")
													.setValue(
														formik.values.features.some((_el) => _el === "Rooftop terrace")
															? formik.values.features.filter((_el) => _el !== "Rooftop terrace")
															: [...formik.values.features, "Rooftop terrace"]
													)
											}
											isDisabled={
												formik.values.features.length === 3 &&
												!formik.values.features.some((_el) => _el === "Rooftop terrace")
											}
										/>
										<Tag
											isActive={formik.values.features.some((_el) => _el === "Quiet neighborhood")}
											text="Quiet neighborhood"
											onClick={() =>
												formik
													.getFieldHelpers("features")
													.setValue(
														formik.values.features.some((_el) => _el === "Quiet neighborhood")
															? formik.values.features.filter((_el) => _el !== "Quiet neighborhood")
															: [...formik.values.features, "Quiet neighborhood"]
													)
											}
											isDisabled={
												formik.values.features.length === 3 &&
												!formik.values.features.some((_el) => _el === "Quiet neighborhood")
											}
										/>
									</div>
								</div>
							</div>
							<Button
								type="submit"
								buttonType="primary"
								color="blue"
								// isLoading={handleForgotPassword.isLoading}
								isDisabled={formikHasError(formik.errors)}
								fullWidth
								borderFull
							>
								<span>Continue</span>
							</Button>
						</Form>
					);
				}}
			</Formik>
		</>
	);
}

export default CreateAdStageOne;
