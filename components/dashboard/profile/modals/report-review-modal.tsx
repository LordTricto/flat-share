"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import {ReportReviewForm, reportReasonOptions} from "@/hooks/dashboard/report-review/report-review.constants";

import Button from "@/components/general/button/button";
import Dropdown from "@/components/general/dropdown/dropdown";
import FormTextArea from "@/components/general/text-area/form-text-area";
import Modal from "@/components/general/modals/modal";
import ModalBody from "@/components/general/modals/modal-body";
import ModalFooter from "@/components/general/modals/modal-footer";
import ModalHeader from "@/components/general/modals/modal-header";
import Review from "@/models/review";
import formikHasError from "@/helpers/formikHasError";
import {useRef} from "react";
import useReportReview from "@/hooks/dashboard/report-review/use-report-review";

interface Props {
	active: boolean;
	reviewId: string;
	toggler: () => void;
	onComplete: (_data: Review[]) => void;
}

function ReportReviewModal(props: Props) {
	const formikRef = useRef<FormikProps<ReportReviewForm> | null>(null);

	const initialFormState: ReportReviewForm = {
		reason: "",
		message: "",
		reported_user_codec: props.reviewId,
	};

	const formValidation = Yup.object().shape({
		reason: Yup.string().required("Required"),
		message: Yup.string(),
		reported_user_codec: Yup.string().required("Required"),
	});

	const {isLoading, mutate} = useReportReview({
		onComplete: props.toggler,
	});

	return (
		<>
			<Modal size="lg" active={props.active} toggler={props.toggler}>
				<ModalHeader onClose={props.toggler}>Report Review</ModalHeader>
				<Formik
					initialValues={initialFormState}
					innerRef={formikRef}
					validationSchema={formValidation}
					onSubmit={(value) => {
						mutate({
							message: value.message,
							reason: value.reason,
							reported_user_codec: props.reviewId,
						});
					}}
					enableReinitialize={true}
					validateOnChange
					validateOnMount
				>
					{(formik) => {
						console.log(formik.values, formik.errors);
						return (
							<Form className="flex w-full flex-col items-start justify-start gap-10">
								<ModalBody>
									<div className="flex w-full flex-col items-start justify-start gap-4">
										<Dropdown
											label="Reason"
											value={`${formik.values.reason}`}
											onSelect={(value: string | undefined) => formik.getFieldHelpers("reason").setValue(value)}
											placeholder="Select..."
											size="md"
											options={reportReasonOptions}
										/>
										<FormTextArea label="Message (Optional)" placeholder="More details" name="message" textSize="md" />
									</div>
								</ModalBody>
								<ModalFooter>
									<div className="flex w-full flex-row space-x-4">
										<Button
											type="button"
											color="grey"
											ripple="light"
											buttonType="secondary"
											onClick={props.toggler}
											fullWidth
											borderFull
										>
											<span>Cancel</span>
										</Button>
										<Button
											type="submit"
											color="blue"
											ripple="light"
											buttonType="primary"
											isDisabled={formikHasError(formik.errors)}
											fullWidth
											borderFull
											isLoading={isLoading}
										>
											<span>Submit</span>
										</Button>
									</div>
								</ModalFooter>
							</Form>
						);
					}}
				</Formik>
			</Modal>
		</>
	);
}

export default ReportReviewModal;
