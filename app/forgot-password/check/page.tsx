"use client";

import Arrow from "@/components/jsx-icons/arrow";
import Button from "@/components/general/button/button";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import Link from "next/link";
import receiveEmail from "@/public/images/reset-password/Receiving a letter or email.png";
// import Checkbox from "@/components/general/checkbox/checkbox";
import useForgotPassword from "@/hooks/forgot-password/use-forgot-password";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";

function ForgotPassword() {
	const router = useRouter();
	const handleForgotPassword = useForgotPassword();

	const forgotPasswordEmail = useSelector((state: IRootState) => state.forgotPassword.email);

	const handleResendEmail = () => {
		handleForgotPassword.mutate({email: forgotPasswordEmail});
	};

	const handleSignIn = () => {
		router.push("/sign-in");
	};

	return (
		<>
			<section className="mx-auto flex w-full max-w-7xl flex-grow flex-col items-center justify-start gap-12 px-4 py-10 2xs:px-8 lg:gap-0 lg:px-16">
				<div className="flex w-full flex-col items-start justify-start gap-16">
					<div className="flex w-full flex-col items-start justify-start gap-9">
						<div className="flex w-full flex-col items-start justify-start gap-3">
							<h2 className="text-2xl font-semibold text-black">Check your email</h2>
							<p className="text-black-tertiary">We sent a password reset link to {forgotPasswordEmail}</p>
						</div>
						<div className="flex w-full flex-col items-start justify-start gap-10">
							<div className="flex h-32 w-full items-center justify-center">
								<Image width={140} height={140} priority src={receiveEmail} alt="Receiving a letter or email" />
							</div>
							<div className="flex w-full flex-col items-start justify-start gap-4">
								<Link className="w-full" href="mailto:" passHref={true}>
									<Button type="button" buttonType="primary" color="blue" fullWidth borderFull>
										<div className="flex w-max flex-row items-center justify-center gap-1.5 pl-0.5">
											<span className="leading-none">Go to email</span>
											<Arrow />
										</div>
									</Button>
								</Link>

								<Button type="button" buttonType="secondary" color="grey" onClick={handleSignIn} fullWidth borderFull>
									<div className="flex h-1 w-max flex-row items-center gap-1.5 pl-0.5">
										<div className="rotate-180">
											<Arrow />
										</div>
										<span>Back to Sign in</span>
									</div>
								</Button>
							</div>
						</div>
						<div className="flex flex-row items-center justify-start gap-2">
							<span className="text-sm 2xs:text-base lg:text-lg">Didn&apos;t receive the email?</span>
							<Button type="button" buttonType="tertiary" color="blue" size="md" onClick={handleResendEmail}>
								<span className="text-sm font-medium 2xs:text-base lg:text-lg">Click to resend</span>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default ForgotPassword;
