import Image, {StaticImageData} from "next/image";

import Button from "@/components/general/button/button";
import React from "react";

interface Props {
	name: string;
	isPending?: boolean;
	profileImage: StaticImageData;
}

function UserRequest(props: Props) {
	return (
		<>
			<div className="flex w-full flex-row items-center justify-between gap-0">
				<div className="flex items-center justify-center gap-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
					<Image src={props.profileImage} width={28} height={28} alt="main background" tabIndex={-1} />
					<p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-black-secondary ">{props.name}</p>
				</div>
				{!props.isPending ? (
					<div className="ml-2 flex gap-3">
						<Button type="button" buttonType="secondary" color="grey" size="xs" borderSmall>
							<span>Ignore</span>
						</Button>
						<Button type="button" buttonType="primary" color="black" size="xs" borderSmall>
							<span>Accept</span>
						</Button>
					</div>
				) : (
					<div className="ml-2 flex h-7 items-center justify-center rounded-md bg-orange-100 px-3">
						<span className="text-xs font-medium text-orange-500">Pending</span>
					</div>
				)}
			</div>
		</>
	);
}

export default UserRequest;
