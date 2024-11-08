import moment from "moment";

export function formatDate(date: Date): string {
	const currentDate = moment().format("YYYY-MM-DD");

	if (moment(date).isSame(currentDate, "day")) {
		return `Today`;
	}
	const d = moment(date).format("DD");
	const m = moment(date).format("MMMM").slice(0, 3);
	const y = moment(date).format("YYYY");
	return `${d} ${m}, ${y}`;
}

export function formatTime(date: Date): string {
	return moment(date).format("h:mm a");
}

export function formatDateAndTime(date: Date): string {
	return `${formatDate(date)}, ${formatTime(date)}`;
}

export function momentFormatDate(date: Date, format?: string): string {
	return moment(date).format(format);
}

export function timeDistance(date: Date): string {
	const distance = moment(date).fromNow();
	return `${distance}`;
}
