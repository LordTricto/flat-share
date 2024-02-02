"use client";

import {IRootState} from "@/redux/rootReducer";
import Modal from "@/components/general/modals/modal";
import ModalBody from "@/components/general/modals/modal-body";
import ModalHeader from "@/components/general/modals/modal-header";
import UserRequest from "@/components/dashboard/home/cards/user-request";
import requestAvatarOne from "@/public/images/dashboard/home/request-1.png";
import {useSelector} from "react-redux";

interface Props {
	active: boolean;
	toggler: () => void;
}

function ManageRequestsModal(props: Props) {
	const housemates = useSelector((state: IRootState) => state.housemates);

	return (
		<>
			<Modal size="lg" active={props.active} toggler={props.toggler}>
				<ModalHeader onClose={props.toggler}>Manage Requests</ModalHeader>
				<ModalBody>
					<div className="flex w-full flex-col gap-10">
						<div className="flex w-full flex-col items-start justify-start gap-4">
							<h3 className="text-xs font-medium uppercase text-black-tertiary">Request received</h3>
							<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
								{housemates.requests.receivedRequest.length > 0 ? (
									housemates.requests.receivedRequest.map((_housemate, index) => (
										<UserRequest
											key={index}
											name={_housemate.fullname}
											profileImage={_housemate.photo}
											isHost={_housemate.isHost}
											isFull
										/>
									))
								) : (
									<p className="text-xs text-black-tertiary">You have received no request.</p>
								)}
							</div>
						</div>
						<div className="flex w-full flex-col items-start justify-start gap-4">
							<h3 className="text-xs font-medium uppercase text-black-tertiary">Request sent</h3>
							<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
								{housemates.requests.sentRequest.length > 0 ? (
									housemates.requests.sentRequest.map((_housemate, index) => (
										<UserRequest
											key={index}
											name={_housemate.fullname}
											profileImage={_housemate.photo}
											isHost={_housemate.isHost}
											isFull
											isPending
										/>
									))
								) : (
									<p className="text-xs text-black-tertiary">You have sent no request.</p>
								)}
							</div>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</>
	);
}

export default ManageRequestsModal;
