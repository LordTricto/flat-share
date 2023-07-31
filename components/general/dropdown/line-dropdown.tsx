import {DropdownItem, DropdownItemValueType} from "@/helpers/types";

import Dropdown from "./dropdown";
import Image from "next/image";
import React from "react";
import dottedLine from "@/public/images/dashboard/general/dotted-line.svg";
import horizontalDottedLine from "@/public/images/dashboard/general/horizontal-dotted-line.svg";

interface Props<T extends DropdownItemValueType> {
	// size?: "xs" | "sm" | "lg";
	// children: React.ReactNode;
	placement?: "right" | "left";
	isHorizontal?: boolean;
	options: Array<DropdownItem<T>>;
}

function LineDropdown<T extends DropdownItemValueType>(props: Props<T>): JSX.Element {
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
				// customHeadStyle="!p-0 xs:!py-3 xs:!px-3 xs:!rounded-none"
				customHeadStyle="!p-0 !bg-[unset]"
				onSelect={() => {
					return;
				}}
				options={props.options}
				noArrow
				noBorder
				fitWidth
				placement={props.placement || "right"}
			/>
		</>
	);
}

export default LineDropdown;
