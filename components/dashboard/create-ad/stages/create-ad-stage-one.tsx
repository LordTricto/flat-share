"use client";

import * as Yup from "yup";

import {Form, Formik} from "formik";
import {
	apartmentTypeOptions,
	featuresOptions,
	houseRulesOptions,
	interestsOptions,
	paymentFrequencyOptions,
} from "@/hooks/dashboard/create-ad/create-ad.constants";
import {useEffect, useRef, useState} from "react";

import {AxiosError} from "axios";
import Button from "@/components/general/button/button";
import CircularProgress from "@/components/dashboard/general/circular-progressbar";
import {CreateAdForm} from "@/hooks/dashboard/create-ad/create-ad.constants";
import Dropdown from "@/components/general/dropdown/dropdown";
import Errorhandler from "@/helpers/useErrorHandler";
import FormInput from "@/components/general/inputs/form-input";
import FormTextArea from "@/components/general/text-area/form-text-area";
import {FormikProps} from "formik";
import ImageUpload from "../../general/cards/image-upload/image-upload";
import Input from "@/components/general/inputs/input";
import MoneyInput from "@/components/general/inputs/money-input";
import Tag from "../tags/tag";
import {createAdImageApi} from "@/hooks/dashboard/create-ad/create-ad-api";
import formikHasError from "@/helpers/formikHasError";
import {moneyToNumber} from "@/helpers/useMoneyToNumber";
import useCreateAd from "@/hooks/dashboard/create-ad/use-create-ad";

