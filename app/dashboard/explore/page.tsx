"use client";

import {useLayoutEffect, useState} from "react";

import FilterBar from "@/components/dashboard/explore/filter-bar/filter-bar";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import Loading from "./loading";
import UserCard from "@/components/dashboard/home/cards/user-card";
import {UserType} from "@/models/user.constant";
import empty from "@/public/images/general/empty/empty-users.svg";
import filterFunnel from "@/public/images/dashboard/general/filter-funnel.svg";
import useExplore from "@/hooks/dashboard/explore/use-explore";
import {useSelector} from "react-redux";

const Dashboard = () => {
	const {data, error, isLoading, mutate, reset} = useExplore();

	const user = useSelector((state: IRootState) => state.init.user);

	const [isFilterOpen, setIsFilterOpen] = useState(false);

	useLayoutEffect(() => {
		if (user)
			mutate({
				// min_budget: 0,
				// max_budget: 10000000,
				// preferred_first_age_range: 18,
				// preferred_second_age_range: 65,
				location: [],
				// preferred_education: [],
				// preferred_religion: undefined,
				// preferred_sex: undefined,
			});

		return () => {
			reset();
		};
	}, [user, mutate, reset]);

	return (
		<>
			<div className="grid h-full w-full grid-cols-1 lg:grid-cols-[auto,280px]">
				<div className="relative h-full max-h-full w-full overflow-y-auto">
					{isLoading && <Loading />}
					{!error && !isLoading && data && (
						<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 px-4 py-6 xs:px-5">
							<div className="flex h-fit w-full flex-col gap-8 pb-6">
								<div className="flex w-full flex-col gap-4">
									<div className="flex w-full items-center justify-between">
										<h4 className="text-lg font-semibold leading-[100%] text-black-secondary 3xs:text-xl">Explore</h4>
										<p className="hidden text-sm text-black-tertiary lg:block">25 Filter Result</p>
										<div
											className="flex cursor-pointer select-none items-center justify-start gap-2 lg:hidden"
											onClick={() => setIsFilterOpen(true)}
										>
											<Image width={16} height={16} src={filterFunnel} alt="filter funnel" priority />
											<span className="text-sm font-medium text-black-secondary">Filter</span>
										</div>
									</div>
									<div className="w-full text-center lg:hidden">
										<p className="text-sm text-black-tertiary">{data?.meta.total_items} Filter Result</p>
									</div>
									{data?.suggestions?.length > 0 && (
										<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
											{data?.suggestions?.map((_data, _index) => (
												<UserCard
													id={_data.codec || ""}
													key={_index}
													job={_data.profession || ""}
													bio={_data.bio}
													name={_data.fullname}
													budget={_data.budget}
													location={_data.location_1}
													isLocked={true}
													religion={_data.religion}
													profileImage={_data.photo}
													isHost={_data.user_type === UserType.HOST}
													gender={_data.gender}
													views={_data.views}
												/>
											))}
										</div>
									)}
									{data?.suggestions?.length < 1 && (
										<div className="flex w-full flex-col items-center justify-center gap-2 py-20">
											<Image priority src={empty} alt="Flat Share logo" />
											<p className="text-sm text-black-quat">No users found</p>
										</div>
									)}
								</div>
							</div>
						</div>
					)}
				</div>

				<FilterBar
					data={data}
					isActive={isFilterOpen}
					toggle={() => setIsFilterOpen((prev) => !prev)}
					handleUpdate={(_data) => {
						mutate(_data);
					}}
				/>
			</div>
		</>
	);
};

export default Dashboard;
