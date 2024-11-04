"use client";

import Image, {StaticImageData} from "next/image";
import React, {useEffect, useState} from "react";

import Button from "@/components/general/button/button";
import Link from "next/link";
import {canShowPreReleaseFeatures} from "../../../utils/preReleaseConfig";
import {usePathname} from "next/navigation";

interface Props {
	text: string;
	path: string;
	iconActive: StaticImageData;
	iconInActive: StaticImageData;
	isPreRelease?: boolean;
	includesPath?: boolean;
	optionalPath?: string;

	onClick(e: React.MouseEvent): void;
}

function MenuItem({onClick, path, iconActive, iconInActive, text, optionalPath, includesPath, isPreRelease = false}: Props): JSX.Element {
	const pathname = usePathname();

	const [active, setActive] = useState(false);
	const [isHover, setIsHover] = useState<boolean>(false);

	useEffect(() => {
		setActive(includesPath ? pathname.includes(optionalPath || path) : !!(pathname === path));
	}, [includesPath, optionalPath, pathname, path]);

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
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			data-type="section"
		>
			{/* <div className={` ${active ? "" : "hover:bg-white "}`} data-type="section" tabIndex={-1}> */}
			<Button
				ripple="dark"
				color="transparent"
				type="button"
				buttonType="primary"
				data-type="section"
				className={"!px-3 " + `${active ? "bg-blue-very-light" : "hover:bg-blue-very-light"}`}
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
					<div className="relative flex h-6 w-6 items-center justify-center">
						<Image
							src={iconActive}
							alt="icon-active"
							className={`absolute left-0 top-0 `}
							// className={`absolute left-0 top-0 transition-opacity duration-150 ${isHover ? "opacity-100" : "opacity-0"} `}
							width={24}
							height={24}
							tabIndex={-1}
						/>
						<Image
							src={iconInActive}
							alt="icon-inactive"
							className={`absolute left-0 top-0 z-10 transition-opacity duration-150 ${
								isHover || active ? "opacity-0" : "opacity-100"
							} `}
							width={24}
							height={24}
							tabIndex={-1}
						/>
					</div>
					<span
						className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-medium"
						tabIndex={-1}
						data-type="section"
					>
						{text}
					</span>
				</div>
			</Button>
			{/* </div> */}
		</Link>
	);
}

export default MenuItem;
