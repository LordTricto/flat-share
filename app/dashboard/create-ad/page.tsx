"use client";

import * as Yup from "yup";

import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import {CreateAdForm, apartmentTypeOptions, genderOptions, paymentFrequencyOptions} from "@/hooks/dashboard/create-ad/create-ad.constants";
import {Form, Formik, FormikProps} from "formik";
import React, {useRef, useState} from "react";

import Arrow from "@/components/jsx-icons/arrow";
import Button from "@/components/general/button/button";
import Cancel from "@/components/jsx-icons/cancel";
import CircularProgress from "@/components/dashboard/general/circular-progressbar";
import Dropdown from "@/components/general/dropdown/dropdown";
import FormTextArea from "@/components/general/text-area/form-text-area";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import ImageUpload from "@/components/dashboard/general/cards/image-upload/image-upload";
import Input from "@/components/general/inputs/input";
import MoneyInput from "@/components/general/inputs/money-input";
import Tag from "@/components/dashboard/create-ad/tags/tag";
import asideSectionPattern from "@/public/images/dashboard/home/aside-section-pattern.png";
import cameraIcon from "@/public/images/dashboard/general/camera.svg";
import emptyIcon from "@/public/images/dashboard/general/empty-list.svg";
import emptyProfileIcon from "@/public/images/dashboard/general/empty-profile.svg";
import formikHasError from "@/helpers/formikHasError";
import mainSectionPattern from "@/public/images/dashboard/home/main-section-pattern.png";
import {moneyToNumber} from "@/helpers/useMoneyToNumber";
import reloadIcon from "@/public/images/dashboard/general/reload.svg";
import {useSelector} from "react-redux";

