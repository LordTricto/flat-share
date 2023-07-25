import FlatHostActive from "@/public/images/dashboard/get-started/flat-host-active.png";
import FlatMateActive from "@/public/images/dashboard/get-started/flatmate-active.png";
import Image from "next/image";
import React from "react";
import useDimension from "@/helpers/useDimension";
interface Props {
	isHost: boolean;
}

function HostTag(props: Props) {
	const {width} = useDimension();
	return (
		<div className={"flex h-7 w-max items-center justify-center gap-1 rounded-md px-1.5 3xs:gap-2 3xs:px-3 " + `bg-blue-100`}>
			<Image
				src={props.isHost ? FlatHostActive : FlatMateActive}
				width={width < 400 ? 14 : 16}
				height={width < 400 ? 14 : 16}
				alt="host icon"
				tabIndex={-1}
			/>

			<span className={"text-xs font-semibold " + `text-blue-500`}>Host</span>
		</div>
	);
}

export default HostTag;
