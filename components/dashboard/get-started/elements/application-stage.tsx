import {setToStageOne, setToStageThree, setToStageTwo} from "@/redux/get-started/get-started";
import {useDispatch, useSelector} from "react-redux";

import {IRootState} from "@/redux/rootReducer";
import React from "react";

function ApplicationStage() {
	const dispatch = useDispatch();

	const stage = useSelector((state: IRootState) => state.getStarted.stage);

	return (
		<>
			<div>
				<div className="flex items-center justify-center pr-4 md:flex-col md:items-start md:justify-start md:py-10">
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
								<span className="h-max select-none font-medium text-current">1</span>
							</div>
						</div>
						<p className="hidden select-none text-sm text-current md:block">Choose Account Type</p>
					</div>

					<div className="flex h-6 w-8 items-center justify-center">
						<div className="h-[1px] w-full bg-grey-quat md:h-full md:w-[1px]"></div>
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
								<span className="h-max select-none font-medium text-current">2</span>
							</div>
						</div>
						<p className="hidden select-none text-sm text-current md:block">Personal Information</p>
					</div>

					<div className="flex h-6 w-8 items-center justify-center">
						<div className="h-[1px] w-full bg-grey-quat md:h-full md:w-[1px]"></div>
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
								<span className="h-max select-none font-medium text-current">3</span>
							</div>
						</div>
						<p className="hidden select-none text-sm text-current md:block">Account Preference</p>
					</div>

					<div className="flex h-6 w-8 items-center justify-center">
						<div className="h-[1px] w-full bg-grey-quat md:h-full md:w-[1px]"></div>
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
								<span className="h-max select-none font-medium text-current">4</span>
							</div>
						</div>
						<p className="hidden select-none text-sm text-current md:block">Upload Image</p>
					</div>
				</div>

				<div className="w-full pt-4 text-center md:hidden">
					<p className="select-none text-base text-current">
						{stage === 1
							? "Choose Account Type"
							: stage === 2
							? "Personal Information"
							: stage === 3
							? "Account Preference"
							: stage === 4
							? "Upload Image"
							: ""}
					</p>
				</div>
			</div>
		</>
	);
}

export default ApplicationStage;
