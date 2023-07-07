"use client";

import React, {useCallback, useEffect, useState} from "react";

interface SwitchProps {
	isActive: boolean;

	onToggle: (state: boolean) => void;
}

function ToggleSwitch({isActive = false, onToggle}: SwitchProps): JSX.Element {
	const [active, setActive] = useState(isActive);

	useEffect(() => {
		setActive(isActive);
	}, [isActive]);

	const handleToggle = useCallback(() => {
		setActive((prev) => !prev);
		onToggle(!active);
	}, [active, onToggle]);

	return (
		<div
			role="checkbox"
			tabIndex={0}
			onClick={handleToggle}
			aria-checked={active ? "true" : "false"}
			className={
				`relative flex h-5 w-[42px] cursor-pointer items-center rounded-full px-1.5 ` + `${active ? "bg-blue" : "justify-end bg-grey"}`
			}
		>
			<div
				className={
					`absolute left-0.5 h-4 w-4 transform rounded-full bg-white duration-200 ease-out ` +
					`${active ? "translate-x-[22px]" : "translate-x-0"}`
				}
			/>
		</div>
	);
}

export default ToggleSwitch;
