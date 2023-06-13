"use client";
import React, {useEffect, useState} from "react";

import Link from "next/link";

import {canShowPreReleaseFeatures} from "../../../utils/preReleaseConfig";
import {usePathname} from "next/navigation";
import Button from "@/components/general/button/button";

interface Props {
	onClick(e: React.MouseEvent): void;
	path: string;
	icon: React.ReactElement;
	text: string;
	isPreRelease?: boolean;
}

function MenuItem({onClick, path, icon, text, isPreRelease = false}: Props): JSX.Element {
	const pathname = usePathname();

	const [active, setActive] = useState(false);

	useEffect(() => {
		setActive(!!(pathname === path));
	}, [pathname, path]);

	if (isPreRelease && !canShowPreReleaseFeatures) {
		return <></>;
	}

	return (
		<Link
			href={{
				pathname: path,
				// state: {
				// 	pageFrom: pathname,
				// },
			}}
			onClick={onClick}
			data-type="section"
		>
			{/* <div className={` ${active ? "" : "hover:bg-white "}`} data-type="section" tabIndex={-1}> */}
			<Button
				ripple="dark"
				color="transparent"
				type="button"
				buttonType="primary"
				data-type="section"
				className={"px-3 " + `${active ? "bg-blue-very-light" : "hover:bg-blue-very-light"}`}
				noTabIndex
				fullWidth
			>
				<div
					className={
						`relative flex h-9 w-full items-center justify-start tracking-normal ` +
						`${active ? "font-medium text-blue antialiased" : ""}`
					}
					data-type="section"
					tabIndex={-1}
				>
					{React.cloneElement(icon, {className: "stroke-current", "data-type": "section", tabIndex: -1})}
					<span className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-medium" tabIndex={-1} data-type="section">
						{text}
					</span>
				</div>
			</Button>
			{/* </div> */}
		</Link>
	);
}

export default MenuItem;
