"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";

import Button from "@/components/general/button/button";
import FormTextArea from "@/components/general/text-area/form-text-area";
import Modal from "@/components/general/modals/modal";
import ModalBody from "@/components/general/modals/modal-body";
import ModalFooter from "@/components/general/modals/modal-footer";
import ModalHeader from "@/components/general/modals/modal-header";
import formikHasError from "@/helpers/formikHasError";
import {useRef} from "react";

interface Props {
	userId: string;
	active: boolean;
	toggler: () => void;
	// onComplete: (_data: Review[]) => void;
}

type SendMessageForm = {
	message: string;
	user_codec: string;
};

function SendMessageModal(props: Props) {
	const formikRef = useRef<FormikProps<SendMessageForm> | null>(null);

	const initialFormState: SendMessageForm = {
		message: "",
		user_codec: "",
	};

	const formValidation = Yup.object().shape({
		message: Yup.string().required("Required"),
	});

	// const {isLoading, mutate} = usePublishReview({
	// 	onComplete: props.onComplete,
	// });

	return (
		<>
			<Modal size="lg" active={props.active} toggler={props.toggler}>
				<ModalHeader onClose={props.toggler}>Send a Message</ModalHeader>
				<Formik
					initialValues={initialFormState}
					innerRef={formikRef}
					validationSchema={formValidation}
					onSubmit={() => {
						// mutate({
						// 	review_text: value.review_text,
						// 	reviewed_user_codec: props.userId,
						// });
					}}
					enableReinitialize={true}
					validateOnChange
					validateOnMount
				>
					{(formik) => {
						return (
							<Form className="flex w-full flex-col items-start justify-start gap-10">
								<ModalBody>
									<FormTextArea placeholder="Say Hello" name="message" />
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
											// isLoading={isLoading}
										>
											<span>Send Message</span>
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

export default SendMessageModal;
