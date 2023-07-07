import {ButtonColor} from "../button/button";
import {ModalMessageType} from "./modals.constants";
import React from "react";
import SimpleModal from "./simple-modal";

export interface ConfirmModalProps {
	active: boolean;
	onClose: () => void;
	isSubmitting: boolean;
	onConfirm: () => void;
	errorMessage: string | undefined;
	header: React.ReactNode;
	children: React.ReactNode;
	confirmColor?: ButtonColor;
}

function ConfirmModal(props: ConfirmModalProps): JSX.Element {
	return (
		<SimpleModal size="xs" headingType={ModalMessageType.WARNING} confirmText="Yes" cancelText="No" onSubmit={props.onConfirm} {...props}>
			{props.children}
		</SimpleModal>
	);
}

export default ConfirmModal;
