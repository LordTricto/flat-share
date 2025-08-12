"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import {useLayoutEffect, useState} from "react";

import BathroomIcon from "@/public/images/dashboard/my-ad/bathroom.svg";
import BedroomIcon from "@/public/images/dashboard/my-ad/bedroom.svg";
import Button from "@/components/general/button/button";
import CreateAdStageOne from "@/components/dashboard/create-ad/stages/create-ad-stage-one";
import House1 from "@/public/images/dashboard/my-ad/house-1.png";
import House2 from "@/public/images/dashboard/my-ad/house-2.png";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import ImageTagIcon from "@/public/images/dashboard/my-ad/image-tag.svg";
import Loading from "../loading";
import Slider from "react-slick";
import Tag from "@/components/dashboard/create-ad/tags/tag";
import ToiletIcon from "@/public/images/dashboard/my-ad/toilet.svg";
import editIcon from "@/public/images/dashboard/general/edit.svg";
import formatNumber from "@/utils/formatNumber";
import useMyAd from "@/hooks/dashboard/my-ad/use-my-ad";
import {useSelector} from "react-redux";

interface Props {
	params: {
		id: string;
	};
}

const UserProfile = (props: Props) => {
	const {data, isFetching, remove, refetch} = useMyAd();
	const codec = useSelector((state: IRootState) => state.init.user?.codec);

	const [isEdit, setIsEdit] = useState(false);
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // State to hold the active index

	useLayoutEffect(() => {
		if (!codec) return;
		refetch();
		return () => {
			remove();
		};
	}, [codec, remove, refetch]);

	const SliderSettings = {
		infinite: true,
		slidesToShow: 1,
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToScroll: 1,
		speed: 500,
		pauseOnHover: true,
		afterChange: (index: number) => {
			setCurrentSlideIndex(index); // Update the state with the new active index
		},
	};
	return (
		<>
			<div className="grid h-full w-full">
				{!isFetching && data ? (
					<>
						{!isEdit ? (
							<div className="flex h-full w-full flex-col gap-6 px-5 pb-8 pt-6">
								<div className="relative flex h-fit w-full flex-col gap-6  rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
									<div className="flex w-full gap-4">
										<div className="relative block w-full max-w-[60%]">
											<div className="absolute bottom-4 right-4 z-10 flex items-center justify-center gap-1 rounded-full bg-white px-3.5 py-1">
												<Image src={ImageTagIcon} alt="bedroom" width={16} height={16} tabIndex={-1} />
												<p className="text-sm font-semibold text-black">{currentSlideIndex + 1}/3</p>
											</div>
											<div className="absolute left-0 top-0 h-full w-full overflow-hidden bg-grey-backdrop " tabIndex={-1}>
												<Slider {...SliderSettings}>
													{data.property_images.map((_) => (
														<div className="w-full">
															<div className="relative flex h-0 w-full flex-col gap-4 overflow-hidden pb-[62.5%]">
																<Image
																	src={_.property_image}
																	alt="bedroom"
																	tabIndex={-1}
																	className="absolute left-0 top-0 z-10 h-full w-full object-cover"
																	fill
																/>
															</div>
														</div>
													))}
												</Slider>
											</div>
										</div>
										<div className="grid h-max w-full max-w-[40%] grid-cols-2 gap-4">
											{data.property_images.slice(-4).map((_, i) => (
												<div key={i} className="relative flex h-0 w-full flex-col gap-4 overflow-hidden pb-[62.5%]">
													<Image
														src={_.property_image_thumb}
														alt={_.image_id || ""}
														tabIndex={-1}
														className="absolute left-0 top-0 z-10 h-full w-full object-cover"
														fill
													/>
												</div>
											))}
										</div>
									</div>
									<div className="flex w-full flex-col items-start justify-start gap-4">
										<div className="flex w-full items-center justify-between">
											<div className="flex h-6 items-center justify-center rounded-[5px] bg-[#F3F3F6] px-3">
												<p className="text-grey-[#646474] text-sm font-semibold">preferably female</p> *does not exist
											</div>
											<Button
												type="button"
												buttonType="secondary"
												color="white"
												size="sm"
												onClick={() => setIsEdit(true)}
												borderSmall
											>
												<div className="flex items-center gap-2">
													<Image src={editIcon} alt="camera" width={16} height={16} tabIndex={-1} />
													<span className="hidden 2xs:inline">Edit Ad</span>
													<span className="inline 2xs:hidden">Edit</span>
												</div>
											</Button>
										</div>
										<div className="flex flex-col items-start justify-start gap-4">
											<h2 className="text-2xl font-bold text-black">
												₦{formatNumber(data.rent_cost)}/
												<span className="text-lg font-semibold">{data.payment_frequency}</span>
											</h2>
											<p className="text-base font-medium text-black-secondary">{data.house_full_address}</p>
											<div className="flex flex-col items-start justify-start gap-5 2xs:flex-row">
												<div className="flex items-center justify-center gap-2">
													<Image src={BedroomIcon} alt="bedroom" width={16} height={16} tabIndex={-1} />
													<p className="text-sm text-black-secondary">
														{data.rooms_no} Bedroom{data.rooms_no > 1 ? "s" : ""}
													</p>
												</div>
												<div className="flex items-center justify-center gap-2">
													<Image src={BathroomIcon} alt="bedroom" width={16} height={16} tabIndex={-1} />
													<p className="text-sm text-black-secondary">
														{data.bathrooms_no} Bathroom{data.bathrooms_no > 1 ? "s" : ""}
													</p>
												</div>
												<div className="flex items-center justify-center gap-2">
													<Image src={ToiletIcon} alt="bedroom" width={16} height={16} tabIndex={-1} />
													<p className="text-sm text-black-secondary">
														{data.toilets_no} Toilet{data.toilets_no > 1 ? "s" : ""}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="relative flex h-fit w-full flex-col gap-6 overflow-hidden rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
									{/* <h3 className="text-xl font-semibold text-black">House Rules</h3> */}
									<div className="flex w-full flex-col items-start justify-start gap-6">
										<div className="flex w-full flex-col items-start justify-start gap-3">
											<h5 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">House Rules</h5>
											<div className="flex flex-wrap gap-3">
												{data.house_rules.map((_interest, _index) => (
													<Tag key={_index} text={_interest} isActive isDisabled />
												))}
											</div>
										</div>
										<div className="flex w-full flex-col items-start justify-start gap-3">
											<h5 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Features</h5>
											<div className="flex flex-wrap gap-3">
												{data.features.map((_features, _index) => (
													<Tag key={_index} text={_features} isActive isDisabled />
												))}
											</div>
										</div>
										<div className="flex w-full flex-col items-start justify-start gap-3">
											<h5 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Interests</h5>
											<div className="flex flex-wrap gap-3">
												{data.interests.map((_interest, _index) => (
													<Tag key={_index} text={_interest} isActive isDisabled />
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="flex h-full w-full flex-col gap-6 px-5 pb-8 pt-6">
								<div className="relative flex h-fit w-full flex-col gap-6 overflow-hidden rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
									<div className="flex flex-col items-center justify-center gap-4">
										<div className="flex flex-col items-center justify-center gap-5">
											<span className="text-3xl">🏠</span>
											<h3 className="text-2xl font-bold capitalize leading-[100%] text-black">Edit Ad</h3>
										</div>
										<p className="text-center text-base text-black-tertiary">Edit your apartment ad.</p>
									</div>
									<CreateAdStageOne data={data} handleNextStage={() => setIsEdit(false)} />
								</div>
							</div>
						)}
					</>
				) : (
					<Loading />
				)}
			</div>
		</>
	);
};

export default UserProfile;
