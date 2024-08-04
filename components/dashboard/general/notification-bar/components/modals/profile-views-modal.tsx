"use client";

import {Fragment} from "react";
import {IRootState} from "@/redux/rootReducer";
import Modal from "@/components/general/modals/modal";
import ModalBody from "@/components/general/modals/modal-body";
import ModalHeader from "@/components/general/modals/modal-header";
import UserActivity from "../user-activity";
import {useSelector} from "react-redux";

interface Props {
	active: boolean;
	toggler: () => void;
}

function ProfileViewsModal(props: Props) {
	const views = useSelector((state: IRootState) => state.views.views);

	return (
		<>
			<Modal size="lg" active={props.active} toggler={props.toggler}>
				<ModalHeader onClose={props.toggler}>Profile Views</ModalHeader>
				<ModalBody>
					<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
						{views.map((_view, index) => (
							<Fragment key={index}>
								<UserActivity
									name={_view.fullname}
									profileImage={_view.photo}
									time={_view.ViewRegistrationDate}
									isSmall={false}
									isView
								/>
							</Fragment>
						))}
					</div>
				</ModalBody>
			</Modal>
		</>
	);
}

export default ProfileViewsModal;
