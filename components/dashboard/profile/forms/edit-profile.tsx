"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import {useRef, useState} from "react";

import Button from "@/components/general/button/button";
import Dropdown from "@/components/general/dropdown/dropdown";
import FormInput from "@/components/general/inputs/form-input";
import FormTextArea from "@/components/general/text-area/form-text-area";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import ImageCropModal from "../../get-started/modals/image-crop-modal";
import {UpdateProfileForm} from "@/hooks/dashboard/update-profile/update-profile.constants";
import cameraIcon from "@/public/images/dashboard/get-started/upload-camera.svg";
import {religionOptions} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";
import {useSelector} from "react-redux";

interface Props {
	toggle: () => void;
}

function EditProfile(props: Props) {
	const user = useSelector((state: IRootState) => state.init.user);

	const formikRef = useRef<FormikProps<UpdateProfileForm> | null>(null);

	const initialFormState: UpdateProfileForm = {
		firstname: user?.fname || "",
		lastname: user?.lname || "",
		phone: user?.phone || "",
		email: user?.email || "",
		profession: user?.profession || "",
		sex: user?.sex || null,
		age: user?.age || 0,
		religion: user?.religion || null,
		bio: user?.bio || "",
	};

	const formValidation = Yup.object().shape({
		firstname: Yup.string().required("Required"),
		lastname: Yup.string().required("Required"),
		phone: Yup.string().required("Required"),
		email: Yup.string().required("Required"),
		profession: Yup.string().required("Required"),
		sex: Yup.string().required("Required"),
		age: Yup.string().required("Required"),
		religion: Yup.string().required("Required"),
		budget: Yup.array().of(Yup.string().required("Required")).min(3).required("Required"),
		bio: Yup.array().of(Yup.string().required("Required")).min(1).max(5).required("Required"),
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
			<div className="flex h-full w-full">
				<div className="h-fit w-full pb-6">
					<div className="flex h-fit w-full flex-col gap-2 rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
						<div className="flex h-10 flex-row items-start justify-between gap-4">
							<h3 className="text-2xl font-semibold capitalize leading-[100%] text-black">Edit Profile</h3>
							<div className="hidden gap-3 xs:flex">
								<Button type="button" buttonType="secondary" color="grey" size="md" onClick={props.toggle} borderSmall>
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
						<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
							<div className="flex flex-col gap-6 xs:flex-row">
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
										<h5 className="text-left text-base font-medium capitalize leading-[100%] text-black xs:text-lg">
											Your Photo
										</h5>
										<p className="text-left text-sm text-black-tertiary xs:text-base">This will be displayed on your profile</p>
									</div>
									<div className="flex gap-3">
										<Button
											type="button"
											buttonType="secondary"
											color="red"
											size="sm"
											onClick={() => setIsNoProfile(true)}
											borderSmall
										>
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
								onSubmit={(value) => {
									props.toggle();
									// handleForgotPassword.mutate(value)
								}}
								enableReinitialize={true}
								validateOnChange
								validateOnMount
							>
								{(formik) => {
									return (
										<Form className="flex h-fit w-full flex-col items-start justify-start gap-5">
											<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
												<div className="grid w-full auto-rows-min grid-cols-1 gap-5 xs:grid-cols-2 xl:gap-10">
													<FormTextArea label="Your Bio" name="bio" textSize="md" />
												</div>
												<div className="flex h-fit w-full flex-col items-start justify-start gap-5">
													<div className="grid w-full auto-rows-min grid-cols-1 gap-6 xs:grid-cols-2 xl:gap-10">
														<FormInput label="First Name" name="firstname" inputSize="md" />
														<FormInput label="Last Name" name="lastname" inputSize="md" />
													</div>
													<div className="grid w-full auto-rows-min grid-cols-1 gap-6 xs:grid-cols-2 xl:gap-10">
														<FormInput label="Phone Number" name="phone" inputSize="md" />
														<FormInput label="Email Address" name="email" inputSize="md" />
													</div>
													<div className="grid w-full auto-rows-min grid-cols-1 gap-6 xs:grid-cols-2 xl:gap-10">
														<div>
															<Dropdown
																label="Religion"
																value={`${formik.values.religion}`}
																onSelect={(value: string | undefined) =>
																	formik.getFieldHelpers("religion").setValue(value)
																}
																placeholder="Select..."
																size="md"
																options={religionOptions}
															/>
														</div>
														<FormInput label="Profession" name="profession" inputSize="md" />
													</div>
													{/* <div className="grid w-full auto-rows-min grid-cols-1 gap-6 xs:grid-cols-2 xl:gap-10">
														<div>
															<Dropdown
																label="Locations"
																value={`${formik.values.location_1}`}
																onSelect={(value: string | undefined) =>
																	formik.getFieldHelpers("location_1").setValue(value)
																}
																placeholder="Enter location..."
																options={locationOptions.filter((_loc) => _loc.value !== formik.values.location_2)}
																icon={locationIcon}
																size="md"
																noArrow
															/>
														</div>
													</div> */}
												</div>
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
			</div>
		</>
	);
}

export default EditProfile;
