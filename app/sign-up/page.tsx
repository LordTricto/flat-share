"use client";

import Button from "@/components/general/button/button";
import Image from "next/image";
import React from "react";
import beAHostImg from "@/public/images/sign-up/be-a-host.png";
import findFlatmateImg from "@/public/images/sign-up/find-flatmate.png";
import {useRouter} from "next/navigation";

function SignUp() {
	const router = useRouter();

	const handleCreateAccount = () => {
		alert("/sign-up");
	};
	const handleGoToFindFlatmate = () => {
		router.push("/find-flatmate");
	};
	const handleGoToBeAHost = () => {
		router.push("/be-a-host");
	};

	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-between">
			<section className="flex flex-col justify-start items-center min-h-screen w-full max-w-7xl mx-auto gap-12 lg:gap-0 px-4 2xs:px-8 lg:px-16 pt-10">
				<div className="flex flex-col justify-start items-start gap-16">
					<h2 className="text-2xl text-black font-semibold">Welcome to FlatShare</h2>
					<div className="flex flex-col justify-start items-start gap-14">
						<div className="flex flex-col justify-start items-start gap-3">
							<h4 className="text-xl text-black font-semibold">How do you intend to use FlatShare?</h4>
							<p className="text-sm text-black-tertiary">
								Personalized experience to meet your requirements. Feel free to modify at any time.
							</p>
						</div>
						<div className="flex flex-col justify-start items-start gap-10 w-full">
							<div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
								<div
									className="flex flex-col justify-center items-center gap-10 py-6 w-full max-w-[215px] rounded-lg border border-grey-tertiary hover:border-blue hover:bg-blue-senary cursor-pointer"
									onClick={handleGoToFindFlatmate}
								>
									<Image width={32} height={32} priority src={findFlatmateImg} alt="Find a flatmate icon" />
									<span className="font-medium text-lg">Find Flatmate</span>
								</div>
								<div
									className="flex flex-col justify-center items-center gap-10 py-6 w-full max-w-[215px] rounded-lg border border-grey-tertiary hover:border-blue hover:bg-blue-senary cursor-pointer"
									onClick={handleGoToBeAHost}
								>
									<Image width={32} height={32} priority src={beAHostImg} alt="Be a host" />
									<span className="font-medium text-lg">Be a host</span>
								</div>
							</div>
							<div className="w-full">
								<Button type="button" buttonType="primary" color="blue" size="md" func={handleCreateAccount} fullWidth borderFull>
									<span>Continue</span>
								</Button>
							</div>
							<div className="flex flex-row justify-start items-center gap-2">
								<span className="text-lg">Already have an account?</span>
								<Button type="button" buttonType="tertiary" color="blue" size="md" func={handleCreateAccount}>
									<span className="font-medium text-lg">Sign in</span>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="relative min-h-screen w-full"></section>
		</main>
	);
}

export default SignUp;
