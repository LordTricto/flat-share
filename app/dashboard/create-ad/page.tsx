"use client";

import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import React, {useRef, useState} from "react";

import Arrow from "@/components/jsx-icons/arrow";
import Button from "@/components/general/button/button";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import Input from "@/components/general/inputs/input";
import asideSectionPattern from "@/public/images/dashboard/home/aside-section-pattern.png";
import cameraIcon from "@/public/images/dashboard/general/camera.svg";
import emptyIcon from "@/public/images/dashboard/general/empty-list.svg";
import emptyProfileIcon from "@/public/images/dashboard/general/empty-profile.svg";
import reloadIcon from "@/public/images/dashboard/general/reload.svg";
import {useSelector} from "react-redux";

function CreateAd() {
	const user = useSelector((state: IRootState) => state.init.user);
	const isAccountCreated = useSelector((state: IRootState) => state.init.isAccountCreated);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [selectedImg, setSelectedImg] = useState("");

	const [isActivityEmpty] = useState(true);
	const [isTagActive, setIsTagActive] = useState(true);
	const [number, setNumber] = useState(0);

	const onFileChange = (file: File) => {
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const imagePath = e.target?.result;
				setSelectedImg(imagePath as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const onTargetClick = () => {
		fileInputRef.current && fileInputRef.current.click();
	};

	return (
		<>
			<div className="flex h-full w-full">
				<div className="h-full w-full">
					<div className="w-max">
						<Input
							label="Location"
							type="number"
							placeholder="Enter Location"
							name="location"
							value={number}
							onChange={(value: string) => setNumber(Number(value))}
							onUpClick={() => {
								setNumber((prev) => (prev === 5 ? 5 : Number(number) + 1));
								return;
							}}
							onDownClick={() => {
								setNumber((prev) => (prev === 0 ? 0 : Number(number) - 1));
								return;
							}}
						/>
					</div>
					<div className={"relative h-14 w-14"}>
						<CircularProgressbar
							value={50}
							// text={`${50}%`}
							styles={buildStyles({
								// Colors
								strokeLinecap: "round",
								pathColor: `rgba(84, 102, 249, 1)`,
								textColor: "rgba(113, 116, 140, 1)",
								trailColor: "rgba(241, 241, 244, 1)",
								backgroundColor: "rgba(255, 255, 255, 1)",
							})}
						/>
						<span className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs">{50}%</span>
					</div>
					<div>
						<div
							className={
								"w-max cursor-pointer rounded-full border px-4 py-3 duration-150 " +
								`${isTagActive ? "border-blue bg-blue-quin-light text-black-secondary" : "border-grey text-grey-quin"}`
							}
							onClick={() => setIsTagActive((prev) => !prev)}
						>
							<span className="select-none text-sm font-medium duration-150">No pets</span>
						</div>
					</div>
					<div
						className={
							"relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-[10px] border border-black-quin"
							// +
							// `${
							// 	selectedImg
							// 		? "after:left-0 after:top-0 after:h-full after:w-full after:bg-black after:bg-opacity-10 after:bg-gradient-to-b after:from-green-400 after:to-green-400 after:content-['*']"
							// 		: ""
							// }`
						}
						onClick={onTargetClick}
					>
						{selectedImg && (
							<>
								<Image
									className="absolute left-0 top-0 z-0 h-full w-full "
									src={selectedImg}
									alt="img"
									fill
									// width={112}
									// height={112}
									tabIndex={-1}
								/>
								<div className="absolute left-0 top-0 z-0 h-full w-full bg-black bg-opacity-30"></div>
							</>
						)}

						<input
							type="file"
							ref={fileInputRef}
							className="hidden"
							onChange={(event) => event.target.files && onFileChange(event.target.files[0])}
							accept="image/*"
						/>
						{selectedImg ? (
							<Image className="z-10" src={reloadIcon} alt="reload" width={24} height={24} tabIndex={-1} />
						) : (
							<Image src={cameraIcon} alt="camera" width={40} height={40} tabIndex={-1} />
						)}
					</div>
				</div>

				<div className="relative h-full min-w-[280px] bg-black-quat">
					<div className="absolute left-0 top-0 flex h-fit w-full flex-col gap-[42px] overflow-y-auto border-l border-grey-quat bg-white px-5 py-6">
						<div className="flex h-72 flex-grow flex-col gap-[42px]">
							<h4 className="text-base font-semibold leading-[100%] text-black">Activities</h4>
							<div className="h-full w-full border-b border-grey-secondary">
								{isActivityEmpty ? (
									<>
										<div className="flex w-full flex-col items-center justify-center pt-8">
											<Image priority src={emptyIcon} alt="Empty state" />
											<p className="-mt-2.5 text-xs text-grey-quin">No activities to display</p>
										</div>
									</>
								) : (
									<></>
								)}
							</div>
						</div>
						<div className="flex h-80 flex-grow flex-col gap-[42px]">
							<h4 className="text-base font-semibold leading-[100%] text-black">Recent Messages</h4>
							<div className="h-full w-full border-b border-grey-secondary">
								{isActivityEmpty ? (
									<>
										<div className="flex w-full flex-col items-center justify-center gap-1 pt-8">
											<Image priority src={emptyProfileIcon} alt="Empty state" />
											<p className="text-xs text-grey-quin">No conversation to display</p>
										</div>
									</>
								) : (
									<></>
								)}
							</div>
						</div>
						<div className="relative flex w-full flex-col gap-6 overflow-hidden rounded-[11px] px-6 py-3">
							<Image priority src={asideSectionPattern} className="absolute left-0 top-0 z-0 h-full w-full" alt="Empty state" />
							<h3 className="z-10 max-w-[190px] text-base font-semibold text-white">Unlock more benefits and exclusive features.</h3>
							<Button type="button" buttonType="secondary" color="translucent" size="sm" fullWidth borderFull>
								<div className="flex w-max flex-row items-center justify-center gap-1.5 pl-0.5">
									<span className="text-sm leading-none">Upgrade Account</span>
									<Arrow />
								</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CreateAd;
