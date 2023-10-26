import FlatHostActive from "@/public/images/dashboard/get-started/flat-host-active.png";
import FlatMateActive from "@/public/images/dashboard/get-started/flatmate-active.png";
import Image from "next/image";
import React from "react";
import Tooltip from "@/components/general/tooltip/tooltip";
import useDimension from "@/helpers/useDimension";
interface Props {
	isHost: boolean;
}

function HostTag(props: Props) {
	const {width} = useDimension();
	return (
		<>
			<Tooltip
				message={
					props.isHost
						? "This user(host), owns an apartment or has found an apartment he is interested in"
						: "This user(flatmate), has not found an apartment he is interested in "
				}
				placement="top"
				dataType="host"
				size="small"
				openOnClick
			>
				<div className={"flex h-5 w-max items-center justify-center gap-1 rounded-md px-1.5 xs:h-7 xs:gap-2 xs:px-3 " + `bg-blue-100`}>
					<Image
						src={props.isHost ? FlatHostActive : FlatMateActive}
						width={width < 540 ? 14 : 16}
						height={width < 540 ? 14 : 16}
						alt="host icon"
						tabIndex={-1}
					/>
					<span className={"hidden text-xs font-semibold xs:inline " + `text-blue-500`}>{props.isHost ? "Host" : "Flatmate"}</span>
				</div>
			</Tooltip>
		</>
	);
}

export default HostTag;
