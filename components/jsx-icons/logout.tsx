import React from "react";

function Logout(props: {className?: string}) {
	return (
		<>
			<svg
				className={`stroke-current ${props.className || ""}`}
				width="17"
				height="16"
				viewBox="0 0 17 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6.5 14H3.83333C3.47971 14 3.14057 13.8595 2.89052 13.6095C2.64048 13.3594 2.5 13.0203 2.5 12.6667V3.33333C2.5 2.97971 2.64048 2.64057 2.89052 2.39052C3.14057 2.14048 3.47971 2 3.83333 2H6.5M11.1667 11.3333L14.5 8M14.5 8L11.1667 4.66667M14.5 8H6.5"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</>
	);
}

export default Logout;
