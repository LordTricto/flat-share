import React from "react";

function CancelBig(props: {className?: string}) {
	return (
		<>
			<svg
				className={`stroke-current ${props.className || ""}`}
				width="15"
				height="15"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M1 14L14 1" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M14 14L1 1" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</>
	);
}

export default CancelBig;
