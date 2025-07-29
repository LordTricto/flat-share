"use client";

import BathroomIcon from "@/public/images/dashboard/my-ad/bathroom.svg";
import BedroomIcon from "@/public/images/dashboard/my-ad/bedroom.svg";
import Button from "@/components/general/button/button";
import Image from "next/image";
import Loading from "../loading";
import Tag from "@/components/dashboard/create-ad/tags/tag";
import ToiletIcon from "@/public/images/dashboard/my-ad/toilet.svg";
import editIcon from "@/public/images/dashboard/general/edit.svg";
import {useLayoutEffect} from "react";
import useMyAd from "@/hooks/dashboard/my-ad/use-my-ad";

interface Props {
	params: {
		id: string;
	};
}

const UserProfile = (props: Props) => {
	const {data, isFetching, remove, refetch} = useMyAd();

	useLayoutEffect(() => {
		refetch();
		return () => {
			remove();
		};
	}, [refetch, remove]);
	console.log(data);
	return (
		<>
			{data ? (
				<>
					<div className="flex h-full w-full flex-col gap-6 px-5 pb-8 pt-6">
						<div className="relative flex h-fit w-full flex-col gap-6 overflow-hidden rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
							<div className="flex w-full gap-5">
								<div className="max-w-[70%]] w-full object-cover">
									<Image src={data.property_images[0].property_image} alt="bedroom" width={631} height={500} tabIndex={-1} />
								</div>
								<div className="flex w-[30%] max-w-[30%] flex-wrap gap-5">
									{data.property_images.slice(1).map((_, _index) => (
										<div className="" key={_index}>
											<Image src={data.property_image_2} alt="bedroom" tabIndex={-1} width={212} height={136} />
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
										// onClick={() => router.push("/dashboard/settings")}
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
										₦{data.rent_cost}/<span className="text-lg font-semibold">{data.payment_frequency}</span>
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
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default UserProfile;
