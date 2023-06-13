"use client";

import React, {useState} from "react";
import {apartmentTypeOptions, budgetOptions} from "./find-a-home.constant";

import ApartmentItem from "./apartment-item";
import Button from "@/components/general/button/button";
import Dropdown from "@/components/general/dropdown/dropdown";
import Image from "next/image";
import Input from "@/components/general/inputs/input";
import Pagination from "@/components/pagination/pagination";
import pageDivider from "@/public/images/general/page-divider.svg";
import searchBlackIcon from "@/public/images/icons/search-black.svg";
import searchWhiteIcon from "@/public/images/icons/search-white.svg";
import useDimension from "@/helpers/useDimension";

type HomeFilter = {
	location: string;
	apartmentType: number;
	budget: number;
};

function FindAHome() {
	const {width} = useDimension();
	const [homeFilter, setHomeFilter] = useState<HomeFilter>({
		location: "",
		apartmentType: 0,
		budget: 0,
	});

	const handleSetHomeFilter = (_key: string, _value: string | number) => {
		setHomeFilter((prev) => ({
			...prev,
			[_key]: _value,
		}));
	};

	const handleSearch = () => {
		alert("Yup");
	};
	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-between">
			<section className="bg-find-a-home flex h-full min-h-screen w-full items-center justify-center">
				<div className="mx-auto w-full max-w-7xl pb-0 pt-24 md:py-36 md:pb-36 lg:px-16">
					<div className="flex h-full w-full flex-col items-center justify-center gap-24 pt-36 md:gap-12 md:pt-0">
						<div className="mx-auto flex flex-col items-center justify-start gap-6 px-4 2xs:px-8 md:max-w-2xl">
							<p className="text-center text-4xl font-black text-white xs:text-5xl lg:text-6xl">
								Discover the <span className="font-normal italic text-pink-500">Perfect</span> Place to Call Home
							</p>
							<p className="text-center text-base text-white xs:text-lg md:max-w-lg lg:text-xl">
								Finding homes that fit your budgets and requirements is now a breeze.
							</p>
						</div>

						<div className="lg w-full md:px-8">
							<div className="mx-auto flex w-full flex-col gap-6 bg-white px-5 py-6 shadow-md md:max-w-[920px] md:flex-row md:rounded-2xl md:py-4 md:shadow-none">
								<div className="flex w-full flex-col gap-6 divide-y divide-black-quin md:flex-row md:divide-x md:divide-y-0">
									<Input
										label="Location"
										type="text"
										placeholder="Enter Location"
										name="location"
										value={homeFilter.location}
										icon={searchBlackIcon}
										onChange={(value: string) => handleSetHomeFilter("location", value)}
									/>
									<div className="w-full pl-0 pt-6 md:pl-6 md:pt-0">
										<Dropdown
											label="Apartment Type"
											value={homeFilter.apartmentType}
											onSelect={(value: number | undefined) => handleSetHomeFilter("apartmentType", value || 0)}
											placeholder={"All Types"}
											options={apartmentTypeOptions}
										/>
									</div>
									<div className="w-full pl-0 pt-6 md:pl-6 md:pt-0">
										<Dropdown
											label="Budget"
											value={homeFilter.budget}
											onSelect={(value: number | undefined) => handleSetHomeFilter("budget", value || 0)}
											placeholder={"All Prices"}
											options={budgetOptions}
										/>
									</div>
								</div>
								<div className="flex w-full flex-row items-center justify-center md:w-max">
									<Button
										type="button"
										buttonType="primary"
										color="blue"
										size="xl"
										onClick={handleSearch}
										fullHeight={width > 765}
										fullWidth={width < 764}
									>
										<div className="flex w-max flex-row items-center justify-center gap-2 pl-0.5 ">
											<Image src={searchWhiteIcon} alt="right arrow" priority />
											<span className="mt-0.5 text-base font-semibold">Search</span>
										</div>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="relative min-h-screen w-full overflow-hidden">
				<Image className="left-0 top-0 w-screen scale-[1.1]" src={pageDivider} alt="divider with colors" priority />
				<div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-16 2xs:px-8 md:py-36 lg:px-16">
					<div className="grid auto-rows-min grid-cols-1 place-items-center gap-8 2xs:grid-cols-2 md:grid-cols-3 ">
						<ApartmentItem />
						<ApartmentItem />
						<ApartmentItem />
						<ApartmentItem />
						<ApartmentItem />
						<ApartmentItem />
						<ApartmentItem />
						<ApartmentItem />
						<ApartmentItem />
						<ApartmentItem />
						<ApartmentItem />
					</div>
					<Pagination
						offset={0}
						total={100}
						groupSize={20}
						onSelect={(_page, _offset) => {
							return;
						}}
						isLoading={false}
					/>
				</div>
			</section>
			<section></section>
		</main>
	);
}

export default FindAHome;
