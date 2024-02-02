"use client";

import {Fragment, useEffect, useState} from "react";

import Button from "@/components/general/button/button";
import {ClipLoader} from "react-spinners";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import UserActivity from "./user-activity";
import emptyIcon from "@/public/images/dashboard/general/empty-list.svg";
import {useSelector} from "react-redux";
import useViews from "@/hooks/dashboard/views/use-views";

interface Props {
	onViewAllViews: () => void;
}

function Views(props: Props) {
	const {isFetching, refetch, remove} = useViews();

	const views = useSelector((state: IRootState) => state.views.views);

	useEffect(() => {
		refetch();
		return () => {
			remove();
		};
	}, [refetch, remove]);

	return (
		<>
			<div className={"flex h-full flex-grow flex-col gap-[42px] " + `${views.length < 1 ? "max-h-72" : ""}`}>
				<div className="flex w-full items-center justify-between">
					<h4 className="text-base font-semibold leading-[100%] text-black">Views</h4>
					{views.length > 3 && (
						<Button type="button" buttonType="tertiary" color="blue" size="xs" onClick={props.onViewAllViews}>
							<span className="uppercase">view all</span>
						</Button>
					)}
				</div>
				{isFetching ? (
					<div className="flex h-full w-full items-center justify-center">
						<ClipLoader color="#465BF1" speedMultiplier={1} loading />
					</div>
				) : (
					<div className="h-full w-full border-b border-grey-secondary">
						{views.length < 1 ? (
							<div className="flex w-full flex-col items-center justify-center pt-8">
								<Image priority src={emptyIcon} alt="Empty state" />
								<p className="-mt-2.5 text-xs text-grey-quin">No activities to display</p>
							</div>
						) : (
							<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-3 [&>*]:pb-3">
								{views.map((_view, index) => (
									<Fragment key={index}>
										<UserActivity name={_view.fullname} profileImage={_view.photo} time={_view.ViewRegistrationDate} isView />
									</Fragment>
								))}
								{/* <UserActivity
								name="John Doe"
								profileImage={requestAvatarOne}
								time="10 mins"
								isLike={false}
								comment="Please follow back and check your DM."
							/> */}
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default Views;
