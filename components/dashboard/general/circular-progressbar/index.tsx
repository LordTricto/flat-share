"use client"

import {CircularProgressbar, buildStyles} from "react-circular-progressbar";

import React from "react";

interface Props {
	progress: string;
	sizeClassName?: string;
}

function CircularProgress(props: Props) {
	return (
		<div>
			<div className={"relative " + `${props.sizeClassName || "h-14 w-14"}`}>
				<CircularProgressbar
					value={Number(props.progress)}
					styles={buildStyles({
						// Colors
						strokeLinecap: "round",
						pathColor: `rgba(84, 102, 249, 1)`,
						textColor: "rgba(113, 116, 140, 1)",
						trailColor: "rgba(241, 241, 244, 1)",
						backgroundColor: "rgba(255, 255, 255, 1)",
					})}
				/>
				<span className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs">{props.progress}%</span>
			</div>
		</div>
	);
}

export default CircularProgress;
