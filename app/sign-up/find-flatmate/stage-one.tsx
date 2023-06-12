"use client";

import React, {useState} from "react";
import {apartmentTypeOptions, religionOptions} from "./find-flatmate.constant";

import Button from "@/components/general/button/button";
import DateInput from "@/components/general/inputs/date-input";
import Dropdown from "@/components/general/dropdown/dropdown";
import Input from "@/components/general/inputs/input";
import {useRouter} from "next/navigation";

type FindFlatmateDetails = {
	fullName: string;
	emailAddress: string;
	phoneNumber: string;
	gender: number;
	religion: number;
	dob: Date | null;
	apartmentType: number;
};

interface Props {
	handleGoToStageTwo: () => void;
}

function FindFlatmateStageOne(props: Props) {
	const router = useRouter();

	const [findFlatmateDetails, setFindFlatmateDetails] = useState<FindFlatmateDetails>({
		fullName: "",
		emailAddress: "",
		phoneNumber: "",
		gender: 0,
		religion: 0,
		dob: null,
		apartmentType: 0,
	});

	const handleSetFindFlatmateDetails = (_key: string, _value: string | number | Date) => {
		setFindFlatmateDetails((prev) => ({
			...prev,
			[_key]: _value,
		}));
	};

	const handleSignIn = () => {
		router.push("/sign-in");
	};

	return (
		<>
			<div className="flex flex-col justify-start items-start gap-16 w-full">
				<div className="flex flex-col justify-start items-start gap-10 w-full">
					<div className="flex flex-col justify-start items-start gap-3 w-full">
						<h2 className="text-2xl text-black font-semibold">Welcome to FlatShare</h2>
						<p className="text-sm text-black-tertiary">Please enter your details to sign in.</p>
					</div>
					<div className="flex flex-col justify-start items-start gap-5 w-full">
						<Input
							label="Full Name"
							type="text"
							name="fullName"
							value={findFlatmateDetails.fullName}
							onChange={(value: string) => handleSetFindFlatmateDetails("fullName", value)}
						/>
						<Input
							label="Email Address"
							type="text"
							name="email"
							value={findFlatmateDetails.emailAddress}
							onChange={(value: string) => handleSetFindFlatmateDetails("emailAddress", value)}
						/>
						<Input
							label="Phone Number"
							type="text"
							name="phoneNumber"
							value={findFlatmateDetails.phoneNumber}
							onChange={(value: string) => handleSetFindFlatmateDetails("phoneNumber", value)}
						/>
						<div className="grid grid-cols-1 xs:grid-cols-2 auto-rows-min gap-5 md:gap-4 w-full">
							<Dropdown
								label="Gender"
								value={findFlatmateDetails.gender}
								onSelect={(value: number | undefined) => handleSetFindFlatmateDetails("gender", value || 0)}
								placeholder="Select Gender"
								options={apartmentTypeOptions}
							/>
							<Dropdown
								label="Religion"
								value={findFlatmateDetails.religion}
								onSelect={(value: number | undefined) => handleSetFindFlatmateDetails("religion", value || 0)}
								placeholder="Select Religion"
								options={religionOptions}
							/>
						</div>
						<div className="grid grid-cols-1 xs:grid-cols-2 auto-rows-min gap-5 md:gap-4 w-full">
							<DateInput
								date={findFlatmateDetails.dob}
								label="Date of Birth"
								handleSetDate={(value) => handleSetFindFlatmateDetails("dob", value)}
								placeholder="yyyy/mm/dd"
							/>
							<Dropdown
								label="Apartment Type"
								value={findFlatmateDetails.apartmentType}
								onSelect={(value: number | undefined) => handleSetFindFlatmateDetails("apartmentType", value || 0)}
								placeholder={"All Types"}
								options={apartmentTypeOptions}
							/>
						</div>
					</div>
					<Button type="button" buttonType="primary" color="blue" size="md" onClick={props.handleGoToStageTwo} fullWidth borderFull>
						<span>Continue</span>
					</Button>
					<div className="flex flex-row justify-start items-center gap-2">
						<span className="text-sm 2xs:text-base lg:text-lg">Already have an account?</span>
						<Button type="button" buttonType="tertiary" color="blue" size="md" onClick={handleSignIn}>
							<span className="font-medium text-sm 2xs:text-base lg:text-lg">Sign in</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default FindFlatmateStageOne;
