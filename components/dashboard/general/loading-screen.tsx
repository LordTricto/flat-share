"use client";

import BarLoader from "react-spinners/BarLoader";
import Image from "next/image";
import logo from "@/public/images/logo-iso.svg";

function LoadingScreen() {
	return (
		<div className="fixed z-[100] flex h-screen w-full flex-col items-center justify-center bg-white">
			<div className="flex w-full max-w-md flex-col items-center justify-center gap-10">
				<div className="flex h-full w-full flex-col items-center justify-center gap-10">
					<Image src={logo} alt="logo" width={56.34} height={65.04} priority />
					<div className="flex w-full flex-col items-center justify-start gap-4">
						<h2 className="text-2xl font-semibold text-black">FlateShare</h2>
						<p className="max-w-screen-4xs text-center text-black-tertiary">Building your experience...</p>
					</div>
				</div>
				<div className="w-full overflow-hidden rounded-md">
					<BarLoader height="6px" width="100%" color="#465BF1" speedMultiplier={1} loading />
				</div>
			</div>
		</div>
	);
}

export default LoadingScreen;
