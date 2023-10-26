"use client";

import DetailsSection from "@/components/dashboard/profile/sections/details-section";
import {IRootState} from "@/redux/rootReducer";
import InterestSection from "@/components/dashboard/profile/sections/interest-section";
import ReviewSection from "@/components/dashboard/profile/sections/review-section";
import {useSelector} from "react-redux";

function Profile() {
	const user = useSelector((state: IRootState) => state.init.user);
	const filter = useSelector((state: IRootState) => state.init.filter);

	return (
		<>
			<div className="flex h-full w-full flex-col gap-8 px-5 pb-8 pt-6">
				{user && (
					<div className="flex h-full w-full">
						<div className="flex h-fit w-full flex-col gap-8 pb-6">
							<DetailsSection user={user} filter={filter} />
							<ReviewSection userId={user.codec || ""} />
							<InterestSection />
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Profile;
