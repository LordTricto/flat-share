"use client";

import Image from "next/image";
import Modal from "@/components/general/modals/modal";
import ModalBody from "@/components/general/modals/modal-body";
import ModalHeader from "@/components/general/modals/modal-header";
import requestAvatarOne from "@/public/images/dashboard/home/request-1.png";

interface Props {
	active: boolean;
	toggler: () => void;
}

function ProfileViewsModal(props: Props) {
	return (
		<>
			<Modal size="lg" active={props.active} toggler={props.toggler}>
				<ModalHeader onClose={props.toggler}>Profile Views</ModalHeader>
				<ModalBody>
					<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
						<div className="flex w-full items-center justify-between gap-4">
							<div className="flex items-center justify-center gap-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
								<Image src={requestAvatarOne} width={42} height={42} alt="main background" tabIndex={-1} />
								<p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold text-black-secondary">
									John Doe <span className="font-normal">viewed your profile</span>
								</p>
							</div>
							<p className="text-xs text-black-tertiary">5 mins ago</p>
						</div>
						<div className="flex w-full items-center justify-between gap-4">
							<div className="flex items-center justify-center gap-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
								<Image src={requestAvatarOne} width={42} height={42} alt="main background" tabIndex={-1} />
								<p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold text-black-secondary">
									John Doe <span className="font-normal">viewed your profile</span>
								</p>
							</div>
							<p className="text-xs text-black-tertiary">5 mins ago</p>
						</div>
						<div className="flex w-full items-center justify-between gap-4">
							<div className="flex items-center justify-center gap-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
								<Image src={requestAvatarOne} width={42} height={42} alt="main background" tabIndex={-1} />
								<p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold text-black-secondary">
									John Doe <span className="font-normal">viewed your profile</span>
								</p>
							</div>
							<p className="text-xs text-black-tertiary">5 mins ago</p>
						</div>
						<div className="flex w-full items-center justify-between gap-4">
							<div className="flex items-center justify-center gap-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
								<Image src={requestAvatarOne} width={42} height={42} alt="main background" tabIndex={-1} />
								<p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold text-black-secondary">
									John Doe <span className="font-normal">viewed your profile</span>
								</p>
							</div>
							<p className="text-xs text-black-tertiary">5 mins ago</p>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</>
	);
}

export default ProfileViewsModal;
