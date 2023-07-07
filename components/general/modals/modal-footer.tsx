import React from "react";
interface Props {
	children: React.ReactNode;
	dataType?: string | null;
}

function ModalFooter(props: Props): JSX.Element {
	return (
		<>
			<div
				className="flex h-fit w-full flex-row items-center justify-end space-x-4 px-8 pb-8 pt-4"
				data-type={props.dataType && props.dataType}
			>
				{props.children}
			</div>
		</>
	);
}

export default ModalFooter;
