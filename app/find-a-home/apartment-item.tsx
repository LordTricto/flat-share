"use client";

import Button from "@/components/general/button/button";
import Image from "next/image";
import React from "react";
import apartmentImg from "@/public/images/find-a-home/apartment-1.png";

function ApartmentItem(): JSX.Element {
	const handleSearch = () => {
		alert("Yup");
	};
	return (
		<div className="flex flex-col justify-start items-start gap-5 p-6 bg-white border border-grey-backdrop rounded-2xl max-w-sm shadow">
			<Image height={200} width={330} src={apartmentImg} alt="apartment" priority />
			<div className="flex flex-col justify-start items-start gap-3 w-full">
				<h4 className="text-base xs:text-lg lg:text-xl font-semibold text-black">Spacious room for rent</h4>
				<p className="text-xs lg:text-sm text-black-quat">Magodo, Lagos State</p>
				<p className="text-sm lg:text-base text-black-tertiary">Cozy furnished room for rent, seeking friendly and tidy roommate.</p>
			</div>
			<div className="flex flex-row justify-between items-center flex-wrap gap-4 w-full">
				<span className="text-base xs:text-lg lg:text-xl font-semibold text-black">₦450,000/m</span>
				<Button type="button" buttonType="tertiary" color="blue" size="lg" func={handleSearch}>
					<span className="text-sm lg:text-base font-semibold">More Info</span>
				</Button>
			</div>
		</div>
	);
}

export default ApartmentItem;
