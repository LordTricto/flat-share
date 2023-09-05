"use client";

import * as Yup from "yup";

import {Form, Formik} from "formik";
import {useRef, useState} from "react";

import Button from "@/components/general/button/button";
import {CreateAdImagesForm} from "@/hooks/dashboard/create-ad/create-ad.constants";
import FormTextArea from "@/components/general/text-area/form-text-area";
import {FormikProps} from "formik";
import ImageUpload from "../../general/cards/image-upload/image-upload";
import formikHasError from "@/helpers/formikHasError";

function CreateAdStageTwo() {
	const formikRef = useRef<FormikProps<CreateAdImagesForm> | null>(null);

	const initialFormState: CreateAdImagesForm = {
		apartment_images: [],
		description: "",
	};

	const formValidation = Yup.object().shape({
		apartment_images: Yup.array().of(Yup.string().required("Required")).min(3).required("Required"),
		description: Yup.string(),
	});

	const [selectedTestImages, setSelectedTestImages] = useState({
		image_1: "",
		image_2: "",
		image_3: "",
		image_4: "",
		image_5: "",
		image_6: "",
	});

	return (
		<>
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
					return (
						<Form className="flex h-fit w-full flex-col items-start justify-start gap-8">
							<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
								<div className="flex flex-col gap-5">
									<div className="flex flex-col gap-3">
										<h3 className="text-base font-medium leading-[100%] text-black-secondary">Apartment Image</h3>
										<div className="grid w-full grid-cols-[repeat(auto-fit,minmax(135px,1fr))] gap-4 md:grid-cols-[repeat(auto-fit,minmax(135px,135px))]">
											<ImageUpload
												handleSelectImage={(_value) => {
													setSelectedTestImages((prev) => ({...prev, image_1: _value}));
													formik
														.getFieldHelpers("apartment_images")
														.setValue([...Object.values(selectedTestImages).filter((_el) => _el !== ""), _value]);
												}}
												image={selectedTestImages.image_1}
											/>
											<ImageUpload
												handleSelectImage={(_value) => {
													setSelectedTestImages((prev) => ({...prev, image_2: _value}));
													formik
														.getFieldHelpers("apartment_images")
														.setValue([...Object.values(selectedTestImages).filter((_el) => _el !== ""), _value]);
												}}
												image={selectedTestImages.image_2}
											/>
											<ImageUpload
												handleSelectImage={(_value) => {
													setSelectedTestImages((prev) => ({...prev, image_3: _value}));
													formik
														.getFieldHelpers("apartment_images")
														.setValue([...Object.values(selectedTestImages).filter((_el) => _el !== ""), _value]);
												}}
												image={selectedTestImages.image_3}
											/>
											<ImageUpload
												handleSelectImage={(_value) => {
													setSelectedTestImages((prev) => ({...prev, image_4: _value}));
													formik
														.getFieldHelpers("apartment_images")
														.setValue([...Object.values(selectedTestImages).filter((_el) => _el !== ""), _value]);
												}}
												image={selectedTestImages.image_4}
											/>
											<ImageUpload
												handleSelectImage={(_value) => {
													setSelectedTestImages((prev) => ({...prev, image_5: _value}));
													formik
														.getFieldHelpers("apartment_images")
														.setValue([...Object.values(selectedTestImages).filter((_el) => _el !== ""), _value]);
												}}
												image={selectedTestImages.image_5}
											/>
											<ImageUpload
												handleSelectImage={(_value) => {
													setSelectedTestImages((prev) => ({...prev, image_6: _value}));
													formik
														.getFieldHelpers("apartment_images")
														.setValue([...Object.values(selectedTestImages).filter((_el) => _el !== ""), _value]);
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
		</>
	);
}

export default CreateAdStageTwo;
