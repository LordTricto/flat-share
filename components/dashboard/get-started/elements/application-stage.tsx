import {setToStageOne, setToStageThree, setToStageTwo} from "@/redux/get-started/get-started";
import {useDispatch, useSelector} from "react-redux";

import {IRootState} from "@/redux/rootReducer";
import React from "react";

function ApplicationStage() {
	const dispatch = useDispatch();

	const stage = useSelector((state: IRootState) => state.getStarted.stage);

	return (
		<>
			<div className="py-10 pr-4">
				<div
					className={
						"flex items-center justify-start gap-4 " +
						`${stage >= 1 ? "cursor-pointer text-black" : " text-grey-quin"} ` +
						`${stage === 1 ? "font-medium" : ""}`
					}
					onClick={() => stage >= 1 && dispatch(setToStageOne())}
				>
					<div>
						<div
							className={
								"flex h-8 w-8 items-center justify-center rounded-full border " +
								`${stage >= 1 ? "border-blue" : " border-grey-quat"} `
							}
						>
							<span className="h-max select-none pt-1 font-medium text-current">1</span>
						</div>
					</div>
					<p className="select-none text-current">Choose Account Type</p>
				</div>
				<div className="flex h-6 w-8 items-center justify-center">
					<div className="h-full w-[1px] bg-grey-quat"></div>
				</div>
				<div
					className={
						"flex items-center justify-start gap-4 " +
						`${stage >= 2 ? "cursor-pointer text-black" : " text-grey-quin"} ` +
						`${stage === 2 ? "font-medium" : ""}`
					}
					onClick={() => stage >= 2 && dispatch(setToStageTwo())}
				>
					<div>
						<div
							className={
								"flex h-8 w-8 items-center justify-center rounded-full border " +
								`${stage >= 2 ? "border-blue" : " border-grey-quat"} `
							}
						>
							<span className="h-max select-none pt-1 font-medium text-current">2</span>
						</div>
					</div>
					<p className="select-none text-current">Personal Information</p>
				</div>
				<div className="flex h-6 w-8 items-center justify-center">
					<div className="h-full w-[1px] bg-grey-quat"></div>
				</div>
				<div
					className={
						"flex items-center justify-start gap-4 " +
						`${stage >= 3 ? "cursor-pointer text-black" : " text-grey-quin"} ` +
						`${stage === 3 ? "font-medium" : ""}`
					}
					onClick={() => stage >= 3 && dispatch(setToStageThree())}
				>
					<div>
						<div
							className={
								"flex h-8 w-8 items-center justify-center rounded-full border " +
								`${stage >= 3 ? "border-blue" : " border-grey-quat"} `
							}
						>
							<span className="h-max select-none pt-1 font-medium text-current">3</span>
						</div>
					</div>
					<p className="select-none text-current">Account Preference</p>
				</div>
				<div className="flex h-6 w-8 items-center justify-center">
					<div className="h-full w-[1px] bg-grey-quat"></div>
				</div>
				<div
					className={
						"flex items-center justify-start gap-4 " +
						`${stage >= 4 ? "cursor-pointer text-black" : " text-grey-quin"} ` +
						`${stage === 4 ? "font-medium" : ""}`
					}
					// onClick={() => dispatch(setToStageFour())}
				>
					<div>
						<div
							className={
								"flex h-8 w-8 items-center justify-center rounded-full border " +
								`${stage >= 4 ? "border-blue" : " border-grey-quat"} `
							}
						>
							<span className="h-max select-none pt-1 font-medium text-current">4</span>
						</div>
					</div>
					<p className="select-none text-current">Upload Image</p>
				</div>
			</div>
		</>
	);
}

export default ApplicationStage;
