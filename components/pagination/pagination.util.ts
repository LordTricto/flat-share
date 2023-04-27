import {divide, subtract} from "@/utils/math";

interface Response {
	pages: {
		current: number;
		total: number;
	};
	items: {
		start: number;
		end: number;
		total: number;
	};
	hasPrevious: boolean;
	hasNext: boolean;
}

export function parsePaginationData(offset: number, total: number, groupSize: number): Response {
	const totalPages = Math.ceil(divide(total, groupSize));
	const currentPage = Math.floor(divide(offset, groupSize)) + 1;

	return {
		pages: {
			current: currentPage,
			total: totalPages,
		},
		items: {
			start: Math.min(total, subtract(currentPage, 1) * groupSize + 1),
			end: Math.min(total, currentPage * groupSize),
			total: total,
		},
		hasPrevious: currentPage > 1,
		hasNext: totalPages > currentPage,
	};
}

export function calculateOffset(page: number, groupSize: number): number {
	return groupSize * (page - 1) || 0;
}
