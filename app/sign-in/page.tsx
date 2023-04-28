"use client";

import React, {useState} from "react";

import Button from "@/components/general/button/button";
import Checkbox from "@/components/general/checkbox/checkbox";
import Image from "next/image";
import Input from "@/components/general/inputs/input";
import Link from "next/link";
import logoIcon from "@/public/images/logo.svg";
import pageDivider from "@/public/images/general/page-divider.svg";
import rightArrowIcon from "@/public/images/icons/right-arrow.svg";
import signUpImg from "@/public/images/sign-up/sign-up-1.png";
import {useRouter} from "next/navigation";

type FindFlatmateDetails = {
	email: string;
	password: string;
	isRememberMe: boolean;
};

function Login() {
	const router = useRouter();
	const [loginDetails, setLoginDetails] = useState<FindFlatmateDetails>({
		email: "",
		password: "",
		isRememberMe: false,
	});

	const handleSetLoginDetails = (_key: string, _value: string | boolean) => {
		setLoginDetails((prev) => ({
			...prev,
			[_key]: _value,
		}));
	};

	const handleCreateAccount = () => {
		router.push("/sign-up");
	};

	return (
		<div className="flex flex-col lg:flex-row items-center justify-between max-h-screen w-full">
			<div className="relative hidden lg:flex flex-col justify-start items-center gap-6 h-screen w-full bg-sky-blue pt-10">
				<div className="flex flex-col justify-center items-center gap-12 w-full">
					<Link href="/">
						<div className="flex flex-row justify-center items-center w-max">
							<Image width={32} height={32} priority src={logoIcon} alt="Flat Share logo" />
							<span className="ml-3 mt-0.5 font-semibold text-3xl">FlatShare</span>
						</div>
					</Link>
					<p className="text-center text-black-tertiary text-xl max-w-lg">
						Discover the perfect flatmate or roommate for your shared property with FlatShare. Say goodbye to the stress of living with a
						random person and hello to a harmonious living
					</p>
				</div>
				<div>
					<Image width={511} height={511} priority src={signUpImg} alt="web of people avatars" />
				</div>
				<Image className="absolute bottom-0 left-0 w-full" src={pageDivider} alt="divider with colors" priority />
			</div>
			<div className="max-h-screen h-full w-full overflow-hidden overflow-y-scroll">
				<main className="flex min-h-screen w-full flex-col justify-start items-center">
					<section className="flex flex-col justify-start items-center min-h-screen w-full max-w-7xl mx-auto gap-12 lg:gap-0 px-4 2xs:px-8 lg:px-16 py-10">
						<div className="flex flex-col justify-start items-start gap-16 w-full">
							<div className="flex flex-col justify-start items-start gap-10 w-full">
								<div className="flex flex-col justify-start items-start gap-3 w-full">
									<h2 className="text-2xl text-black font-semibold">Welcome to FlatShare</h2>
									<p className="text-sm text-black-tertiary">Please enter your details to sign in.</p>
								</div>
								<div className="flex flex-col justify-start items-start gap-5 w-full">
									<Input
										label="Email or Phone Number"
										type="text"
										name="email"
										value={loginDetails.email}
										onChange={(value: string) => handleSetLoginDetails("email", value)}
									/>

									<div className="flex flex-col justify-start items-start gap-5 w-full">
										<Input
											label="Password"
											type="password"
											name="password"
											value={loginDetails.password}
											onChange={(value: string) => handleSetLoginDetails("password", value)}
										/>
										<div className="flex flex-row justify-between items-start gap-5 w-full">
											<Checkbox
												text="Remember me"
												id=""
												checked={!!loginDetails.isRememberMe}
												size="sm"
												func={() => handleSetLoginDetails("isRememberMe", !loginDetails.isRememberMe)}
											/>
											<Button type="button" buttonType="tertiary" color="blue" size="md">
												<span className="font-medium text-sm 2xs:text-sm">Forgot your password?</span>
											</Button>
										</div>
									</div>
								</div>
								<Button type="button" buttonType="primary" color="blue" size="md" fullWidth borderFull>
									<div className="flex flex-row items-center w-max gap-1 pl-0.5">
										<span>Continue</span>
										<Image src={rightArrowIcon} alt="right arrow" priority />
									</div>
								</Button>
								<div className="flex flex-row justify-start items-center gap-2">
									<span className="text-sm 2xs:text-base lg:text-lg">Don&apos;t have an account?</span>
									<Button type="button" buttonType="tertiary" color="blue" size="md" func={handleCreateAccount}>
										<span className="font-medium text-sm 2xs:text-base lg:text-lg">Sign up</span>
									</Button>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}

export default Login;