interface Props {
	handleNextStage: () => void;
	handleCancel?: () => void;
}
function CreateAdStageOne(props: Props) {
	const {isSuccess, mutate} = useCreateAd();
	const formikRef = useRef<FormikProps<CreateAdForm> | null>(null);

	const initialFormState: CreateAdForm = {
		apartment_type: "",
		rooms_no: 0,
		bathrooms_no: 0,
		toilets_no: 0,
		rent_cost: 0,
		payment_frequency: "",
		rent_contribution: 0,
		house_rules: [],
		interests: [],
		features: [],
		description: "",
		house_city: "",
		house_state: "",
		house_street_address: "",
		monthly_rent_charge: 0,
		apartment_images: ["", "", "", "", "", ""],
	};

	const formValidation = Yup.object().shape({
		apartment_type: Yup.string().required("Required"),
		house_city: Yup.string().required("Required"),
		house_state: Yup.string().required("Required"),
		house_street_address: Yup.string().required("Required"),
		rooms_no: Yup.number().required("Required"),
		bathrooms_no: Yup.number().required("Required"),
		toilets_no: Yup.number().required("Required"),
		rent_cost: Yup.number().required("Required"),
		payment_frequency: Yup.string().required("Required"),
		rent_contribution: Yup.number().required("Required"),
		monthly_rent_charge: Yup.number().required("Required"),
		house_rules: Yup.array().of(Yup.string().required("Required")).min(3).required("Required"),
		interests: Yup.array().of(Yup.string().required("Required")).min(1).max(5).required("Required"),
		features: Yup.array().of(Yup.string().required("Required")).min(1).max(3).required("Required"),
		apartment_images: Yup.array().min(6).of(Yup.string().required("Required")).min(3).required("Required"),
		description: Yup.string(),
	});

	const [isLoading, setIsLoading] = useState(false);

	const [selectedTestImages, setSelectedTestImages] = useState<{
		image_1: {image: string; file: File | null};
		image_2: {image: string; file: File | null};
		image_3: {image: string; file: File | null};
		image_4: {image: string; file: File | null};
		image_5: {image: string; file: File | null};
		image_6: {image: string; file: File | null};
	}>({
		image_1: {image: "", file: null},
		image_2: {image: "", file: null},
		image_3: {image: "", file: null},
		image_4: {image: "", file: null},
		image_5: {image: "", file: null},
		image_6: {image: "", file: null},
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
				onSubmit={async (value) => {
					const uploadList = value.apartment_images.map(async (item, index) => {
						return await createAdImageApi({
							image_id: index + 1,
							property_image: item,
						});
					});

					try {
						setIsLoading(true);
						await Promise.all(uploadList);
						mutate(value);
						setIsLoading(false);
					} catch (error) {
						setIsLoading(false);
						Errorhandler(error as AxiosError);
					}
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
										<div className="grid w-full grid-cols-1 gap-5 2xs:grid-cols-2 2xs:gap-8">
											<Dropdown
												label="Apartment Type"
												value={formik.values.apartment_type}
												onSelect={(value: string | undefined) => formik.getFieldHelpers("apartment_type").setValue(value)}
												size="md"
												options={apartmentTypeOptions}
											/>
											<FormInput
												label="House Street Address"
												name="house_street_address"
												inputSize="md"
												value={String(formik.values.house_street_address)}
												onChange={(_value) => formik.getFieldHelpers("house_street_address").setValue(_value)}
											/>
										</div>
										<div className="grid w-full grid-cols-1 gap-5 2xs:grid-cols-2 2xs:gap-8">
											<FormInput
												label="House City"
												name="house_city"
												inputSize="md"
												value={String(formik.values.house_city)}
												onChange={(_value) => formik.getFieldHelpers("house_city").setValue(_value)}
											/>
											<FormInput
												label="House State"
												name="house_state"
												inputSize="md"
												value={String(formik.values.house_state)}
												onChange={(_value) => formik.getFieldHelpers("house_state").setValue(_value)}
											/>
										</div>

										<div className="flex flex-col gap-5 2xs:flex-row">
											<Input
												label="Bedrooms"
												type="number"
												name="rooms_no"
												inputSize="md"
												max={9}
												min={0}
												value={formik.values.rooms_no}
												onChange={(value: string) => formik.getFieldHelpers("rooms_no").setValue(Number(value))}
												onUpClick={() => {
													if (formik.values.rooms_no === 9) {
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
												max={9}
												min={0}
												onChange={(value: string) => formik.getFieldHelpers("bathrooms_no").setValue(Number(value))}
												onUpClick={() => {
													if (formik.values.bathrooms_no === 9) {
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
												max={9}
												min={0}
												value={formik.values.toilets_no}
												onChange={(value: string) => formik.getFieldHelpers("toilets_no").setValue(Number(value))}
												onUpClick={() => {
													if (formik.values.toilets_no === 9) {
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
											onChange={(_value) => {
												formik.getFieldHelpers("rent_cost").setValue(moneyToNumber(String(_value)));
												if (formik.values.rent_contribution) {
													formik
														.getFieldHelpers("monthly_rent_charge")
														.setValue(formik.values.rent_contribution - moneyToNumber(String(_value)));
												}
											}}
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
													onChange={(_value) => {
														formik.getFieldHelpers("rent_contribution").setValue(moneyToNumber(String(_value)));

														if (formik.values.rent_cost) {
															formik
																.getFieldHelpers("monthly_rent_charge")
																.setValue(formik.values.rent_cost - moneyToNumber(String(_value)));
														}
													}}
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
										<FormTextArea label="Description" name="description" textSize="md" />
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
										{houseRulesOptions
											.map((_) => ({
												text: _,
												value: _,
											}))
											.map((_, _index) => (
												<Tag
													key={`${_.value}-${_index}`}
													isActive={formik.values.house_rules.some((_el) => _el === _.value)}
													text={_.text}
													onClick={() =>
														formik
															.getFieldHelpers("house_rules")
															.setValue(
																formik.values.house_rules.some((_el) => _el === _.value)
																	? formik.values.house_rules.filter((_el) => _el !== _.value)
																	: [...formik.values.house_rules, _.value]
															)
													}
												/>
											))}
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
										{interestsOptions
											.map((_) => ({
												text: _,
												value: _,
											}))
											.map((_, _index) => (
												<Tag
													key={`${_.value}-${_index}`}
													isActive={formik.values.interests.some((_el) => _el === _.value)}
													text={_.text}
													isDisabled={
														formik.values.interests.length === 5 &&
														!formik.values.interests.some((_el) => _el === _.value)
													}
													onClick={() =>
														formik
															.getFieldHelpers("interests")
															.setValue(
																formik.values.interests.some((_el) => _el === _.value)
																	? formik.values.interests.filter((_el) => _el !== _.value)
																	: [...formik.values.interests, _.value]
															)
													}
												/>
											))}
									</div>
								</div>
								<div className="flex flex-col gap-5">
									<div className="flex flex-col gap-3">
										<h3 className="text-base font-medium leading-[100%] text-black-secondary">Other Features</h3>
										<p className="text-sm font-medium text-black-tertiary">Select up to 3 features.</p>
									</div>
									<div className="flex flex-wrap gap-3">
										{featuresOptions
											.map((_) => ({
												text: _,
												value: _,
											}))
											.map((_, _index) => (
												<Tag
													key={`${_.value}-${_index}`}
													isActive={formik.values.features.some((_el) => _el === _.value)}
													text={_.text}
													isDisabled={
														formik.values.features.length === 3 && !formik.values.features.some((_el) => _el === _.value)
													}
													onClick={() =>
														formik
															.getFieldHelpers("features")
															.setValue(
																formik.values.features.some((_el) => _el === _.value)
																	? formik.values.features.filter((_el) => _el !== _.value)
																	: [...formik.values.features, _.value]
															)
													}
												/>
											))}
									</div>
								</div>
								<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
									<div className="flex flex-col gap-5">
										<div className="flex flex-col gap-3">
											<h3 className="text-base font-medium leading-[100%] text-black-secondary">Apartment Image</h3>
											<div className="grid w-full grid-cols-[repeat(auto-fit,minmax(135px,1fr))] gap-4 md:grid-cols-[repeat(auto-fit,minmax(135px,135px))]">
												<ImageUpload
													handleSelectImage={(_value, _file) => {
														setSelectedTestImages((prev) => ({...prev, image_1: {image: _value, file: _file}}));
														formik
															.getFieldHelpers("apartment_images")
															.setValue(formik.values.apartment_images.map((_, i) => (i === 0 ? _value : _)));
														// .setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
													}}
													image={selectedTestImages.image_1.image}
												/>
												<ImageUpload
													handleSelectImage={(_value, _file) => {
														setSelectedTestImages((prev) => ({...prev, image_2: {image: _value, file: _file}}));
														formik
															.getFieldHelpers("apartment_images")
															.setValue(formik.values.apartment_images.map((_, i) => (i === 1 ? _value : _)));

														// formik
														// 	.getFieldHelpers("apartment_images")
														// 	.setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
													}}
													image={selectedTestImages.image_2.image}
												/>
												<ImageUpload
													handleSelectImage={(_value, _file) => {
														setSelectedTestImages((prev) => ({...prev, image_3: {image: _value, file: _file}}));
														formik
															.getFieldHelpers("apartment_images")
															.setValue(formik.values.apartment_images.map((_, i) => (i === 2 ? _value : _)));

														// formik
														// 	.getFieldHelpers("apartment_images")
														// 	.setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
													}}
													image={selectedTestImages.image_3.image}
												/>
												<ImageUpload
													handleSelectImage={(_value, _file) => {
														setSelectedTestImages((prev) => ({...prev, image_4: {image: _value, file: _file}}));
														formik
															.getFieldHelpers("apartment_images")
															.setValue(formik.values.apartment_images.map((_, i) => (i === 3 ? _value : _)));

														// formik
														// 	.getFieldHelpers("apartment_images")
														// 	.setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
													}}
													image={selectedTestImages.image_4.image}
												/>
												<ImageUpload
													handleSelectImage={(_value, _file) => {
														setSelectedTestImages((prev) => ({...prev, image_5: {image: _value, file: _file}}));
														formik
															.getFieldHelpers("apartment_images")
															.setValue(formik.values.apartment_images.map((_, i) => (i === 4 ? _value : _)));

														// formik
														// 	.getFieldHelpers("apartment_images")
														// 	.setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
													}}
													image={selectedTestImages.image_5.image}
												/>
												<ImageUpload
													handleSelectImage={(_value, _file) => {
														setSelectedTestImages((prev) => ({...prev, image_6: {image: _value, file: _file}}));
														formik
															.getFieldHelpers("apartment_images")
															.setValue(formik.values.apartment_images.map((_, i) => (i === 5 ? _value : _)));

														// formik
														// 	.getFieldHelpers("apartment_images")
														// 	.setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
													}}
													image={selectedTestImages.image_6.image}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex w-full flex-col gap-4">
								<Button
									type="submit"
									color="blue"
									buttonType="primary"
									isLoading={isLoading}
									isDisabled={formikHasError(formik.errors)}
									fullWidth
									borderFull
								>
									<span>Post Ad!</span>
								</Button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</>
	);
}

export default CreateAdStageOne;
