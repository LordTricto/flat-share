"use client";

import * as Yup from "yup";

import {Form, Formik} from "formik";
import {useRef, useState} from "react";

import Button from "@/components/general/button/button";
import {CreateAdImagesForm} from "@/hooks/dashboard/create-ad/create-ad.constants";
import FormTextArea from "@/components/general/text-area/form-text-area";
import {FormikProps} from "formik";
import ImageUpload from "../../general/cards/image-upload/image-upload";
import {createAdImageApi} from "@/hooks/dashboard/create-ad/create-ad-api";
import formikHasError from "@/helpers/formikHasError";
import useCreateAdImage from "@/hooks/dashboard/create-ad/use-create-ad-image";
import {useMutation} from "@tanstack/react-query";

function CreateAdStageTwo() {
	const formikRef = useRef<FormikProps<{apartment_images: string[]; description: string}> | null>(null);

	const initialFormState: {apartment_images: string[]; description: string} = {
		apartment_images: [],
		description: "",
	};

	const formValidation = Yup.object().shape({
		apartment_images: Yup.array().of(Yup.string().required("Required")).min(3).required("Required"),
		description: Yup.string(),
	});

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

	const {mutateAsync} = useCreateAdImage();

	const handleUpload = async () => {
		const uploadList = Object.values(selectedTestImages)
			.filter((item) => item.image)
			.map((item, index) => {
				return mutateAsync({
					image_id: index,
					property_image: item.image,
				});
			});

		try {
			await Promise.all(uploadList);
			console.log("All images uploaded successfully");
		} catch (error) {
			console.error("One or more uploads failed", error);
		}
	};

	return (
		<>
			<Formik
				initialValues={initialFormState}
				innerRef={formikRef}
				validationSchema={formValidation}
				onSubmit={async (value) => {
					// handleForgotPassword.mutate(value)

					const uploadList = value.apartment_images.map(async (item, index) => {
						return await createAdImageApi({
							image_id: index + 1,
							property_image: item,
						});
					});

					try {
						console.log(uploadList, " ite tried");
						const res = await Promise.all(uploadList);
						console.log("All images uploaded successfully", res);
					} catch (error) {
						console.error("One or more uploads failed", error);
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
								<div className="flex flex-col gap-5">
									<div className="flex flex-col gap-3">
										<h3 className="text-base font-medium leading-[100%] text-black-secondary">Apartment Image</h3>
										<div className="grid w-full grid-cols-[repeat(auto-fit,minmax(135px,1fr))] gap-4 md:grid-cols-[repeat(auto-fit,minmax(135px,135px))]">
											<ImageUpload
												handleSelectImage={(_value, _file) => {
													setSelectedTestImages((prev) => ({...prev, image_1: {image: _value, file: _file}}));
													formik.getFieldHelpers("apartment_images").setValue([...formik.values.apartment_images, _value]);
													// .setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
												}}
												image={selectedTestImages.image_1.image}
											/>
											<ImageUpload
												handleSelectImage={(_value, _file) => {
													setSelectedTestImages((prev) => ({...prev, image_2: {image: _value, file: _file}}));
													formik.getFieldHelpers("apartment_images").setValue([...formik.values.apartment_images, _value]);

													// formik
													// 	.getFieldHelpers("apartment_images")
													// 	.setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
												}}
												image={selectedTestImages.image_2.image}
											/>
											<ImageUpload
												handleSelectImage={(_value, _file) => {
													setSelectedTestImages((prev) => ({...prev, image_3: {image: _value, file: _file}}));
													formik.getFieldHelpers("apartment_images").setValue([...formik.values.apartment_images, _value]);

													// formik
													// 	.getFieldHelpers("apartment_images")
													// 	.setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
												}}
												image={selectedTestImages.image_3.image}
											/>
											<ImageUpload
												handleSelectImage={(_value, _file) => {
													setSelectedTestImages((prev) => ({...prev, image_4: {image: _value, file: _file}}));
													formik.getFieldHelpers("apartment_images").setValue([...formik.values.apartment_images, _value]);

													// formik
													// 	.getFieldHelpers("apartment_images")
													// 	.setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
												}}
												image={selectedTestImages.image_4.image}
											/>
											<ImageUpload
												handleSelectImage={(_value, _file) => {
													setSelectedTestImages((prev) => ({...prev, image_5: {image: _value, file: _file}}));
													formik.getFieldHelpers("apartment_images").setValue([...formik.values.apartment_images, _value]);

													// formik
													// 	.getFieldHelpers("apartment_images")
													// 	.setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
												}}
												image={selectedTestImages.image_5.image}
											/>
											<ImageUpload
												handleSelectImage={(_value, _file) => {
													setSelectedTestImages((prev) => ({...prev, image_6: {image: _value, file: _file}}));
													formik.getFieldHelpers("apartment_images").setValue([...formik.values.apartment_images, _value]);

													// formik
													// 	.getFieldHelpers("apartment_images")
													// 	.setValue([...Object.values(selectedTestImages).filter((_el) => _el.image !== ""), _value]);
												}}
												image={selectedTestImages.image_6.image}
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
