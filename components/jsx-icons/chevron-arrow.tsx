import React from "react";

function ChevronArrow(props: {className?: string}) {
	return (
		<>
			<svg
				className={`stroke-current ${props.className || ""}`}
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M9 18L15 12L9 6" stroke="#646474" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</>
	);
}

export default ChevronArrow;
