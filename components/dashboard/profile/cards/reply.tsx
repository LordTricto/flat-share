"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import Image, {StaticImageData} from "next/image";
import {useRef, useState} from "react";

import Button from "@/components/general/button/button";
import FormTextArea from "@/components/general/text-area/form-text-area";
import formikHasError from "@/helpers/formikHasError";
import reportIcon from "@/public/images/dashboard/profile/report.svg";

type ReviewForm = {
	review: string;
};

interface Props {
	name: string;
	date: string;
	avatar: StaticImageData | string;
	message: string;
	onReport: (_id: string) => void;
	// likes: number;
}

function Reply(props: Props) {
	const formikRef = useRef<FormikProps<ReviewForm> | null>(null);

	const initialFormState: ReviewForm = {
		review: "",
	};

	const formValidation = Yup.object().shape({
		review: Yup.string().required(),
	});

	const [isReplying, setIsReplying] = useState<boolean>(false);

	return (
		<>
			<div className="flex w-full items-start justify-start gap-5">
				<Image className="rounded-md" src={props.avatar} alt="camera" width={40} height={40} tabIndex={-1} />

				<div className="flex w-full flex-col items-start justify-start gap-4">
					<div className="flex items-center justify-start gap-3">
						<h6 className="text-base font-semibold">{props.name}</h6>
						<p className="text-sm text-black-secondary">{props.date}</p>
					</div>
					<p className="text-base text-black-tertiary">{props.message}</p>
					<div className="flex w-full items-center justify-end gap-6">
						{/* <div className="flex w-full items-center justify-between gap-6"> */}
						<div className="flex items-center justify-start gap-6">
							{/* <div className="flex items-center justify-start gap-1.5">
								<Image src={likesIcon} alt="camera" width={18} height={18} />
								<span className="select-none text-sm text-black-tertiary">{props.likes}</span>
							</div> */}
							<Button type="button" buttonType="tertiary" color="blue" size="md" onClick={() => props.onReport(props.name)}>
								<div className="flex items-center justify-start gap-1.5">
									<Image src={reportIcon} alt="camera" width={18} height={18} />
									<span className="text-sm text-black-tertiary">Report</span>
								</div>
							</Button>
						</div>
						{/* {!isReplying && (
							<Button type="button" buttonType="tertiary" color="blue" size="md" onClick={() => setIsReplying(true)}>
								<div className="flex items-center justify-start gap-1.5">
									<Image src={replyIcon} alt="camera" width={18} height={18} />
									<span className="text-sm font-medium text-blue">Reply</span>
								</div>
							</Button>
						)} */}
					</div>
					{isReplying && (
						<Formik
							initialValues={initialFormState}
							innerRef={formikRef}
							validationSchema={formValidation}
							onSubmit={(value) => {
								console.log(value);
							}}
							enableReinitialize={true}
							validateOnChange
							validateOnMount
						>
							{(formik) => {
								return (
									<Form className="flex w-full flex-col items-start justify-start gap-10">
										<div className="flex w-full flex-col items-start justify-start gap-5">
											<FormTextArea
												name="review"
												isReply
												isReplyDisabled={formikHasError(formik.errors)}
												handleResetReply={() => setIsReplying(false)}
											/>
										</div>
									</Form>
								);
							}}
						</Formik>
					)}
					{/* <YourReply
						date="Sept 4th, 2023"
						likes={2}
						message="I recently worked with Aspen Saris, and I couldn't be happier. Aspen is incredibly knowledgeable, responsive, and honest. He helped me find my dream investment and made the process smooth and stress-free. Highly recommend!"
					/> */}
				</div>
			</div>
		</>
	);
}

export default Reply;
