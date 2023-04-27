"use client";

import React, {useState} from "react";

import Button from "@/components/general/button/button";
import Image from "next/image";
import Input from "@/components/general/inputs/input";
import MoneyInput from "@/components/general/inputs/money-input";
import PasswordHints from "../password-hints";
import addressIcon from "@/public/images/icons/address.svg";
import rightArrowIcon from "@/public/images/icons/right-arrow.svg";
import {useRouter} from "next/navigation";

type FindFlatmateTwoDetails = {
	location1: string;
	location2: string;
	profession: string;
	budget: string;
	password: string;
};

interface Props {
	handleGoToStageOne: () => void;
}

function FindFlatmateStageTwo(props: Props) {
	const router = useRouter();

	const [findFlatmateTwoDetails, setFindFlatmateTwoDetails] = useState<FindFlatmateTwoDetails>({
		location1: "",
		location2: "",
		profession: "",
		budget: "",
		password: "",
	});

	const handleSetFindFlatmateTwoDetails = (_key: string, _value: string) => {
		setFindFlatmateTwoDetails((prev) => ({
			...prev,
			[_key]: _value,
		}));
	};

	const handleCreateAccount = () => {
		alert("/sign-up");
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
							label="Location 1"
							type="text"
							name="location1"
							placeholder="Enter location"
							value={findFlatmateTwoDetails.location1}
							icon={addressIcon}
							onChange={(value: string) => handleSetFindFlatmateTwoDetails("location1", value)}
						/>
						<Input
							label="Location 2"
							type="text"
							name="location2"
							placeholder="Enter location"
							value={findFlatmateTwoDetails.location2}
							icon={addressIcon}
							onChange={(value: string) => handleSetFindFlatmateTwoDetails("location2", value)}
						/>
						<Input
							label="Profession"
							type="text"
							name="profession"
							value={findFlatmateTwoDetails.profession}
							onChange={(value: string) => handleSetFindFlatmateTwoDetails("profession", value)}
						/>
						<MoneyInput
							label="Budget"
							name="budget"
							value={findFlatmateTwoDetails.budget}
							onChange={(value: string) => handleSetFindFlatmateTwoDetails("budget", value)}
						/>
						<Input
							label="Password"
							type="password"
							name="password"
							value={findFlatmateTwoDetails.password}
							onChange={(value: string) => handleSetFindFlatmateTwoDetails("password", value)}
						/>
						<PasswordHints
							password={findFlatmateTwoDetails.password}
							className=" text-xs flex space-x-2 items-center pb-1"
							show={findFlatmateTwoDetails.password.length > 0}
						/>
					</div>
					<div className="flex flex-row justify-between items-start gap-4 w-full">
						<Button type="button" buttonType="secondary" color="grey" size="md" func={props.handleGoToStageOne} fullWidth borderFull>
							<span>Back</span>
						</Button>

						<Button type="button" buttonType="primary" color="blue" size="md" fullWidth borderFull>
							<div className="flex flex-row items-center w-max gap-1 pl-0.5">
								<span>Create Account</span>
								<Image src={rightArrowIcon} alt="right arrow" priority />
							</div>
						</Button>
					</div>
					<div className="flex flex-row justify-start items-center gap-2">
						<span className="text-sm 2xs:text-base lg:text-lg">Already have an account?</span>
						<Button type="button" buttonType="tertiary" color="blue" size="md" func={handleSignIn}>
							<span className="font-medium text-sm 2xs:text-base lg:text-lg">Sign in</span>
						</Button>
					</div>
					<div className="flex flex-row justify-start items-center gap-2 flex-wrap">
						<span className="text-sm 2xs:text-base lg:text-lg">By clicking continuing, you&apos;re agreeing to our</span>

						<div className="inline">
							<Button type="button" buttonType="tertiary" color="blue" size="md">
								<span className="font-medium text-sm 2xs:text-base lg:text-lg">Terms and Privacy Policy.</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default FindFlatmateStageTwo;
