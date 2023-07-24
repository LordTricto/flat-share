import FlatHostActive from "@/public/images/dashboard/get-started/flat-host-active.png";
import Image from "next/image";
import React from "react";

function HostTag() {
	return (
		<div className={"flex h-7 w-max items-center justify-center gap-2 rounded-md px-3 " + `bg-blue-100`}>
			<Image src={FlatHostActive} width={16} height={16} alt="host icon" tabIndex={-1} />

			<span className={"text-xs font-medium " + `text-blue-500`}>Host</span>
		</div>
	);
}

export default HostTag;
