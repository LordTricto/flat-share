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
			<section className="flex justify-center items-center h-full min-h-screen w-full bg-find-a-home">
				<div className="w-full max-w-7xl mx-auto lg:px-16 pb-0 pt-24 md:pb-36 md:py-36">
					<div className="flex flex-col justify-center items-center h-full w-full gap-24 md:gap-12 pt-36 md:pt-0">
						<div className="flex flex-col justify-start items-center gap-6 md:max-w-2xl mx-auto px-4 2xs:px-8">
							<p className="text-center text-4xl xs:text-5xl lg:text-6xl text-white font-black">
								Discover the <span className="text-pink-500 font-normal italic">Perfect</span> Place to Call Home
							</p>
							<p className="text-center text-base xs:text-lg lg:text-xl text-white md:max-w-lg">
								Finding homes that fit your budgets and requirements is now a breeze.
							</p>
						</div>

						<div className="w-full md:px-8 lg">
							<div className="flex flex-col md:flex-row gap-6 py-6 md:py-4 px-5 w-full shadow-md md:shadow-none md:rounded-2xl bg-white md:max-w-[920px] mx-auto">
								<div className="flex flex-col md:flex-row gap-6 divide-y md:divide-y-0 md:divide-x divide-black-quin w-full">
									<Input
										label="Location"
										type="text"
										placeholder="Enter Location"
										name="location"
										value={homeFilter.location}
										icon={searchBlackIcon}
										onChange={(value: string) => handleSetHomeFilter("location", value)}
									/>
									<div className="pt-6 md:pt-0 pl-0 md:pl-6 w-full">
										<Dropdown
											label="Apartment Type"
											value={homeFilter.apartmentType}
											onSelect={(value: number | undefined) => handleSetHomeFilter("apartmentType", value || 0)}
											placeholder={"All Types"}
											options={apartmentTypeOptions}
										/>
									</div>
									<div className="pt-6 md:pt-0 pl-0 md:pl-6 w-full">
										<Dropdown
											label="Budget"
											value={homeFilter.budget}
											onSelect={(value: number | undefined) => handleSetHomeFilter("budget", value || 0)}
											placeholder={"All Prices"}
											options={budgetOptions}
										/>
									</div>
								</div>
								<div className="flex flex-row justify-center items-center w-full md:w-max">
									<Button
										type="button"
										buttonType="primary"
										color="blue"
										size="xl"
										onClick={handleSearch}
										fullHeight={width > 765}
										fullWidth={width < 764}
									>
										<div className="flex flex-row justify-center items-center w-max gap-2 pl-0.5 ">
											<Image src={searchWhiteIcon} alt="right arrow" priority />
											<span className="mt-0.5 font-semibold text-base">Search</span>
										</div>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="relative min-h-screen w-full overflow-hidden">
				<Image className="top-0 left-0 w-screen scale-[1.1]" src={pageDivider} alt="divider with colors" priority />
				<div className="flex flex-col gap-16 w-full max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16 py-16 md:py-36">
					<div className="grid grid-cols-1 2xs:grid-cols-2 md:grid-cols-3 auto-rows-min place-items-center gap-8 ">
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
