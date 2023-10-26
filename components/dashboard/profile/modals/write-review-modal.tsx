"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";

import Button from "@/components/general/button/button";
import FormTextArea from "@/components/general/text-area/form-text-area";
import Modal from "@/components/general/modals/modal";
import ModalBody from "@/components/general/modals/modal-body";
import ModalFooter from "@/components/general/modals/modal-footer";
import ModalHeader from "@/components/general/modals/modal-header";
import {PublishReviewForm} from "@/hooks/dashboard/publish-review/publish-review.constants";
import Review from "@/models/review";
import formikHasError from "@/helpers/formikHasError";
import usePublishReview from "@/hooks/dashboard/publish-review/use-publish-review";
import {useRef} from "react";

interface Props {
	userId: string;
	active: boolean;
	toggler: () => void;
	onComplete: (_data: Review[]) => void;
}

function WriteReviewModal(props: Props) {
	const formikRef = useRef<FormikProps<PublishReviewForm> | null>(null);

	const initialFormState: PublishReviewForm = {
		review_text: "",
		reviewed_user_codec: "",
	};

	const formValidation = Yup.object().shape({
		review: Yup.string().required("Required"),
	});

	const {isLoading, mutate} = usePublishReview({
		onComplete: props.onComplete,
	});

	return (
		<>
			<Modal size="lg" active={props.active} toggler={props.toggler}>
				<ModalHeader onClose={props.toggler}>Write a Review</ModalHeader>
				<Formik
					initialValues={initialFormState}
					innerRef={formikRef}
					validationSchema={formValidation}
					onSubmit={(value) => {
						mutate({
							review_text: value.review_text,
							reviewed_user_codec: props.userId,
						});
					}}
					enableReinitialize={true}
					validateOnChange
					validateOnMount
				>
					{(formik) => {
						return (
							<Form className="flex w-full flex-col items-start justify-start gap-10">
								<ModalBody>
									<FormTextArea placeholder="Give a review" name="review" />
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

export default WriteReviewModal;
