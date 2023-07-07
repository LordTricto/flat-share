import FlatmateActive from "../../../../public/images/dashboard/get-started/flatmate-active.svg";
import FlatmateInactive from "../../../../public/images/dashboard/get-started/flatmate-inactive.svg";
import Image from "next/image";
import React from "react";

function Flatmate(props: {className?: string}) {
	return (
		<>
			<div className={"relative flex h-8 w-8 items-center justify-center " + `${props.className}`}>
				<Image src={FlatmateActive} alt="icon-active" className="absolute left-0 top-0" width={32} height={32} tabIndex={-1} />
				<Image
					src={FlatmateInactive}
					alt="icon-inactive"
					className="absolute left-0 top-0 z-10 opacity-100 transition-opacity duration-150 group-hover:opacity-0"
					width={32}
					height={32}
					tabIndex={-1}
				/>
			</div>
		</>
	);
}

export default Flatmate;
