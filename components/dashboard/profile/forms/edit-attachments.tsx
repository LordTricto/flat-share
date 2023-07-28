"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import {useLayoutEffect, useRef, useState} from "react";

import Button from "@/components/general/button/button";
import ImageUpload from "@/components/dashboard/general/cards/image-upload/image-upload";
import {StaticImageData} from "next/image";
import {UpdateApartmentDetailsForm} from "@/hooks/dashboard/update-profile/update-profile.constants";
import apartmentFour from "@/public/images/dashboard/profile/apartment-4.png";
import apartmentOne from "@/public/images/dashboard/profile/apartment-1.png";
import apartmentThree from "@/public/images/dashboard/profile/apartment-3.png";
import apartmentTwo from "@/public/images/dashboard/profile/apartment-2.png";

interface Props {
	toggle: () => void;
}

function EditAttachments(props: Props) {
	const formikRef = useRef<FormikProps<UpdateApartmentDetailsForm> | null>(null);

	const initialFormState: UpdateApartmentDetailsForm = {
		apartment_images: [],
		description: "",
	};

	const formValidation = Yup.object().shape({
		description: Yup.string(),
		apartment_images: Yup.array().of(Yup.string().required("Required")).min(3).required("Required"),
	});

	const [selectedTestImages, setSelectedTestImages] = useState<{
		image_1: string | StaticImageData;
		image_2: string | StaticImageData;
		image_3: string | StaticImageData;
		image_4: string | StaticImageData;
		image_5: string | StaticImageData;
		image_6: string | StaticImageData;
	}>({
		image_1: "",
		image_2: "",
		image_3: "",
		image_4: "",
		image_5: "",
		image_6: "",
	});

	useLayoutEffect(() => {
		setSelectedTestImages({
			image_1: apartmentOne,
			image_2: apartmentTwo,
			image_3: apartmentThree,
			image_4: apartmentFour,
			image_5: "",
			image_6: "",
		});
	}, []);

	return (
		<>
			<div className="flex h-full w-full">
				<div className="h-fit w-full pb-6">
					<div className="flex h-fit w-full flex-col gap-9 rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
						<div className="flex flex-row items-start justify-between gap-4">
							<div className="flex w-full flex-col gap-4">
								<h3 className="text-2xl font-semibold capitalize leading-[100%] text-black">Attachment</h3>
								<p className="text-left text-sm text-black-tertiary 2xs:text-base">Update images and description of your</p>
							</div>
							<div className="hidden gap-3 xs:flex">
								<Button type="button" buttonType="secondary" color="grey" size="md" onClick={() => props.toggle()} borderSmall>
									<span>Cancel</span>
								</Button>
								<Button
									type="button"
									buttonType="primary"
									color="black"
									size="md"
									onClick={() => formikRef.current?.submitForm()}
									borderSmall
								>
									<span>Save Changes</span>
								</Button>
							</div>
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
								return (
									<Form className="flex h-fit w-full flex-col items-start justify-start gap-5">
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
										<div className="flex w-full flex-col gap-3 pt-4 xs:hidden">
											<Button type="submit" buttonType="primary" color="black" size="lg" borderSmall fullWidth>
												<span className="text-sm xs:text-base">Save Changes</span>
											</Button>
											<Button
												type="button"
												buttonType="secondary"
												color="grey"
												size="lg"
												onClick={() => props.toggle()}
												borderSmall
												fullWidth
											>
												<span className="text-sm xs:text-base">Cancel</span>
											</Button>
										</div>
									</Form>
								);
							}}
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditAttachments;
