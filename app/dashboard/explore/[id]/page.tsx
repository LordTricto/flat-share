"use client";

import React, {useEffect, useState} from "react";

import Button from "@/components/general/button/button";
import ChevronArrow from "@/components/jsx-icons/chevron-arrow";
import DetailsSection from "@/components/dashboard/profile/sections/details-section";
import Housemate from "@/models/housemate";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import InterestSection from "@/components/dashboard/profile/sections/interest-section";
import Link from "next/link";
import Loading from "../loading";
import ReportHousemateModal from "@/components/dashboard/profile/modals/report-housemate-modal";
import ReviewSection from "@/components/dashboard/profile/sections/review-section";
import reportIcon from "@/public/images/dashboard/profile/report.svg";
import {useSelector} from "react-redux";

interface Props {
	params: {
		id: string;
	};
}

const UserProfile = (props: Props) => {
	const user = useSelector((state: IRootState) => state.init.user);
	const filter = useSelector((state: IRootState) => state.init.filter);
	const housemates = useSelector((state: IRootState) => state.housemates.housemates);

	const [selectedHousemate, setSelectedHousemate] = useState<Housemate | null>(null);
	const [isReportReviewModalOpen, setIsReportReviewModalOpen] = useState<boolean>(false);

	useEffect(() => {
		const _selectedHousemate = housemates.get(props.params.id);
		if (_selectedHousemate) setSelectedHousemate(_selectedHousemate);
	}, [housemates, props.params.id]);

	return (
		<>
			{selectedHousemate ? (
				<>
					<ReportHousemateModal
						userId={selectedHousemate.codec || ""}
						active={isReportReviewModalOpen}
						toggler={() => {
							setIsReportReviewModalOpen(false);
						}}
					/>
					<div className="flex h-full w-full flex-col gap-6 px-5 pb-8 pt-6">
						<div className="flex w-full items-center justify-between gap-1">
							<div className="flex items-center justify-start gap-1">
								<span className="flex cursor-pointer items-center justify-start gap-1">
									<Link href="/dashboard/explore">
										<span className="text-black-tertiary">Explore</span>
									</Link>
									<ChevronArrow className="select-none" />
								</span>
								<span className="select-none capitalize text-black-secondary">{selectedHousemate.fullname}</span>
							</div>
							<Button type="button" buttonType="tertiary" color="blue" size="md" onClick={() => setIsReportReviewModalOpen(true)}>
								<div className="flex items-center justify-start gap-1.5">
									<Image src={reportIcon} alt="camera" width={18} height={18} />
									<span className="text-sm text-black-tertiary">Report</span>
								</div>
							</Button>
						</div>
						{selectedHousemate && user && (
							<div className="flex h-full w-full">
								<div className="flex h-fit w-full flex-col gap-8 pb-6">
									<DetailsSection
										user={user}
										filter={filter}
										isExplore
										canMessage
										canSendRequest
										userId={selectedHousemate.codec || ""}
									/>
									<InterestSection isExplore />
									<ReviewSection selectedHousemate={selectedHousemate} userId={user.codec || ""} />
								</div>
							</div>
						)}
					</div>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default UserProfile;
