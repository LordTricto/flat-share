import {ClipLoader} from "react-spinners";
import React from "react";

function Loading() {
	return (
		<>
			<div className="-mt-[80px] flex h-screen w-full items-center justify-center xs:-mt-[112px]">
				<ClipLoader color="#465BF1" speedMultiplier={1} loading />
			</div>
		</>
	);
}

export default Loading;
