"use client";

import FilterBar from "@/components/dashboard/explore/filter-bar/filter-bar";
import Image from "next/image";
import UserCard from "@/components/dashboard/home/cards/user-card";
import {UserReligion} from "@/models/user.constant";
import filterFunnel from "@/public/images/dashboard/general/filter-funnel.svg";
import {useState} from "react";
import userFour from "@/public/images/dashboard/home/Avatar-4.png";
import userThree from "@/public/images/dashboard/home/Avatar-3.png";

const Dashboard = () => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	return (
		<>
			{/* {(isFetching || !data) && <Loading />} */}
			{/* {!isFetching && data && ( */}
			<div className="grid h-full w-full grid-cols-1 lg:grid-cols-[auto,280px]">
				<div className="relative h-full max-h-full w-full overflow-y-auto">
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
									<p className="text-sm text-black-tertiary">25 Filter Result</p>
								</div>
								<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userThree}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userFour}
										isHost
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<FilterBar isActive={isFilterOpen} toggle={() => setIsFilterOpen((prev) => !prev)} />
			</div>
			{/* )} */}
		</>
	);
};

export default Dashboard;
