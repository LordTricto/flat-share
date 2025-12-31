import {DropdownItem, DropdownItemValueType} from "@/helpers/types";

import Dropdown from "./dropdown";
import Image from "next/image";
import React from "react";
import dottedLine from "@/public/images/dashboard/general/dotted-line.svg";
import horizontalDottedLine from "@/public/images/dashboard/general/horizontal-dotted-line.svg";
import {useRouter} from "next/navigation";

interface Props<T extends DropdownItemValueType> {
	placement?: "right" | "left";
	id: string;
	isHorizontal?: boolean;
	options: Array<DropdownItem<T>>;
}

function LineDropdown<T extends DropdownItemValueType>(props: Props<T>): JSX.Element {
	const router = useRouter();
	return (
		<>
			<Dropdown
				value={undefined}
				size="fit"
				customHead={
					<div className={`flex items-center justify-center ${!props.isHorizontal ? "h-6 w-6" : "h-6 w-6"}`}>
						<Image priority src={!props.isHorizontal ? dottedLine : horizontalDottedLine} width={24} height={24} alt="user" />
					</div>
				}
				customHeadStyle="!p-0 !bg-[unset]"
				onSelect={(_data) => {
					if (_data === 1) {
						router.push(
							`/dashboard/explore/${props.id
								.split("")
								.filter((_) => _ !== "=")
								.join("")}`
						);
					}
				}}
				options={props.options}
				noArrow
				noBorder
				// fitWidth
				maxMenuWidth="200px"
				placement={props.placement || "right"}
			/>
		</>
	);
}

export default LineDropdown;
