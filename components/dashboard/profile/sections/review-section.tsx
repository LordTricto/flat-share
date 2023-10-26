"use client";

import {useLayoutEffect, useState} from "react";

import Button from "@/components/general/button/button";
import {ClipLoader} from "react-spinners";
import Housemate from "@/models/housemate";
import Image from "next/image";
import Reply from "../cards/reply";
import ReportReviewModal from "../modals/report-review-modal";
import Review from "@/models/review";
import WriteReviewModal from "../modals/write-review-modal";
import empty from "@/public/images/general/empty/empty-users.svg";
import useFetchReviews from "@/hooks/dashboard/fetch-review/use-fetch-review";

interface Props {
	userId?: string;
	isExplore?: boolean;
	selectedHousemate?: Housemate;
}

function ReviewSection(props: Props) {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [reportedReview, setReportedReview] = useState("");
	const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState<boolean>(false);
	const [isReportReviewModalOpen, setIsReportReviewModalOpen] = useState<boolean>(false);

	const {isFetching, refetch} = useFetchReviews({
		id: (props.isExplore ? props.selectedHousemate?.codec : props.userId) || "",
		onComplete: (_data: Review[]) => setReviews(_data),
	});

	useLayoutEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<>
			<ReportReviewModal
				userId={reportedReview || ""}
				active={isReportReviewModalOpen}
				toggler={() => {
					setIsReportReviewModalOpen(false);
				}}
				onComplete={(_data: Review[]) => setReviews(_data)}
			/>
			<WriteReviewModal
				userId={props.selectedHousemate?.codec || ""}
				active={isWriteReviewModalOpen}
				toggler={() => {
					setIsWriteReviewModalOpen(false);
				}}
				onComplete={(_data: Review[]) => setReviews(_data)}
			/>
			<div className="relative flex h-fit w-full flex-col gap-6 overflow-hidden rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
				<div className="z-10 flex w-full flex-col gap-6">
					<div className="flex w-full flex-col items-start justify-between gap-4 2xs:flex-row">
						<p className="text-xl font-semibold text-black">
							Reviews
							{reviews.length > 0 && <span className="font-normal text-black-secondary">({reviews.length} Reviews)</span>}
						</p>
						{props.isExplore && (
							<div className="w-full 2xs:w-max">
								<Button
									type="button"
									buttonType="secondary"
									color="white"
									size="sm"
									onClick={() => setIsWriteReviewModalOpen(true)}
									fullWidth
									borderSmall
								>
									<span className="inline font-semibold text-black-tertiary">Write Review</span>
								</Button>
							</div>
						)}
					</div>
				</div>

				{!isFetching &&
					(reviews.length > 0 ? (
						<div className="flex w-full flex-col divide-y border-t border-grey-secondary pt-8 [&>*:not(:first-child)]:pt-8 [&>*:not(:last-child)]:pb-8">
							{reviews.map((_review, index) => (
								<Reply
									key={index}
									avatar={_review.photo}
									date={_review.ReviewRegistrationDate}
									message={_review.review}
									name={_review.fullname}
									onReport={(_id) => {
										setReportedReview(_id);
										setIsReportReviewModalOpen(true);
									}}
									// likes={_review.}
								/>
							))}
						</div>
					) : (
						<div className="flex w-full flex-col items-center justify-center gap-2 py-20">
							<Image priority src={empty} alt="Flat Share logo" />
							<p className="text-sm text-black-quat">No reviews yet</p>
						</div>
					))}
				{isFetching && reviews.length < 1 && (
					<div className="flex w-full flex-col items-center justify-center gap-2 py-24">
						<ClipLoader color="#465BF1" speedMultiplier={1} loading />
					</div>
				)}
			</div>
		</>
	);
}

export default ReviewSection;
