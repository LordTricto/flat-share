"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
import {useEffect, useRef} from "react";

import Button from "@/components/general/button/button";
import FormTextArea from "@/components/general/text-area/form-text-area";
import Modal from "@/components/general/modals/modal";
import ModalBody from "@/components/general/modals/modal-body";
import ModalFooter from "@/components/general/modals/modal-footer";
import ModalHeader from "@/components/general/modals/modal-header";
import {SendChatForm} from "@/hooks/dashboard/chat/chat-api.constants";
import formikHasError from "@/helpers/formikHasError";
import useSendChat from "@/hooks/dashboard/chat/use-send-chat";

interface Props {
	userId: string;
	active: boolean;
	toggler: () => void;
}

function SendMessageModal(props: Props) {
	const formikRef = useRef<FormikProps<SendChatForm> | null>(null);

	const {isLoading, mutate} = useSendChat({
		onComplete: props.toggler,
	});

	const initialFormState: SendChatForm = {
		id: "",
		message: "",
	};

	const formValidation = Yup.object().shape({
		id: Yup.string().required("Required"),
		message: Yup.string().required("Required"),
	});

	useEffect(() => {
		if (props.active) {
			formikRef.current?.setFieldValue("id", props.userId);
		}
	}, [props.active, props.userId]);

	return (
		<>
			<Modal size="lg" active={props.active} toggler={props.toggler}>
				<ModalHeader onClose={props.toggler}>Send a Message</ModalHeader>
				<Formik
					initialValues={initialFormState}
					innerRef={formikRef}
					validationSchema={formValidation}
					onSubmit={(values) => {
						mutate({
							id: values.id,
							message: values.message,
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
											isLoading={isLoading}
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
