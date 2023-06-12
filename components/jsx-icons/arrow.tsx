import React from "react";

function Arrow(props: {className?: string}) {
	return (
		<>
			<svg
				className={`stroke-current ${props.className || ""}`}
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M4.16797 10H15.0013M10.8346 5L15.2454 9.41074C15.5708 9.73618 15.5708 10.2638 15.2454 10.5893L10.8346 15"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</svg>
		</>
	);
}

export default Arrow;
