"use client";

import HostTag from "@/components/dashboard/home/tags/host-tag";
import Image from "next/image";
import Modal from "@/components/general/modals/modal";
import ModalBody from "@/components/general/modals/modal-body";
import ModalHeader from "@/components/general/modals/modal-header";
import UserRequest from "@/components/dashboard/home/cards/user-request";
import requestAvatarOne from "@/public/images/dashboard/home/request-1.png";

interface Props {
	active: boolean;
	toggler: () => void;
}

function ManageRequestsModal(props: Props) {
	return (
		<>
			<Modal size="lg" active={props.active} toggler={props.toggler}>
				<ModalHeader onClose={props.toggler}>Manage Requests</ModalHeader>
				<ModalBody>
					<div className="flex w-full flex-col gap-10">
						<div className="flex w-full flex-col items-start justify-start gap-4">
							<h3 className="text-xs font-medium uppercase text-black-tertiary">Request received</h3>
							<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
								<UserRequest name="John Doe" profileImage={requestAvatarOne} isFull isHost />
								<UserRequest name="Tiana Culhane dfsdfadfasdfadsfadsfsdf" profileImage={requestAvatarOne} isFull />
								<UserRequest name="John Doe" profileImage={requestAvatarOne} isFull />
								<UserRequest name="Tiana Culhane" profileImage={requestAvatarOne} isFull isHost />
							</div>
						</div>
						<div className="flex w-full flex-col items-start justify-start gap-4">
							<h3 className="text-xs font-medium uppercase text-black-tertiary">Request sent</h3>
							<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
								<UserRequest name="John Doe" profileImage={requestAvatarOne} isFull isHost isPending />
								<UserRequest name="Tiana Culhane" profileImage={requestAvatarOne} isFull isPending />
								<UserRequest name="John Doe" profileImage={requestAvatarOne} isFull isPending />
								<UserRequest name="Tiana Culhane" profileImage={requestAvatarOne} isFull isHost isPending />
							</div>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</>
	);
}

export default ManageRequestsModal;
