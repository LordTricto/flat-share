import React from "react";

export default function GetStartedLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="-moz-h-fit-available -webkit-h-fit-available -ms-h-fit-available relative flex w-full flex-shrink flex-grow basis-auto flex-col items-center justify-start overflow-y-auto">
			{children}
		</div>
	);
}
