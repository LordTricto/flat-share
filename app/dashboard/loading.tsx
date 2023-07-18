import {ClipLoader} from "react-spinners";
import React from "react";

function Loading() {
	return (
		<>
			<div className="flex h-full w-full items-center justify-center">
				<ClipLoader color="#465BF1" speedMultiplier={1} loading />
			</div>
		</>
	);
}

export default Loading;
