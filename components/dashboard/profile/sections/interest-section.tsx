import {FilmInterests, FoodInterests, MusicInterests, OtherInterests, SportsInterests} from "@/hooks/dashboard/settings/settings.constants";

import React from "react";
import Tag from "../../create-ad/tags/tag";

interface Props {
	isExplore?: boolean;
}

function InterestSection(props: Props) {
	return (
		<>
			<div className="relative flex h-fit w-full flex-col gap-6 overflow-hidden rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
				<h3 className="text-xl font-semibold text-black">{!props.isExplore ? "My" : ""}Interests</h3>
				<div className="flex w-full flex-col items-start justify-start gap-6">
					<div className="flex w-full flex-col items-start justify-start gap-3">
						<h5 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Sports</h5>
						<div className="flex flex-wrap gap-3">
							{SportsInterests.slice(0, 4).map((_interest, _index) => (
								<Tag key={_index} text={_interest} isActive isDisabled />
							))}
						</div>
					</div>
					<div className="flex w-full flex-col items-start justify-start gap-3">
						<h5 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Food & Drink</h5>
						<div className="flex flex-wrap gap-3">
							{FoodInterests.slice(0, 4).map((_interest, _index) => (
								<Tag key={_index} text={_interest} isActive isDisabled />
							))}
						</div>
					</div>
					<div className="flex w-full flex-col items-start justify-start gap-3">
						<h5 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Music</h5>
						<div className="flex flex-wrap gap-3">
							{MusicInterests.slice(0, 4).map((_interest, _index) => (
								<Tag key={_index} text={_interest} isActive isDisabled />
							))}
						</div>
					</div>
					<div className="flex w-full flex-col items-start justify-start gap-3">
						<h5 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Film & TV</h5>
						<div className="flex flex-wrap gap-3">
							{FilmInterests.slice(0, 4).map((_interest, _index) => (
								<Tag key={_index} text={_interest} isActive isDisabled />
							))}
						</div>
					</div>
					<div className="flex w-full flex-col items-start justify-start gap-3">
						<h5 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Other Interests</h5>
						<div className="flex flex-wrap gap-3">
							{OtherInterests.slice(0, 4).map((_interest, _index) => (
								<Tag key={_index} text={_interest} isActive isDisabled />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default InterestSection;
