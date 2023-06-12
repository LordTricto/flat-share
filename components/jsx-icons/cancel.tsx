import React from "react";

function Cancel(props: {className?: string}) {
	return (
		<>
			<svg
				className={`stroke-current ${props.className || ""}`}
				width="24"
				height="25"
				viewBox="0 0 24 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M18 6.5L6 18.5M6 6.5L18 18.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</>
	);
}

export default Cancel;