function CreateAd() {
	const user = useSelector((state: IRootState) => state.init.user);
	const isAccountCreated = useSelector((state: IRootState) => state.init.isAccountCreated);
	const formikRef = useRef<FormikProps<CreateAdForm> | null>(null);

	const initialFormState: CreateAdForm = {
		apartment_type: "",
		bedrooms: 0,
		toilets: 0,
		bathrooms: 0,
		rent_cost: 0,
		payment_frequency: "",
		split_payment: 0,
		preferred_gender: "",
		house_rules: [],
		interests: [],
		other_features: [],
		apartment_images: [],
		description: "",
	};

	const formValidation = Yup.object().shape({
		apartment_type: Yup.string().required("Required"),
		bedrooms: Yup.number().required("Required"),
		toilets: Yup.number().required("Required"),
		bathrooms: Yup.number().required("Required"),
		rent_cost: Yup.number().required("Required"),
		payment_frequency: Yup.string().required("Required"),
		split_payment: Yup.number().required("Required"),
		preferred_gender: Yup.string().required("Required"),
		house_rules: Yup.array().of(Yup.string().required("Required")).min(3).required("Required"),
		interests: Yup.array().of(Yup.string().required("Required")).min(1).max(5).required("Required"),
		other_features: Yup.array().of(Yup.string().required("Required")).min(1).max(3).required("Required"),
		apartment_images: Yup.array().of(Yup.string().required("Required")).min(3).required("Required"),
		description: Yup.string(),
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [selectedImg, setSelectedImg] = useState("");
	const [selectedTestImages, setSelectedTestImages] = useState({
		image_1: "",
		image_2: "",
		image_3: "",
		image_4: "",
		image_5: "",
		image_6: "",
	});

	const [isActivityEmpty] = useState(true);
	const [isTagActive, setIsTagActive] = useState(true);
	const [number, setNumber] = useState(0);

	const onFileChange = (file: File) => {
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const imagePath = e.target?.result;
				setSelectedImg(imagePath as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const onTargetClick = () => {
		fileInputRef.current && fileInputRef.current.click();
	};

	return (
		<>
			<div className="flex h-full w-full">
				<div className="relative h-full w-full overflow-y-auto">
					<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 px-5 py-6">
						<div className="relative w-full">
							<Image
								className="absolute left-0 top-0 z-0 h-full w-full "
								src={mainSectionPattern}
								alt="main background"
								fill
								// width={112}
								// height={112}
								tabIndex={-1}
							/>
							<div className="z-10 flex flex-col gap-5 px-6 py-5">
								<div className="z-10 flex flex-col gap-3 text-white">
									<h3 className="text-base font-semibold">Welcome to FlatShare</h3>
									<p className="text-xs">Create your apartment ad and complete your account setup.</p>
								</div>
								<Button type="button" buttonType="secondary" color="white" size="sm" borderSmall>
									<span className="text-sm leading-none">Okay, I understand</span>
								</Button>
							</div>
							<div className="absolute right-6 top-5 cursor-pointer text-white">
								<Cancel />
							</div>
						</div>

						<div className="flex h-fit w-full flex-col gap-8 bg-white p-8">
							<div className="flex flex-col items-center justify-center gap-4">
								<div className="flex flex-col items-center justify-center gap-5">
									<span className="text-3xl">🏠</span>
									<h3 className="text-2xl font-bold capitalize leading-[100%] text-black">Create Ad</h3>
								</div>
								<p className="text-center text-base leading-[100%] text-black-tertiary">
									Complete your account by creating an apartment ad.
								</p>
							</div>
							<Formik
								initialValues={initialFormState}
								innerRef={formikRef}
								validationSchema={formValidation}
								onSubmit={(value) => {
									// handleForgotPassword.mutate(value)
								}}
								enableReinitialize={true}
								validateOnChange
								validateOnMount
							>
								{(formik) => {
									console.log(formik);
									return (
										<Form className="flex h-fit w-full flex-col items-start justify-start gap-8">
											<div className="flex flex-col divide-y divide-black-quin [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
												<div className="flex w-full flex-col gap-5">
													<div className="grid w-full grid-cols-2 gap-8">
														<Dropdown
															label="Apartment Type"
															value={formik.values.apartment_type}
															onSelect={(value: string | undefined) =>
																formik.getFieldHelpers("apartment_type").setValue(value)
															}
															size="md"
															options={apartmentTypeOptions}
														/>
														<div className="flex gap-5">
															<Input
																label="Bedrooms"
																type="number"
																name="bedrooms"
																inputSize="md"
																value={formik.values.bedrooms}
																onChange={(value: string) =>
																	formik.getFieldHelpers("bedrooms").setValue(Number(value))
																}
																onUpClick={() => {
																	if (formik.values.bedrooms === 5) {
																		return;
																	}
																	formik.getFieldHelpers("bedrooms").setValue(Number(formik.values.bedrooms) + 1);
																}}
																onDownClick={() => {
																	if (formik.values.bedrooms === 0) {
																		return;
																	}
																	formik.getFieldHelpers("bedrooms").setValue(Number(formik.values.bedrooms) - 1);
																}}
															/>
															<Input
																label="Toilets"
																type="number"
																name="toilets"
																inputSize="md"
																value={formik.values.toilets}
																onChange={(value: string) =>
																	formik.getFieldHelpers("toilets").setValue(Number(value))
																}
																onUpClick={() => {
																	if (formik.values.toilets === 5) {
																		return;
																	}
																	formik.getFieldHelpers("toilets").setValue(Number(formik.values.toilets) + 1);
																}}
																onDownClick={() => {
																	if (formik.values.toilets === 0) {
																		return;
																	}
																	formik.getFieldHelpers("toilets").setValue(Number(formik.values.toilets) - 1);
																}}
															/>
															<Input
																label="Bathrooms"
																type="number"
																name="bathrooms"
																inputSize="md"
																value={formik.values.bathrooms}
																onChange={(value: string) =>
																	formik.getFieldHelpers("bathrooms").setValue(Number(value))
																}
																onUpClick={() => {
																	if (formik.values.bathrooms === 5) {
																		return;
																	}
																	formik.getFieldHelpers("bathrooms").setValue(Number(formik.values.bathrooms) + 1);
																}}
																onDownClick={() => {
																	if (formik.values.bathrooms === 0) {
																		return;
																	}
																	formik.getFieldHelpers("bathrooms").setValue(Number(formik.values.bathrooms) - 1);
																}}
															/>
														</div>
													</div>
													<div className="grid w-full grid-cols-2 gap-8">
														<MoneyInput
															label="Rental Cost"
															name="rental_cost"
															inputSize="md"
															value={String(formik.values.rent_cost)}
															onChange={(_value) =>
																formik.getFieldHelpers("rent_cost").setValue(moneyToNumber(String(_value)))
															}
														/>
														<Dropdown
															label="Payment Frequency"
															value={`${formik.values.payment_frequency}`}
															onSelect={(value: string | undefined) =>
																formik.getFieldHelpers("payment_frequency").setValue(value)
															}
															size="md"
															options={paymentFrequencyOptions}
														/>
													</div>
													<div className="grid w-full grid-cols-2 gap-8">
														<div className="flex flex-col gap-3">
															<div className="flex gap-5">
																<MoneyInput
																	label="Split Payment"
																	name="rental_cost"
																	value={String(formik.values.split_payment)}
																	inputSize="md"
																	onChange={
																		(_value) =>
																			formik
																				.getFieldHelpers("split_payment")
																				.setValue(moneyToNumber(String(_value)))
																		// .setValue(
																		// 	moneyToNumber(String(_value)) >= formik.values.rent_cost
																		// 		? formik.values.split_payment
																		// 		: moneyToNumber(String(_value))
																		// )
																	}
																/>
																<div className="mt-7">
																	<CircularProgress
																		sizeClassName="h-10 w-10"
																		progress={
																			formik.values.rent_cost &&
																			formik.values.split_payment < formik.values.rent_cost
																				? (
																						(formik.values.split_payment / formik.values.rent_cost) *
																						100
																				  ).toFixed()
																				: "0"
																		}
																	/>
																</div>
															</div>
															{formik.values.rent_cost !== 0 &&
																formik.values.split_payment >= formik.values.rent_cost && (
																	<p className="text-xs text-error">
																		Split payment can not be greater or equal to rental cost
																	</p>
																)}
															{(formik.values.rent_cost === 0 ||
																formik.values.split_payment < formik.values.rent_cost) && (
																<p className="text-xs text-grey-quin">Enter the amount you wish to contribute.</p>
															)}
														</div>
														<Dropdown
															label="Preferred Gender"
															value={`${formik.values.preferred_gender}`}
															onSelect={(value: string | undefined) =>
																formik.getFieldHelpers("preferred_gender").setValue(value)
															}
															size="md"
															options={genderOptions}
														/>
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
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "No pets")
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
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "Non-smoker")
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
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "No drugs")
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
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "Respectful noise")
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
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "No drama")
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
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "No parties")
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
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "No kids")
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
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "Cleanliness")
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
																			? formik.values.house_rules.filter(
																					(_el) => _el !== "No illegal activities"
																			  )
																			: [...formik.values.house_rules, "No illegal activities"]
																	)
															}
															// isDisabled={
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "No illegal activities")
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
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "Quiet neighborhood")
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
															// formik.values.other_features.length === 3 &&
															// formik.values.other_features.some((_el) => _el !== "Quiet neighborhood")
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
																formik.values.interests.length === 5 &&
																!formik.values.interests.some((_el) => _el === "Cooking")
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
																formik.values.interests.length === 5 &&
																!formik.values.interests.some((_el) => _el === "Sport")
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
																formik.values.interests.length === 5 &&
																!formik.values.interests.some((_el) => _el === "Music")
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
																formik.values.interests.length === 5 &&
																!formik.values.interests.some((_el) => _el === "Photography")
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
																formik.values.interests.length === 5 &&
																!formik.values.interests.some((_el) => _el === "Gaming")
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
																formik.values.interests.length === 5 &&
																!formik.values.interests.some((_el) => _el === "Movies")
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
																formik.values.interests.length === 5 &&
																!formik.values.interests.some((_el) => _el === "Books")
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
																formik.values.interests.length === 5 &&
																!formik.values.interests.some((_el) => _el === "Health")
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
																formik.values.interests.length === 5 &&
																!formik.values.interests.some((_el) => _el === "Technology")
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
																formik.values.interests.length === 5 &&
																!formik.values.interests.some((_el) => _el === "Anime")
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
															isActive={formik.values.other_features.some((_el) => _el === "Parking space")}
															text="Parking space"
															onClick={() =>
																formik
																	.getFieldHelpers("other_features")
																	.setValue(
																		formik.values.other_features.some((_el) => _el === "Parking space")
																			? formik.values.other_features.filter((_el) => _el !== "Parking space")
																			: [...formik.values.other_features, "Parking space"]
																	)
															}
															isDisabled={
																formik.values.other_features.length === 3 &&
																!formik.values.other_features.some((_el) => _el === "Parking space")
															}
														/>
														<Tag
															isActive={formik.values.other_features.some((_el) => _el === "Internet included")}
															text="Internet included"
															onClick={() =>
																formik
																	.getFieldHelpers("other_features")
																	.setValue(
																		formik.values.other_features.some((_el) => _el === "Internet included")
																			? formik.values.other_features.filter(
																					(_el) => _el !== "Internet included"
																			  )
																			: [...formik.values.other_features, "Internet included"]
																	)
															}
															isDisabled={
																formik.values.other_features.length === 3 &&
																!formik.values.other_features.some((_el) => _el === "Internet included")
															}
														/>
														<Tag
															isActive={formik.values.other_features.some((_el) => _el === "Furnished room")}
															text="Furnished room"
															onClick={() =>
																formik
																	.getFieldHelpers("other_features")
																	.setValue(
																		formik.values.other_features.some((_el) => _el === "Furnished room")
																			? formik.values.other_features.filter((_el) => _el !== "Furnished room")
																			: [...formik.values.other_features, "Furnished room"]
																	)
															}
															isDisabled={
																formik.values.other_features.length === 3 &&
																!formik.values.other_features.some((_el) => _el === "Furnished room")
															}
														/>
														<Tag
															isActive={formik.values.other_features.some((_el) => _el === "Gated community")}
															text="Gated community"
															onClick={() =>
																formik
																	.getFieldHelpers("other_features")
																	.setValue(
																		formik.values.other_features.some((_el) => _el === "Gated community")
																			? formik.values.other_features.filter((_el) => _el !== "Gated community")
																			: [...formik.values.other_features, "Gated community"]
																	)
															}
															isDisabled={
																formik.values.other_features.length === 3 &&
																!formik.values.other_features.some((_el) => _el === "Gated community")
															}
														/>
														<Tag
															isActive={formik.values.other_features.some((_el) => _el === "Security cameras")}
															text="Security cameras"
															onClick={() =>
																formik
																	.getFieldHelpers("other_features")
																	.setValue(
																		formik.values.other_features.some((_el) => _el === "Security cameras")
																			? formik.values.other_features.filter((_el) => _el !== "Security cameras")
																			: [...formik.values.other_features, "Security cameras"]
																	)
															}
															isDisabled={
																formik.values.other_features.length === 3 &&
																!formik.values.other_features.some((_el) => _el === "Gated community")
															}
														/>
														<Tag
															isActive={formik.values.other_features.some((_el) => _el === "Swimming pool")}
															text="Swimming pool"
															onClick={() =>
																formik
																	.getFieldHelpers("other_features")
																	.setValue(
																		formik.values.other_features.some((_el) => _el === "Swimming pool")
																			? formik.values.other_features.filter((_el) => _el !== "Swimming pool")
																			: [...formik.values.other_features, "Swimming pool"]
																	)
															}
															isDisabled={
																formik.values.other_features.length === 3 &&
																!formik.values.other_features.some((_el) => _el === "Swimming pool")
															}
														/>
														<Tag
															isActive={formik.values.other_features.some((_el) => _el === "Balcony")}
															text="Balcony"
															onClick={() =>
																formik
																	.getFieldHelpers("other_features")
																	.setValue(
																		formik.values.other_features.some((_el) => _el === "Balcony")
																			? formik.values.other_features.filter((_el) => _el !== "Balcony")
																			: [...formik.values.other_features, "Balcony"]
																	)
															}
															isDisabled={
																formik.values.other_features.length === 3 &&
																!formik.values.other_features.some((_el) => _el === "Balcony")
															}
														/>
														<Tag
															isActive={formik.values.other_features.some((_el) => _el === "Rooftop terrace")}
															text="Rooftop terrace"
															onClick={() =>
																formik
																	.getFieldHelpers("other_features")
																	.setValue(
																		formik.values.other_features.some((_el) => _el === "Rooftop terrace")
																			? formik.values.other_features.filter((_el) => _el !== "Rooftop terrace")
																			: [...formik.values.other_features, "Rooftop terrace"]
																	)
															}
															isDisabled={
																formik.values.other_features.length === 3 &&
																!formik.values.other_features.some((_el) => _el === "Rooftop terrace")
															}
														/>
														<Tag
															isActive={formik.values.other_features.some((_el) => _el === "Quiet neighborhood")}
															text="Quiet neighborhood"
															onClick={() =>
																formik
																	.getFieldHelpers("other_features")
																	.setValue(
																		formik.values.other_features.some((_el) => _el === "Quiet neighborhood")
																			? formik.values.other_features.filter(
																					(_el) => _el !== "Quiet neighborhood"
																			  )
																			: [...formik.values.other_features, "Quiet neighborhood"]
																	)
															}
															isDisabled={
																formik.values.other_features.length === 3 &&
																!formik.values.other_features.some((_el) => _el === "Quiet neighborhood")
															}
														/>
													</div>
												</div>
												<div className="flex flex-col gap-5">
													<div className="flex flex-col gap-3">
														<h3 className="text-base font-medium leading-[100%] text-black-secondary">Apartment Image</h3>
														<div className="flex flex-row justify-between gap-3">
															<ImageUpload
																handleSelectImage={(_value) => {
																	setSelectedTestImages((prev) => ({...prev, image_1: _value}));
																	formik
																		.getFieldHelpers("apartment_images")
																		.setValue([
																			...Object.values(selectedTestImages).filter((_el) => _el !== ""),
																			_value,
																		]);
																}}
																image={selectedTestImages.image_1}
															/>
															<ImageUpload
																handleSelectImage={(_value) => {
																	setSelectedTestImages((prev) => ({...prev, image_2: _value}));
																	formik
																		.getFieldHelpers("apartment_images")
																		.setValue([
																			...Object.values(selectedTestImages).filter((_el) => _el !== ""),
																			_value,
																		]);
																}}
																image={selectedTestImages.image_2}
															/>
															<ImageUpload
																handleSelectImage={(_value) => {
																	setSelectedTestImages((prev) => ({...prev, image_3: _value}));
																	formik
																		.getFieldHelpers("apartment_images")
																		.setValue([
																			...Object.values(selectedTestImages).filter((_el) => _el !== ""),
																			_value,
																		]);
																}}
																image={selectedTestImages.image_3}
															/>
															<ImageUpload
																handleSelectImage={(_value) => {
																	setSelectedTestImages((prev) => ({...prev, image_4: _value}));
																	formik
																		.getFieldHelpers("apartment_images")
																		.setValue([
																			...Object.values(selectedTestImages).filter((_el) => _el !== ""),
																			_value,
																		]);
																}}
																image={selectedTestImages.image_4}
															/>
															<ImageUpload
																handleSelectImage={(_value) => {
																	setSelectedTestImages((prev) => ({...prev, image_5: _value}));
																	formik
																		.getFieldHelpers("apartment_images")
																		.setValue([
																			...Object.values(selectedTestImages).filter((_el) => _el !== ""),
																			_value,
																		]);
																}}
																image={selectedTestImages.image_5}
															/>
															<ImageUpload
																handleSelectImage={(_value) => {
																	setSelectedTestImages((prev) => ({...prev, image_6: _value}));
																	formik
																		.getFieldHelpers("apartment_images")
																		.setValue([
																			...Object.values(selectedTestImages).filter((_el) => _el !== ""),
																			_value,
																		]);
																}}
																image={selectedTestImages.image_6}
															/>
														</div>
													</div>
													<FormTextArea label="Description (Optional)" name="description" textSize="md" />
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
												<span>Post Ad!</span>
											</Button>
										</Form>
									);
								}}
							</Formik>
						</div>
					</div>
				</div>

				<div className="relative h-full min-w-[280px] overflow-y-auto">
					<div className="absolute left-0 top-0 flex h-fit w-full flex-col gap-[42px] overflow-y-auto border-l border-grey-quat bg-white px-5 py-6">
						<div className="flex h-72 flex-grow flex-col gap-[42px]">
							<h4 className="text-base font-semibold leading-[100%] text-black">Activities</h4>
							<div className="h-full w-full border-b border-grey-secondary">
								{isActivityEmpty ? (
									<>
										<div className="flex w-full flex-col items-center justify-center pt-8">
											<Image priority src={emptyIcon} alt="Empty state" />
											<p className="-mt-2.5 text-xs text-grey-quin">No activities to display</p>
										</div>
									</>
								) : (
									<></>
								)}
							</div>
						</div>
						<div className="flex h-80 flex-grow flex-col gap-[42px]">
							<h4 className="text-base font-semibold leading-[100%] text-black">Recent Messages</h4>
							<div className="h-full w-full border-b border-grey-secondary">
								{isActivityEmpty ? (
									<>
										<div className="flex w-full flex-col items-center justify-center gap-1 pt-8">
											<Image priority src={emptyProfileIcon} alt="Empty state" />
											<p className="text-xs text-grey-quin">No conversation to display</p>
										</div>
									</>
								) : (
									<></>
								)}
							</div>
						</div>
						<div className="relative flex w-full flex-col gap-6 overflow-hidden rounded-[11px] px-6 py-3">
							<Image priority src={asideSectionPattern} className="absolute left-0 top-0 z-0 h-full w-full" alt="Empty state" />
							<h3 className="z-10 max-w-[190px] text-base font-semibold text-white">Unlock more benefits and exclusive features.</h3>
							<Button type="button" buttonType="secondary" color="translucent" size="sm" fullWidth borderFull>
								<div className="flex w-max flex-row items-center justify-center gap-1.5 pl-0.5">
									<span className="text-sm leading-none">Upgrade Account</span>
									<Arrow />
								</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CreateAd;
