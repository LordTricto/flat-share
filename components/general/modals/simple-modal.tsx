import Modal, {ModalSize} from "./modal";

import Button from "../button/button";
import {ConfirmModalProps} from "./confirm-modal";
import ModalBody from "./modal-body";
import ModalFooter from "./modal-footer";
import ModalHeader from "./modal-header";
import {ModalMessageType} from "./modals.constants";
import React from "react";

// import {ToastType} from "../../../helpers/AppConstants";
// import MessageToasts from "../MessageToasts/MessageToasts";

export interface SimpleModalProps extends Omit<ConfirmModalProps, "onConfirm"> {
	headingType?: ModalMessageType;
	size?: ModalSize;
	confirmText?: string;
	cancelText?: string;
	onSubmit: () => void;
	canSubmit?: boolean;
}

function SimpleModal(props: SimpleModalProps): JSX.Element {
	return (
		<Modal size={props.size ?? "xs"} active={props.active} toggler={props.onClose}>
			<ModalHeader onClose={props.onClose} headingType={props.headingType}>
				{props.header}
			</ModalHeader>

			<form
				className="w-full"
				onSubmit={(e) => {
					e.preventDefault();
					if (props.canSubmit !== false) {
						props.onSubmit();
					}
				}}
			>
				<ModalBody>
					<div className="flex w-full flex-col">
						{/* {props.errorMessage && (
							<div className="w-full pb-2">
								<MessageToasts toastMessage={props.errorMessage} toastType={ToastType.ERROR} />
							</div>
						)} */}
						<div className="flex w-full flex-col items-start justify-start break-words text-sm font-normal">{props.children}</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button type="button" ripple="light" buttonType="secondary" color="grey" onClick={props.onClose}>
						<span className="">{props.cancelText || "Cancel"}</span>
					</Button>
					<Button
						type="submit"
						ripple="light"
						buttonType="primary"
						color={props.confirmColor || "blue"}
						isLoading={props.isSubmitting}
						isDisabled={props.canSubmit === false}
					>
						<span>{props.confirmText || "Submit"}</span>
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}

export default SimpleModal;
