import Image, {StaticImageData} from "next/image";

import Button from "@/components/general/button/button";
import HostTag from "../tags/host-tag";
import React from "react";
import useDimension from "@/helpers/useDimension";

interface Props {
	name: string;
	isFull?: boolean;
	isHost?: boolean;
	isPending?: boolean;
	profileImage: string | StaticImageData;
}

function UserRequest(props: Props) {
	const {width} = useDimension();

	return (
		<>
			<div className="flex w-full flex-col items-start justify-between gap-4 xs:flex-row xs:items-center xs:gap-0">
				<div className="flex w-full items-center justify-center gap-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
					<Image
						src={props.profileImage}
						width={width < 540 ? 64 : 28}
						height={width < 540 ? 64 : 28}
						alt="main background"
						tabIndex={-1}
					/>
					<div className="flex w-full flex-col gap-4">
						<div className="flex items-center justify-start gap-3">
							<p className="max-w-[7.5rem] truncate text-sm text-black-secondary md:max-w-[10rem]">{props.name}</p>
							{props.isFull && <HostTag isHost={props.isHost || false} />}
						</div>
						{!props.isPending ? (
							<div className="flex gap-3 xs:ml-2 xs:hidden">
								<Button type="button" buttonType="secondary" color="grey" size="xs" borderSmall>
									<span>Ignore</span>
								</Button>
								<Button type="button" buttonType="primary" color="black" size="xs" borderSmall>
									<span>Accept</span>
								</Button>
							</div>
						) : (
							<div className="flex h-7 w-max items-center justify-center rounded-md bg-orange-100 px-3 xs:ml-2 xs:hidden">
								<span className="text-xs font-medium text-orange-500">Pending</span>
							</div>
						)}
					</div>
				</div>
				{!props.isPending ? (
					<div className="ml-11 hidden gap-3 xs:ml-2 xs:flex">
						<Button type="button" buttonType="secondary" color="grey" size="xs" borderSmall>
							<span>Ignore</span>
						</Button>
						<Button type="button" buttonType="primary" color="black" size="xs" borderSmall>
							<span>Accept</span>
						</Button>
					</div>
				) : (
					<div className="ml-11 hidden h-7 items-center justify-center rounded-md bg-orange-100 px-3 xs:ml-2 xs:flex">
						<span className="text-xs font-medium text-orange-500">Pending</span>
					</div>
				)}
			</div>
		</>
	);
}

export default UserRequest;
