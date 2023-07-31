import React from "react";

export default function GetStartedLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <div className="relative flex h-full w-full flex-col items-center justify-start">{children}</div>;
}
