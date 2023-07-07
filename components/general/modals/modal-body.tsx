import React from "react";
interface Props {
	children: React.ReactNode;
	dataType?: string | null;
}

function ModalBody(props: Props): JSX.Element {
	return (
		<>
			<div className="relative flex h-fit w-full flex-auto flex-col px-8 pb-8" data-type={props.dataType && props.dataType}>
				{props.children}
			</div>
		</>
	);
}

export default ModalBody;
