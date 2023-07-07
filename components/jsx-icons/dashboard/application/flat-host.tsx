import FlatHostActive from "../../../../public/images/dashboard/get-started/flat-host-active.svg";
import FlatHostInactive from "../../../../public/images/dashboard/get-started/flat-host-inactive.svg";
import Image from "next/image";
import React from "react";

function FlatHost(props: {className?: string}) {
	return (
		<>
			<div className={"relative flex h-8 w-8 items-center justify-center " + `${props.className}`}>
				{/* <Image src={FlatHostActive} alt="icon-active" className="absolute left-0 top-0" width={24} height={24} tabIndex={-1} /> */}
				<Image
					src={FlatHostInactive}
					alt="icon-inactive"
					// className="absolute left-0 top-0 z-10 opacity-100 transition-opacity duration-150 group-hover:opacity-0"
					width={32}
					height={32}
					tabIndex={-1}
				/>
			</div>
		</>
	);
}

export default FlatHost;
