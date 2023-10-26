"use client";

import "yup-phone";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import {OtherPersonalDetailsForm, PersonalDetailsForm} from "@/hooks/dashboard/settings/settings.constants";
import {ageOptions, educationOptions, genderOptions, religionOptions} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";

import Button from "@/components/general/button/button";
import Dropdown from "@/components/general/dropdown/dropdown";
import FormInput from "@/components/general/inputs/form-input";
import FormTextArea from "@/components/general/text-area/form-text-area";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import ImageCropModal from "../../get-started/modals/image-crop-modal";
import cameraIcon from "@/public/images/dashboard/get-started/upload-camera.svg";
import formikHasError from "@/helpers/formikHasError";
import {setPersonalInformation} from "@/redux/get-started/get-started";
import useUpdateProfile from "@/hooks/dashboard/update-profile/use-update-profile";

interface Props {
	handleNext: () => void;
}

function PersonalDetails(props: Props) {
	const {mutate, isLoading} = useUpdateProfile(props.handleNext);

	const dispatch = useDispatch();
	const user = useSelector((state: IRootState) => state.init.user);
	const formikRef = useRef<FormikProps<PersonalDetailsForm & OtherPersonalDetailsForm> | null>(null);

	const initialFormState: PersonalDetailsForm & OtherPersonalDetailsForm = {
		email: user?.email || "",
		fname: user?.fname || "",
		lname: user?.lname || "",
		phone: user?.phone || "",
		age: String(user?.age) || "",
		sex: user?.sex || null,
		bio: user?.bio || "",
		religion: user?.religion || null,
		education: user?.education || "",
		profession: user?.profession || "",
	};

	const formValidation = Yup.object().shape({
		email: Yup.string().email().required(),
		fname: Yup.string().required(),
		lname: Yup.string().required(),
		phone: Yup.string().phone().required(),
		age: Yup.string().required(),
		sex: Yup.string().required().nullable(),
		bio: Yup.string().required(),
		religion: Yup.string().required().nullable(),
		education: Yup.string().required(),
		profession: Yup.string().required(),
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [isImageCropModalOpen, setIsImageCropModalOpen] = useState<boolean>(false);
	const [imageToCrop, setImageToCrop] = useState<string>("");
	const [croppedImg, setCroppedImg] = useState<string>("");
	const [isNoProfile, setIsNoProfile] = useState<boolean>(false);

	const onFileChange = (file: File) => {
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const imagePath = e.target?.result;
				setImageToCrop((imagePath as string) || "");
				setIsImageCropModalOpen(true);
			};
			reader.readAsDataURL(file);
		}
	};

	const onTargetClick = () => {
		fileInputRef.current && fileInputRef.current.click();
	};

	return (
		<>
			<ImageCropModal
				active={isImageCropModalOpen}
				img={imageToCrop}
				toggler={() => {
					setIsImageCropModalOpen(false);
				}}
				handleSubmitCroppedImage={(img: string) => {
					setIsNoProfile(false);
					setCroppedImg(img);
				}}
				isSubmitSelf
			/>
			{!isImageCropModalOpen && (
				<input
					type="file"
					ref={fileInputRef}
					className="hidden"
					onChange={(event) => event.target.files && onFileChange(event.target.files[0])}
					accept="image/*"
				/>
			)}
			<div className="flex h-full w-full flex-col">
				<div className="mb-8 flex flex-col gap-6 border-b pb-8 xs:flex-row md:max-w-3xl">
					<div>
						<div className="h-[120px] w-[120px] overflow-hidden rounded-full border border-grey-quat">
							<Image
								src={isNoProfile ? cameraIcon : croppedImg ? croppedImg : user?.profile_photo_path}
								alt="camera"
								width={120}
								height={120}
								tabIndex={-1}
							/>
						</div>
					</div>
					<div className="flex w-full flex-col gap-5">
						<div className="flex w-full flex-col gap-2 xs:gap-0">
							<h5 className="text-left text-base font-medium capitalize leading-[100%] text-black xs:text-lg">Your Photo</h5>
							<p className="text-left text-sm text-black-tertiary xs:text-base">This will be displayed on your profile</p>
						</div>
						<div className="flex gap-3">
							<Button type="button" buttonType="secondary" color="red" size="sm" onClick={() => setIsNoProfile(true)} borderSmall>
								<span className="text-error">Delete</span>
							</Button>
							<Button type="button" buttonType="secondary" color="grey" size="sm" onClick={onTargetClick} borderSmall>
								<span>Update</span>
							</Button>
						</div>
					</div>
				</div>
				<Formik
					initialValues={initialFormState}
					innerRef={formikRef}
					validationSchema={formValidation}
					onSubmit={(values) => {
						dispatch(setPersonalInformation(values));
						mutate(values);
						// formikRef.current?.resetForm();
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
										<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Personal Details</h3>
										<div className="mt-6 flex w-full flex-col items-start justify-start gap-5">
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<FormInput type="text" label="First Name" name="fname" inputSize="md" />
												<FormInput type="text" label="Last Name" name="lname" inputSize="md" />
											</div>
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<FormInput type="text" label="Phone Number" name="phone" inputSize="md" />
												<FormInput type="text" label="Email Address" name="email" inputSize="md" />
											</div>
										</div>
									</div>
									<div className="pt-8">
										<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Other Details</h3>
										<div className="mt-6 flex w-full flex-col items-start justify-start gap-5">
											<FormTextArea label="Bio" name="bio" textSize="md" />
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<FormInput type="text" label="Profession" name="profession" inputSize="md" />
												<Dropdown
													label="Education"
													value={`${formik.values.education}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("education").setValue(value)}
													placeholder="Select..."
													size="md"
													options={educationOptions}
												/>
											</div>
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<Dropdown
													label="Gender"
													value={`${formik.values.sex}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("sex").setValue(value)}
													placeholder="Select..."
													size="md"
													options={genderOptions}
												/>
												<Dropdown
													label="Age"
													value={`${formik.values.age}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("age").setValue(value)}
													placeholder="Select..."
													size="md"
													options={ageOptions}
												/>
											</div>
											<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 md:gap-4">
												<Dropdown
													label="Religion"
													value={`${formik.values.religion}`}
													onSelect={(value: string | undefined) => formik.getFieldHelpers("religion").setValue(value)}
													placeholder="Select..."
													size="md"
													options={religionOptions}
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

export default PersonalDetails;
