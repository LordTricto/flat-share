import {calculateOffset, parsePaginationData} from "./pagination.util";

import Image from "next/image";
import React from "react";
import chevronArrow from "@/public/images/icons/chevron-arrow.svg";
import formatNumber from "@/utils/formatNumber";

interface Props {
	offset: number;
	total: number;
	groupSize: number;
	onSelect: (page: number, offset: number) => void;
	isLoading: boolean;
}

function Pagination(props: Props): JSX.Element {
	const {pages, items, hasNext, hasPrevious} = parsePaginationData(props.offset, props.total, props.groupSize);

	const paginate = (newPage: number) => {
		props.onSelect(newPage, calculateOffset(newPage, props.groupSize));
	};

	return (
		<>
			{!props.isLoading && props.total > 0 && props.groupSize > 0 && (
				<div className="relative h-16 w-full">
					<div className="flex flex-row justify-end items-center w-fit text-black-tertiary py-4 absolute right-0.5 opacity-100">
						<span>
							{formatNumber(items.start, false)} - {formatNumber(items.end, false)} of {formatNumber(items.total, false)}
						</span>

						<ul className="flex flex-row justify-center items-center w-fit" role="navigation" aria-label="Pagination">
							<li className={"previous " + `${hasPrevious ? "" : "text-black-quin pointer-events-none"}`}>
								<a
									tabIndex={hasPrevious ? 0 : -1}
									role="button"
									aria-disabled={hasPrevious ? "true" : "false"}
									aria-label="Previous page"
									rel="prev"
									onClick={() => {
										if (hasPrevious) {
											paginate(pages.current - 1);
										}
									}}
								>
									<div>
										<div className="flex justify-center items-center transition-colors duration-150 ease-in-out text-current hover:bg-black-quin rounded-full h-7 w-7 pr-0.5">
											<Image
												className="stroke-current w-3.5 transform rotate-90 origin-center"
												src={chevronArrow}
												alt="right arrow"
												priority
											/>
										</div>
									</div>
								</a>
							</li>

							{/* <li className="break text-black-quin pointer-events-none">&ndash;</li> */}

							<li className={"next " + `${hasNext ? "" : "text-black-quin pointer-events-none"}`}>
								<a
									tabIndex={hasNext ? 0 : -1}
									role="button"
									aria-disabled={hasNext ? "true" : "false"}
									aria-label="Next page"
									rel="next"
									onClick={() => {
										if (hasNext) {
											paginate(pages.current + 1);
										}
									}}
								>
									<div>
										<div className="flex justify-center items-center transition-colors duration-150 ease-in-out text-current hover:bg-black-quin rounded-full h-7 w-7 pl-0.5">
											<Image
												className="stroke-current w-3.5 -rotate-90 transform origin-center"
												src={chevronArrow}
												alt="right arrow"
												priority
											/>
										</div>
									</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
}

export default Pagination;
